import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { useProductList, useRelatedProducts } from "@/hooks/useProducts";
import { getProductImage, getSellingPrice, getMrp } from "@/lib/productHelpers";
import { useNavigate } from "react-router-dom";
import bgSimilar from "@/assets/bg-similar-items.png";
import type { ApiProduct } from "@/types/api";
import { useState, useEffect } from "react";

interface SimilarItemsSectionProps {
  currentProductId?: number;
  categoryId?: number;
}

const SimilarItemsSection = ({ currentProductId, categoryId }: SimilarItemsSectionProps) => {
  const navigate = useNavigate();
  const { data: relatedData } = useRelatedProducts(currentProductId);
  const { data: fallbackData } = useProductList({ size: 12, category: categoryId });
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      setVisibleCount(window.innerWidth < 768 ? 1 : 6);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const relatedProducts = relatedData?.content ?? [];
  const fallbackProducts = (fallbackData?.content ?? []).filter((p: ApiProduct) => p.id !== currentProductId);
  const products = (relatedProducts.length > 0 ? relatedProducts : fallbackProducts).slice(0, 6);

  if (products.length === 0) return null;

  const canPrev = scrollIndex > 0;
  const canNext = scrollIndex + visibleCount < products.length;

  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={bgSimilar}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

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
            <button onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))} className="absolute left-2 md:left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] bg-white rounded-full shadow flex items-center justify-center">
              <ChevronLeft size={24} />
            </button>
          )}
          {canNext && (
            <button onClick={() => setScrollIndex(scrollIndex + 1)} className="absolute right-2 md:right-[-20px] top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] bg-white rounded-full shadow flex items-center justify-center">
              <ChevronRight size={24} />
            </button>
          )}

          <div className="flex gap-4 overflow-hidden">
            {products.slice(scrollIndex, scrollIndex + visibleCount).map((product: ApiProduct) => {
              const image = getProductImage(product);
              const price = getSellingPrice(product);
              const variantCount = product.variantCount ?? 0;
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex-shrink-0 cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    style={{ width: `calc((100% - ${Math.max(0, (visibleCount - 1) * 16)}px) / ${visibleCount})`, minWidth: "140px" }}
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
