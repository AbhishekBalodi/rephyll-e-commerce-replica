import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Minus, Plus } from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const renderStars = (rating: number, size = 16) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star
        key={i}
        size={size}
        className={
          i <= Math.floor(rating)
            ? "text-primary fill-primary"
            : "text-muted-foreground"
        }
      />
    );
  }
  return stars;
};

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [qty, setQty] = useState(1);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "features", label: "Key Features" },
    { id: "whatsIn", label: "What's in?" },
    { id: "details", label: "More Details" },
  ];

  const prevImg = () =>
    setActiveImg((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
  const nextImg = () =>
    setActiveImg((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
      >
        ← Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-background transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-background transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  activeImg === i
                    ? "border-primary"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {product.name}
          </h1>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.keyFeatures.slice(0, 3).map((f) => (
              <span
                key={f}
                className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-primary/20"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              {product.rating} <Star size={10} className="fill-current ml-0.5" />
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="mb-2">
            <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="text-lg text-muted-foreground line-through ml-3">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-6">Inclusive of all taxes</p>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-muted transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-[40px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 hover:bg-muted transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <button className="flex-1 btn-add-to-cart rounded-lg text-center">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="mt-12 border-t border-border pt-8">
        <div className="flex gap-0 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl">
          {activeTab === "description" && (
            <p className="text-foreground/80 leading-relaxed">{product.description}</p>
          )}
          {activeTab === "features" && (
            <ul className="space-y-2">
              {product.keyFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-foreground/80">
                  <span className="text-primary mt-1">•</span> {f}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "whatsIn" && (
            <ul className="space-y-2">
              {product.whatsIn.map((w) => (
                <li key={w} className="flex items-start gap-2 text-foreground/80">
                  <span className="text-primary mt-1">•</span> {w}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "details" && (
            <p className="text-foreground/80 leading-relaxed">{product.moreDetails}</p>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8 border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>

        {/* Summary */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
          <span className="text-sm text-muted-foreground">
            {product.rating} out of 5 — Based on {product.reviews} reviews
          </span>
        </div>

        {/* Individual reviews */}
        <div className="space-y-6">
          {product.customerReviews.map((review, i) => (
            <div key={i} className="border-b border-border pb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-primary">
                  {review.name}
                </span>
                <span className="text-xs text-muted-foreground">{review.date}</span>
                {review.verified && (
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {renderStars(review.rating, 14)}
              </div>
              <p className="text-sm text-foreground/80">{review.comment}</p>
            </div>
          ))}
        </div>

        <button className="mt-6 text-sm font-semibold text-primary hover:underline">
          Show More
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
