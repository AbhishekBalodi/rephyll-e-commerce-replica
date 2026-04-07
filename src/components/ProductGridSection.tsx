import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from "./ProductCard";
import { useProductList } from "@/hooks/useProducts";
import { getProductImage } from "@/lib/productHelpers";
import { useCart } from "@/contexts/CartContext";
import type { ApiProduct } from "@/types/api";

const BUNDLE_OPTIONS = [
  { id: "2-499", label: "Buy 2 @499", size: 2, price: 499 },
  { id: "4-849", label: "Buy 4 @849", size: 4, price: 849 },
  { id: "5-999", label: "Buy 5 @999", size: 5, price: 999 },
];

const ProductGridSection = () => {
  const { data, isLoading } = useProductList({ page: 0, size: 20 });
  const products = data?.content ?? [];
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart, clearCart, setBundleOffer } = useCart();

  const [selectedBundle, setSelectedBundle] = useState(BUNDLE_OPTIONS[0]);
  const [bundleItems, setBundleItems] = useState<Record<number, number>>({});
  const [bundleExpanded, setBundleExpanded] = useState(false);

  const totalBundleQuantity = Object.values(bundleItems).reduce((sum, q) => sum + q, 0);

  const setProductBundleQty = (product: ApiProduct, quantity: number) => {
    const qty = Math.max(0, Math.min(2, quantity));
    const target = Math.min(qty, selectedBundle.size - (totalBundleQuantity - (bundleItems[product.id] || 0)));

    if (target <= 0) {
      setBundleItems((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
      removeFromCart(product.id);
      return;
    }

    setBundleItems((prev) => ({ ...prev, [product.id]: target }));
    if (items.find((i) => i.productId === product.id)) {
      updateQuantity(product.id, target);
    } else {
      addToCart({ productId: product.id, name: product.name, price: product.basePrice, originalPrice: product.basePrice, image: getProductImage(product) }, target);
    }
  };

  const handleAddToBox = (product: ApiProduct) => {
    if (totalBundleQuantity >= selectedBundle.size) return;
    const existingQty = bundleItems[product.id] || 0;
    if (existingQty >= 2) return;
    setProductBundleQty(product, existingQty + 1);
  };

  const handleIncrement = (product: ApiProduct) => {
    if (totalBundleQuantity >= selectedBundle.size) return;
    const existingQty = bundleItems[product.id] || 0;
    setProductBundleQty(product, existingQty + 1);
  };

  const handleDecrement = (product: ApiProduct) => {
    const existingQty = bundleItems[product.id] || 0;
    setProductBundleQty(product, existingQty - 1);
  };

  const bundleUnitPrice = selectedBundle.price / Math.max(selectedBundle.size, 1);

  return (
    <section className="w-full flex justify-center py-16 relative">
      <div className="max-w-[1194px] w-full px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#064734]">Explore Products</h2>
          <p className="text-[#464646]">Select bundle option and pick products to apply bundle pricing.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] justify-items-center">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse w-full max-w-[270px]">
                <div className="h-[200px] rounded-t-2xl bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-4 w-1/2 rounded bg-muted" />
                  <div className="h-8 w-1/3 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-[30px] justify-items-center">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                bundleQuantity={bundleItems[product.id] || 0}
                bundleSize={selectedBundle.size}
                totalBundleQuantity={totalBundleQuantity}
                onAdd={handleAddToBox}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>

      {/* Floating Bundle Bar - Disabled */}
    </section>
  );
};

export default ProductGridSection;
