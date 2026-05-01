import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useProductList, useRelatedProducts } from "@/hooks/useProducts";
import { getProductImage, getSellingPrice } from "@/lib/productHelpers";
import { buildProductPath } from "@/lib/routeHelpers";
import type { ApiProduct } from "@/types/api";
import bgSimilar from "@/assets/bg-similar-items.png";

interface SimilarItemsSectionProps {
  currentProductId?: number;
  categoryId?: number;
}

const arrangeCenterOut = <T,>(
  items: T[]
) => {
  const arranged =
    new Array<T>(items.length);

  const centerIndex =
    Math.floor(
      (items.length - 1) / 2
    );

  let leftIndex =
    centerIndex - 1;
  let rightIndex =
    centerIndex + 1;

  items.forEach(
    (item, index) => {
      if (index === 0) {
        arranged[
          centerIndex
        ] = item;
        return;
      }

      if (index % 2 === 1) {
        arranged[leftIndex] = item;
        leftIndex -= 1;
        return;
      }

      arranged[rightIndex] = item;
      rightIndex += 1;
    }
  );

  return arranged.filter(
    Boolean
  ) as T[];
};

const SimilarItemsSection = ({
  currentProductId,
  categoryId,
}: SimilarItemsSectionProps) => {
  const navigate = useNavigate();
  const { data: relatedData } = useRelatedProducts(currentProductId);
  const { data: fallbackData } = useProductList({ size: 12, category: categoryId });
  const [scrollIndex, setScrollIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
        return;
      }

      if (window.innerWidth < 1024) {
        setVisibleCount(2);
        return;
      }

      if (window.innerWidth < 1280) {
        setVisibleCount(3);
        return;
      }

      setVisibleCount(4);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const relatedProducts = relatedData?.content ?? [];
  const fallbackProducts = (fallbackData?.content ?? []).filter(
    (product: ApiProduct) => product.id !== currentProductId
  );
  const products = (relatedProducts.length > 0 ? relatedProducts : fallbackProducts).slice(0, 8);

  const visibleProducts =
    products.slice(
      scrollIndex,
      scrollIndex + visibleCount
    );

  const orderedVisibleProducts =
    useMemo(
      () =>
        visibleCount === 1
          ? visibleProducts
          : arrangeCenterOut(
              visibleProducts
            ),
      [visibleCount, visibleProducts]
    );

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

      <div className="relative z-[1] mx-auto max-w-[1280px] px-4 py-12 md:py-14 lg:py-16">
        <div className="text-center mb-8">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 40px)",
              lineHeight: "1.25",
              color: "#064734",
            }}
          >
            Similar Items You Might Also Like
          </h2>
        </div>

        <div className="relative">
          {canPrev && (
            <button
              onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
              className="absolute left-2 md:left-[-20px] top-1/2 -translate-y-1/2 z-10 h-11 w-11 md:h-[50px] md:w-[50px] bg-white rounded-full shadow flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canNext && (
            <button
              onClick={() => setScrollIndex(scrollIndex + 1)}
              className="absolute right-2 md:right-[-20px] top-1/2 -translate-y-1/2 z-10 h-11 w-11 md:h-[50px] md:w-[50px] bg-white rounded-full shadow flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div className="flex justify-center gap-3 md:gap-4 lg:gap-5 overflow-hidden">
            {orderedVisibleProducts.map((product: ApiProduct) => {
              const image = getProductImage(product);
              const price = getSellingPrice(product);
              const variantCount = product.variantCount ?? 0;
              return (
                <div
                  key={product.id}
                  onClick={() => navigate(buildProductPath(product))}
                  className="w-full max-w-[320px] sm:max-w-[280px] md:w-[220px] lg:w-[240px] xl:w-[260px] flex-shrink-0 cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-square" style={{ background: "#f5f5f5" }}>
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                      <Heart size={16} className="text-gray-500" />
                    </button>
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-medium truncate" style={{ color: "#464646" }}>
                      {product.name}
                    </p>
                    <p className="text-lg font-bold mt-1" style={{ color: "#064734" }}>
                      ₹ {price.toFixed(2)}
                    </p>
                    {variantCount > 0 ? (
                      <p className="text-xs mt-0.5" style={{ color: "#8E939C" }}>
                        {variantCount} variant{variantCount === 1 ? "" : "s"} available
                      </p>
                    ) : null}
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
