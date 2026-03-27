import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { DUMMY_REVIEWS } from "@/data/reviews";
import clover from "@/assets/clover-green.png";

const TOP_REVIEWS = DUMMY_REVIEWS.filter((r) => r.rating >= 4).slice(0, 6);

const TrustStrips = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-[#CEF17B] to-white py-20">
      {/* Clovers */}
      <img src={clover} className="absolute w-[290px] opacity-30 top-[-80px] left-[320px]" />
      <img src={clover} className="absolute w-[290px] opacity-30 top-[60px] left-[-60px]" />
      <img src={clover} className="absolute w-[220px] opacity-30 bottom-[40px] left-[0px]" />
      <img src={clover} className="absolute w-[260px] opacity-20 bottom-[40px] right-[0px]" />
      <img src={clover} className="absolute w-[240px] opacity-20 top-[50px] right-[0px]" />
      <img src={clover} className="absolute w-[180px] opacity-20 bottom-[100px] right-[200px]" />

      <div className="relative max-w-[1236px] mx-auto text-center">
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", letterSpacing: "0px", textAlign: "center", color: "#064734" }}>
          What Our Client Say About Us
        </h2>
        <p className="text-[20px] text-[#064734] mt-3 max-w-[800px] mx-auto">
          Discover the experiences of our satisfied customers! Read their testimonials to learn how our services have made a positive impact on their businesses.
        </p>

        <div className="relative mt-12">
          <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/70 rounded-full flex items-center justify-center shadow">
            <ChevronLeft />
          </div>
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-[60px] h-[60px] bg-white/70 rounded-full flex items-center justify-center shadow">
            <ChevronRight />
          </div>

          <div className="w-full overflow-hidden">
            <div className="flex justify-center gap-[24px] max-w-[1327px] mx-auto">
              {TOP_REVIEWS.slice(0, 4).map((review) => (
                <div key={review.id} className="relative w-[313px] bg-white rounded-[24px] shadow-md flex flex-col items-center px-6 pt-[80px] pb-5">
                  <div className="absolute top-[10px] w-[120px] h-[120px] rounded-full border-[8px] border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?img=${review.id}`} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} size={20} className={s <= Math.floor(review.rating) ? "fill-[#FDD264] text-[#FDD264]" : "fill-[#FFEEC1] text-[#FFEEC1]"} />
                    ))}
                  </div>
                  <p className="text-[15px] text-[#2C2C2C] text-center leading-[22px] mt-3 mb-3 line-clamp-4">"{review.content}"</p>
                  <h4 className="text-[18px] font-semibold text-[#2C2C2C]">{review.name}</h4>
                  <p className="text-[14px] text-[#777777]">Marketing Manager</p>
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
