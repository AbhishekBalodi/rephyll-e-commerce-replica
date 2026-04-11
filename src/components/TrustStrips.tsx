import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_REVIEWS } from "@/data/reviews";
import avatarGarima from "@/assets/avatar-garima.jpg";
import avatarAkanksha from "@/assets/avatar-akanksha.jpg";
import avatarRenu from "@/assets/avatar-renu.jpg";
import avatarKetan from "@/assets/avatar-ketan.jpg";
import bgTestimonials from "@/assets/bg-testimonials.png";
import bgTestimonialsMobile from "@/assets/bg-testimonials-mobile.png";
import { useState } from "react";

const AVATAR_MAP: Record<string, string> = {
  "Garima": avatarGarima,
  "Akanksha": avatarAkanksha,
  "Renu": avatarRenu,
  "Ketan": avatarKetan,
};

const TOP_REVIEWS = DUMMY_REVIEWS.filter((r) => r.rating >= 4).slice(0, 6);

const TrustStrips = () => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileReview = TOP_REVIEWS[mobileIndex];

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "360px" }}>
      {/* Desktop bg */}
      <img src={bgTestimonials} alt="" aria-hidden="true" className="pointer-events-none select-none hidden md:block absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />
      {/* Mobile bg */}
      <img src={bgTestimonialsMobile} alt="" aria-hidden="true" className="pointer-events-none select-none md:hidden absolute inset-0 w-full h-full object-cover" style={{ zIndex: 0 }} />

      <div className="relative max-w-[1440px] mx-auto text-center px-4 pt-8 pb-16 md:pt-10 md:pb-24" style={{ zIndex: 1 }}>
        <h2
          className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, color: "#064734" }}
        >
          What Our Client Say About Us
        </h2>

        <p
          className="mt-2 md:mt-3 max-w-[800px] mx-auto text-[14px] md:text-[20px] leading-[22px] md:leading-[28px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, color: "#064734" }}
        >
          Discover the experiences of our satisfied customers! Read their testimonials to learn how our services have made a positive impact on their businesses.
        </p>

        {/* CARDS - Desktop (NO arrows) */}
        <div className="relative mt-16 hidden md:block">
          <div className="flex justify-center gap-[24px]">
            {TOP_REVIEWS.slice(0, 4).map((review) => (
              <div key={review.id} className="relative w-[313px] bg-white rounded-[24px] shadow-md pt-[90px] pb-6 px-6 flex flex-col items-center">
                <div className="absolute -top-[60px] w-[120px] h-[120px] rounded-full border-[8px] border-white overflow-hidden shadow-md">
                  <img src={AVATAR_MAP[review.name] || avatarGarima} alt={review.name} className="w-full h-full object-cover rounded-full" loading="lazy" />
                </div>
                <div className="flex gap-[4px] mt-2 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} size={20} className={s <= Math.floor(review.rating) ? "text-[#FDD264] fill-[#FDD264]" : "text-[#FFEEC1] fill-[#FFEEC1]"} />
                  ))}
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "136%", color: "#2C2C2C", width: "249px" }} className="text-center mb-4 line-clamp-4">
                  "{review.content}"
                </p>
                <h4 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "18px", color: "#2C2C2C" }}>{review.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CARDS - Mobile */}
        <div className="relative mt-10 md:hidden">
          <div className="flex justify-center">
            <div className="relative w-full max-w-[300px] bg-white rounded-[24px] shadow-md pt-[70px] pb-5 px-5 flex flex-col items-center">
              <div className="absolute -top-[50px] w-[100px] h-[100px] rounded-full border-[6px] border-white overflow-hidden shadow-md">
                <img src={AVATAR_MAP[mobileReview.name] || avatarGarima} alt={mobileReview.name} className="w-full h-full object-cover rounded-full" loading="lazy" />
              </div>
              <div className="flex gap-[4px] mt-2 mb-3">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={18} className={s <= Math.floor(mobileReview.rating) ? "text-[#FDD264] fill-[#FDD264]" : "text-[#FFEEC1] fill-[#FFEEC1]"} />
                ))}
              </div>
              <p className="text-center mb-3 text-[14px] leading-[140%] text-[#2C2C2C] line-clamp-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                "{mobileReview.content}"
              </p>
              <h4 className="text-[16px] font-semibold text-[#2C2C2C]" style={{ fontFamily: "'Poppins', sans-serif" }}>{mobileReview.name}</h4>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => setMobileIndex((p) => (p > 0 ? p - 1 : TOP_REVIEWS.length - 1))} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setMobileIndex((p) => (p < TOP_REVIEWS.length - 1 ? p + 1 : 0))} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrips;
