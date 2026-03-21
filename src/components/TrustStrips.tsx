import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_REVIEWS } from "@/data/reviews";
import clover from "@/assets/clover-green.png";

const TOP_REVIEWS = DUMMY_REVIEWS.filter((r) => r.rating >= 4).slice(0, 6);

const TrustStrips = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#CEF17B] to-white py-28">

      {/* 🌿 CLOVERS (ABSOLUTE like Figma) */}
      <img src={clover} className="absolute w-[290px] opacity-30 top-[-80px] left-[320px]" />
      <img src={clover} className="absolute w-[290px] opacity-30 top-[60px] left-[-60px]" />
      <img src={clover} className="absolute w-[220px] opacity-30 bottom-[40px] left-[0px]" />
      <img src={clover} className="absolute w-[260px] opacity-20 bottom-[40px] right-[0px]" />
      <img src={clover} className="absolute w-[240px] opacity-20 top-[50px] right-[0px]" />
      <img src={clover} className="absolute w-[180px] opacity-20 bottom-[100px] right-[200px]" />

      {/* CONTENT */}
      <div className="relative max-w-[1236px] mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-[40px] font-semibold text-[#064734] leading-[60px]">
          What Our Client Say About Us
        </h2>

        <p className="text-[20px] text-[#064734] mt-3 max-w-[800px] mx-auto">
          Discover the experiences of our satisfied customers! Read their testimonials to learn how our services have made a positive impact on their businesses.
        </p>

        {/* CAROUSEL WRAPPER */}
        <div className="relative mt-16">

          {/* LEFT ARROW */}
          <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/70 rounded-full flex items-center justify-center shadow">
            <ChevronLeft />
          </div>

          {/* RIGHT ARROW */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/70 rounded-full flex items-center justify-center shadow">
            <ChevronRight />
          </div>

          {/* SCROLL AREA */}
          {/* FULL WIDTH CARDS (NO SCROLLBAR) */}
<div className="w-full overflow-hidden mt-16">
  <div className="flex justify-center gap-[24px] max-w-[1327px] mx-auto">

    {TOP_REVIEWS.slice(0, 4).map((review) => (
      <div
        key={review.id}
        className="relative w-[313px] bg-white rounded-[24px] shadow-md flex flex-col items-center px-6 pt-[80px] pb-4"
      >

        {/* AVATAR */}
        <div className="absolute top-[-40px] w-[100px] h-[100px] rounded-full border-[6px] border-white overflow-visible shadow-lg">
          <img
            src={`https://i.pravatar.cc/150?img=${review.id}`}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* STARS */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={20}
              className={
                s <= Math.floor(review.rating)
                  ? "fill-[#FDD264] text-[#FDD264]"
                  : "fill-[#FFEEC1] text-[#FFEEC1]"
              }
            />
          ))}
        </div>

        {/* TEXT */}
        <p className="text-[16px] text-[#2C2C2C] text-center leading-[22px] mb-4 line-clamp-5">
          "{review.content}"
        </p>

        {/* NAME */}
        <h4 className="text-[20px] font-semibold text-[#2C2C2C]">
          {review.name}
        </h4>

        <p className="text-[16px] text-[#777777]">
          Marketing Manager
        </p>

      </div>
    ))}

  </div>
</div>
        </div>

      </div>
    </section>
  );
};

export default TrustStrips;