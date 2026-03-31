import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useProductList, useRelatedProducts } from "@/hooks/useProducts";
import { getProductImage, getSellingPrice, getMrp } from "@/lib/productHelpers";
import { useNavigate } from "react-router-dom";
import cloverLime from "@/assets/clover-lime.png";
import type { ApiProduct } from "@/types/api";
import { useState } from "react";

interface SimilarItemsSectionProps {
  currentProductId?: number;
  categoryId?: number;
}

const SimilarItemsSection = ({ currentProductId, categoryId }: SimilarItemsSectionProps) => {
  const navigate = useNavigate();
  const { data: relatedData } = useRelatedProducts(currentProductId);
  const { data: fallbackData } = useProductList({ size: 12, category: categoryId });
  const [scrollIndex, setScrollIndex] = useState(0);

  // Use related products if available, fallback to category products
  const relatedProducts = relatedData?.content ?? [];
  const fallbackProducts = (fallbackData?.content ?? []).filter((p: ApiProduct) => p.id !== currentProductId);
  const products = (relatedProducts.length > 0 ? relatedProducts : fallbackProducts).slice(0, 6);

  if (products.length === 0) return null;

  const visibleCount = 6;
  const canPrev = scrollIndex > 0;
  const canNext = scrollIndex + visibleCount < products.length;

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "rgba(206, 241, 123, 0.3)" }}>
      {/* Clovers */}
      <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "280px", left: "-70px", top: "-50px", opacity: 0.5 }} />
      <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "260px", right: "-50px", top: "-40px", opacity: 0.5 }} />
      <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "300px", left: "-80px", bottom: "-60px", opacity: 0.5 }} />
      <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "270px", right: "-40px", bottom: "-50px", opacity: 0.5 }} />
      <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "240px", left: "50%", top: "-30px", transform: "translateX(-50%)", opacity: 0.5 }} />
      <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "220px", left: "15%", top: "40%", opacity: 0.5 }} />
      {/* <img src={cloverLime} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "250px", right: "10%", bottom: "20%", opacity: 0.5 }} /> */}

      <div className="relative z-[1] mx-auto max-w-[1280px] px-4 py-16">
        <div className="text-center mb-8">
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", color: "#064734" }}>
            Similar Items You Might Also Like
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", color: "#064734" }}>
            Curated Combinations for Effortless Cleaning
          </p>
        </div>

        <div className="relative">
          {canPrev && (
            <button onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))} className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] bg-white rounded-full shadow flex items-center justify-center">
              <ChevronLeft size={24} />
            </button>
          )}
          {canNext && (
            <button onClick={() => setScrollIndex(scrollIndex + 1)} className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] bg-white rounded-full shadow flex items-center justify-center">
              <ChevronRight size={24} />
            </button>
          )}

          <div className="flex gap-4 overflow-hidden">
            {products.slice(scrollIndex, scrollIndex + visibleCount).map((product: ApiProduct) => {
              const image = getProductImage(product);
              const price = getSellingPrice(product);
              const mrp = getMrp(product);
              const variantCount = product.variantCount ?? 0;
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.slug || product.id}`)}
                  className="flex-shrink-0 cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  style={{ width: "calc((100% - 80px) / 6)", minWidth: "180px" }}
                >
                  <div className="relative" style={{ height: "180px", background: "#f5f5f5" }}>
                    <img src={image} alt={product.name} className="w-full h-full object-contain p-2" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                      <Heart size={16} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate" style={{ color: "#464646" }}>{product.name}</p>
                    <p className="text-lg font-bold mt-1" style={{ color: "#064734" }}>₹ {price.toFixed(2)}</p>
                    {variantCount > 0 && (
                      <p className="text-xs mt-0.5" style={{ color: "#8E939C" }}>{variantCount} types of Varities available</p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className={s <= 4 ? "fill-[#FDC700] text-[#FDC700]" : "fill-[#E5E7EB] text-[#E5E7EB]"} />
                      ))}
                      <span className="text-xs ml-1" style={{ color: "#8E939C" }}>(121)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarItemsSection;
