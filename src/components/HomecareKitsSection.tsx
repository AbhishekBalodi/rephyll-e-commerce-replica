import { useState } from "react";

import { ShoppingCart, Heart, Share2, Check, ChevronRight, Sparkles, TrendingDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";
import cloverLime from "@/assets/clover-lime.png";
import cloverDark from "@/assets/clover-green-dark.png";
import cloverDarkGreen from "@/assets/clover-dark-green.png";
import ascFront2 from "@/assets/ASC_Front-2.png";
import bottleSurface from "@/assets/bottle-surface-cleaner.png";
import bottleDegreaser from "@/assets/bottle-kitchen-degreaser.png";
import bottleDishwash from "@/assets/bottle-dishwash.png";
import bottleToilet from "@/assets/bottle-toilet-cleaner.png";
import kitBottles from "@/assets/kit-bottles.png";
import kitCardBg from "@/assets/kit-card-bg.png";

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
        {/* 9 large clovers across the section */}
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "320px", left: "-90px", top: "-70px", opacity: 0.2 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "300px", right: "-70px", top: "-50px", opacity: 0.2 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "280px", left: "-80px", bottom: "-80px", opacity: 0.18 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "300px", right: "-60px", bottom: "-70px", opacity: 0.18 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "260px", left: "50%", top: "-60px", transform: "translateX(-50%)", opacity: 0.12 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "240px", left: "25%", bottom: "40px", opacity: 0.12 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "250px", right: "20%", top: "30%", opacity: 0.1 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "220px", left: "15%", top: "40%", opacity: 0.1 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "260px", left: "50%", bottom: "-50px", opacity: 0.14 }} />

        <div className="relative z-[1] mx-auto max-w-[1440px] px-4 md:px-6">
          {/* Tab Buttons */}
          <div className="mb-10 flex justify-center">
            <div className="flex items-center gap-6" style={{ width: "612px" }}>
              <button
                onClick={() => setActiveTab("bundles")}
                className="flex-1 flex items-center justify-center transition-all"
                style={{
                  width: "294px", height: "48px", borderRadius: "12px",
                  background: activeTab === "bundles" ? "#064734" : "#FFFFFF",
                  boxShadow: "0px 13px 25px rgba(0, 0, 0, 0.15)",
                  fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: "24px",
                  color: activeTab === "bundles" ? "#FFFFFF" : "#064734",
                }}
              >
                Smart Bundles
              </button>
              <button
                onClick={() => setActiveTab("single")}
                className="flex-1 flex items-center justify-center transition-all"
                style={{
                  width: "294px", height: "48px", borderRadius: "12px",
                  background: activeTab === "single" ? "#064734" : "#FFFFFF",
                  boxShadow: "0px 13px 25px rgba(0, 0, 0, 0.15)",
                  fontFamily: "'Poppins', sans-serif", fontSize: "16px", fontWeight: 400, lineHeight: "24px",
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
                  <div key={bundle.id} className="flex flex-col overflow-hidden" style={{ width: "428px", height: "468px", background: "#FFFFFF", boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)", borderRadius: "24px" }}>
                    <div className="relative flex-shrink-0" style={{ width: "428px", height: "409px", background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)", borderRadius: "24px 24px 0 0" }}>
                      <div className="absolute flex items-center justify-center" style={{ width: "89px", height: "32px", left: "31px", top: "16px", background: "#E2FF9C", borderRadius: "9999px" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>{bundle.discount}% Off</span>
                      </div>
                      <button className="absolute flex items-center justify-center" style={{ width: "40px", height: "40px", left: "324px", top: "16px", background: "#FFFFFF", boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)", borderRadius: "9999px" }}>
                        <svg className="w-4 h-4" fill="none" stroke="#364153" strokeWidth={1.33} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      </button>
                      <button className="absolute flex items-center justify-center" style={{ width: "40px", height: "40px", left: "372px", top: "16px", background: "#FFFFFF", boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)", borderRadius: "9999px" }}>
                        <svg className="w-5 h-5" fill="none" stroke="#364153" strokeWidth={1.67} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      </button>
                      <img src={ascFront2} alt={bundle.name} className="absolute object-contain" style={{ width: "228px", height: "343px", left: "calc(50% - 114px)", top: "45px" }} />
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
                    <div className="flex-1 flex flex-col" style={{ padding: "20px" }}>
                      <div className="flex flex-col gap-[8px] mb-[20px]">
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{bundle.name}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>({bundle.productCount} Products)</p>
                        <div className="flex items-center gap-[8px]">
                          <div className="flex items-center gap-[4px]">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="w-4 h-4" fill={star <= bundle.rating ? "#FDC700" : "none"} stroke={star <= bundle.rating ? "#FDC700" : "#8E939C"} strokeWidth={1.33} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{bundle.rating.toFixed(1)}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#8E939C" }}>({bundle.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-[12px]">
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{bundle.price}</span>
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#8E939C", textDecoration: "line-through" }}>₹{bundle.originalPrice}</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        {cartQty > 0 ? (
                          <QuantityCapsule quantity={cartQty} onIncrement={(e) => { e.stopPropagation(); updateQuantity(bundle.id, cartQty + 1); }} onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(bundle.id) : updateQuantity(bundle.id, cartQty - 1); }} size="sm" fullWidth />
                        ) : (
                          <button onClick={() => handleAddBundle(bundle)} className="flex w-full items-center justify-center gap-2" style={{ height: "56px", background: "#064734", borderRadius: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#FFFFFF" }}>
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
                  <div key={product.id} className="flex flex-col overflow-hidden" style={{ width: "428px", height: "468px", background: "#FFFFFF", boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)", borderRadius: "24px" }}>
                    <div className="relative flex-shrink-0" style={{ width: "428px", height: "409px", background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)", borderRadius: "24px 24px 0 0" }}>
                      <div className="absolute flex items-center justify-center" style={{ width: "89px", height: "32px", left: "31px", top: "16px", background: "#E2FF9C", borderRadius: "9999px" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>{product.discount}% Off</span>
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
                    <div className="flex-1 flex flex-col" style={{ padding: "20px" }}>
                      <div className="flex flex-col gap-[8px] mb-[20px]">
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{product.name}</p>
                        <div className="flex items-center gap-[12px]">
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{product.price}</span>
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#8E939C", textDecoration: "line-through" }}>₹{product.originalPrice}</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        {cartQty > 0 ? (
                          <QuantityCapsule quantity={cartQty} onIncrement={(e) => { e.stopPropagation(); updateQuantity(product.id, cartQty + 1); }} onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(product.id) : updateQuantity(product.id, cartQty - 1); }} size="sm" fullWidth />
                        ) : (
                          <button onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: "/placeholder.svg" })} className="flex w-full items-center justify-center gap-2" style={{ height: "56px", background: "#064734", borderRadius: "14px", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#FFFFFF" }}>
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

      {/* ===== SECTION 2: Smart Savings + Mega Saver Pack (ONE continuous section) ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          width: "100%",
          background: "linear-gradient(96.54deg, #064734 22.56%, #FFFFFF 129.53%)",
        }}
      >
        {/* 9+ large faded clovers across the entire merged section - visible on dark & light areas */}
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "320px", left: "-90px", top: "-60px", opacity: 0.18 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "300px", right: "-70px", top: "-50px", opacity: 0.18 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "280px", left: "-80px", bottom: "-80px", opacity: 0.15 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "310px", right: "-60px", bottom: "-70px", opacity: 0.18 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "260px", left: "50%", top: "-50px", transform: "translateX(-50%)", opacity: 0.12 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "250px", left: "20%", top: "35%", opacity: 0.12 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "270px", right: "15%", top: "25%", opacity: 0.1 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "240px", left: "10%", bottom: "15%", opacity: 0.12 }} />
        <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "260px", left: "50%", bottom: "-40px", opacity: 0.1 }} />

        {/* --- Part A: Stop Buying One --- */}
        <div className="relative z-[1] mx-auto flex items-center" style={{ maxWidth: "1313px", padding: "80px 20px", gap: "74px" }}>
          <div className="flex flex-col items-start" style={{ width: "372px", gap: "24px" }}>
            <div className="flex items-center gap-2" style={{ height: "36px", padding: "0 16px", background: "#EDFFC3", borderRadius: "9999px" }}>
              <Sparkles size={16} color="#064734" />
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: "#064734" }}>Smart Savings</span>
            </div>
            <div className="flex flex-col" style={{ gap: "10px", width: "372px" }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", color: "#FFFFFF", margin: 0 }}>
                Stop Buying One.<br />Start Saving More.
              </h2>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", color: "#FFFFFF", margin: 0 }}>
                Lower cost per use. Smarter cleaning.
              </p>
              <div className="flex flex-col" style={{ gap: "12.6px" }}>
                {["Premium formula", "Eco-friendly packaging", "Free shipping"].map((item) => (
                  <div key={item} className="flex items-center" style={{ gap: "8.4px" }}>
                    <Check size={21} color="#FFFFFF" strokeWidth={1.75} />
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#FFFFFF" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <button style={{ width: "175.57px", height: "40px", background: "#FFFFFF", border: "1px solid #FFFFFF", borderRadius: "8px", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "18px", lineHeight: "28px", color: "#064734", cursor: "pointer" }}>
              Shop Bundles
            </button>
          </div>

          <div className="flex items-end" style={{ gap: "20px", width: "867px" }}>
            {[
              { qty: "1", price: 299, label: "Select 1 Bottle", save: null, id: 5001, dark: false },
              { qty: "2", price: 274, label: "Select 2 Bottles", save: "Save 8%", id: 5002, dark: false },
              { qty: "3+", price: 249, label: "Select 3+ Bottles", save: "Save17%", id: 5003, dark: true },
            ].map((tier) => {
              const cartItem = items.find((i) => i.productId === tier.id);
              const cartQty = cartItem?.quantity ?? 0;
              return (
                <div key={tier.qty} className="relative" style={{ width: "276px", height: "307px" }}>
                  {tier.save && (
                    <div className="absolute flex items-center justify-center gap-1" style={{ width: "101px", height: "25px", left: "calc(50% - 50px)", top: "0px", background: "#064734", border: "0.67px solid #064734", borderRadius: "8px", zIndex: 2 }}>
                      <TrendingDown size={16} color="#FFFFFF" strokeWidth={1.33} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: "#FFFFFF" }}>{tier.save}</span>
                    </div>
                  )}
                  <div className="absolute flex flex-col items-start" style={{ width: "275px", height: "294px", left: "0px", top: "13px", background: "#FFFFFF", boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)", borderRadius: "24px", padding: "32px 32px 0px", gap: "24px" }}>
                    <div className="flex justify-center" style={{ width: "100%" }}>
                      <div className="flex items-center justify-center" style={{ width: "96px", height: "96px", borderRadius: "9999px", background: tier.dark ? "#064734" : "#D0FAE5" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "36px", color: tier.dark ? "#FFFFFF" : "#064734" }}>{tier.qty}</span>
                      </div>
                    </div>
                    <div className="flex items-start justify-center" style={{ width: "100%", position: "relative", height: "50px" }}>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "24px", lineHeight: "32px", color: "#064734", marginTop: "16px" }}>₹</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "48px", lineHeight: "48px", color: "#064734" }}>{tier.price}</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", color: "#064734", marginTop: "20px" }}>/bottle</span>
                    </div>
                    {cartQty > 0 ? (
                      <div style={{ width: "100%" }}>
                        <QuantityCapsule quantity={cartQty} onIncrement={(e) => { e.stopPropagation(); updateQuantity(tier.id, cartQty + 1); }} onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(tier.id) : updateQuantity(tier.id, cartQty - 1); }} size="sm" fullWidth />
                      </div>
                    ) : (
                      <button onClick={() => addToCart({ productId: tier.id, name: `Pack of ${tier.qty}`, price: tier.price, originalPrice: 299, image: "/placeholder.svg" })} style={{ width: "100%", height: "36px", background: tier.dark ? "#064734" : "#CEF17B", borderRadius: "8px", border: "none", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: tier.dark ? "#FFFFFF" : "#064734", cursor: "pointer" }}>
                        {tier.label}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Part B: Mega Saver Pack (continuous, no dividing line) --- */}
        <div className="relative z-[1] mx-auto flex flex-col items-center gap-10" style={{ maxWidth: "1435px", paddingBottom: "80px" }}>
          <div className="rounded-full text-sm font-medium" style={{ background: "#EDFFC3", color: "#064734", padding: "8px 20px" }}>
            ✨ 5L Save More
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", color: "#FFFFFF", textAlign: "center", margin: 0 }}>
            Mega Saver Pack
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", color: "#FFFFFF", margin: 0 }}>
            Curated Combinations for Effortless Cleaning
          </p>
          <div className="flex gap-[30px] mb-10">
            {BUNDLES.slice(0, 3).map((product, i) => (
              <div key={i} className="w-[375px] bg-white rounded-[24px] shadow-lg overflow-hidden flex flex-col">
                <div className="relative h-[246px]" style={{ background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)" }}>
                  <div className="absolute top-4 left-4 rounded-full text-sm" style={{ background: "#E2FF9C", color: "#064734", padding: "4px 12px" }}>{product.discount}% Off</div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"><Share2 size={16} /></button>
                    <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"><Heart size={16} /></button>
                  </div>
                  <img src={ascFront2} alt={product.name} className="absolute left-1/2 top-[60px] -translate-x-1/2 w-[140px]" />
                </div>
                <div className="p-4 flex flex-col gap-4 flex-grow">
                  <p className="font-semibold" style={{ color: "#464646" }}>{product.name}</p>
                  <p style={{ color: "#064734" }}>Pack Of {product.productCount}</p>
                  <div className="flex items-center gap-2 text-sm">
                    ⭐⭐⭐⭐☆ <span>{product.rating}</span> <span style={{ color: "#8E939C" }}>({product.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[28px] font-bold" style={{ color: "#064734" }}>₹{product.price}</span>
                    <span className="line-through" style={{ color: "#8E939C" }}>₹{product.originalPrice}</span>
                  </div>
                  <button className="mt-auto h-[56px] rounded-[14px] text-white" style={{ background: "#064734" }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: Everything Your Home Needs In One Kit ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          width: "100%",
          height: "806px",
          background: "linear-gradient(96.54deg, #CEF17B 22.56%, #FFFFFF 129.53%)",
        }}
      >
        {/* Clover decorations */}
        <img src={cloverDarkGreen} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "293px", height: "293px", left: "calc(50% - 720px + 319px)", top: "-84px", opacity: 0.08 }} />
        <img src={cloverDarkGreen} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "293px", height: "293px", left: "calc(50% - 720px + -61px)", top: "63px", opacity: 0.08 }} />
        <img src={cloverDarkGreen} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "227px", height: "227px", left: "calc(50% - 720px + 5px)", top: "576px", opacity: 0.08 }} />
        <img src={cloverDarkGreen} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "221px", height: "221px", left: "calc(50% - 720px + 720px)", top: "266px", opacity: 0.07 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "245px", height: "245px", left: "calc(50% - 720px + 1250px)", top: "50px", opacity: 0.2 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "267px", height: "267px", left: "calc(50% - 720px + 1215px)", top: "581px", opacity: 0.2 }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "180px", height: "180px", left: "calc(50% - 720px + 891px)", top: "600px", opacity: 0.18 }} />

        <div className="relative z-[1] mx-auto flex flex-col items-center" style={{ maxWidth: "1440px", paddingTop: "60px", gap: "40px" }}>
          <div className="flex flex-col items-center" style={{ gap: "10px" }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", textAlign: "center", color: "#064734", margin: 0 }}>
              Everything Your Home Needs. In One Kit.
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", textAlign: "center", color: "#064734", margin: 0 }}>
              Curated Combinations for Effortless Cleaning
            </p>
          </div>

          <div className="flex justify-center" style={{ gap: "24px", flexWrap: "wrap" }}>
            {KITS.map((kit) => {
              const cartItem = items.find((i) => i.productId === kit.id);
              const cartQty = cartItem?.quantity ?? 0;
              return (
                <div key={kit.id} className="flex flex-col items-center" style={{ width: "276px", height: "508px", background: "#FFFFFF", boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)", borderRadius: "24px", overflow: "hidden" }}>
                  <div className="relative flex-shrink-0" style={{ width: "276px", height: "162px", borderRadius: "24px 24px 0 0", overflow: "hidden" }}>
                    <img src={kitCardBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <img src={kitBottles} alt="Kit bottles" className="absolute object-contain" style={{ width: "178px", height: "141px", left: "49px", top: "11px" }} />
                  </div>
                  <div className="flex flex-col items-start" style={{ width: "238px", padding: "20px 0 0 0", gap: "24px", flex: 1 }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "24px", color: "#064734" }}>{kit.name}</span>
                    <div className="flex flex-col" style={{ gap: "12.6px", width: "238px" }}>
                      {kit.items.map((item, i) => (
                        <div key={i} className="flex items-center" style={{ gap: "8.4px" }}>
                          <Check size={21} color="#064734" strokeWidth={1.75} />
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#064734" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center" style={{ gap: "12px" }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{kit.price}</span>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#8E939C", textDecoration: "line-through" }}>₹{kit.originalPrice}</span>
                    </div>
                    {cartQty > 0 ? (
                      <QuantityCapsule quantity={cartQty} onIncrement={(e) => { e.stopPropagation(); updateQuantity(kit.id, cartQty + 1); }} onDecrement={(e) => { e.stopPropagation(); cartQty <= 1 ? removeFromCart(kit.id) : updateQuantity(kit.id, cartQty - 1); }} size="sm" fullWidth />
                    ) : (
                      <button onClick={() => handleAddKit(kit)} className="flex items-center justify-center gap-2" style={{ width: "238px", height: "36px", border: "1px solid #064734", borderRadius: "8px", background: "transparent", fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "24px", color: "#064734", cursor: "pointer" }}>
                        <ShoppingCart size={20} color="#064734" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button style={{ background: "#064734", color: "#FFFFFF", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", padding: "12px 32px", borderRadius: "9999px", border: "none", cursor: "pointer" }}>
            Explore Kits
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomecareKitsSection;
