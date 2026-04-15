import type { MouseEvent } from "react";
import { Star, StarHalf, ShoppingCart, Share2, Heart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ApiProduct } from "@/types/api";
import { getProductImage, getSellingPrice, getMrp, getDiscount } from "@/lib/productHelpers";
import { getProductById } from "@/services/productApi";
import QuantityCapsule from "./QuantityCapsule";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: ApiProduct;
  onClick?: (product: ApiProduct) => void;
  bundleQuantity?: number;
  bundleSize?: number;
  totalBundleQuantity?: number;
  onAdd?: (product: ApiProduct) => void;
  onIncrement?: (product: ApiProduct) => void;
  onDecrement?: (product: ApiProduct) => void;
  buttonLabel?: string;
  isCartMode?: boolean;
}

const ProductCard = ({
  product,
  onClick,
  bundleQuantity,
  bundleSize,
  totalBundleQuantity,
  onAdd,
  onIncrement,
  onDecrement,
  buttonLabel,
  isCartMode,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart, setBundleOffer } = useCart();
  const image = getProductImage(product);
  const price = getSellingPrice(product);
  const mrp = getMrp(product);
  const discount = getDiscount(product);

  const existingCartItem = items.find((item) => item.productId === product.id);
  const cartQty = existingCartItem?.quantity ?? 0;

  const isBundle = bundleQuantity !== undefined && bundleSize !== undefined;
  const quantity = isBundle ? bundleQuantity : cartQty;
  const bundleTotalQty = totalBundleQuantity ?? 0;
  const maxReached = isBundle ? bundleTotalQty >= (bundleSize ?? 0) : false;
  const actionLabel = isBundle ? (buttonLabel || "Add to Box") : (buttonLabel || "Add to Cart");

  const handleAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isBundle && onAdd) {
      if (maxReached) return;
      onAdd(product);
      return;
    }
    if (!isBundle) {
      (async () => {
        // Attempt to resolve a variant id from product detail. If not available, fallback to product.id
        let variantId: number | undefined = undefined;
        try {
          if ((product as any).variantCount && (product as any).variantCount > 0) {
            const detail = await getProductById(product.id);
            if (detail.variants && detail.variants.length > 0) {
              variantId = detail.variants[0].id;
            }
          }
        } catch (_) {
          // ignore and fallback
        }

        addToCart({ productId: product.id, name: product.name, price, originalPrice: mrp, image, variantId });
      })();
    }
  };

  const handleIncrementClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isBundle && onIncrement) {
      if (maxReached) return;
      onIncrement(product);
      return;
    }
    if (!isBundle) {
      const existing = items.find((it) => it.productId === product.id);
      const maxQ = existing?.maxQuantity ?? null;
      const newQ = maxQ && (quantity + 1) > maxQ ? maxQ : quantity + 1;
      updateQuantity(product.id, newQ);
    }
  };

  const handleDecrementClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isBundle && onDecrement) {
      onDecrement(product);
      return;
    }
    if (!isBundle) {
      if (quantity <= 1) {
        removeFromCart(product.id);
      } else {
        updateQuantity(product.id, quantity - 1);
      }
    }
  };

  // Mock rating/review data
  const rating = 4.5 + Math.random() * 0.4;
  const reviewCount = 30 + Math.floor(Math.random() * 100);


  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[270px] cursor-pointer"
      onClick={() => {
        onClick?.(product);
        navigate(`/product/${product.id}`);
      }}
    >
      <div className="relative h-[200px] rounded-t-2xl overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Share2 size={16} />
          </div>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Heart size={16} />
          </div>
        </div>

        <img src={image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow z-10">
          <ChevronRight size={16} color="#364153" />
        </div>

        <div className="absolute bottom-3 flex gap-1 z-10">
          <div className="w-6 h-1 bg-[#00301D] rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#464646] line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-end gap-2 mt-1">
          <span className="font-poppins font-bold text-[28px] text-[#064734] leading-[28px]">₹{price.toFixed(0)}</span>
          {discount > 0 && (
            <span className="text-sm text-[#8E939C] line-through">₹{mrp.toFixed(0)}</span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => {
              const active = i < Math.floor(rating);
              return (
                <svg key={i} width="13.33" height="12.71" viewBox="0 0 14 13" fill="#FBC700" opacity={active ? 1 : 0.35} stroke="#FBC700" strokeWidth="1.33" style={{ transition: "opacity 0.2s" }}>
                  <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57z" />
                </svg>
              );
            })}
          </div>
          <span className="text-sm font-semibold text-[#464646]">{rating.toFixed(1)}</span>
          <span className="text-xs text-[#8E939C]">({reviewCount} reviews)</span>
        </div>

        <div className="mt-3">
          {quantity > 0 ? (
            <QuantityCapsule
              quantity={quantity}
              onIncrement={handleIncrementClick}
              onDecrement={handleDecrementClick}
              size="sm"
              fullWidth
            />
          ) : (
            <button
              onClick={handleAddClick}
              disabled={isBundle ? maxReached : false}
              className={`w-full rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 ${isBundle && maxReached ? "bg-gray-400" : "bg-[#064734] hover:bg-[#05412E]"}`}
            >
              <ShoppingCart size={16} />
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
