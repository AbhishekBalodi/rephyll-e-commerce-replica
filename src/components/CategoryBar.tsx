import { useCategories } from "@/hooks/useProducts";
import type { ApiCategory } from "@/types/api";

import catWashroom from "@/assets/cat-washroom-care.png";
import catFloor from "@/assets/cat-floor-surface.png";
import catKitchen from "@/assets/cat-kitchen-care.png";
import catLaundry from "@/assets/cat-laundry-care.png";
import catHomeCare from "@/assets/cat-home-care-kits.png";
import catBundles from "@/assets/cat-smart-bundles.png";

interface CategoryBarProps {
  activeCategory: number | null;
  onCategoryClick: (categoryId: number) => void;
}

/** Map a category name to its Figma icon */
const getCategoryIcon = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("washroom") || lower.includes("bath")) return catWashroom;
  if (lower.includes("floor") || lower.includes("surface")) return catFloor;
  if (lower.includes("kitchen") || lower.includes("cook")) return catKitchen;
  if (lower.includes("laundry") || lower.includes("fabric")) return catLaundry;
  if (lower.includes("kit") || lower.includes("home")) return catHomeCare;
  if (lower.includes("bundle") || lower.includes("smart")) return catBundles;
  return catHomeCare;
};

const CategoryBar = ({ activeCategory, onCategoryClick }: CategoryBarProps) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="bg-background" style={{ boxShadow: "inset 0px -0.5px 0px #CCCCCC" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center gap-[50px]">
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

  if (!categories || categories.length === 0) return null;

  return (
    <section className="bg-background" style={{ boxShadow: "inset 0px -0.5px 0px #CCCCCC" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-center gap-[50px] overflow-x-auto scrollbar-hide">
          {categories.map((cat: ApiCategory) => {
            const iconSrc = getCategoryIcon(cat.name);
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryClick(cat.id)}
                className="flex flex-col items-center gap-4 min-w-[154px] cursor-pointer group relative"
                style={{
                  padding: "30px 0",
                  ...(isActive ? { boxShadow: "inset 0px -3px 0px #064734" } : {}),
                }}
              >
                <div
                  className={`w-[76px] h-[76px] rounded-full flex items-center justify-center transition-all`}
                  style={{
                    background: isActive ? "#064734" : "rgba(206, 241, 123, 0.3)",
                  }}
                >
                  <img
                    src={iconSrc}
                    alt={cat.name}
                    className="w-10 h-10 object-contain transition-all"
                    style={{
                      filter: isActive ? "brightness(0) invert(1)" : "none",
                    }}
                  />
                </div>
                <span
                  className="text-lg font-semibold text-center whitespace-nowrap transition-colors"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "18px",
                    lineHeight: "150%",
                    color: "#1A1A1A",
                  }}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryBar;
