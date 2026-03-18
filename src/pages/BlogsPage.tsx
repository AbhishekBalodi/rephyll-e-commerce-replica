import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blogs";

const BlogCard = ({ post }: { post: typeof BLOG_POSTS[0] }) => (
  <div className="bg-card border border-border rounded-lg overflow-hidden break-inside-avoid mb-4">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-[180px] object-cover"
    />
    <div className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
          {post.readTime} min read
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
          {post.date}
        </span>
      </div>
      <h3 className="text-sm font-bold text-foreground mb-2 leading-snug line-clamp-2">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
        {post.excerpt}
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

const BlogsPage = () => {
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

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogsPage;
