import {
  Tag,
  Sparkles,
  Package,
  Droplets,
  SprayCan,
  Shrub,
  Shirt,
  Home,
} from "lucide-react";
import { ProductCategory } from "@/data/products";

interface Category {
  label: ProductCategory;
  icon: React.ReactNode;
}

const CATEGORIES: Category[] = [
  { label: "Sale", icon: <Tag size={28} strokeWidth={1.5} /> },
  { label: "New In", icon: <Sparkles size={28} strokeWidth={1.5} /> },
  { label: "Laundry", icon: <Shirt size={28} strokeWidth={1.5} /> },
  { label: "Glass Care", icon: <Droplets size={28} strokeWidth={1.5} /> },
  { label: "Floor Care", icon: <Home size={28} strokeWidth={1.5} /> },
  { label: "Toilet Care", icon: <SprayCan size={28} strokeWidth={1.5} /> },
  { label: "Eco Kits", icon: <Package size={28} strokeWidth={1.5} /> },
  { label: "Plant-Based", icon: <Shrub size={28} strokeWidth={1.5} /> },
];

interface CategoryBarProps {
  activeCategory: ProductCategory | null;
  onCategoryClick: (category: ProductCategory) => void;
}

const CategoryBar = ({ activeCategory, onCategoryClick }: CategoryBarProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => onCategoryClick(cat.label)}
            className="flex flex-col items-center gap-2 min-w-[70px] group cursor-pointer"
          >
            <div
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                activeCategory === cat.label
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-card text-primary group-hover:bg-accent group-hover:border-primary"
              }`}
            >
              {cat.icon}
            </div>
            <span
              className={`text-[11px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                activeCategory === cat.label
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBar;
