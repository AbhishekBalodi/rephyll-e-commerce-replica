import { useState, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryBar from "@/components/CategoryBar";
import ProductCard from "@/components/ProductCard";
import { useProductsByCategory, useCategories } from "@/hooks/useProducts";
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

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const pageSize = 12;

  const { data: productsData, isLoading } = useProductsByCategory(category?.id, {
    page,
    size: pageSize,
    search: searchTerm.trim() || undefined,
  });

  const products = productsData?.content ?? [];
  const totalPages = productsData?.totalPages ?? 1;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price-high":
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "name-az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-za":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [products, sortBy]);



  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar/>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pt-[130px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
          <Link to="/" className="hover:underline" style={{ color: "#808080" }}>Home</Link>
          <span style={{ color: "#808080" }}>›</span>
          <span style={{ color: "#064734", fontWeight: 500 }}>{category?.name || slug}</span>
        </nav>

        <CategoryBar/>

        {/* Title & count */}
        <div className="mb-6">
          <h1 className="text-center my-9 "
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "40px",
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

        {/* Sort bar + search + Mobile filter toggle */}
        {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              placeholder="Search in this category..."
              className="w-full md:w-80 px-3 py-2 border rounded-lg outline-none"
              style={{ borderColor: "#E5E7EB", color: "#1A1A1A", fontFamily: "'Poppins', sans-serif" }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setPage(0);
                }}
                className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600"
                style={{ borderColor: "#E5E7EB" }}
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
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
        </div> */}

        {/* Products Grid */}
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse space-y-3 w-full max-w-[320px]">
                <div className="aspect-square rounded-lg bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center w-full">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center py-20">
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px", color: "#808080" }}>
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
