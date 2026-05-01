import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

const STORAGE_KEY = "rephyl_wishlist";
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

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
