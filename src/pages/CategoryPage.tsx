import { useState, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProductList, useCategories } from "@/hooks/useProducts";
import type { ApiProduct } from "@/types/api";

type SortOption = "relevance" | "price-low" | "price-high" | "name-az" | "name-za";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const state = location.state as { categoryId?: number; categoryName?: string } | null;

  const { data: categories } = useCategories();

  // Find category by slug or state
  const category = useMemo(() => {
    if (state?.categoryId && state?.categoryName) {
      return { id: state.categoryId, name: state.categoryName };
    }
    if (categories && slug) {
      const found = categories.find(
        (c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === slug
      );
      if (found) return { id: found.id, name: found.name };
    }
    return null;
  }, [categories, slug, state]);

  const { data: productsData, isLoading } = useProductList({
    category: category?.id,
    size: 100,
  });

  const products = productsData?.content ?? [];

  // Filter state
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    brand: true,
    price: true,
    weight: false,
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Extract filter options from products
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => { if (p.brandName) set.add(p.brandName); });
    return Array.from(set).sort();
  }, [products]);

  const priceRanges: { label: string; range: [number, number] }[] = [
    { label: "Under ₹200", range: [0, 200] },
    { label: "₹200 – ₹500", range: [200, 500] },
    { label: "₹500 – ₹1000", range: [500, 1000] },
    { label: "Above ₹1000", range: [1000, 99999] },
  ];

  const weightOptions = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => { if (p.productWeight) set.add(p.productWeight); });
    return Array.from(set).sort();
  }, [products]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);

  // Apply filters & sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brandName));
    }

    if (priceRange) {
      result = result.filter((p) => {
        const price = p.variants.length > 0
          ? Math.min(...p.variants.map((v) => v.sellingPrice))
          : (p.wholesalePrice ?? p.mrp);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    if (selectedWeights.length > 0) {
      result = result.filter((p) => p.productWeight && selectedWeights.includes(p.productWeight));
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => getPrice(a) - getPrice(b));
        break;
      case "price-high":
        result.sort((a, b) => getPrice(b) - getPrice(a));
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [products, selectedBrands, priceRange, selectedWeights, sortBy]);

  const toggleFilter = (key: string) => {
    setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleWeight = (weight: string) => {
    setSelectedWeights((prev) =>
      prev.includes(weight) ? prev.filter((w) => w !== weight) : [...prev, weight]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setPriceRange(null);
    setSelectedWeights([]);
    setSortBy("relevance");
  };

  const hasActiveFilters = selectedBrands.length > 0 || priceRange !== null || selectedWeights.length > 0;

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "18px", color: "#064734" }}>
          FILTERS
        </h3>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-sm underline" style={{ color: "#064734" }}>
            Clear All
          </button>
        )}
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <button
            onClick={() => toggleFilter("brand")}
            className="flex items-center justify-between w-full mb-3"
          >
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A1A1A" }}>
              BRAND
            </span>
            {expandedFilters.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedFilters.brand && (
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 rounded accent-[#064734]"
                  />
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: "#464646" }}>
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Filter */}
      <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
        <button
          onClick={() => toggleFilter("price")}
          className="flex items-center justify-between w-full mb-3"
        >
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A1A1A" }}>
            PRICE
          </span>
          {expandedFilters.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedFilters.price && (
          <div className="space-y-2">
            {priceRanges.map((pr) => (
              <label key={pr.label} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={priceRange?.[0] === pr.range[0] && priceRange?.[1] === pr.range[1]}
                  onChange={() => setPriceRange(
                    priceRange?.[0] === pr.range[0] && priceRange?.[1] === pr.range[1] ? null : pr.range
                  )}
                  className="w-4 h-4 accent-[#064734]"
                />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: "#464646" }}>
                  {pr.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Weight Filter */}
      {weightOptions.length > 0 && (
        <div className="border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
          <button
            onClick={() => toggleFilter("weight")}
            className="flex items-center justify-between w-full mb-3"
          >
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "14px", color: "#1A1A1A" }}>
              WEIGHT
            </span>
            {expandedFilters.weight ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedFilters.weight && (
            <div className="space-y-2">
              {weightOptions.map((w) => (
                <label key={w} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedWeights.includes(w)}
                    onChange={() => toggleWeight(w)}
                    className="w-4 h-4 rounded accent-[#064734]"
                  />
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: "#464646" }}>
                    {w}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <Link to="/" className="hover:underline" style={{ color: "#808080" }}>Home</Link>
          <span style={{ color: "#808080" }}>›</span>
          <span style={{ color: "#064734", fontWeight: 500 }}>{category?.name || slug}</span>
        </nav>

        {/* Title & count */}
        <div className="mb-6">
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "28px",
              color: "#064734",
              marginBottom: "8px",
            }}
          >
            {category?.name || slug}
          </h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", color: "#808080" }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"} found
          </p>
        </div>

        {/* Sort bar + Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg border"
            style={{ borderColor: "#064734", color: "#064734" }}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "14px", color: "#1A1A1A" }}>
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border rounded-lg px-3 py-2 text-sm bg-background"
              style={{ fontFamily: "'Poppins', sans-serif", borderColor: "#E5E7EB", color: "#464646" }}
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-az">Name: A to Z</option>
              <option value="name-za">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - desktop */}
          <aside className="hidden md:block w-[260px] flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Mobile filter drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-background p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "18px" }}>Filters</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="text-lg">✕</button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Products grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse space-y-3">
                    <div className="aspect-square rounded-lg bg-muted" />
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-4 w-1/2 rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", color: "#808080" }}>
                  No products found in this category.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-6 py-2 rounded-lg text-sm font-medium"
                    style={{ background: "#064734", color: "#FFFFFF" }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

function getPrice(p: ApiProduct): number {
  if (p.variants.length > 0) return Math.min(...p.variants.map((v) => v.sellingPrice));
  return p.wholesalePrice ?? p.mrp;
}

export default CategoryPage;
