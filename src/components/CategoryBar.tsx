import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useProducts";
import type { ApiCategory } from "@/types/api";
import { resolveImageUrl } from "@/lib/productHelpers";

import catWashroom from "@/assets/cat-washroom-care.png";
import catFloor from "@/assets/cat-floor-surface.png";
import catKitchen from "@/assets/cat-kitchen-care.png";
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

  // Function to calculate the order for center-first, alternating left-right layout
  const getOrderValue = (index: number, totalCount: number) => {
    const middle = Math.floor(totalCount / 2);
    
    if (index === middle) return 0; // Center item
    
    if (index < middle) {
      // Items to the left of middle
      const distance = middle - index;
      return -distance; // Negative values go left
    } else {
      // Items to the right of middle
      const distance = index - middle;
      return distance; // Positive values go right
    }
  };

  if (isLoading) {
    return (
      <section className="bg-background" style={{ boxShadow: "inset 0px -0.5px 0px #CCCCCC" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-[50px] flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center gap-4 py-[30px] animate-pulse">
                <div className="w-[76px] h-[76px] rounded-full bg-muted" />
                <div className="h-4 w-20 rounded bg-muted" />
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
    if (normalized === "byob" || normalized === "byob" || normalized.includes("byob")) {
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
          <div className="flex items-center justify-center flex-wrap py-4" style={{ gap: "24px" }}>
            {categories.map((cat: ApiCategory, index: number) => {
              const iconSrc = getCategoryIcon(cat);
              const orderValue = getOrderValue(index, categories.length);
              
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat)}
                  className="flex flex-col items-center cursor-pointer group relative py-5 gap-4"
                  style={{ 
                    order: orderValue,
                    minWidth: "154px",
                    flex: "0 0 auto"
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full transition-all group-hover:scale-105"
                    style={{
                      width: "76px",
                      height: "76px",
                      background: "rgba(206, 241, 123, 0.3)",
                    }}
                  >
                    <img src={iconSrc} alt={cat.name} className="w-10 h-10 object-contain transition-all" />
                  </div>
                  <span
                    className="text-center transition-colors"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "150%",
                      color: "#1A1A1A",
                      width: "154px",
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
