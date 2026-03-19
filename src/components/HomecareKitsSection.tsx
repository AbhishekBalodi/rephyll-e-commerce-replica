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
      <section className="relative overflow-hidden py-10" style={{ minHeight: "897px", background: "rgba(206, 241, 123, 0.3)" }}>
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute left-[-72px] top-[-54px] z-0 w-[240px] opacity-[0.18]" />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute right-[-52px] top-[18px] z-0 w-[220px] opacity-[0.18]" />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-58px] left-[-54px] z-0 w-[220px] opacity-[0.14]" />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[-62px] right-[-44px] z-0 w-[228px] opacity-[0.14]" />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-[126px] left-1/2 z-0 w-[180px] -translate-x-1/2 opacity-[0.1]" />

        <div className="relative z-[1] mx-auto max-w-[1440px] px-4 md:px-6">
          {/* Tab Buttons - 612px wide, centered */}
          <div className="mb-10 flex justify-center">
            <div className="flex items-center gap-6" style={{ width: "612px" }}>
              <button
                onClick={() => setActiveTab("bundles")}
                className="flex-1 flex items-center justify-center transition-all"
                style={{
                  width: "294px",
                  height: "48px",
                  borderRadius: "12px",
                  background: activeTab === "bundles" ? "#064734" : "#FFFFFF",
                  boxShadow: "0px 13px 25px rgba(0, 0, 0, 0.15)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: activeTab === "bundles" ? "#FFFFFF" : "#064734",
                }}
              >
                Smart Bundles
              </button>
              <button
                onClick={() => setActiveTab("single")}
                className="flex-1 flex items-center justify-center transition-all"
                style={{
                  width: "294px",
                  height: "48px",
                  borderRadius: "12px",
                  background: activeTab === "single" ? "#064734" : "#FFFFFF",
                  boxShadow: "0px 13px 25px rgba(0, 0, 0, 0.15)",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "24px",
                  color: activeTab === "single" ? "#FFFFFF" : "#064734",
                }}
              >
                Single Products
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          {activeTab === "bundles" && (
            <div className="flex justify-center gap-6 flex-wrap">
              {BUNDLES.map((bundle) => {
                const cartItem = items.find((i) => i.productId === bundle.id);
                const cartQty = cartItem?.quantity ?? 0;

                return (
                  <div
                    key={bundle.id}
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: "428px",
                      height: "650px",
                      background: "#FFFFFF",
                      boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
                      borderRadius: "24px",
                    }}
                  >
                    {/* Image Area - 428x409 */}
                    <div
                      className="relative flex-shrink-0"
                      style={{
                        width: "428px",
                        height: "409px",
                        background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)",
                        borderRadius: "24px 24px 0 0",
                      }}
                    >
                      {/* Discount Badge */}
                      <div
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "89px",
                          height: "32px",
                          left: "31px",
                          top: "16px",
                          background: "#E2FF9C",
                          borderRadius: "9999px",
                        }}
                      >
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>
                          {bundle.discount}% Off
                        </span>
                      </div>

                      {/* Share button */}
                      <button
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          left: "324px",
                          top: "16px",
                          background: "#FFFFFF",
                          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="#364153" strokeWidth={1.33} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      </button>

                      {/* Heart button */}
                      <button
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          left: "372px",
                          top: "16px",
                          background: "#FFFFFF",
                          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="#364153" strokeWidth={1.67} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>

                      {/* Product Image - 228x343, centered */}
                      <img
                        src={ascFront2}
                        alt={bundle.name}
                        className="absolute object-contain"
                        style={{
                          width: "228px",
                          height: "343px",
                          left: "calc(50% - 114px)",
                          top: "45px",
                        }}
                      />

                      {/* Chevron button */}
                      <button
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "32px",
                          height: "32px",
                          left: "380px",
                          top: "208px",
                          background: "rgba(255, 255, 255, 0.9)",
                          boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
                          borderRadius: "9999px",
                        }}
                      >
                        <ChevronRight size={20} color="#364153" />
                      </button>

                      {/* Carousel Dots */}
                      <div
                        className="absolute flex items-start gap-[6px]"
                        style={{ width: "60px", height: "6px", left: "194px", top: "377px" }}
                      >
                        <span style={{ width: "24px", height: "6px", background: "#064734", borderRadius: "9999px", flex: "none" }} />
                        <span style={{ width: "6px", height: "6px", background: "rgba(6, 71, 52, 0.3)", borderRadius: "9999px", flex: "none" }} />
                        <span style={{ width: "6px", height: "6px", background: "rgba(6, 71, 52, 0.3)", borderRadius: "9999px", flex: "none" }} />
                        <span style={{ width: "6px", height: "6px", background: "rgba(6, 71, 52, 0.3)", borderRadius: "9999px", flex: "none" }} />
                      </div>
                    </div>

                    {/* Info Area - 428x240 */}
                    <div className="flex-1 flex flex-col" style={{ padding: "20px" }}>
                      <div className="flex flex-col gap-[8px] mb-[20px]">
                        {/* Title */}
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>
                          {bundle.name}
                        </p>
                        {/* Subtitle */}
                        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>
                          ({bundle.productCount} Products)
                        </p>
                        {/* Rating Row */}
                        <div className="flex items-center gap-[8px]">
                          <div className="flex items-center gap-[4px]">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-4 h-4" fill={star <= bundle.rating ? "#FDC700" : "none"} stroke={star <= bundle.rating ? "#FDC700" : "#8E939C"} strokeWidth={1.33} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>
                            {bundle.rating.toFixed(1)}
                          </span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#8E939C" }}>
                            ({bundle.reviewCount} reviews)
                          </span>
                        </div>
                        {/* Price Row */}
                        <div className="flex items-center gap-[12px]">
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>
                            ₹{bundle.price}
                          </span>
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#8E939C", textDecoration: "line-through" }}>
                            ₹{bundle.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Add to Cart Button - 388x56, 14px radius */}
                      <div className="mt-auto">
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
                            className="flex w-full items-center justify-center gap-2"
                            style={{
                              height: "56px",
                              background: "#064734",
                              borderRadius: "14px",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#FFFFFF",
                            }}
                          >
                            <ShoppingCart size={20} color="#FFFFFF" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "single" && (
            <div className="flex justify-center gap-6 flex-wrap">
              {SINGLE_PRODUCTS.map((product) => {
                const cartItem = items.find((i) => i.productId === product.id);
                const cartQty = cartItem?.quantity ?? 0;

                return (
                  <div
                    key={product.id}
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: "428px",
                      height: "650px",
                      background: "#FFFFFF",
                      boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
                      borderRadius: "24px",
                    }}
                  >
                    {/* Image Area */}
                    <div
                      className="relative flex-shrink-0"
                      style={{
                        width: "428px",
                        height: "409px",
                        background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)",
                        borderRadius: "24px 24px 0 0",
                      }}
                    >
                      <div
                        className="absolute flex items-center justify-center"
                        style={{ width: "89px", height: "32px", left: "31px", top: "16px", background: "#E2FF9C", borderRadius: "9999px" }}
                      >
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>
                          {product.discount}% Off
                        </span>
                      </div>

                      <button className="absolute flex items-center justify-center" style={{ width: "40px", height: "40px", left: "372px", top: "16px", background: "#FFFFFF", boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)", borderRadius: "9999px" }}>
                        <svg className="w-5 h-5" fill="none" stroke="#364153" strokeWidth={1.67} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>

                      <img src={ascFront2} alt={product.name} className="absolute object-contain" style={{ width: "228px", height: "343px", left: "calc(50% - 114px)", top: "45px" }} />

                      <button className="absolute flex items-center justify-center" style={{ width: "32px", height: "32px", left: "380px", top: "208px", background: "rgba(255, 255, 255, 0.9)", boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)", borderRadius: "9999px" }}>
                        <ChevronRight size={20} color="#364153" />
                      </button>

                      <div className="absolute flex items-start gap-[6px]" style={{ width: "60px", height: "6px", left: "194px", top: "377px" }}>
                        <span style={{ width: "24px", height: "6px", background: "#064734", borderRadius: "9999px", flex: "none" }} />
                        <span style={{ width: "6px", height: "6px", background: "rgba(6, 71, 52, 0.3)", borderRadius: "9999px", flex: "none" }} />
                        <span style={{ width: "6px", height: "6px", background: "rgba(6, 71, 52, 0.3)", borderRadius: "9999px", flex: "none" }} />
                        <span style={{ width: "6px", height: "6px", background: "rgba(6, 71, 52, 0.3)", borderRadius: "9999px", flex: "none" }} />
                      </div>
                    </div>

                    {/* Info Area */}
                    <div className="flex-1 flex flex-col" style={{ padding: "20px" }}>
                      <div className="flex flex-col gap-[8px] mb-[20px]">
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>
                          {product.name}
                        </p>
                        <div className="flex items-center gap-[12px]">
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>
                            ₹{product.price}
                          </span>
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#8E939C", textDecoration: "line-through" }}>
                            ₹{product.originalPrice}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto">
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
                            className="flex w-full items-center justify-center gap-2"
                            style={{
                              height: "56px",
                              background: "#064734",
                              borderRadius: "14px",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#FFFFFF",
                            }}
                          >
                            <ShoppingCart size={20} color="#FFFFFF" />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
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

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-[1]">
          {/* Left text */}
          <div className="md:w-[36%] text-primary-foreground">
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

          {/* Right: Pricing cards - wider, taller, closer to left */}
          <div className="md:w-[64%] grid grid-cols-3 gap-4">
            {[
              { qty: "1", price: 299, label: "Select 1 Bottle", save: null, id: 5001 },
              { qty: "2", price: 274, label: "Select 2 Bottles", save: "Save 8%", id: 5002 },
              { qty: "3+", price: 249, label: "Select 3+ Bottles", save: "Save 17%", id: 5003 },
            ].map((tier) => {
              const cartItem = items.find((i) => i.productId === tier.id);
              const cartQty = cartItem?.quantity ?? 0;
              return (
                <div key={tier.qty} className="bg-background rounded-2xl p-5 md:p-7 text-center relative min-h-[290px] flex flex-col justify-between">
                  {tier.save && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary-foreground border border-border text-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      <TrendingDown size={12} />
                      {tier.save}
                    </div>
                  )}
                  <div>
                    <div className={`w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center ${tier.qty === "3+" ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                      <span className="text-4xl font-bold">{tier.qty}</span>
                    </div>
                    <div className="mb-5">
                      <span className="text-xs text-muted-foreground align-top">₹</span>
                      <span className="text-5xl md:text-6xl font-bold text-foreground">{tier.price}</span>
                      <span className="text-sm text-muted-foreground">/bottle</span>
                    </div>
                  </div>
                  {cartQty > 0 ? (
                    <QuantityCapsule
                      quantity={cartQty}
                      onIncrement={(e) => { e.stopPropagation(); updateQuantity(tier.id, cartQty + 1); }}
                      onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(tier.id) : updateQuantity(tier.id, cartQty - 1); }}
                      size="sm"
                      fullWidth
                    />
                  ) : (
                    <button
                      onClick={() => addToCart({ productId: tier.id, name: `Pack of ${tier.qty}`, price: tier.price, originalPrice: 299, image: "/placeholder.svg" })}
                      className="w-full bg-accent text-primary font-bold py-3 rounded-full text-sm hover:opacity-90 transition-all"
                    >
                      {tier.label}
                    </button>
                  )}
                </div>
              );
            })}
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
