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

interface ProductCardProps {
  product: ApiProduct;
  onClick?: (product: ApiProduct) => void;
  className?: string;
}

const ProductCard = ({ product, onClick, className }: ProductCardProps) => {
  const navigate = useNavigate();
  const { items, addToCart } = useCart();
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

  return (
    <div
      className={`bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[340px] md:max-w-[300px] lg:max-w-none cursor-pointer mx-auto ${className ?? ""}`}
      onClick={() => {
        onClick?.(product);
        navigate(buildProductPath(product));
      }}
    >
      <div className="relative aspect-square rounded-t-2xl overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Share2 size={16} />
          </div>
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow">
            <Heart size={16} />
          </div>
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
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow z-10 hover:bg-gray-100"
        >
          <ChevronRight size={16} color="#364153" />
        </button>

        <div className="absolute bottom-3 flex gap-1 z-10">
          <div className="w-6 h-1 bg-[#00301D] rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="p-4 md:p-4 lg:p-5">
        <h3 className="font-poppins font-semibold text-[17px] md:text-[16px] lg:text-[18px] leading-[24px] md:leading-[22px] lg:leading-[26px] text-[#464646] line-clamp-2 min-h-[48px] md:min-h-[44px] lg:min-h-[52px]">
          {product.name}
        </h3>

        <div className="flex items-end gap-2 mt-2">
          <span className="font-poppins font-bold text-[24px] md:text-[22px] lg:text-[28px] text-[#064734] leading-none">
            {"\u20B9"}{price.toFixed(0)}
          </span>
          {showOriginalPrice && (
            <span className="text-sm text-[#8E939C] line-through">
              {"\u20B9"}{mrp.toFixed(0)}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-[#E2F3AF] px-2 py-1 text-[11px] font-semibold text-[#064734]">
              Save {discount}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2 min-h-[20px]">
          <div className="flex items-center gap-[2px]">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.floor(rating);
              return (
                <svg
                  key={i}
                  width="13.33"
                  height="12.71"
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
          <span className="text-sm font-semibold text-[#464646]">{rating.toFixed(1)}</span>
          <span className="text-xs text-[#8E939C]">({reviewCount} reviews)</span>
        </div>

        <div className="mt-3 md:mt-2.5 lg:mt-3">
          <button
            onClick={handleAddClick}
            disabled={!defaultVariant?.id || maxAllowedQuantity <= 0 || quantity >= maxAllowedQuantity}
            className="w-full rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#05412E] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
