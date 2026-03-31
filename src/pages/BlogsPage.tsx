import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogList } from "@/hooks/useBlogList";
import { useBlogCategories } from "@/hooks/useBlogCategories";
import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { CustomerBlogCatalogDto } from "@/types/api";

const BlogCard = ({ post }: { post: CustomerBlogCatalogDto }) => {
  const getImageUrl = (relativePath: string): string => {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'https://www.rephyl.com';
    return `${baseUrl}${relativePath}`;
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden break-inside-avoid mb-4">
      <img
        src={getImageUrl(post.banner)}
        alt={post.title}
        className="w-full h-[180px] object-cover"
        loading="lazy"
      />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
            {post.readingTime} min read
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
            {formatDate(post.createdDate)}
          </span>
        </div>
        <h3 className="text-sm font-bold text-foreground mb-2 leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
          {post.shortDescription}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

const BlogsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState("");

  const page = parseInt(searchParams.get("page") || "0");
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId") ? parseInt(searchParams.get("categoryId")!) : undefined;

  const { blogs, loading, error, pagination } = useBlogList({
    page,
    size: 20,
    search,
    categoryId,
    sortBy: "id",
    direction: "DESC",
  });

  const { categories } = useBlogCategories();

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (localSearch) params.set("search", localSearch);
    params.set("page", "0");
    setSearchParams(params);
  };

  const handleCategoryFilter = (id: number | null) => {
    const params = new URLSearchParams();
    if (id) params.set("categoryId", id.toString());
    if (search) params.set("search", search);
    params.set("page", "0");
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (search) params.set("search", search);
    if (categoryId) params.set("categoryId", categoryId.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
          Our Blog
        </h1>
        <p className="text-muted-foreground mb-10">
          Tips, guides, and insights on eco-friendly cleaning for Indian homes
        </p>

        {/* Search and Filter Section */}
        <div className="mb-10 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryFilter(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                !categoryId
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  categoryId === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                {cat.name} ({cat.blogCount})
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-destructive mb-2">Failed to load blogs</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && (!blogs || blogs.length === 0) && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No blogs found matching your criteria.</p>
              <button
                onClick={() => {
                  setLocalSearch("");
                  handleCategoryFilter(null);
                }}
                className="text-primary hover:underline font-semibold"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Blog List */}
        {!loading && blogs && blogs.length > 0 && (
          <>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {blogs.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={pagination.first}
                  className="p-2 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: pagination.totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                        page === i
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-foreground hover:bg-secondary"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={pagination.last}
                  className="p-2 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={20} />
                </button>

                <span className="text-sm text-muted-foreground ml-4">
                  Page {page + 1} of {pagination.totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogsPage;
