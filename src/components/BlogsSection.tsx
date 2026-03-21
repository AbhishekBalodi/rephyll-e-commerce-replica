import { Link } from "react-router-dom";
import { useBlogList } from "@/hooks/useBlogList";
import { Loader2 } from "lucide-react";

const BlogsSection = () => {
  const { blogs, loading, error } = useBlogList({
    page: 0,
    size: 4, // Show 4 latest blogs on home page
    sortBy: "id",
    direction: "DESC",
  });

  const getImageUrl = (relativePath: string): string => {
    const baseUrl = import.meta.env.VITE_BASE_URL || 'https://www.brandingidiots.tech';
    return `${baseUrl}${relativePath}`;
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="block text-center text-sm font-semibold text-foreground border border-border rounded-full w-fit mx-auto px-5 py-1.5 mb-4">
            Blogs
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Our Latest Insights
          </h2>

          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading blogs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="block text-center text-sm font-semibold text-foreground border border-border rounded-full w-fit mx-auto px-5 py-1.5 mb-4">
            Blogs
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Our Latest Insights
          </h2>

          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-destructive mb-2">Failed to load blogs</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <span className="block text-center text-sm font-semibold text-foreground border border-border rounded-full w-fit mx-auto px-5 py-1.5 mb-4">
            Blogs
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
            Our Latest Insights
          </h2>

          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">No blogs available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <span className="block text-center text-sm font-semibold text-foreground border border-border rounded-full w-fit mx-auto px-5 py-1.5 mb-4">
          Blogs
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
          Our Latest Insights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((post) => (
            <div key={post.id} className="group">
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={getImageUrl(post.banner)}
                  alt={post.title}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
                  {post.readingTime} min read
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
                  {formatDate(post.createdDate)}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-foreground mb-2 leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {post.shortDescription}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-sm font-semibold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
