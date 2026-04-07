import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_REVIEWS } from "@/data/reviews";
import cloverLime from "@/assets/clover-lime.png";
import avatarTushar from "@/assets/avatar-tushar.jpg";
import avatarDeepika from "@/assets/avatar-deepika.jpg";
import avatarAnanya from "@/assets/avatar-ananya.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import { useState } from "react";

const AVATAR_MAP: Record<string, string> = {
  "Tushar Gupta": avatarTushar,
  "Deepika Rao": avatarDeepika,
  "Ananya Nair": avatarAnanya,
  "Priya Sharma": avatarPriya,
};

const TOP_REVIEWS = DUMMY_REVIEWS.filter((r) => r.rating >= 4).slice(0, 6);

const TrustStrips = () => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileReview = TOP_REVIEWS[mobileIndex];

  return (
    <section
      className="relative w-full overflow-hidden pt-8 pb-16 md:pt-10 md:pb-24"
      style={{
       background: "rgba(206, 241, 123, 0.3)",
      }}
    >
      {/* CLOVERS - desktop */}
      <img src={cloverLime} className="absolute w-[153px] h-[153px] top-[20px] left-[300px] hidden md:block" style={{ opacity: 0.5 }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] top-[80px] left-[-60px] hidden md:block" style={{ opacity: 0.5 }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] bottom-[20px] left-[0px] hidden md:block" style={{ opacity: 0.5 }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] bottom-[40px] right-[0px] hidden md:block" style={{ opacity: 0.5 }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] top-[50px] right-[0px] hidden md:block" style={{ opacity: 0.5 }} />

      <div className="relative max-w-[1236px] mx-auto text-center px-4">

        {/* HEADING */}
        <h2
          className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            color: "#064734",
          }}
        >
          What Our Client Say About Us
        </h2>

        {/* SUBTEXT */}
        <p
          className="mt-2 md:mt-3 max-w-[800px] mx-auto text-[14px] md:text-[20px] leading-[22px] md:leading-[28px]"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: "#064734",
          }}
        >
          Discover the experiences of our satisfied customers! Read their testimonials to learn how our services have made a positive impact on their businesses.
        </p>

        {/* CARDS - Desktop */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/80 rounded-full flex items-center justify-center shadow cursor-pointer">
            <ChevronLeft />
          </div>

          <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/80 rounded-full flex items-center justify-center shadow cursor-pointer">
            <ChevronRight />
          </div>

          <div className="flex justify-center gap-[24px]">
            {TOP_REVIEWS.slice(0, 4).map((review) => (
              <div
                key={review.id}
                className="relative w-[313px] bg-white rounded-[24px] shadow-md pt-[90px] pb-6 px-6 flex flex-col items-center"
              >
                <div className="absolute -top-[60px] w-[120px] h-[120px] rounded-full border-[8px] border-white overflow-hidden shadow-md">
                  <img
                    src={AVATAR_MAP[review.name] || avatarTushar}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>

                <div className="flex gap-[4px] mt-2 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={20} className={s <= Math.floor(review.rating) ? "text-[#FDD264] fill-[#FDD264]" : "text-[#FFEEC1] fill-[#FFEEC1]"} />
                  ))}
                </div>

                <p
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "136%", color: "#2C2C2C", width: "249px" }}
                  className="text-center mb-4 line-clamp-4"
                >
                  "{review.content}"
                </p>

                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "18px", color: "#2C2C2C" }}>
                  {review.name}
                </h4>

                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "100%", color: "#777777" }}>
                  Marketing Manager
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CARDS - Mobile: single card with arrows */}
        <div className="relative mt-10 md:hidden">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[300px] bg-white rounded-[24px] shadow-md pt-[70px] pb-5 px-5 flex flex-col items-center">
              <div className="absolute -top-[50px] w-[100px] h-[100px] rounded-full border-[6px] border-white overflow-hidden shadow-md">
                <img
                  src={AVATAR_MAP[mobileReview.name] || avatarTushar}
                  alt={mobileReview.name}
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                />
              </div>

              <div className="flex gap-[4px] mt-2 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={18} className={s <= Math.floor(mobileReview.rating) ? "text-[#FDD264] fill-[#FDD264]" : "text-[#FFEEC1] fill-[#FFEEC1]"} />
                ))}
              </div>

              <p className="text-center mb-3 text-[14px] leading-[140%] text-[#2C2C2C] line-clamp-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                "{mobileReview.content}"
              </p>

              <h4 className="text-[16px] font-semibold text-[#2C2C2C]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {mobileReview.name}
              </h4>

              <p className="text-[14px] text-[#777777]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Marketing Manager
              </p>
            </div>
          </div>

          {/* Mobile nav arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setMobileIndex((p) => (p > 0 ? p - 1 : TOP_REVIEWS.length - 1))}
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setMobileIndex((p) => (p < TOP_REVIEWS.length - 1 ? p + 1 : 0))}
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrips;
