import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProductList } from "@/hooks/useProducts";
import { ShoppingCart, Star, Share2, Heart, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import QuantityCapsule from "@/components/QuantityCapsule";
import ascFront2 from "@/assets/ASC_Front-2.png";
import bottleSurface from "@/assets/bottle-surface-cleaner.png";
import bottleDegreaser from "@/assets/bottle-kitchen-degreaser.png";
import bottleDishwash from "@/assets/bottle-dishwash.png";
import bottleToilet from "@/assets/bottle-toilet-cleaner.png";

const SMART_BUNDLES = [
  { id: 2001, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20 },
  { id: 2002, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20 },
  { id: 2003, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20 },
  { id: 2004, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20 },
];

const MEGA_PACKS = [
  { id: 4001, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20, sizes: ["5L", "3L", "2L", "750 ML"] },
  { id: 4002, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20, sizes: ["5L", "3L", "2L", "750 ML"] },
  { id: 4003, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20, sizes: ["5L", "3L", "2L", "750 ML"] },
  { id: 4004, name: "Kitchen Essential Bundle", productCount: 3, rating: 4.0, reviewCount: 128, price: 799, originalPrice: 1047, discount: 20, sizes: ["5L", "3L", "2L", "750 ML"] },
];

const BundleCard = ({ bundle }: { bundle: typeof SMART_BUNDLES[0] }) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find((i) => i.productId === bundle.id);
  const cartQty = cartItem?.quantity ?? 0;

  return (
    <div className="flex flex-col overflow-hidden" style={{ width: "100%", maxWidth: "270px", background: "#FFFFFF", borderRadius: "24px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}>
      <div className="relative flex-shrink-0" style={{ height: "200px", background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)" }}>
        <div className="absolute flex items-center justify-center" style={{ width: "89px", height: "32px", left: "16px", top: "12px", background: "#E2FF9C", borderRadius: "9999px" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#064734" }}>{bundle.discount}% Off</span>
        </div>
        <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "56px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}><Share2 size={16} color="#364153" /></button>
        <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "12px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}><Heart size={16} color="#364153" /></button>
        <img src={ascFront2} alt={bundle.name} className="absolute object-contain" style={{ width: "140px", height: "160px", top: "30px", left: "50%", transform: "translateX(-50%)" }} />
        <button className="absolute flex items-center justify-center" style={{ width: "32px", height: "32px", right: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", borderRadius: "9999px" }}>
          <ChevronRight size={18} color="#364153" />
        </button>
      </div>
      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex flex-col gap-1">
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{bundle.name}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", color: "#064734" }}>Pack Of {bundle.productCount}</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={14} className={s <= Math.floor(bundle.rating) ? "text-[#FDD264]" : "text-[#FFEEC1]"} fill={s <= Math.floor(bundle.rating) ? "#FDD264" : "#FFEEC1"} />
            ))}
            <span className="text-sm text-[#6B7280] ml-1">{bundle.rating} ({bundle.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{bundle.price}</span>
            <span className="text-sm text-[#8E939C] line-through">₹{bundle.originalPrice}</span>
          </div>
        </div>
        <div className="mt-3">
          {cartQty > 0 ? (
            <QuantityCapsule quantity={cartQty} onIncrement={() => updateQuantity(bundle.id, cartQty + 1)} onDecrement={() => cartQty <= 1 ? removeFromCart(bundle.id) : updateQuantity(bundle.id, cartQty - 1)} size="sm" fullWidth />
          ) : (
            <button onClick={() => addToCart({ productId: bundle.id, name: bundle.name, price: bundle.price, originalPrice: bundle.originalPrice, image: "/placeholder.svg" })} className="w-full flex items-center justify-center gap-2" style={{ height: "48px", background: "#064734", color: "#FFFFFF", borderRadius: "14px", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer" }}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MegaCard = ({ pack }: { pack: typeof MEGA_PACKS[0] }) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find((i) => i.productId === pack.id);
  const cartQty = cartItem?.quantity ?? 0;

  return (
    <div className="flex flex-col overflow-hidden" style={{ width: "100%", maxWidth: "270px", background: "#FFFFFF", borderRadius: "24px", boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)" }}>
      <div className="relative flex-shrink-0" style={{ height: "200px", background: "linear-gradient(137.98deg, #CEF17B 0.45%, #FFFFFF 106.93%)" }}>
        <div className="absolute flex items-center justify-center" style={{ width: "89px", height: "32px", left: "16px", top: "12px", background: "#E2FF9C", borderRadius: "9999px" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#064734" }}>{pack.discount}% Off</span>
        </div>
        <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "56px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}><Share2 size={16} color="#364153" /></button>
        <button className="absolute flex items-center justify-center" style={{ width: "36px", height: "36px", right: "12px", top: "12px", background: "#FFFFFF", borderRadius: "9999px" }}><Heart size={16} color="#364153" /></button>
        <img src={ascFront2} alt={pack.name} className="absolute object-contain" style={{ width: "140px", height: "160px", top: "30px", left: "50%", transform: "translateX(-50%)" }} />
        <button className="absolute flex items-center justify-center" style={{ width: "32px", height: "32px", right: "10px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", borderRadius: "9999px" }}>
          <ChevronRight size={18} color="#364153" />
        </button>
      </div>
      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex flex-col gap-1">
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "16px", lineHeight: "24px", color: "#464646" }}>{pack.name}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", color: "#064734" }}>Pack Of {pack.productCount}</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={14} className={s <= Math.floor(pack.rating) ? "text-[#FDD264]" : "text-[#FFEEC1]"} fill={s <= Math.floor(pack.rating) ? "#FDD264" : "#FFEEC1"} />
            ))}
            <span className="text-sm text-[#6B7280] ml-1">{pack.rating} ({pack.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "30px", lineHeight: "24px", color: "#064734" }}>₹{pack.price}</span>
            <span className="text-sm text-[#8E939C] line-through">₹{pack.originalPrice}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {pack.sizes.map((size, idx) => (
              <span key={idx} style={{ padding: "4px 8px", fontSize: "12px", borderRadius: "6px", background: idx === 0 ? "#D9F99D" : "#F3F4F6", color: "#064734" }}>{size}</span>
            ))}
          </div>
        </div>
        <div className="mt-3">
          {cartQty > 0 ? (
            <QuantityCapsule quantity={cartQty} onIncrement={() => updateQuantity(pack.id, cartQty + 1)} onDecrement={() => cartQty <= 1 ? removeFromCart(pack.id) : updateQuantity(pack.id, cartQty - 1)} size="sm" fullWidth />
          ) : (
            <button onClick={() => addToCart({ productId: pack.id, name: pack.name, price: pack.price, originalPrice: pack.originalPrice, image: "/placeholder.svg" })} className="w-full flex items-center justify-center gap-2" style={{ height: "48px", background: "#064734", color: "#FFFFFF", borderRadius: "14px", fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", border: "none", cursor: "pointer" }}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const HomecareKitsPage = () => {
  const [activeView, setActiveView] = useState<"smart" | "mega">("smart");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-8 flex items-center gap-4 justify-center">
          <button
            onClick={() => setActiveView("smart")}
            className={`px-6 py-2.5 rounded-full font-semibold text-base transition ${activeView === "smart" ? "bg-[#064734] text-white" : "bg-[#E6F5E3] text-[#064734]"}`}
          >
            Smart Bundles
          </button>
          <button
            onClick={() => setActiveView("mega")}
            className={`px-6 py-2.5 rounded-full font-semibold text-base transition ${activeView === "mega" ? "bg-[#064734] text-white" : "bg-[#E6F5E3] text-[#064734]"}`}
          >
            Mega Saver Pack
          </button>
        </div>

        {activeView === "smart" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] justify-items-center">
            {SMART_BUNDLES.map((bundle) => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] justify-items-center">
            {MEGA_PACKS.map((pack) => (
              <MegaCard key={pack.id} pack={pack} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default HomecareKitsPage;
