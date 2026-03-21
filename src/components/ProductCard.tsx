import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ApiProduct } from "@/types/api";
import { getProductImage, getSellingPrice, getMrp, getDiscount } from "@/lib/productHelpers";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";

interface ProductCardProps {
  product: ApiProduct;
  onClick?: (product: ApiProduct) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const image = getProductImage(product);
  const price = getSellingPrice(product);
  const mrp = getMrp(product);
  const discount = getDiscount(product);

  const cartItem = items.find((i) => i.productId === product.id);
  const cartQty = cartItem?.quantity ?? 0;

  // Mock rating/review data
  const rating = product.featured ? 5 : 4.5 + Math.random() * 0.4;
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
      className="cursor-pointer group rounded-xl border border-border bg-card p-3 flex flex-col"
      onClick={() => { onClick?.(product); navigate(`/product/${product.slug || product.id}`); }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-muted">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
        />
        {discount > 0 && (
          <span className="absolute top-2 right-2 text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 text-xs font-bold bg-accent text-accent-foreground px-2 py-1 rounded-full">
            Bestseller
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-1">
        <Star size={14} className="text-primary fill-primary" />
        <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-foreground leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">
        {product.name}
      </h3>

      {/* Price row */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="text-lg font-bold text-foreground">₹{price.toFixed(0)}</span>
        {discount > 0 && (
          <span className="text-sm text-muted-foreground line-through">
            ₹{mrp.toFixed(0)}
          </span>
        )}
      </div>

      {/* Add to cart / Quantity capsule */}
      <div className="mt-auto">
        {cartQty > 0 ? (
          <QuantityCapsule
            quantity={cartQty}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            size="sm"
            fullWidth
          />
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-colors"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
