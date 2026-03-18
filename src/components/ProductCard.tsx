import { Star } from "lucide-react";
import type { ApiProduct } from "@/types/api";
import { getProductImage, getSellingPrice, getMrp, getDiscount } from "@/lib/productHelpers";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";

interface ProductCardProps {
  product: ApiProduct;
  onClick: (product: ApiProduct) => void;
}

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={14}
        className={
          i <= Math.floor(rating)
            ? "text-primary fill-primary"
            : i - 0.5 <= rating
            ? "text-primary fill-primary/50"
            : "text-muted-foreground"
        }
      />
    );
  }
  return stars;
};

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const image = getProductImage(product);
  const price = getSellingPrice(product);
  const mrp = getMrp(product);
  const discount = getDiscount(product);

  const cartItem = items.find((i) => i.productId === product.id);
  const cartQty = cartItem?.quantity ?? 0;

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
      className="cursor-pointer group"
      onClick={() => onClick(product)}
    >
      {/* Rating row */}
      <div className="flex items-center gap-1 mb-2">
        {renderStars(product.featured ? 5 : 4)}
        <span className="text-sm text-muted-foreground ml-1">
          {product.variantCount > 0 ? `${product.variantCount} variants` : ""}
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/4] overflow-hidden rounded-lg mb-3 product-card-shadow transition-all duration-300 group-hover:shadow-lg bg-muted">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
        />
        {product.featured && (
          <span className="absolute top-2 left-2 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-sm uppercase">
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-foreground leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">
        {product.name.toLowerCase()}
      </h3>

      {/* Brand & Category */}
      <p className="text-xs text-muted-foreground mb-2">
        {product.brandName} · {product.categoryName}
      </p>

      {/* Price row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-base font-bold text-foreground">₹{price.toFixed(0)}</span>
        {discount > 0 && (
          <>
            <span className="text-sm text-muted-foreground line-through">
              ₹{mrp.toFixed(0)}
            </span>
            <span className="text-sm font-semibold text-discount">
              ({discount}% Off)
            </span>
          </>
        )}
      </div>

      {/* Add to cart / Quantity capsule */}
      {cartQty > 0 ? (
        <div className="mt-3 w-full">
          <QuantityCapsule
            quantity={cartQty}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            size="sm"
            fullWidth
          />
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 btn-add-to-cart rounded-sm bg-primary text-primary-foreground"
        >
          ADD TO CART
        </button>
      )}
    </div>
  );
};

export default ProductCard;
