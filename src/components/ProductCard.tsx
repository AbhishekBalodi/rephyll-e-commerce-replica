import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { ShoppingCart, Share2, Heart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ApiProduct, ApiProductDetail } from "@/types/api";
import {
  getProductImage,
  getProductImages,
  getVariantDiscountPercent,
  getVariantMrp,
  getVariantStockLabel,
} from "@/lib/productHelpers";
import { buildProductPath } from "@/lib/routeHelpers";
import { getProductById } from "@/services/productApi";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductCardProps {
  product: ApiProduct;
  onClick?: (product: ApiProduct) => void;
  className?: string;
}

const ProductCard = ({ product, onClick, className }: ProductCardProps) => {
  const navigate = useNavigate();
  const { items, addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [imageIndex, setImageIndex] = useState(0);
  const [fullProduct, setFullProduct] = useState<ApiProductDetail | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const detail = await getProductById(product.id);
        setFullProduct(detail);
      } catch (err) {
        console.error("Failed to load product details:", err);
      }
    };

    loadProduct();
  }, [product.id]);

  const images = fullProduct ? getProductImages(fullProduct) : [getProductImage(product)];
  const currentImage = images[imageIndex] || getProductImage(product);
  const defaultVariant = fullProduct?.variants?.[0];
  const price = defaultVariant?.price ?? product.basePrice;
  const mrp = defaultVariant ? getVariantMrp(product, defaultVariant) : product.basePrice;
  const showOriginalPrice = mrp > price;
  const discount = defaultVariant ? getVariantDiscountPercent(product, defaultVariant) : 0;
  const rating = (product as ApiProduct & { rating?: number }).rating ?? 4.6;
  const reviewCount = (product as ApiProduct & { reviewCount?: number }).reviewCount ?? 42;

  const existingCartItem = items.find(
    (item) =>
      item.productId === product.id &&
      (defaultVariant?.id ? item.variantId === defaultVariant.id : true)
  );
  const quantity = existingCartItem?.quantity ?? 0;
  const inventoryMax =
    defaultVariant?.inventory?.maxCartQuantity ??
    defaultVariant?.inventory?.totalStock ??
    null;
  const maxAllowedQuantity =
    defaultVariant?.inventory?.available === false
      ? 0
      : Math.min(
          10,
          inventoryMax ?? Number.POSITIVE_INFINITY,
          existingCartItem?.maxQuantity ?? Number.POSITIVE_INFINITY
        );
  const productPath = buildProductPath(product);
  const shareUrl = `${window.location.origin}${productPath}`;
  const isItemWishlisted = isWishlisted(product.id, defaultVariant?.id);

  const handleAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!defaultVariant?.id) {
      alert("Loading product details... Please try again in a moment.");
      return;
    }

    if (quantity >= maxAllowedQuantity) {
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: defaultVariant.price,
      originalPrice: mrp,
      image: currentImage,
      variantId: defaultVariant.id,
      maxQuantity: Math.min(
        10,
        defaultVariant.inventory?.maxCartQuantity ??
          defaultVariant.inventory?.totalStock ??
          Number.POSITIVE_INFINITY
      ),
      stockLabel: getVariantStockLabel(defaultVariant),
    });
  };

  const handleNextImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (images.length > 1) {
      setImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handleShareClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}`,
          url: shareUrl,
        });
        return;
      } catch {
        // If the share sheet is dismissed or fails, continue to fallback.
      }
    }

    const webShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out ${product.name}: ${shareUrl}`)}`;
    window.open(webShareUrl, "_blank", "noopener,noreferrer");
  };

  const handleWishlistClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isItemWishlisted) {
      removeFromWishlist(product.id, defaultVariant?.id);
      return;
    }

    addToWishlist({
      productId: product.id,
      name: product.name,
      price,
      originalPrice: mrp,
      image: currentImage,
      variantId: defaultVariant?.id,
      categoryName: product.categoryName,
      slug: product.slug || product.urlHandle,
    });
  };

  return (
    <div
      className={`bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden w-full max-w-none md:max-w-[300px] lg:max-w-none cursor-pointer mx-auto ${className ?? ""}`}
      onClick={() => {
        onClick?.(product);
        navigate(productPath);
      }}
    >
      <div className="relative aspect-square rounded-t-xl md:rounded-t-2xl overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
        <div className="absolute top-2 right-2 md:top-3 md:right-3 flex gap-1.5 md:gap-2 z-10">
          <button
            type="button"
            onClick={handleShareClick}
            aria-label={`Share ${product.name}`}
            className="w-7 h-7 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50"
          >
            <Share2 size={14} className="md:hidden" />
            <Share2 size={16} className="hidden md:block" />
          </button>
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isItemWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center shadow transition-colors ${
              isItemWishlisted ? "bg-[#064734]" : "bg-white hover:bg-gray-50"
            }`}
          >
            <Heart
              size={14}
              className={`md:hidden ${isItemWishlisted ? "text-white fill-white" : "text-[#364153]"}`}
            />
            <Heart
              size={16}
              className={`hidden md:block ${isItemWishlisted ? "text-white fill-white" : "text-[#364153]"}`}
            />
          </button>
        </div>

        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />

        <button
          onClick={handleNextImage}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-7 h-7 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center shadow z-10 hover:bg-gray-100"
        >
          <ChevronRight size={14} className="md:hidden" color="#364153" />
          <ChevronRight size={16} className="hidden md:block" color="#364153" />
        </button>

        <div className="absolute bottom-2 md:bottom-3 flex gap-1 z-10">
          <div className="w-5 md:w-6 h-1 bg-[#00301D] rounded-full" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-full" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="p-2.5 md:p-4 lg:p-5">
        <h3 className="font-poppins font-semibold text-[11px] md:text-[16px] lg:text-[18px] leading-[15px] md:leading-[22px] lg:leading-[26px] text-[#464646] line-clamp-2 min-h-[30px] md:min-h-[44px] lg:min-h-[52px]">
          {product.name}
        </h3>

        <div className="flex items-end gap-1.5 md:gap-2 mt-1.5 md:mt-2">
          <span className="font-poppins font-bold text-[17px] md:text-[22px] lg:text-[28px] text-[#064734] leading-none">
            {"\u20B9"}{price.toFixed(0)}
          </span>
          {showOriginalPrice && (
            <span className="text-[10px] md:text-sm text-[#8E939C] line-through">
              {"\u20B9"}{mrp.toFixed(0)}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-[#E2F3AF] px-1.5 md:px-2 py-0.5 md:py-1 text-[9px] md:text-[11px] font-semibold text-[#064734]">
              Save {discount}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-1.5 md:mt-2 min-h-[16px] md:min-h-[20px]">
          <div className="flex items-center gap-[1px] md:gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.floor(rating);
              return (
                <svg
                  key={i}
                  width="10"
                  height="9.5"
                  viewBox="0 0 14 13"
                  fill="#FBC700"
                  opacity={filled ? 1 : 0.35}
                  stroke="#FBC700"
                  strokeWidth="1.33"
                  style={{ transition: "opacity 0.2s" }}
                >
                  <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57z" />
                </svg>
              );
            })}
          </div>
          <span className="text-[10px] md:text-sm font-semibold text-[#464646]">{rating.toFixed(1)}</span>
          <span className="hidden md:inline text-xs text-[#8E939C]">({reviewCount} reviews)</span>
        </div>

        <div className="mt-2 md:mt-2.5 lg:mt-3">
          <button
            onClick={handleAddClick}
            disabled={!defaultVariant?.id || maxAllowedQuantity <= 0 || quantity >= maxAllowedQuantity}
            className="w-full rounded-lg md:rounded-xl py-2 md:py-3 text-[11px] md:text-sm font-semibold text-white flex items-center justify-center gap-1.5 md:gap-2 bg-[#064734] hover:bg-[#05412E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <ShoppingCart size={13} className="md:hidden" />
            <ShoppingCart size={16} className="hidden md:block" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
