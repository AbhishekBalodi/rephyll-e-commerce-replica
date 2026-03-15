import { Star } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
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
  return (
    <div
      className="cursor-pointer group"
      onClick={() => onClick(product)}
    >
      {/* Rating row */}
      <div className="flex items-center gap-1 mb-2">
        {renderStars(product.rating)}
        <span className="text-sm text-muted-foreground ml-1">
          {product.reviews} reviews
        </span>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/4] overflow-hidden rounded-lg mb-3 product-card-shadow transition-all duration-300 group-hover:shadow-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm font-medium text-foreground leading-snug mb-2 line-clamp-2 min-h-[2.5rem]">
        {product.name.toLowerCase()}
      </h3>

      {/* Price row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-base font-bold text-foreground">₹ {product.price}</span>
        {product.discount > 0 && (
          <>
            <span className="text-sm text-muted-foreground line-through">
              ₹ {product.originalPrice}
            </span>
            <span className="text-sm font-semibold text-discount">
              ({product.discount}% Off)
            </span>
          </>
        )}
      </div>

      {/* Add to cart button */}
      <button className="w-full mt-3 btn-add-to-cart rounded-sm bg-primary text-primary-foreground">
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
