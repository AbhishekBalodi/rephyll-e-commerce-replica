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

export interface BundleOffer {
  targetQty: number;
  bundlePrice: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  bundleOffer: BundleOffer | null;
  setBundleOffer: (offer: BundleOffer | null) => void;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  syncing?: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "rephyl_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [bundleOffer, setBundleOffer] = useState<BundleOffer | null>(null);
  const [syncing, setSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = bundleOffer && totalItems === bundleOffer.targetQty
    ? bundleOffer.bundlePrice
    : items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setBundleOffer(null);
    toast({ title: "Added to Cart", description: `${item.name} added to your cart.` });
    // Background sync to server when logged in
    (async () => {
      try {
        const token = localStorage.getItem("rephyl_token");
        if (!token) return;
        setSyncing(true);
        const variant = (item as any).variantId || item.productId;
        const resp = await cartApi.addItem(variant, quantity);
        // handle ApiResponse wrapper
        const payload = (resp && typeof resp === 'object' && 'success' in resp) ? (resp.data || resp) : resp;
        if (resp && typeof resp === "object" && resp.success === false) throw new Error(resp.message || "Add to cart failed");
        // If server returned item metadata, merge into local cart item
        try {
          if (payload && payload.variantId) {
            setItems((prev) => prev.map((it) => {
              if ((it.variantId && it.variantId === payload.variantId) || it.productId === payload.productId) {
                return {
                  ...it,
                  itemId: payload.id || it.itemId,
                  maxQuantity: payload.maxQuantity || payload.maxCartQuantity || it.maxQuantity,
                  stockLabel: payload.stockLabel || it.stockLabel || null,
                  variantId: payload.variantId || it.variantId,
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

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
    (async () => {
      try {
        const token = localStorage.getItem("rephyl_token");
        if (!token) return;
        setSyncing(true);
        // Best-effort: server expects itemId; we don't have it locally so call getCart and try to find matching variant/product
        const server = await cartApi.getCart();
        const serverItems = (server && server.success) ? (server.data?.items || []) : (server.items || []);
        const match = serverItems.find((si: any) => si.variantId === productId || si.productId === productId);
        if (match && match.id) await cartApi.removeItem(match.id);
      } catch (err) {
        // ignore
      } finally { setSyncing(false); }
    })();
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => prev.map((i) => {
      if (i.productId !== productId) return i;
      const maxQ = i.maxQuantity ?? null;
      const newQ = (maxQ && quantity > maxQ) ? maxQ : quantity;
      return { ...i, quantity: newQ };
    }));
    setBundleOffer(null);
    (async () => {
      try {
        const token = localStorage.getItem("rephyl_token");
        if (!token) return;
        setSyncing(true);
        const server = await cartApi.getCart();
        const serverItems = (server && server.success) ? (server.data?.items || []) : (server.items || []);
        const match = serverItems.find((si: any) => si.variantId === productId || si.productId === productId || si.id === productId);
        if (match && match.id) {
          const resp = await cartApi.updateItem(match.id, quantity);
          if (resp && typeof resp === 'object' && resp.success === false) throw new Error(resp.message || 'Update failed');
        }
      } catch (err) {
        // ignore
      } finally { setSyncing(false); }
    })();
  };

  const clearCart = () => {
    setItems([]);
    setBundleOffer(null);
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
          productId: si.productId || si.variantId,
          name: si.productName || si.productName || "Product",
          price: si.unitPrice || si.price || 0,
          originalPrice: si.mrp || si.originalPrice || si.unitPrice || 0,
          image: si.imagePath || (si.productImage && si.productImage.path) || "/placeholder.svg",
          quantity: si.quantity || si.qty || 1,
        }));
        if (mounted && mapped.length > 0) setItems(mapped);
      } catch (err) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, [token]);

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, bundleOffer, setBundleOffer, addToCart, removeFromCart, updateQuantity, clearCart, syncing }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
