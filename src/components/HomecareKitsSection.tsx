import { useState } from "react";
import { ShoppingCart, Check, ChevronRight, Sparkles, TrendingDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";
import cloverLime from "@/assets/clover-lime.png";
import cloverDark from "@/assets/clover-green-dark.png";
import ascFront from "@/assets/ASC_Front.png";
import dlFront from "@/assets/DL_Front.png";
import kdFront from "@/assets/KD_Front.png";
import ascFront2 from "@/assets/ASC_Front-2.png";
import bottleSurface from "@/assets/bottle-surface-cleaner.png";
import bottleDegreaser from "@/assets/bottle-kitchen-degreaser.png";
import bottleDishwash from "@/assets/bottle-dishwash.png";
import bottleToilet from "@/assets/bottle-toilet-cleaner.png";

const BUNDLES = [
  {
    id: 2001,
    name: "Kitchen Essential Bundle",
    productCount: 3,
    rating: 4.0,
    reviewCount: 128,
    price: 799,
    originalPrice: 1047,
    discount: 20,
    bottles: [bottleDegreaser, bottleDishwash, bottleSurface],
  },
  {
    id: 2002,
    name: "Kitchen Essential Bundle",
    productCount: 3,
    rating: 4.0,
    reviewCount: 128,
    price: 799,
    originalPrice: 1047,
    discount: 20,
    bottles: [bottleSurface, bottleToilet, bottleDegreaser],
  },
  {
    id: 2003,
    name: "Kitchen Essential Bundle",
    productCount: 3,
    rating: 4.0,
    reviewCount: 128,
    price: 799,
    originalPrice: 1047,
    discount: 20,
    bottles: [bottleDishwash, bottleSurface, bottleToilet],
  },
];

const SINGLE_PRODUCTS = [
  {
    id: 3001,
    name: "All Surface Cleaner",
    price: 299,
    originalPrice: 399,
    discount: 20,
    image: bottleSurface,
  },
  {
    id: 3002,
    name: "Kitchen Degreaser",
    price: 299,
    originalPrice: 399,
    discount: 20,
    image: bottleDegreaser,
  },
  {
    id: 3003,
    name: "Dishwash Liquid",
    price: 299,
    originalPrice: 399,
    discount: 20,
    image: bottleDishwash,
  },
];

const KITS = [
  {
    id: 1001,
    name: "Home Essential Kit",
    items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"],
    price: 799,
    originalPrice: 1047,
    bottles: [bottleSurface, bottleDishwash, bottleDegreaser],
  },
  {
    id: 1002,
    name: "Home Essential Kit",
    items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"],
    price: 799,
    originalPrice: 1047,
    bottles: [bottleDegreaser, bottleSurface, bottleToilet],
  },
  {
    id: 1003,
    name: "Home Essential Kit",
    items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"],
    price: 799,
    originalPrice: 1047,
    bottles: [bottleDishwash, bottleToilet, bottleSurface],
  },
  {
    id: 1004,
    name: "Home Essential Kit",
    items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"],
    price: 799,
    originalPrice: 1047,
    bottles: [bottleToilet, bottleDegreaser, bottleDishwash],
  },
];

const MINI_KIT_BOTTLES = {
  left: kdFront,
  center: dlFront,
  right: ascFront,
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-4 h-4 ${star <= rating ? "text-yellow-500" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const HomecareKitsSection = () => {
  const [activeTab, setActiveTab] = useState<"bundles" | "single">("bundles");
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const handleAddBundle = (bundle: typeof BUNDLES[0]) => {
    addToCart({
      productId: bundle.id,
      name: bundle.name,
      price: bundle.price,
      originalPrice: bundle.originalPrice,
      image: "/placeholder.svg",
    });
  };

  const handleAddKit = (kit: typeof KITS[0]) => {
    addToCart({
      productId: kit.id,
      name: kit.name,
      price: kit.price,
      originalPrice: kit.originalPrice,
      image: "/placeholder.svg",
    });
  };

  return (
    <div id="homecare-kits-section">
      {/* ===== SECTION 1: Smart Bundles / Single Products ===== */}
      <section className="relative bg-accent/30 py-16 px-4 md:px-6 overflow-hidden">
        {/* Clover decorations - behind content */}
        <img src={cloverLime} alt="" className="absolute top-[-30px] left-[-40px] w-[180px] opacity-15 pointer-events-none z-0" />
        <img src={cloverLime} alt="" className="absolute bottom-[-40px] right-[-40px] w-[180px] opacity-15 pointer-events-none z-0" />
        <img src={cloverLime} alt="" className="absolute top-[50%] right-[-30px] w-[140px] opacity-10 pointer-events-none z-0" />
        <img src={cloverLime} alt="" className="absolute bottom-[10%] left-[5%] w-[120px] opacity-8 pointer-events-none z-0" />
        <img src={cloverLime} alt="" className="absolute top-[20%] left-[40%] w-[100px] opacity-6 pointer-events-none z-0" />
        <img src={cloverLime} alt="" className="absolute top-[-20px] right-[30%] w-[130px] opacity-10 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-[1]">
          {/* Tab Switcher - separate buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab("bundles")}
              className={`px-10 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "bundles"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-primary border-2 border-primary hover:bg-primary/5"
              }`}
            >
              Smart Bundles
            </button>
            <button
              onClick={() => setActiveTab("single")}
              className={`px-10 py-3.5 text-sm font-bold rounded-xl transition-all ${
                activeTab === "single"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-primary border-2 border-primary hover:bg-primary/5"
              }`}
            >
              Single Products
            </button>
          </div>

          {/* Bundle Cards */}
          {activeTab === "bundles" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BUNDLES.map((bundle) => {
                const cartItem = items.find((i) => i.productId === bundle.id);
                const cartQty = cartItem?.quantity ?? 0;
                return (
                  <div key={bundle.id} className="bg-accent/40 rounded-2xl p-5 relative overflow-hidden">
                    {/* Discount badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-primary bg-background/80 px-3 py-1 rounded-full">
                        {bundle.discount}% Off
                      </span>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                        </button>
                        <button className="w-8 h-8 rounded-full bg-background/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                      </div>
                    </div>

                    {/* Bottles image area */}
                    <div className="relative h-[240px] flex items-end justify-center mb-4">
                      <img src={bundle.bottles[0]} alt="" className="h-[170px] object-contain relative z-0 origin-bottom" style={{ transform: "rotate(-10deg)", marginRight: "-18px" }} />
                      <img src={bundle.bottles[1]} alt="" className="h-[200px] object-contain relative z-10" />
                      <img src={bundle.bottles[2]} alt="" className="h-[170px] object-contain relative z-0 origin-bottom" style={{ transform: "rotate(10deg)", marginLeft: "-18px" }} />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center">
                        <ChevronRight size={16} className="text-foreground" />
                      </button>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-1.5 mb-4">
                      <span className="w-6 h-1.5 rounded-full bg-primary" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                    </div>

                    {/* Info */}
                    <h3 className="text-lg font-bold text-foreground">{bundle.name}</h3>
                    <p className="text-sm text-primary mb-2">({bundle.productCount} Products)</p>
                    <div className="flex items-center gap-2 mb-2">
                      <StarRating rating={bundle.rating} />
                      <span className="text-sm text-muted-foreground">{bundle.rating} ({bundle.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">₹{bundle.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{bundle.originalPrice}</span>
                    </div>

                    {cartQty > 0 ? (
                      <QuantityCapsule
                        quantity={cartQty}
                        onIncrement={(e) => { e.stopPropagation(); updateQuantity(bundle.id, cartQty + 1); }}
                        onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(bundle.id) : updateQuantity(bundle.id, cartQty - 1); }}
                        size="sm"
                        fullWidth
                      />
                    ) : (
                      <button
                        onClick={() => handleAddBundle(bundle)}
                        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Single Products */}
          {activeTab === "single" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SINGLE_PRODUCTS.map((product) => {
                const cartItem = items.find((i) => i.productId === product.id);
                const cartQty = cartItem?.quantity ?? 0;
                return (
                  <div key={product.id} className="bg-accent/40 rounded-2xl p-5 relative overflow-hidden">
                    <span className="text-xs font-bold text-primary bg-background/80 px-3 py-1 rounded-full">
                      {product.discount}% Off
                    </span>
                    <div className="h-[240px] flex items-center justify-center my-4">
                      <img src={product.image} alt={product.name} className="h-[200px] object-contain" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">₹{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                    </div>
                    {cartQty > 0 ? (
                      <QuantityCapsule
                        quantity={cartQty}
                        onIncrement={(e) => { e.stopPropagation(); updateQuantity(product.id, cartQty + 1); }}
                        onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(product.id) : updateQuantity(product.id, cartQty - 1); }}
                        size="sm"
                        fullWidth
                      />
                    ) : (
                      <button
                        onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: "/placeholder.svg" })}
                        className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== SECTION 2: Smart Savings - Stop Buying One ===== */}
      <section className="relative py-20 px-4 md:px-6 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(160 84% 15%) 0%, hsl(160 50% 35%) 50%, hsl(158 60% 55%) 100%)" }}>
        {/* Clover decorations - behind all content */}
        <img src={cloverDark} alt="" className="absolute top-[-30px] left-[-40px] w-[180px] opacity-15 pointer-events-none z-0" />
        <img src={cloverDark} alt="" className="absolute bottom-[-40px] right-[-30px] w-[190px] opacity-15 pointer-events-none z-0" />
        <img src={cloverDark} alt="" className="absolute top-[40%] right-[5%] w-[150px] opacity-10 pointer-events-none z-0" />
        <img src={cloverDark} alt="" className="absolute bottom-[15%] left-[8%] w-[130px] opacity-8 pointer-events-none z-0" />
        <img src={cloverDark} alt="" className="absolute top-[-20px] right-[35%] w-[140px] opacity-10 pointer-events-none z-0" />
        <img src={cloverDark} alt="" className="absolute bottom-[-30px] left-[40%] w-[160px] opacity-10 pointer-events-none z-0" />
        <img src={cloverDark} alt="" className="absolute top-[60%] left-[30%] w-[120px] opacity-6 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-[1]">
          {/* Left text */}
          <div className="flex-1 text-primary-foreground">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm font-semibold text-primary-foreground">Smart Savings</span>
            </div>
            <h2 className="text-3xl md:text-[42px] font-bold leading-tight mb-4">
              Stop Buying One.<br />Start Saving More.
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-6">Lower cost per use. Smarter cleaning.</p>
            <div className="space-y-3 mb-8">
              {["Premium formula", "Eco-friendly packaging", "Free shipping"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={18} className="text-accent flex-shrink-0" />
                  <span className="text-primary-foreground/90">{item}</span>
                </div>
              ))}
            </div>
            <button className="bg-primary-foreground text-primary font-bold px-8 py-3 rounded-full hover:opacity-90 transition-all text-sm">
              Shop Bundles
            </button>
          </div>

          {/* Right: Pricing cards - larger */}
          <div className="flex-1 grid grid-cols-3 gap-5">
            {[
              { qty: "1", price: 299, label: "Select 1 Bottle", save: null },
              { qty: "2", price: 274, label: "Select 2 Bottles", save: "Save 8%" },
              { qty: "3+", price: 249, label: "Select 3+ Bottles", save: "Save 17%" },
            ].map((tier) => (
              <div key={tier.qty} className="bg-background rounded-2xl p-6 md:p-8 text-center relative">
                {tier.save && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary-foreground border border-border text-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    <TrendingDown size={12} />
                    {tier.save}
                  </div>
                )}
                <div className={`w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center ${tier.qty === "3+" ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                  <span className="text-3xl font-bold">{tier.qty}</span>
                </div>
                <div className="mb-5">
                  <span className="text-xs text-muted-foreground align-top">₹</span>
                  <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">/bottle</span>
                </div>
                <button className="w-full bg-accent text-primary font-bold py-3 rounded-full text-sm hover:opacity-90 transition-all">
                  {tier.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Everything Your Home Needs In One Kit ===== */}
      <section className="relative bg-accent/20 py-16 px-4 md:px-6 overflow-hidden">
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute left-[-72px] top-[-54px] w-[240px] opacity-[0.18] pointer-events-none z-0" />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute right-[-72px] top-[-54px] w-[240px] opacity-[0.18] pointer-events-none z-0" />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute left-[-72px] bottom-[-72px] w-[240px] opacity-[0.18] pointer-events-none z-0" />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute right-[-72px] bottom-[-72px] w-[240px] opacity-[0.18] pointer-events-none z-0" />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute left-1/2 top-[6%] w-[190px] -translate-x-1/2 opacity-[0.14] pointer-events-none z-0" />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute left-[6%] top-[36%] w-[180px] opacity-[0.12] pointer-events-none z-0" />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute right-[6%] top-[22%] w-[180px] opacity-[0.12] pointer-events-none z-0" />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute left-1/2 bottom-[-24px] w-[180px] -translate-x-1/2 opacity-[0.12] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-[1]">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-2" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            Everything Your Home Needs. In One Kit.
          </h2>
          <p className="text-center text-muted-foreground text-lg mb-12">
            Curated Combinations for Effortless Cleaning
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {KITS.map((kit) => {
              const cartItem = items.find((i) => i.productId === kit.id);
              const cartQty = cartItem?.quantity ?? 0;
              return (
                <div key={kit.id} className="bg-primary rounded-[2rem] overflow-hidden shadow-[0_16px_36px_hsl(var(--primary)/0.16)]">
                  <div className="relative h-[214px] overflow-hidden bg-primary px-4 pt-6">
                    <div className="relative mx-auto h-[156px] w-[220px]">
                      <img
                        src={MINI_KIT_BOTTLES.left}
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-[10px] left-[30px] z-[2] h-[110px] max-w-none origin-bottom object-contain"
                        style={{ transform: "rotate(-18deg)" }}
                      />
                      <img
                        src={MINI_KIT_BOTTLES.center}
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-[18px] left-1/2 z-[4] h-[142px] max-w-none -translate-x-1/2 object-contain"
                      />
                      <img
                        src={MINI_KIT_BOTTLES.right}
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-[10px] right-[30px] z-[2] h-[110px] max-w-none origin-bottom object-contain"
                        style={{ transform: "rotate(18deg)" }}
                      />
                    </div>
                  </div>

                  <div className="bg-background p-5 rounded-t-[2rem] -mt-2 relative z-20">
                    <h3 className="text-lg font-bold text-foreground mb-3">{kit.name}</h3>
                    <div className="space-y-2 mb-4">
                      {kit.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <Check size={16} className="text-primary flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">₹{kit.price}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{kit.originalPrice}</span>
                    </div>
                    {cartQty > 0 ? (
                      <QuantityCapsule
                        quantity={cartQty}
                        onIncrement={(e) => { e.stopPropagation(); updateQuantity(kit.id, cartQty + 1); }}
                        onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(kit.id) : updateQuantity(kit.id, cartQty - 1); }}
                        size="sm"
                        fullWidth
                      />
                    ) : (
                      <button
                        onClick={() => handleAddKit(kit)}
                        className="w-full border-2 border-primary text-primary font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button className="bg-primary text-primary-foreground font-bold px-10 py-3.5 rounded-full hover:opacity-90 transition-all text-sm">
              Explore Kits
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomecareKitsSection;
