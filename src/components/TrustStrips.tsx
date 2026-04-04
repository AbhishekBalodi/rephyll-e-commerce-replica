import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_REVIEWS } from "@/data/reviews";
import cloverLime from "@/assets/clover-lime.png";
import avatarTushar from "@/assets/avatar-tushar.jpg";
import avatarDeepika from "@/assets/avatar-deepika.jpg";
import avatarAnanya from "@/assets/avatar-ananya.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";

const AVATAR_MAP: Record<string, string> = {
  "Tushar Gupta": avatarTushar,
  "Deepika Rao": avatarDeepika,
  "Ananya Nair": avatarAnanya,
  "Priya Sharma": avatarPriya,
};

const TOP_REVIEWS = DUMMY_REVIEWS.filter((r) => r.rating >= 4).slice(0, 6);

const TrustStrips = () => {
  return (
    <section
      className="relative w-full overflow-hidden pt-10 pb-24"
      style={{
       background: "rgba(206, 241, 123, 0.3)",
      }}
    >
      {/* CLOVERS */}
      <img src={cloverLime} className="absolute w-[153px] h-[153px] top-[20px] left-[300px]" style={{  opacity: 0.5 }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] top-[80px] left-[-60px]" style={{  opacity: 0.5, }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] bottom-[20px] left-[0px]" style={{  opacity: 0.5,  }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] bottom-[40px] right-[0px]" style={{  opacity: 0.5,  }} />
      <img src={cloverLime} className="absolute w-[153px] h-[153px] top-[50px] right-[0px]" style={{  opacity: 0.5,  }} />

      <div className="relative max-w-[1236px] mx-auto text-center px-4">

        {/* HEADING */}
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "60px",
            color: "#064734",
          }}
        >
          What Our Client Say About Us
        </h2>

        {/* SUBTEXT */}
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "28px",
            color: "#064734",
          }}
          className="mt-3 max-w-[800px] mx-auto"
        >
          Discover the experiences of our satisfied customers! Read their testimonials to learn how our services have made a positive impact on their businesses.
        </p>

        {/* CARDS */}
        <div className="relative mt-16">

          {/* ARROWS */}
          <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/80 rounded-full flex items-center justify-center shadow">
            <ChevronLeft />
          </div>

          <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/80 rounded-full flex items-center justify-center shadow">
            <ChevronRight />
          </div>

          <div className="flex justify-center gap-[24px]">
            {TOP_REVIEWS.slice(0, 4).map((review) => (
              <div
                key={review.id}
                className="relative w-[313px] bg-white rounded-[24px] shadow-md pt-[90px] pb-6 px-6 flex flex-col items-center"
              >

                {/* PROFILE IMAGE */}
                <div className="absolute -top-[60px] w-[120px] h-[120px] rounded-full border-[8px] border-white overflow-hidden shadow-md">
                  <img
                    src={AVATAR_MAP[review.name] || avatarTushar}
                    alt={review.name}
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                  />
                </div>

                {/* STARS */}
                <div className="flex gap-[4px] mt-2 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <Star
                      key={s}
                      size={20}
                      className={
                        s <= Math.floor(review.rating)
                          ? "text-[#FDD264] fill-[#FDD264]"
                          : "text-[#FFEEC1] fill-[#FFEEC1]"
                      }
                    />
                  ))}
                </div>

                {/* TEXT */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "136%",
                    color: "#2C2C2C",
                    width: "249px",
                  }}
                  className="text-center mb-4 line-clamp-4"
                >
                  "{review.content}"
                </p>

                {/* NAME */}
                <h4
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "18px",
                    color: "#2C2C2C",
                  }}
                >
                  {review.name}
                </h4>

                {/* DESIGNATION */}
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "100%",
                    color: "#777777",
                  }}
                >
                  Marketing Manager
                </p>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrips;