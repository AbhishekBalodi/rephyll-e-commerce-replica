import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProductList } from "@/hooks/useProducts";
import { Loader2, Search } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, isLoading } = useProductList(
    q.trim() ? { search: q.trim(), size: 48, page: 0 } : undefined
  );

  const products = data?.content ?? [];

  useEffect(() => {
    const title = q.trim()
      ? `Search results for "${q}" | Rephyl`
      : "Search | Rephyl";
    document.title = title;
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute(
        "content",
        q.trim()
          ? `Find plant-powered home care products matching "${q}" on Rephyl.`
          : "Search Rephyl for eco-friendly, plant-powered home care products."
      );
    }
  }, [q]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[104px] pb-16">
        <div className="max-w-[1380px] mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="py-8 border-b border-border mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground">Search</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#064734] mt-2">
              {q.trim() ? (
                <>Search results for <span className="italic">&ldquo;{q}&rdquo;</span></>
              ) : (
                "Search Products"
              )}
            </h1>
            {!isLoading && q.trim() && (
              <p className="mt-1 text-sm text-muted-foreground">
                {products.length === 0
                  ? "No products found."
                  : `${products.length} product${products.length === 1 ? "" : "s"} found`}
              </p>
            )}
          </div>

          {/* Results */}
          {!q.trim() ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-4">
              <Search size={48} strokeWidth={1.5} />
              <p className="text-lg">Type something in the search bar to find products.</p>
            </div>
          ) : isLoading ? (
            <div className="flex justify-center py-24">
              <Loader2 size={36} className="animate-spin text-[#064734]" />
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3">
              <Search size={48} strokeWidth={1.5} />
              <p className="text-lg font-medium">No products found for &ldquo;{q}&rdquo;</p>
              <p className="text-sm">Try a different search term or browse our categories.</p>
              <Link
                to="/shop"
                className="mt-4 px-6 py-2 bg-[#064734] text-white rounded-full text-sm font-medium hover:bg-[#064734]/90 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-7 items-start">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
