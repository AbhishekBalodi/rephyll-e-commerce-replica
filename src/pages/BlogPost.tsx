import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blogs";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const olderPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;
  const newerPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Link to="/" className="text-primary underline">Go back home</Link>
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
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
          <span>Posted on {post.date}</span>
          <span>{post.author}</span>
        </div>

        <div className="space-y-5">
          {post.content.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-3">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.includes("\n•")) {
              const lines = block.split("\n");
              return (
                <ul key={i} className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  {lines.map((line, j) => (
                    <li key={j} className="text-base" dangerouslySetInnerHTML={{ __html: line.replace(/^• /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-base text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>") }} />
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
          {olderPost ? (
            <Link to={`/blog/${olderPost.slug}`} className="text-sm font-semibold text-foreground underline hover:text-primary">
              Older Post
            </Link>
          ) : <span />}
          <Link to="/" className="text-sm font-semibold text-foreground underline hover:text-primary">
            Back to Home
          </Link>
          {newerPost ? (
            <Link to={`/blog/${newerPost.slug}`} className="text-sm font-semibold text-foreground underline hover:text-primary">
              Newer Post
            </Link>
          ) : <span />}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
