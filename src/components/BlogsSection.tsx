import { Link } from "react-router-dom";
import { BLOG_POSTS } from "@/data/blogs";

const BlogsSection = () => {
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
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="group">
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
                  {post.readTime} min read
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-secondary text-foreground px-3 py-1 rounded-full">
                  {post.date}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-foreground mb-2 leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {post.excerpt}
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
