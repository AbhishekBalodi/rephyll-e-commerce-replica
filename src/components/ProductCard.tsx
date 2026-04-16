import type { MouseEvent } from "react";
import { useState, useEffect } from "react";
import { Star, StarHalf, ShoppingCart, Share2, Heart, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ApiProduct, ApiProductDetail ,ApiVariant} from "@/types/api";
import { getProductImage, getSellingPrice, getMrp, getDiscount, getProductImages } from "@/lib/productHelpers";
import { getProductById } from "@/services/productApi";
import QuantityCapsule from "./QuantityCapsule";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: ApiProduct;
  onClick?: (product: ApiProduct) => void;
}


const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [imageIndex, setImageIndex] = useState(0);
  const [fullProduct, setFullProduct] = useState<ApiProductDetail | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Load full product details to get all variant images
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const detail = await getProductById(product.id);
        setFullProduct(detail);
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [product.id]);

  

  
  
  // Use variant images if available, otherwise fallback to catalog image
  const images = fullProduct ? getProductImages(fullProduct) : [getProductImage(product)];
  const currentImage = images[imageIndex] || getProductImage(product);
  const price = getSellingPrice(product);
  const mrp = getMrp(product);
  const discount = getDiscount(product);

  const existingCartItem = items.find((item) => item.productId === product.id);
  const quantity = existingCartItem?.quantity ?? 0;

  const handleAddClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    if (!fullProduct || !fullProduct.variants || fullProduct.variants.length === 0) {
      alert('Loading product details... Please try again in a moment.');
      return;
    }

    const selectedVariant = fullProduct.variants[0];
    if (!selectedVariant || !selectedVariant.id) {
      alert('Product variant information is missing');
      return;
    }

    addToCart({ 
      productId: product.id, 
      name: product.name, 
      price, 
      originalPrice: mrp, 
      image: currentImage, 
      variantId: selectedVariant.id 
    });
  };

  const handleIncrementClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!fullProduct?.variants?.[0]?.id) {
      alert('Product variant not loaded');
      return;
    }
    const variantId = fullProduct.variants[0].id;
    const existing = items.find((it) => it.productId === product.id && it.variantId === variantId);
    const maxQ = existing?.maxQuantity ?? null;
    const newQ = maxQ && (quantity + 1) > maxQ ? maxQ : quantity + 1;
    updateQuantity(product.id, newQ, variantId);
  };

  const handleDecrementClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!fullProduct?.variants?.[0]?.id) {
      alert('Product variant not loaded');
      return;
    }
    const variantId = fullProduct.variants[0].id;
    if (quantity <= 1) {
      removeFromCart(product.id, variantId);
    } else {
      updateQuantity(product.id, quantity - 1, variantId);
    }
  };

  const handleNextImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (images.length > 1) {
      setImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  // Fixed: Use product data for rating instead of random generation
  const rating = (product as any).rating || 4.2;
  const reviewCount = (product as any).reviewCount || 42;


  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[320px] cursor-pointer mx-auto"
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

        <img src={currentImage} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />

        <button 
          onClick={handleNextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow z-10 hover:bg-gray-100" 
        >
          <ChevronRight size={16} color="#364153" />
        </button>

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
              className="w-full rounded-xl py-3 text-sm font-semibold text-white flex items-center justify-center gap-2 bg-[#064734] hover:bg-[#05412E]"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
