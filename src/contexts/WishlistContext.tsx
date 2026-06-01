import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";

export interface WishlistItem {
  productId: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  variantId?: number;
  categoryName?: string;
  slug?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  totalItems: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: number, variantId?: number) => void;
  isWishlisted: (productId: number, variantId?: number) => boolean;
  clearWishlist: () => void;
}

const STORAGE_KEY_PREFIX = "rephyl_wishlist";
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function getWishlistStorageKey(user: { personId?: number; tenantId?: number; email?: string } | null) {
  if (user?.personId) return `${STORAGE_KEY_PREFIX}:person:${user.personId}`;
  if (user?.tenantId) return `${STORAGE_KEY_PREFIX}:tenant:${user.tenantId}`;
  if (user?.email) return `${STORAGE_KEY_PREFIX}:email:${user.email.toLowerCase()}`;
  return `${STORAGE_KEY_PREFIX}:guest`;
}

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const storageKey = useMemo(
    () => getWishlistStorageKey(user),
    [user?.personId, user?.tenantId, user?.email]
  );

  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load wishlist for current account when auth identity changes.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setItems(stored ? JSON.parse(stored) : []);
    } catch {
      setItems([]);
    } finally {
      setIsHydrated(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey, isHydrated]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.some(
        (entry) =>
          entry.productId === item.productId &&
          (item.variantId ? entry.variantId === item.variantId : true)
      );
      if (exists) return prev;
      return [item, ...prev];
    });
  };

  const removeFromWishlist = (productId: number, variantId?: number) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && (variantId ? item.variantId === variantId : true))
      )
    );
  };

  const isWishlisted = (productId: number, variantId?: number) =>
    items.some(
      (item) => item.productId === productId && (variantId ? item.variantId === variantId : true)
    );

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        totalItems: items.length,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
