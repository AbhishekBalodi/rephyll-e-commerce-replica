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
    const baseUrl = import.meta.env.VITE_BASE_URL || 'https://www.rephyl.com';
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
      <section className="py-16 md:py-24 text-white text-center bg-[#064734]">
        <Loader2 className="animate-spin mx-auto mb-2" />
        Loading...
      </section>
    );
  }

  if (error || !blogs || blogs.length === 0) {
    return (
      <section className="py-16 md:py-24 text-white text-center bg-[#064734]">
        No blogs available.
      </section>
    );
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#064734] pt-8 pb-16 md:pt-10 md:pb-28">
      {/* CLOVERS - desktop only */}
      <img src={clover} className="absolute w-[153px] h-[153px] top-[0px] left-[20px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[0px] right-[0px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[325px] left-[20px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[650px] left-[400px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[0px] left-[400px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[650px] left-[1000px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[650px] left-[20px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[0px] left-[1020px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.2)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[650px] left-[1320px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[325px] left-[1320px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[325px] left-[400px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[325px] left-[1000px] hidden md:block" style={{ opacity: 0.9, filter: "brightness(1.3)" }} />

      {/* CONTENT CONTAINER */}
      <div className="relative max-w-[1208px] mx-auto text-center text-white px-4">

        {/* TITLE */}
        <h2 className="text-[24px] md:text-[40px] font-semibold leading-[36px] md:leading-[60px]">
          Clean Living, Smarter Choices
        </h2>

        <p className="text-[14px] md:text-[20px] mt-2 mb-8 md:mb-12 opacity-90">
          Curated Combinations for Effortless Cleaning
        </p>

        {/* CARDS */}
        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-[30px]">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="w-full md:w-[380px] bg-white rounded-[20px] md:rounded-[24px] overflow-hidden shadow-md"
            >
              <img
                src={getImageUrl(post.banner)}
                alt={post.title}
                className="w-full h-[180px] md:h-[214px] object-cover"
              />

              <div className="p-4 md:p-5 flex flex-col gap-2 md:gap-3 text-left">
                <p className="text-[12px] md:text-[14px] tracking-widest text-[#AAAAAA]">
                  {formatDate(post.createdDate)}
                </p>

                <h3 className="text-[16px] md:text-[18px] font-semibold text-[#121212] leading-[24px] md:leading-[28px]">
                  {post.title}
                </h3>

                <div className="border-t border-[#DEDEDE]" />

                <p className="text-[14px] md:text-[16px] text-[#AAAAAA] leading-[22px] md:leading-[26px] line-clamp-2">
                  {post.shortDescription}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="flex justify-center items-center gap-2 bg-[#CEF17B] text-[#064734] font-semibold py-2.5 md:py-3 rounded-[43px] text-[14px] md:text-[16px]"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-8 md:mt-12">
          <Link
            to="/blogs"
            className="bg-white text-[#064734] px-5 md:px-6 py-2 rounded-md text-[16px] md:text-[18px]"
          >
            Explore More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
