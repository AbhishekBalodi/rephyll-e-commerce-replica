import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useBlogDetail } from "@/hooks/useBlogDetail";
import { useBlogList } from "@/hooks/useBlogList";
import { ArrowLeft, Loader2, Share2 } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const { blog, loading, error } = useBlogDetail(slug);
  const { blogs: allBlogs } = useBlogList({
    page: 0,
    size: 100,
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

  // Find current blog index and adjacent blogs
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
  const olderPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const newerPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          {error && <p className="text-destructive mb-4">{error.message}</p>}
          <Link to="/" className="text-primary underline hover:no-underline">
            Go back home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero image */}
      <div className="w-full h-[300px] md:h-[460px] overflow-hidden">
        <img
          src={getImageUrl(blog.banner)}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span>Posted on {formatDate(blog.createdDate)}</span>
              <span>By {blog.author}</span>
              <span>{blog.readingTime} min read</span>
            </div>
            {blog.updatedDate && (
              <span className="text-xs">Updated {formatDate(blog.updatedDate)}</span>
            )}
          </div>
        </div>

        {/* Main Content - HTML provided by backend is safe */}
        <div className="prose prose-invert max-w-none mb-12">
          <div
            className="text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{
              __html: blog.description,
            }}
          />
        </div>

        {/* SEO Meta Info (optional display) */}
        {blog.metaKeywords && (
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Keywords:</strong> {blog.metaKeywords}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-border gap-4 flex-wrap">
          <div className="flex-1 min-w-[120px]">
            {olderPost ? (
              <Link
                to={`/blog/${olderPost.slug}`}
                className="text-sm font-semibold text-foreground underline hover:text-primary transition-colors flex items-center gap-1"
              >
                ← Older Post
              </Link>
            ) : (
              <span />
            )}
          </div>

          <Link
            to="/blogs"
            className="text-sm font-semibold text-foreground underline hover:text-primary transition-colors"
          >
            All Posts
          </Link>

          <div className="flex-1 min-w-[120px] text-right">
            {newerPost ? (
              <Link
                to={`/blog/${newerPost.slug}`}
                className="text-sm font-semibold text-foreground underline hover:text-primary transition-colors flex items-center gap-1 justify-end"
              >
                Newer Post →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Share2 size={16} /> Share this post
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(blog.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors"
            >
              LinkedIn
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }}
              className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-semibold hover:bg-secondary/80 transition-colors"
            >
              Copy Link
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
