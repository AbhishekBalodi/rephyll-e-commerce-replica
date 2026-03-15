import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Minus, Plus, Leaf, ShieldCheck, Baby, Droplets } from "lucide-react";
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

const WHATS_IN_ICONS = [
  { label: "Plant-Based", icon: Leaf },
  { label: "Non-Toxic", icon: ShieldCheck },
  { label: "Child & Pet Safe", icon: Baby },
  { label: "Biodegradable", icon: Droplets },
];

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
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
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
          {/* Rating on top */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 bg-primary/10 text-primary text-sm font-bold px-3 py-1.5 rounded-full">
              {renderStars(product.rating, 14)}
              <span className="ml-1">{product.rating}/5</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.reviews} reviews
            </span>
          </div>

          {/* Bold product name */}
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            {product.name}
          </h1>

          {/* Overview / short description */}
          <p className="text-foreground/70 text-sm leading-relaxed mb-4">
            {product.description.length > 160
              ? product.description.substring(0, 160) + "..."
              : product.description}
            {product.description.length > 160 && (
              <button
                onClick={() => setActiveTab("description")}
                className="text-primary font-semibold ml-1 hover:underline"
              >
                Read More
              </button>
            )}
          </p>

          {/* What's In icons row */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {WHATS_IN_ICONS.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                  <Icon size={18} className="text-foreground" />
                </div>
                <span className="text-sm text-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Price - bold and big */}
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through ml-3">
                  ₹{product.originalPrice}
                </span>
                <span className="ml-2 text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-5">Inclusive of all taxes</p>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border-2 border-primary/30 rounded-full overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 hover:bg-muted transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-5 py-2.5 text-sm font-bold min-w-[48px] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2.5 hover:bg-muted transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <button className="flex-1 py-3 border-2 border-foreground rounded-full text-foreground font-bold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors">
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
            <div>
              {/* Icons grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {WHATS_IN_ICONS.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/50">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center">
                      <Icon size={22} className="text-foreground" />
                    </div>
                    <span className="text-xs text-foreground font-medium text-center">{label}</span>
                  </div>
                ))}
              </div>
              {/* Ingredient list */}
              <ul className="space-y-2">
                {product.whatsIn.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-foreground/80">
                    <span className="text-primary mt-1">•</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "details" && (
            <p className="text-foreground/80 leading-relaxed">{product.moreDetails}</p>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8 border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Customer Reviews</h2>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
          <span className="text-sm text-muted-foreground">
            {product.rating} out of 5 — Based on {product.reviews} reviews
          </span>
        </div>

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
