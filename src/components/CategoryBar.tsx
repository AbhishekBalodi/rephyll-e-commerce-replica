import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useProducts";
import type { ApiCategory } from "@/types/api";
import { resolveImageUrl } from "@/lib/productHelpers";

import catWashroom from "@/assets/cat-washroom-care.png";
import catFloor from "@/assets/cat-floor-surface.png";
import catKitchen from "@/assets/cat-smart-bundles.png";
import catLaundry from "@/assets/cat-laundry-care.png";
import catHomeCare from "@/assets/cat-home-care-kits.png";
import catBundles from "@/assets/cat-smart-bundles.png";

 const getFallbackIcon = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("washroom") || lower.includes("bath")) return catWashroom;
  if (lower.includes("floor") || lower.includes("surface")) return catFloor;
  if (lower.includes("kitchen") || lower.includes("cook")) return catKitchen;
  if (lower.includes("laundry") || lower.includes("fabric")) return catLaundry;
  if (lower.includes("kit") || lower.includes("home")) return catHomeCare;
  if (lower.includes("bundle") || lower.includes("smart")) return catBundles;
  return catHomeCare;
}; 

const getCategoryIcon = (cat: ApiCategory): string => {
  if (cat.image) return resolveImageUrl(cat.image);
  return getFallbackIcon(cat.name);
};

const toSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const CategoryBar = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <section className="bg-background" style={{ boxShadow: "inset 0px -0.5px 0px #CCCCCC" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-6 md:gap-[50px] flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2 md:gap-4 py-4 md:py-[30px] animate-pulse">
                <div className="w-[52px] h-[52px] md:w-[76px] md:h-[76px] rounded-full bg-muted" />
                <div className="h-3 md:h-4 w-16 md:w-20 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories || categories.length === 0) {
    return (
      <section className="bg-background" style={{ boxShadow: "inset 0px -0.5px 0px #CCCCCC" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="text-center text-muted-foreground">
            <p>Categories will be available soon.</p>
          </div>
        </div>
      </section>
    );
  }

  const handleCategoryClick = (cat: ApiCategory) => {
    const normalized = cat.name.trim().toLowerCase();
    if (normalized === "byob" || normalized.includes("byob")) {
      navigate("/homecare-kits");
      return;
    }

    if (normalized.includes("kit") || normalized.includes("bundle") || normalized.includes("homecare")) {
      navigate("/homecare-kits");
      return;
    }

    const slug = toSlug(cat.name);
    navigate(`/category/${slug}`, { state: { categoryId: cat.id, categoryName: cat.name } });
  };

  return (
    <section className="bg-background w-full" style={{ boxShadow: "inset 0px -0.5px 0px #CCCCCC" }}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Mobile: horizontal scroll, Desktop: flex wrap center */}
          <div className="flex items-center md:justify-center gap-4 md:gap-[24px] md:flex-wrap py-3 md:py-4 overflow-x-auto md:overflow-x-visible scrollbar-hide">
            {categories.filter((cat: ApiCategory) => cat.name.trim().toUpperCase() !== "BYOB").map((cat: ApiCategory) => {
              const iconSrc = getCategoryIcon(cat);

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className="flex flex-col items-center cursor-pointer group relative py-2 md:py-5 gap-2 md:gap-4 flex-shrink-0"
                  style={{
                    minWidth: "70px",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full transition-all group-hover:scale-105"
                    style={{
                      width: "52px",
                      height: "52px",
                      background: "rgba(206, 241, 123, 0.3)",
                    }}
                  >
                    <img src={iconSrc} alt={cat.name} className="w-7 h-7 md:w-10 md:h-10 object-contain transition-all" />
                  </div>
                  <span
                    className="text-center transition-colors text-xs md:text-lg"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      lineHeight: "150%",
                      color: "#1A1A1A",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
