import { useState } from "react";

import { ShoppingCart, Heart, Share2, Check, ChevronRight, Sparkles, TrendingDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "./QuantityCapsule";
import bgSingleProducts from "@/assets/bg-home-kits.png";
import bgStopBuyingOne from "@/assets/bg-stop-buying-one.png";
import bgMegaSaver from "@/assets/bg-mega-saver.png";
import bgHomeKits from "@/assets/bg-home-kits.png";
import ascFront2 from "@/assets/ASC_Front-2.png";
import bottleSurface from "@/assets/bottle-surface-cleaner.png";
import bottleDegreaser from "@/assets/bottle-kitchen-degreaser.png";
import bottleDishwash from "@/assets/bottle-dishwash.png";
import bottleToilet from "@/assets/bottle-toilet-cleaner.png";
import kitBottles from "@/assets/kit-bottles.png";
import kitCardBg from "@/assets/kit-card-bg.png";

const BUNDLES = [
  { id: 2001, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20, bottles: [bottleDegreaser, bottleDishwash, bottleSurface] },
  { id: 2002, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20, bottles: [bottleSurface, bottleToilet, bottleDegreaser] },
  { id: 2003, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20, bottles: [bottleDishwash, bottleSurface, bottleToilet] },
];

const SINGLE_PRODUCTS = [
  { id: 3001, name: "All Surface Cleaner", price: 299, originalPrice: 399, discount: 20, image: bottleSurface },
  { id: 3002, name: "Kitchen Degreaser", price: 299, originalPrice: 399, discount: 20, image: bottleDegreaser },
  { id: 3003, name: "Dishwash Liquid", price: 299, originalPrice: 399, discount: 20, image: bottleDishwash },
];

const KITS = [
  { id: 1001, name: "Home Essential Kit", items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"], price: 799, originalPrice: 1047, bottles: [bottleSurface, bottleDishwash, bottleDegreaser] },
  { id: 1002, name: "Home Essential Kit", items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"], price: 799, originalPrice: 1047, bottles: [bottleDegreaser, bottleSurface, bottleToilet] },
  { id: 1003, name: "Home Essential Kit", items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"], price: 799, originalPrice: 1047, bottles: [bottleDishwash, bottleToilet, bottleSurface] },
  { id: 1004, name: "Home Essential Kit", items: ["All Surface Cleaner", "Toilet Cleaner", "Floor Cleaner"], price: 799, originalPrice: 1047, bottles: [bottleToilet, bottleDegreaser, bottleDishwash] },
];

const HomecareKitsSection = ({ showKitsTab = true }: { showKitsTab?: boolean }) => {
  const [activeTab, setActiveTab] = useState<"bundles" | "single" | "kits">("single");
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const handleAddBundle = (bundle: typeof BUNDLES[0]) => {
    addToCart({ productId: bundle.id, name: bundle.name, price: bundle.price, originalPrice: bundle.originalPrice, image: "/placeholder.svg" });
  };

  const handleAddKit = (kit: typeof KITS[0]) => {
    addToCart({ productId: kit.id, name: kit.name, price: kit.price, originalPrice: kit.originalPrice, image: "/placeholder.svg" });
  };

  return (
    <div id="homecare-kits-section">
      {/* ===== SECTION 1: Smart Bundles / Single Products (height: 727px) ===== */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "auto", backgroundImage: `url(${bgSingleProducts})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >

        <div className="relative z-[1] mx-auto max-w-[1440px] px-4 md:px-6 py-8 md:py-16 flex flex-col justify-center">
          {/* TABS */}
          <div className="mb-6 md:mb-8 flex justify-center">
            <button onClick={() => setActiveTab("single")} className="flex items-center justify-center" style={{ width: "200px", height: "42px", borderRadius: "12px", background: "#064734", color: "#FFFFFF", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px" }}>
              Single Products
            </button>
          </div>

          {/* BUNDLES */}
          {activeTab === "bundles" && (
            <div className="flex justify-center gap-6 flex-wrap">
              {BUNDLES.map((bundle) => {
                const cartItem = items.find((i) => i.productId === bundle.id);
                const cartQty = cartItem?.quantity ?? 0;
                return (
                  <div key={bundle.id} className="flex flex-col overflow-hidden" style={{ width: "428px", height: "468px", background: "#FFFFFF", borderRadius: "24px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}>
                    {/* IMAGE AREA */}
                    <div className="relative flex-shrink-0" style={{ height: "234px", background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)" }}>
                      <div className="absolute flex items-center justify-center" style={{ width: "89px", height: "32px", left: "16px", top: "12px", background: "#E2FF9C", borderRadius: "9999px" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#064734" }}>{bundle.discount}% Off</span>
                      </div>
                      <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "56px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}>
                        <Share2 size={16} color="#364153" />
                      </button>
                      <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "12px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}>
                        <Heart size={16} color="#364153" />
                      </button>
                      <img src={ascFront2} alt={bundle.name} className="absolute object-contain" style={{ width: "190px", height: "210px", top: "35px", left: "50%", transform: "translateX(-50%)" }} />
                      <button className="absolute flex items-center justify-center" style={{ width: "32px", height: "32px", right: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", borderRadius: "9999px" }}>
                        <ChevronRight size={18} color="#364153" />
                      </button>
                    </div>
                    {/* CONTENT */}
                    <div className="flex flex-col justify-between flex-1 p-4">
                      <div className="flex flex-col gap-1">
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{bundle.name}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>Pack Of {bundle.productCount}</p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} width="13.33" height="12.71" viewBox="0 0 14 13" fill="#FDD264" stroke="#FDD264" strokeWidth="1.33" opacity={s <= Math.floor(bundle.rating) ? 1 : 0.35} style={{ transition: 'opacity 0.2s' }}>
                              <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57z" />
                            </svg>
                          ))}
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#6B7280", marginLeft: "4px" }}>{bundle.rating} ({bundle.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{bundle.price}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", color: "#8E939C", textDecoration: "line-through" }}>₹{bundle.originalPrice}</span>
                        </div>
                      </div>
                      <div>
                        {cartQty > 0 ? (
                          <QuantityCapsule quantity={cartQty} onIncrement={() => updateQuantity(bundle.id, cartQty + 1)} onDecrement={() => cartQty <= 1 ? removeFromCart(bundle.id) : updateQuantity(bundle.id, cartQty - 1)} size="sm" fullWidth />
                        ) : (
                          <button onClick={() => handleAddBundle(bundle)} className="w-full flex items-center justify-center gap-2" style={{ height: "48px", background: "#064734", color: "#FFFFFF", borderRadius: "14px", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer" }}>
                            <ShoppingCart size={18} /> Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          
          {/* {activeTab === "single" && (
            // <div className="flex justify-center gap-6 flex-wrap">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
              {SINGLE_PRODUCTS.map((product) => {
                const cartItem = items.find((i) => i.productId === product.id);
                const cartQty = cartItem?.quantity ?? 0;
                return (
                  <div key={product.id} className="flex flex-col overflow-hidden" style={{ width: "428px", height: "468px", background: "#FFFFFF", borderRadius: "24px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}>
                    <div className="relative flex-shrink-0" style={{ height: "234px", background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)" }}>
                      <div className="absolute flex items-center justify-center" style={{ width: "89px", height: "32px", left: "16px", top: "12px", background: "#E2FF9C", borderRadius: "9999px" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#064734" }}>{product.discount}% Off</span>
                      </div>
                      <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "56px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}><Share2 size={16} /></button>
                      <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "12px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}><Heart size={16} /></button>
                      <img src={product.image} alt={product.name} className="absolute object-contain" style={{ width: "141px", height: "155px", top: "57px", left: "50%", transform: "translateX(-50%)" }} />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-4">
                      <div>
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{product.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{product.price}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#8E939C", textDecoration: "line-through" }}>₹{product.originalPrice}</span>
                        </div>
                      </div>
                      <div>
                        {cartQty > 0 ? (
                          <QuantityCapsule quantity={cartQty} onIncrement={() => updateQuantity(product.id, cartQty + 1)} onDecrement={() => cartQty <= 1 ? removeFromCart(product.id) : updateQuantity(product.id, cartQty - 1)} size="sm" fullWidth />
                        ) : (
                          <button onClick={() => addToCart({ productId: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice, image: "/placeholder.svg" })} className="w-full flex items-center justify-center gap-2" style={{ height: "48px", background: "#064734", color: "#FFFFFF", borderRadius: "14px", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer" }}>
                            <ShoppingCart size={18} /> Add to Box
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )} */}

          {/* SINGLE */}
          {activeTab === "single" && (
            <div className="flex flex-col items-center gap-10">
            <div className="flex justify-center flex-wrap gap-x-[30px] md:gap-x-[80px] gap-y-[30px] md:gap-y-[40px]">
              {SINGLE_PRODUCTS.map((product) => {
                const cartItem = items.find((i) => i.productId === product.id);
                const cartQty = cartItem?.quantity ?? 0;

                return (
                  <div
                    key={product.id}
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: "280px",
                      height: "420px",
                      background: "#FFFFFF",
                      borderRadius: "24px",
                      boxShadow:
                        "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)",
                    }}
                  >
                    {/* IMAGE */}
                    <div
                      className="relative flex-shrink-0"
                      style={{
                        height: "200px",
                        background:
                          "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)",
                      }}
                    >
                      {/* Discount */}
                      <div
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "80px",
                          height: "28px",
                          left: "12px",
                          top: "10px",
                          background: "#E2FF9C",
                          borderRadius: "9999px",
                        }}
                      >
                        <span style={{ fontSize: "13px", color: "#064734" }}>
                          {product.discount}% Off
                        </span>
                      </div>

                      {/* Icons */}
                      <button
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "32px",
                          height: "32px",
                          right: "48px",
                          top: "10px",
                          background: "#FFFFFF",
                          borderRadius: "9999px",
                        }}
                      >
                        <Share2 size={14} />
                      </button>

                      <button
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "32px",
                          height: "32px",
                          right: "10px",
                          top: "10px",
                          background: "#FFFFFF",
                          borderRadius: "9999px",
                        }}
                      >
                        <Heart size={14} />
                      </button>

                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute object-contain"
                        style={{
                          width: "120px",
                          height: "140px",
                          top: "40px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col justify-between flex-1 p-4">
                      <div>
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: "15px",
                            color: "#464646",
                          }}
                        >
                          {product.name}
                        </p>

                        {/* PRICE */}
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: "24px",
                              color: "#064734",
                            }}
                          >
                            ₹{product.price}
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#8E939C",
                              textDecoration: "line-through",
                            }}
                          >
                            ₹{product.originalPrice}
                          </span>
                        </div>

                        {/* ⭐ Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg
                              key={s}
                              width="13"
                              height="12"
                              viewBox="0 0 14 13"
                              fill={s <= 4 ? "#FDC700" : "#E5E7EB"}
                            >
                              <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57z" />
                            </svg>
                          ))}

                          <span
                            style={{
                              fontSize: "13px",
                              color: "#6B7280",
                              marginLeft: "4px",
                            }}
                          >
                            4.0 (128 reviews)
                          </span>
                        </div>
                      </div>

                      {/* BUTTON */}
                      <div>
                        {cartQty > 0 ? (
                          <QuantityCapsule
                            quantity={cartQty}
                            onIncrement={() =>
                              updateQuantity(product.id, cartQty + 1)
                            }
                            onDecrement={() =>
                              cartQty <= 1
                                ? removeFromCart(product.id)
                                : updateQuantity(product.id, cartQty - 1)
                            }
                            size="sm"
                            fullWidth
                          />
                        ) : (
                          <button
                            onClick={() =>
                              addToCart({
                                productId: product.id,
                                name: product.name,
                                price: product.price,
                                originalPrice: product.originalPrice,
                                image: "/placeholder.svg",
                              })
                            }
                            className="w-full flex items-center justify-center gap-2"
                            style={{
                              height: "44px",
                              background: "#064734",
                              color: "#FFFFFF",
                              borderRadius: "12px",
                              fontWeight: 600,
                              fontSize: "14px",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <ShoppingCart size={16} /> Add to Box
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shop All Button */}
            <button
              onClick={() => window.location.href = "/shop"}
              className="flex items-center justify-center"
              style={{
                height: "48px",
                padding: "0 32px",
                background: "#064734",
                color: "#FFFFFF",
                borderRadius: "9999px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Shop All
            </button>
            </div>
          )}

          {/* KITS */}
          {activeTab === "kits" && (
            <div className="flex justify-center gap-6 flex-wrap">
              {KITS.map((kit) => {
                const cartItem = items.find((i) => i.productId === kit.id);
                const cartQty = cartItem?.quantity ?? 0;
                return (
                  <div key={kit.id} className="flex flex-col overflow-hidden" style={{ width: "428px", height: "468px", background: "#FFFFFF", borderRadius: "24px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}>
                    <div className="relative flex-shrink-0" style={{ height: "234px", background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)" }}>
                      <div className="absolute flex items-center justify-center" style={{ width: "89px", height: "32px", left: "16px", top: "12px", background: "#E2FF9C", borderRadius: "9999px" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#064734" }}>Kit</span>
                      </div>
                      <img src={kitBottles} alt={kit.name} className="absolute object-contain" style={{ width: "190px", height: "210px", top: "35px", left: "50%", transform: "translateX(-50%)" }} />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-4">
                      <div className="flex flex-col gap-1">
                        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{kit.name}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#064734" }}>Pack Of {kit.items.length}</p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(s => (
                            <svg key={s} width="13.33" height="12.71" viewBox="0 0 14 13" fill={s <= 4 ? "#FDD264" : "#FFEEC1"} stroke={s <= 4 ? "#FDD264" : "#FFEEC1"} strokeWidth="1.33">
                              <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57z" />
                            </svg>
                          ))}
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "24px", color: "#6B7280", marginLeft: "4px" }}>4.0 (165 reviews)</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{kit.price}</span>
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "16px", color: "#8E939C", textDecoration: "line-through" }}>₹{kit.originalPrice}</span>
                        </div>
                      </div>
                      <div>
                        {cartQty > 0 ? (
                          <QuantityCapsule quantity={cartQty} onIncrement={() => updateQuantity(kit.id, cartQty + 1)} onDecrement={() => cartQty <= 1 ? removeFromCart(kit.id) : updateQuantity(kit.id, cartQty - 1)} size="sm" fullWidth />
                        ) : (
                          <button onClick={() => addToCart({ productId: kit.id, name: kit.name, price: kit.price, originalPrice: kit.originalPrice, image: "/placeholder.svg" })} className="w-full flex items-center justify-center gap-2" style={{ height: "48px", background: "#064734", color: "#FFFFFF", borderRadius: "14px", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer" }}>
                            <ShoppingCart size={18} /> Add to Box
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

      {/* ===== SECTION 2: Smart Savings + Mega Saver Pack ===== */}
      {/*
      <section className="relative overflow-hidden">
         // Part A: Stop Buying One - SOLID #064734 
        <div className="relative" style={{ background: "#064734" }}>
          //Clovers - visible on dark bg
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", height: "153px", left: "0px", top: "0px", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", height: "153px", right: "0px", top: "0px", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", height: "153px", left: "0px", bottom: "0px", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", height: "153px", right: "0px", bottom: "0px", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", left: "50%", top: "0px", transform: "translateX(-50%)", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", left: "20%", top: "35%", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", right: "15%", top: "25%", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", left: "10%", bottom: "15%", opacity: 0.5, filter: "brightness(1.5)" }} />
          <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none z-0" style={{ width: "153px", right: "50%", bottom: "0px", opacity: 0.5, filter: "brightness(1.5)" }} />

          <div className="relative z-[1] mx-auto flex items-center" style={{ maxWidth: "1313px", padding: "80px 20px", gap: "74px" }}>
            <div className="flex flex-col items-start" style={{ width: "372px", gap: "24px" }}>
              <div className="flex items-center gap-2" style={{ height: "36px", padding: "0 16px", background: "#EDFFC3", borderRadius: "9999px" }}>
                <Sparkles size={16} color="#064734" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: "#064734" }}>Smart Savings</span>
              </div>
              <div className="flex flex-col" style={{ gap: "10px", width: "372px" }}>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", letterSpacing: "0px", color: "#FFFFFF", margin: 0 }}>
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
                { qty: "3+", price: 249, label: "Select 3+ Bottles", save: "Save 17%", id: 5003, dark: true },
              ].map((tier) => {
                const cartItem = items.find((i) => i.productId === tier.id);
                const cartQty = cartItem?.quantity ?? 0;
                return (
                  <div key={tier.qty} className="relative" style={{ width: "276px", height: "307px" }}>
                    {tier.save && (
                      <div className="absolute flex items-center justify-center gap-1" style={{ width: "101px", height: "25px", left: "calc(50% - 50px)", top: "0px", background: "#064734", border: "1.5px solid #FFFFFF", borderRadius: "8px", zIndex: 2 }}>
                        <TrendingDown size={16} color="#FFFFFF" strokeWidth={1.33} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: "#FFFFFF" }}>{tier.save}</span>
                      </div>
                    )}
                    <div className="absolute flex flex-col items-start" style={{ width: "275px", height: "294px", left: "0px", top: "13px", background: "#FFFFFF", boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)", borderRadius: "24px", padding: "32px 32px 0px", gap: "24px" }}>
                      <div className="flex justify-center" style={{ width: "100%" }}>
                        <div className="flex items-center justify-center" style={{ width: "96px", height: "96px", borderRadius: "9999px", background: tier.dark ? "#064734" : "#E5E7EB" }}>
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
                          <QuantityCapsule
                            quantity={cartQty}
                            onIncrement={(e) => {
                              e.stopPropagation();
                              updateQuantity(tier.id, cartQty + 1);
                            }}
                            onDecrement={(e) => {
                              e.stopPropagation();
                              if (cartQty <= 1) {
                                removeFromCart(tier.id);
                              } else {
                                updateQuantity(tier.id, cartQty - 1);
                              }
                            }}
                            size="sm"
                            fullWidth
                          />
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
        </div>

        //Part B: Mega Saver Pack - solid with tiny diagonal gradient in bottom-right
        <div
          className="relative"
          style={{
            background: "linear-gradient(160deg,#064734 0%,#0a5a45 60%,#f5f7f6 100%)"
          }}
        >
          // Clovers //
          <img src={cloverDark} className="absolute pointer-events-none z-0" style={{ width: "153px", left: "0px", top: "20px", mixBlendMode: "screen", opacity: 0.5 }} />
          <img src={cloverDark} className="absolute pointer-events-none z-0" style={{ width: "153px", right: "0px", top: "20px", mixBlendMode: "screen", opacity: 0.5 }} />
          <img src={cloverDark} className="absolute pointer-events-none z-0" style={{ width: "153px", left: "0px", bottom: "0px", mixBlendMode: "screen", opacity: 0.5 }} />
          <img src={cloverDark} className="absolute pointer-events-none z-0" style={{ width: "153px", right: "0px", bottom: "-50px", mixBlendMode: "screen", opacity: 0.5 }} />
          <img src={cloverDark} className="absolute pointer-events-none z-0" style={{ width: "153px", left: "0px", top: "320px", mixBlendMode: "screen", opacity: 0.5 }} />
          <img src={cloverDark} className="absolute pointer-events-none z-0" style={{ width: "153px", left: "520px", top: "20px", mixBlendMode: "screen", opacity: 0.5 }} />
          <img src={cloverDark} className="absolute pointer-events-none z-0" style={{ width: "153px", left: "920px", top: "20px", mixBlendMode: "screen", opacity: 0.5 }} />

          <div className="relative z-[1] mx-auto flex flex-col items-center" style={{ maxWidth: "1435px", padding: "60px 20px" }}>

            <div className="rounded-full text-sm font-medium" style={{ background: "#EDFFC3", color: "#064734", padding: "8px 20px", marginBottom: "16px" }}>
              ✨ 5L Save More
            </div>

            <h2 style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: "40px", lineHeight: "60px", color: "#FFF" }}>
              Mega Saver Pack
            </h2>

            <p style={{ fontFamily: "Poppins", fontSize: "20px", color: "#FFF", marginBottom: "40px" }}>
              Curated Combinations for Effortless Cleaning
            </p>

            <div className="flex gap-[24px] flex-wrap justify-center">
              {BUNDLES.slice(0, 3).map((product, i) => {

                return (
                  <div
                    key={i}
                    className="flex flex-col overflow-hidden"
                    style={{
                      width: "375px",
                      height: "508px",
                      background: "#FFF",
                      borderRadius: "24px",
                      boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"
                    }}
                  >

                    // IMAGE SECTION
                    <div
                      className="relative"
                      style={{
                        height: "246px",
                        background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)"
                      }}
                    >
                      <div className="absolute top-4 left-4 rounded-full text-sm"
                        style={{ background: "#E2FF9C", color: "#064734", padding: "4px 12px" }}>
                        {product.discount}% Off
                      </div>

                      <div className="absolute top-4 right-4 flex gap-2">
                        <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
                          <Share2 size={16} />
                        </button>
                        <button className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
                          <Heart size={16} />
                        </button>
                      </div>

                      // ✅ FIXED IMAGE SIZE
                      <img
                        src={ascFront2}
                        alt=""
                        className="absolute object-contain"
                        style={{
                          width: "190px",
                          height: "200px",
                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%, -40%)"
                        }}
                      />


                      //➡️ Right Arrow Button (Figma Perfect)
                      <button
                        className="absolute flex items-center justify-center"
                        style={{
                          width: "31px",
                          height: "32px",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "rgba(255,255,255,0.9)",
                          borderRadius: "50%",
                          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                          padding: "6px",
                          border: "none",
                          cursor: "pointer"
                        }}
                      >
                        <svg
                          width="5"
                          height="10"
                          viewBox="0 0 5 10"
                          fill="none"
                        >
                          <path
                            d="M1 1L4 5L1 9"
                            stroke="#364153"
                            strokeWidth="1.67"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>

                    // CONTENT
                    <div style={{ padding: "16px" }}>

                      <p style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: "16px", color: "#464646" }}>
                        {product.name}
                      </p>

                      <p style={{ fontFamily: "Inter", fontSize: "16px", color: "#064734", marginBottom: "6px" }}>
                        Pack Of {product.productCount}
                      </p>

                      //⭐ Rating
                      <div className="flex items-center" style={{ gap: "6px", marginBottom: "6px" }}>

                        //⭐ Stars
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg
                            key={s}
                            width="13.33"
                            height="12.71"
                            viewBox="0 0 14 13"
                            fill="#FDC700"
                            stroke="#FDC700"
                            strokeWidth="1.33"
                            opacity={s <= Math.floor(product.rating) ? 1 : 0.35}
                            style={{ marginTop: "1.33px", marginLeft: "1.33px", transition: "opacity 0.2s" }}
                          >
                            <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57z" />
                          </svg>
                        ))}

                        //⭐ Rating value
                        <span
                          style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#464646"
                          }}
                        >
                          {product.rating}
                        </span>

                        //⭐ Reviews
                        <span
                          style={{
                            fontFamily: "Inter",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#8E939C"
                          }}
                        >
                          ({product.reviewCount} reviews)
                        </span>

                      </div>

                      //PRICE
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ fontWeight: 700, fontSize: "26px", color: "#064734" }}>
                          ₹{product.price}
                        </span>
                        <span style={{ color: "#8E939C", textDecoration: "line-through" }}>
                          ₹{product.originalPrice}
                        </span>
                      </div>

                      // ✅ SIZE CHIPS (NEW) //
                      <div className="flex gap-2 mb-3">
                        {["5L", "3L", "2L", "750 ML"].map((size, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "4px 8px",
                              fontSize: "12px",
                              borderRadius: "6px",
                              background: idx === 0 ? "#D9F99D" : "#F3F4F6",
                              color: "#064734"
                            }}
                          >
                            {size}
                          </span>
                        ))}
                      </div>

                      // BUTTON
                      <button
                        className="w-full flex items-center justify-center gap-2"
                        style={{
                          height: "48px",
                          background: "#064734",
                          color: "#FFF",
                          borderRadius: "14px",
                          fontWeight: 600
                        }}
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> 
      */}

      {/* ===== SECTION 3: Everything Your Home Needs In One Kit ===== */}
      <section
        className="relative overflow-hidden"
        style={{ width: "100%", backgroundImage: `url(${bgHomeKits})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >

        <div className="relative z-[1] mx-auto flex flex-col items-center" style={{ maxWidth: "1440px", padding: "30px 16px 30px", gap: "20px" }}>

          <div className="flex flex-col items-center" style={{ gap: "8px" }}>
            <h2 className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, textAlign: "center", color: "#064734", margin: 0 }}>
              Everything Your Home Needs. In One Kit.
            </h2>
            <p className="text-[14px] md:text-[20px] leading-[22px] md:leading-[28px]" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, textAlign: "center", color: "#064734", margin: 0 }}>
              Curated Combinations for Effortless Cleaning
            </p>
          </div>

          <div className="grid grid-cols-2 md:flex md:justify-center" style={{ gap: "16px", flexWrap: "wrap" }}>
            {KITS.map((kit) => {
              const cartItem = items.find((i) => i.productId === kit.id);
              const cartQty = cartItem?.quantity ?? 0;

              return (
                <div
                  key={kit.id}
                  className="flex flex-col items-center"
                  style={{
                    width: "276px",
                    background: "#FFFFFF",
                    boxShadow: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "24px",
                    overflow: "hidden"
                  }}
                >
                  <div className="relative flex-shrink-0" style={{ width: "276px", height: "162px", borderRadius: "24px 24px 0 0", overflow: "hidden" }}>
                    <img src={kitCardBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <img src={kitBottles} alt="Kit bottles" className="absolute object-contain" style={{ width: "178px", height: "141px", left: "49px", top: "11px" }} />
                  </div>

                  <div
                    className="flex flex-col items-start"
                    style={{
                      width: "238px",
                      padding: "16px 0 12px 0",
                      gap: "12px"
                    }}
                  >
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "18px", lineHeight: "24px", color: "#064734" }}>
                      {kit.name}
                    </span>

                    <div className="flex flex-col" style={{ gap: "8px", width: "238px" }}>
                      {kit.items.map((item, i) => (
                        <div key={i} className="flex items-center" style={{ gap: "6px" }}>
                          <Check size={18} color="#064734" strokeWidth={1.75} />
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "18px", color: "#064734" }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center" style={{ gap: "10px" }}>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "26px", lineHeight: "24px", color: "#064734" }}>
                        ₹{kit.price}
                      </span>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "24px", color: "#8E939C", textDecoration: "line-through" }}>
                        ₹{kit.originalPrice}
                      </span>
                    </div>

                    {cartQty > 0 ? (
                      <QuantityCapsule
                        quantity={cartQty}
                        onIncrement={(e) => {
                          e.stopPropagation();
                          updateQuantity(kit.id, cartQty + 1);
                        }}
                        onDecrement={(e) => {
                          e.stopPropagation();
                          if (cartQty <= 1) {
                            removeFromCart(kit.id);
                          } else {
                            updateQuantity(kit.id, cartQty - 1);
                          }
                        }}
                        size="sm"
                        fullWidth
                      />
                    ) : (
                      <button
                        onClick={() => handleAddKit(kit)}
                        className="flex items-center justify-center gap-2"
                        style={{
                          width: "238px",
                          height: "36px",
                          border: "1px solid #064734",
                          borderRadius: "8px",
                          background: "transparent",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "24px",
                          color: "#064734",
                          cursor: "pointer"
                        }}
                      >
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