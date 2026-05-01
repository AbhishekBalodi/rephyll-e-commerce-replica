import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import * as cartApi from "@/services/cartApi";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  variantId?: number;
  itemId?: number;
  maxQuantity?: number | null;
  stockLabel?: string | null;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (productId: number, variantId?: number) => void;
  updateQuantity: (productId: number, quantity: number, variantId?: number) => void;
  clearCart: () => void;
  syncing?: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "rephyl_cart";
const FRONTEND_MAX_PER_ITEM = 10;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      
      // CRITICAL: Remove items without variantId (old/invalid items)
      const validItems = parsed.filter((item: CartItem) => {
        if (!item.variantId) {
          console.warn(`Removing cart item without variantId: ${item.productId} (${item.name})`);
          return false;
        }
        return true;
      });
      
      return validItems;
    } catch (err) {
      console.error('Failed to load cart:', err);
      return [];
    }
  });
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    // CRITICAL: Require variantId to be set
    if (!item.variantId) {
      console.error('Cannot add item to cart without variantId:', item);
      toast({ 
        title: "Error", 
        description: "Product variant information is missing",
        variant: "destructive"
      });
      return;
    }

    const existingItem = items.find(
      (i) => i.productId === item.productId && i.variantId === item.variantId
    );
    const maxAllowed = Math.min(
      FRONTEND_MAX_PER_ITEM,
      existingItem?.maxQuantity ?? item.maxQuantity ?? Number.POSITIVE_INFINITY
    );
    const currentQty = existingItem?.quantity ?? 0;
    const allowedIncrement = Math.max(0, Math.min(quantity, maxAllowed - currentQty));

    if (allowedIncrement <= 0) {
      return;
    }

    setItems((prev) => {
      // Use BOTH productId AND variantId to find existing item
      const existing = prev.find((i) => i.productId === item.productId && i.variantId === item.variantId);
      
      if (existing) {
        // Same product + same variant: increment quantity
        return prev.map((i) =>
          i.productId === item.productId && i.variantId === item.variantId
            ? {
                ...i,
                quantity: Math.min(
                  i.quantity + allowedIncrement,
                  Math.min(FRONTEND_MAX_PER_ITEM, i.maxQuantity ?? Number.POSITIVE_INFINITY)
                ),
              }
            : i
        );
      }
      
      // Different product OR different variant: add as new item
      return [
        ...prev,
        {
          ...item,
          quantity: Math.min(allowedIncrement, Math.min(FRONTEND_MAX_PER_ITEM, item.maxQuantity ?? Number.POSITIVE_INFINITY)),
          maxQuantity: Math.min(FRONTEND_MAX_PER_ITEM, item.maxQuantity ?? Number.POSITIVE_INFINITY),
        },
      ];
    });
    toast({ title: "Added to Cart", description: `${item.name} added to your cart.` });
    
    // Background sync to server when logged in
    (async () => {
      try {
        const token = localStorage.getItem("rephyl_token");
        if (!token) return;
        setSyncing(true);
        
        // CRITICAL: Always use variantId, NEVER fall back to productId
        if (!item.variantId) {
          throw new Error('Cannot sync cart item without variantId');
        }
        
        const resp = await cartApi.addItem(item.variantId, allowedIncrement);
        // handle ApiResponse wrapper
        const payload = (resp && typeof resp === 'object' && 'success' in resp) ? (resp.data || resp) : resp;
        if (resp && typeof resp === "object" && resp.success === false) throw new Error(resp.message || "Add to cart failed");
        
        // If server returned item metadata, merge into local cart item
        try {
          if (payload && payload.variantId) {
            setItems((prev) => prev.map((it) => {
              if (it.variantId === payload.variantId && it.productId === payload.productId) {
                return {
                  ...it,
                  itemId: payload.id || it.itemId,
                  maxQuantity: payload.maxQuantity || payload.maxCartQuantity || it.maxQuantity,
                  stockLabel: payload.stockLabel || it.stockLabel || null,
                  variantId: payload.variantId,
                };
              }
              return it;
            }));
          }
        } catch (_) { /* ignore */ }
      } catch (err: any) {
        toast({ title: "Sync failed", description: err.message || "Could not sync cart", variant: "destructive" });
      } finally {
        setSyncing(false);
      }
    })();
  };

  const removeFromCart = (productId: number, variantId?: number) => {
    // Find the item to remove
    const itemToRemove = items.find((i) => 
      i.productId === productId && (variantId ? i.variantId === variantId : true)
    );

    if (!itemToRemove?.variantId) {
      console.error('Cannot remove item without variantId');
      return;
    }

    setItems((prev) => prev.filter((i) => 
      !(i.productId === productId && i.variantId === itemToRemove.variantId)
    ));
    
    // Sync with server
    (async () => {
      try {
        const token = localStorage.getItem("rephyl_token");
        if (!token || !itemToRemove.itemId) return;
        setSyncing(true);
        await cartApi.removeItem(itemToRemove.itemId);
      } catch (err) {
        console.error('Failed to sync remove:', err);
      } finally { setSyncing(false); }
    })();
  };

  const updateQuantity = (productId: number, quantity: number, variantId?: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    // Find the item to update
    const itemToUpdate = items.find((i) => 
      i.productId === productId && (variantId ? i.variantId === variantId : true)
    );

    if (!itemToUpdate?.variantId) {
      console.error('Cannot update item without variantId');
      return;
    }

    const maxForItem = Math.min(FRONTEND_MAX_PER_ITEM, itemToUpdate.maxQuantity ?? Number.POSITIVE_INFINITY);
    const normalizedQuantity = Math.min(quantity, maxForItem);

    setItems((prev) => prev.map((i) => {
      if (i.productId !== productId || i.variantId !== itemToUpdate.variantId) {
        return i;
      }
      const maxQ = Math.min(FRONTEND_MAX_PER_ITEM, i.maxQuantity ?? Number.POSITIVE_INFINITY);
      const newQ = Math.min(normalizedQuantity, maxQ);
      return { ...i, quantity: newQ };
    }));

    // Sync with server
    (async () => {
      try {
        const token = localStorage.getItem("rephyl_token");
        if (!token || !itemToUpdate.itemId) return;
        setSyncing(true);
        const resp = await cartApi.updateItem(itemToUpdate.itemId, normalizedQuantity);
        if (resp && typeof resp === 'object' && resp.success === false) {
          throw new Error(resp.message || 'Update failed');
        }
      } catch (err) {
        console.error('Failed to sync update:', err);
      } finally { setSyncing(false); }
    })();
  };

  const clearCart = () => {
    setItems([]);
    (async () => {
      try {
        const token = localStorage.getItem("rephyl_token");
        if (!token) return;
        setSyncing(true);
        const resp = await cartApi.clearCart();
        if (resp && typeof resp === 'object' && resp.success === false) throw new Error(resp.message || 'Clear cart failed');
      } catch (err) {
        // ignore
      } finally { setSyncing(false); }
    })();
  };

  // When the user logs in (token present), try to fetch server cart and replace local cart
  const { token } = useAuth();
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!token) return;
        const server = await cartApi.getCart();
        const serverItems = (server && server.success) ? (server.data?.items || []) : (server.items || []);
        const mapped = serverItems.map((si: any) => ({
          productId: si.productId || si.product?.id || 0,
          name: si.productName || si.product?.name || "Product",
          price: si.unitPrice || si.price || 0,
          originalPrice: si.mrp || si.originalPrice || si.unitPrice || 0,
          image: si.imagePath || (si.productImage && si.productImage.path) || "/placeholder.svg",
          quantity: si.quantity || si.qty || 1,
          variantId: si.variantId || si.variant?.id,
          itemId: si.id,
          maxQuantity: si.maxQuantity || si.maxCartQuantity || si.variant?.inventory?.maxCartQuantity || null,
          stockLabel: si.stockLabel || si.variant?.inventory?.stockLabel || null,
        }));
        if (mounted && mapped.length > 0) setItems(mapped);
      } catch (err) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart, syncing }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
