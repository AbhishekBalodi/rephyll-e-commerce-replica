import { Star, ShoppingCart, Share2, Heart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ApiProduct } from "@/types/api";
import { getProductImage, getSellingPrice, getMrp, getDiscount } from "@/lib/productHelpers";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";

interface ProductCardProps {
  product: ApiProduct;
  onClick?: (product: ApiProduct) => void;
  bundleItemSelected?: boolean;
  onBundleToggle?: (product: ApiProduct) => void;
}

const ProductCard = ({
  product,
  onClick,
  bundleItemSelected = false,
  onBundleToggle,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const image = getProductImage(product);
  const price = getSellingPrice(product);
  const mrp = getMrp(product);
  const discount = getDiscount(product);

  const cartItem = items.find((i) => i.productId === product.id);
  const cartQty = cartItem?.quantity ?? 0;

  // Mock rating/review data
  const rating = 4.5 + Math.random() * 0.4;
  const reviewCount = 30 + Math.floor(Math.random() * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price,
      originalPrice: mrp,
      image,
    });
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, cartQty + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartQty <= 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, cartQty - 1);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[270px] cursor-pointer"
      onClick={() => { onClick?.(product); navigate(`/product/${product.slug || product.id}`); }}
    >
      <div className="relative h-[200px] rounded-t-2xl bg-[linear-gradient(160deg,#CEF17B_0%,#FFFFFF_100%)] flex items-center justify-center">
        <div className="absolute top-3 right-3 flex gap-2">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Share2 size={16} />
          </div>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Heart size={16} />
          </div>
        </div>

        <img src={image} alt={product.name} className="h-[120px] object-contain" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
          <ChevronRight size={16} color="#364153" />
        </div>

        <div className="absolute bottom-3 flex gap-1">
          <div className="w-6 h-1 bg-[#00301D] rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          <Star size={14} className="text-[#FBC700]" />
          <span className="text-sm font-semibold text-[#464646]">{rating.toFixed(1)}</span>
          <span className="text-xs text-[#8E939C]">({reviewCount} reviews)</span>
        </div>

        <h3 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#464646] line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-poppins font-bold text-[30px] text-[#064734] leading-[24px]">₹{price.toFixed(0)}</span>
          {discount > 0 && (
            <span className="text-sm text-[#8E939C] line-through">₹{mrp.toFixed(0)}</span>
          )}
        </div>

        {onBundleToggle && (
          <div className="mb-3">
            <button
              onClick={(e) => { e.stopPropagation(); onBundleToggle(product); }}
              className={`w-full rounded-lg py-2 text-sm font-medium ${bundleItemSelected ? "bg-[#F4D06F] text-[#064734]" : "bg-[#E2F8D8] text-[#064734] hover:bg-[#CEF17B]"}`}
            >
              {bundleItemSelected ? "Remove from bundle" : "Select for bundle"}
            </button>
          </div>
        )}
        <div className="mt-1">
          {cartQty > 0 ? (
            <QuantityCapsule quantity={cartQty} onIncrement={handleIncrement} onDecrement={handleDecrement} size="sm" fullWidth />
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); handleAddToCart(e); }}
              className="w-full bg-[#064734] text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Add to Box
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
