import { Heart, Share2, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProductList } from "@/hooks/useProducts";
import { getProductImage, getSellingPrice } from "@/lib/productHelpers";
import type { ApiProduct } from "@/types/api";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";

const ProductGridCard = ({ product }: { product: ApiProduct }) => {
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const image = getProductImage(product);
  const price = getSellingPrice(product);

  const cartItem = items.find((i) => i.productId === product.id);
  const cartQty = cartItem?.quantity ?? 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      price,
      originalPrice: price,
      image,
    });
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[270px] cursor-pointer"
      onClick={() => navigate(`/product/${product.slug || product.urlHandle || product.id}`)}
    >
      {/* IMAGE SECTION */}
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

      {/* CONTENT SECTION */}
      <div className="p-4">
        <h3 className="font-poppins font-semibold text-[16px] leading-[24px] text-[#464646] line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} size={14} fill={i < 4 ? "#FBC700" : "none"} stroke="#FBC700" />
            ))}
          </div>
          <span className="text-sm text-[#464646]">4.0</span>
          <span className="text-sm text-[#8E939C]">({product.variantCount} variants)</span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-poppins font-bold text-[30px] text-[#064734] leading-[24px]">
            ₹{price.toFixed(0)}
          </span>
        </div>

        <div className="mt-4">
          {cartQty > 0 ? (
            <QuantityCapsule
              quantity={cartQty}
              onIncrement={(e) => { e?.stopPropagation(); updateQuantity(product.id, cartQty + 1); }}
              onDecrement={(e) => { e?.stopPropagation(); if (cartQty <= 1) removeFromCart(product.id); else updateQuantity(product.id, cartQty - 1); }}
              size="sm"
              fullWidth
            />
          ) : (
            <button
              onClick={handleAddToCart}
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

const ProductGridSection = () => {
  const { data, isLoading } = useProductList({ page: 0, size: 20 });
  const products = data?.content ?? [];

  return (
    <section className="w-full flex justify-center py-16">
      <div className="max-w-[1194px] w-full px-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] justify-items-center">
            {products.map((product) => (
              <ProductGridCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <p>No products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGridSection;
