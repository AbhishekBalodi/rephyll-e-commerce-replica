import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Minus, Plus, Leaf, ShieldCheck, Baby, Droplets } from "lucide-react";
import type { ApiProduct, ApiVariant } from "@/types/api";
import { getProductImages, getSellingPrice, getMrp, getDiscount, parseVariantAttributes, isInStock } from "@/lib/productHelpers";
import { useCart } from "@/contexts/CartContext";

interface ProductDetailProps {
  product: ApiProduct;
  onBack: () => void;
}

const renderStars = (rating: number, size = 16) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star key={i} size={size} className={i <= Math.floor(rating) ? "text-primary fill-primary" : "text-muted-foreground"} />
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
  const [selectedVariant, setSelectedVariant] = useState<ApiVariant | undefined>(
    product.variants.length > 0 ? product.variants[0] : undefined
  );
  const { addToCart } = useCart();

  const images = getProductImages(product);
  const price = getSellingPrice(product, selectedVariant);
  const mrp = getMrp(product, selectedVariant);
  const discount = getDiscount(product, selectedVariant);
  const inStock = isInStock(product, selectedVariant);

  const description = product.ingredients || product.metaDescription || product.productDetails || "No description available.";

  const tabs = [
    { id: "description", label: "Description" },
    ...(product.variants.length > 0 ? [{ id: "variants", label: "Variants" }] : []),
    { id: "details", label: "Details" },
    { id: "whatsIn", label: "What's in?" },
  ];

  const prevImg = () => setActiveImg((p) => (p > 0 ? p - 1 : images.length - 1));
  const nextImg = () => setActiveImg((p) => (p < images.length - 1 ? p + 1 : 0));

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: selectedVariant ? `${product.name} - ${selectedVariant.variantName}` : product.name,
      price,
      originalPrice: mrp,
      image: images[0],
    }, qty);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">
        ← Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image gallery */}
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <img
              src={images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
            />
            {images.length > 1 && (
              <>
                <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-background transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-background transition-colors">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${activeImg === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div>
          {/* Brand & Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">{product.brandName}</span>
            <span className="text-xs text-muted-foreground">{product.categoryName}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">{product.name}</h1>

          <p className="text-foreground/70 text-sm leading-relaxed mb-4">
            {description.length > 160 ? description.substring(0, 160) + "..." : description}
          </p>

          {/* What's In icons */}
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

          {/* Variant selector */}
          {product.variants.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Select Variant</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const attrs = parseVariantAttributes(v.variantAttributes);
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                        selectedVariant?.id === v.id
                          ? "border-primary bg-primary/10 text-foreground font-semibold"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {v.variantName}
                      {Object.keys(attrs).length > 0 && (
                        <span className="block text-[10px] text-muted-foreground">
                          {Object.values(attrs).join(" / ")}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mb-1">
            <span className="text-3xl font-bold text-foreground">₹{price.toFixed(0)}</span>
            {discount > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through ml-3">₹{mrp.toFixed(0)}</span>
                <span className="ml-2 text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">Save {discount}%</span>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mb-1">
            {product.productWeight && `Weight: ${product.productWeight}`}
            {product.productWeight && " · "}
            Inclusive of all taxes
          </p>
          {!inStock && <p className="text-sm font-semibold text-destructive mb-2">Out of Stock</p>}

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mt-4 mb-8">
            <div className="flex items-center border-2 border-primary/30 rounded-full overflow-hidden">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 hover:bg-muted transition-colors">
                <Minus size={16} />
              </button>
              <span className="px-5 py-2.5 text-sm font-bold min-w-[48px] text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 hover:bg-muted transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="flex-1 py-3 border-2 border-foreground rounded-full text-foreground font-bold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {inStock ? "ADD TO CART" : "OUT OF STOCK"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-t border-border pt-8">
        <div className="flex gap-0 border-b border-border overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl">
          {activeTab === "description" && (
            <p className="text-foreground/80 leading-relaxed">{description}</p>
          )}
          {activeTab === "variants" && product.variants.length > 0 && (
            <div className="space-y-4">
              {product.variants.map((v) => {
                const attrs = parseVariantAttributes(v.variantAttributes);
                return (
                  <div key={v.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                    {v.imageUrl && (
                      <img src={v.imageUrl} alt={v.variantName} className="w-16 h-16 rounded-md object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{v.variantName}</p>
                      {Object.entries(attrs).map(([k, val]) => (
                        <span key={k} className="text-xs text-muted-foreground mr-3">{k}: {val}</span>
                      ))}
                      <p className="text-xs text-muted-foreground mt-1">
                        SKU: {v.sku} · {v.stock.available ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">₹{v.sellingPrice.toFixed(0)}</p>
                      {v.mrp > v.sellingPrice && (
                        <p className="text-sm text-muted-foreground line-through">₹{v.mrp.toFixed(0)}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {activeTab === "details" && (
            <div className="space-y-3 text-foreground/80">
              {product.productDetails && <p>{product.productDetails}</p>}
              {product.productWeight && <p><strong>Weight:</strong> {product.productWeight}</p>}
              {product.dimensionWidth && (
                <p><strong>Dimensions:</strong> {product.dimensionWidth} × {product.dimensionDepth} × {product.dimensionHeight} cm</p>
              )}
              {product.nutritionAnalysis && <p><strong>Nutrition:</strong> {product.nutritionAnalysis}</p>}
              {product.code && <p><strong>Product Code:</strong> {product.code}</p>}
              {!product.productDetails && !product.productWeight && (
                <p className="text-muted-foreground">No additional details available.</p>
              )}
            </div>
          )}
          {activeTab === "whatsIn" && (
            <div>
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
              {product.ingredients && (
                <p className="text-foreground/80 leading-relaxed">{product.ingredients}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
