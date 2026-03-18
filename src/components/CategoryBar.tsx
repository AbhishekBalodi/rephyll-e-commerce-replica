import { useCategories } from "@/hooks/useProducts";
import type { ApiCategory } from "@/types/api";
import {
  ShowerHead,
  Layers,
  CookingPot,
  Shirt,
  PackageOpen,
  Tag,
} from "lucide-react";

interface CategoryBarProps {
  activeCategory: number | null;
  onCategoryClick: (categoryId: number) => void;
}

/** Map a category name to a relevant icon; fallback to Tag. */
const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("washroom") || lower.includes("bath")) return ShowerHead;
  if (lower.includes("floor") || lower.includes("surface")) return Layers;
  if (lower.includes("kitchen") || lower.includes("cook")) return CookingPot;
  if (lower.includes("laundry") || lower.includes("fabric")) return Shirt;
  if (lower.includes("kit") || lower.includes("home")) return PackageOpen;
  return Tag;
};

const CategoryBar = ({ activeCategory, onCategoryClick }: CategoryBarProps) => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[70px] animate-pulse">
              <div className="w-14 h-14 rounded-full bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat: ApiCategory) => {
          const Icon = getCategoryIcon(cat.name);
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
            >
              <div
                className={`w-[72px] h-[72px] rounded-full flex items-center justify-center transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "text-primary group-hover:opacity-80"
                }`}
                style={activeCategory !== cat.id ? {
                  background: 'radial-gradient(circle, hsl(158 100% 94%) 40%, hsl(158 80% 85%) 100%)',
                } : undefined}
              >
                <Icon size={30} strokeWidth={2} />
              </div>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryBar;
