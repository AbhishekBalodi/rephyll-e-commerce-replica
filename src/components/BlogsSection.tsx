import { Link } from "react-router-dom";
import { useBlogList } from "@/hooks/useBlogList";
import { Loader2, ArrowRight } from "lucide-react";
import clover from "@/assets/clover-green-dark.png";

const BlogsSection = () => {
  const { blogs, loading, error } = useBlogList({
    page: 0,
    size: 3,
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
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <section className="py-24 text-white text-center bg-[#064734]">
        <Loader2 className="animate-spin mx-auto mb-2" />
        Loading...
      </section>
    );
  }

  if (error || !blogs || blogs.length === 0) {
    return (
      <section className="py-24 text-white text-center bg-[#064734]">
        No blogs available.
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(160deg,_#064734_75%,_#eaf5f0_100%)] py-28">

      {/* 🌿 CLOVERS (ABSOLUTE like Figma) */}
      <img src={clover} className="absolute w-[250px] top-[-40px] right-[0px]" style={{  opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[250px] top-[-120px] right-[300px]" style={{  opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[220px] bottom-[80px] left-[-80px]" style={{  opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[220px] bottom-[-40px] left-[350px]" style={{  opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[280px] bottom-[-80px] right-[0px]" style={{  opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[280px] top-[80px] left-[-120px]" style={{  opacity: 0.5, filter: "brightness(1.5)" }} />

      {/* CONTENT CONTAINER */}
      <div className="relative max-w-[1208px] mx-auto text-center text-white">

        {/* TITLE */}
        <h2 className="text-[40px] font-semibold leading-[60px]">
          Clean Living, Smarter Choices
        </h2>

        <p className="text-[20px] mt-2 mb-12 opacity-90">
          Curated Combinations for Effortless Cleaning
        </p>

        {/* CARDS */}
        <div className="flex justify-center gap-[30px]">

          {blogs.map((post) => (
            <div
              key={post.id}
              className="w-[380px] bg-white rounded-[24px] overflow-hidden shadow-md"
            >
              {/* IMAGE */}
              <img
                src={getImageUrl(post.banner)}
                alt={post.title}
                className="w-full h-[214px] object-cover"
              />

              {/* CONTENT */}
              <div className="p-5 flex flex-col gap-3 text-left">

                <p className="text-[14px] tracking-widest text-[#AAAAAA]">
                  {formatDate(post.createdDate)}
                </p>

                <h3 className="text-[18px] font-semibold text-[#121212] leading-[28px]">
                  {post.title}
                </h3>

                <div className="border-t border-[#DEDEDE]" />

                <p className="text-[16px] text-[#AAAAAA] leading-[26px] line-clamp-2">
                  {post.shortDescription}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="flex justify-center items-center gap-2 bg-[#CEF17B] text-[#064734] font-semibold py-3 rounded-[43px]"
                >
                  Read More <ArrowRight size={16} />
                </Link>

              </div>
            </div>
          ))}

        </div>

        {/* BUTTON */}
        <div className="mt-12">
          <Link
            to="/blogs"
            className="bg-white text-[#064734] px-6 py-2 rounded-md text-[18px]"
          >
            Explore More Blogs
          </Link>
        </div>

      </div>
    </section>
  );
};

export default BlogsSection;