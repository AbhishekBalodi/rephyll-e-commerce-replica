import { Leaf, Baby, Heart, Recycle, PawPrint, ChevronLeft, ChevronRight } from "lucide-react";
import clover from "@/assets/clover-green.png";
import ifraShield from "@/assets/ifra-shield.png";

const BADGES = [
  { icon: <img src={ifraShield} alt="IFRA" className="w-[32px] h-[32px] object-contain" />, title: "IFRA Certified", subtitle: "Safe fragrance standards" },
  { icon: <Leaf size={32} className="text-[#064734]" />, title: "100% Natural", subtitle: "Plant-based formulas" },
  { icon: <Baby size={32} className="text-[#064734]" />, title: "Child Safe", subtitle: "Gentle and safe" },
  { icon: <PawPrint size={32} className="text-[#064734]" />, title: "Pet Friendly", subtitle: "No harmful ingredients" },
  { icon: <Heart size={32} className="text-[#064734]" />, title: "Dermatology Safe", subtitle: "Tested and approved" },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full bg-[#064734] py-20 overflow-hidden">
      {/* Clovers */}
      <img src={clover} className="absolute w-[180px] top-[20px] left-[40px] opacity-25 mix-blend-soft-light z-0" />
      <img src={clover} className="absolute w-[160px] top-[30px] right-[60px] opacity-25 mix-blend-soft-light z-0" />
      <img src={clover} className="absolute w-[220px] top-[140px] right-[0px] opacity-25 mix-blend-soft-light z-0" />
      <img src={clover} className="absolute w-[180px] bottom-[20px] left-[60px] opacity-25 mix-blend-soft-light z-0" />
      <img src={clover} className="absolute w-[220px] bottom-[0px] right-[40px] opacity-25 mix-blend-soft-light z-0" />

      <div className="relative z-10 max-w-[1200px] w-full px-6 mx-auto text-center text-white">
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", letterSpacing: "0px", textAlign: "center" }}>
          How We Are Making Difference
        </h2>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", marginTop: "8px", marginBottom: "48px" }}>
          Curated Combinations for Effortless Cleaning
        </p>

        {/* White container */}
        <div className="relative bg-white rounded-[24px] px-10 py-8 shadow-[0px_8px_40px_rgba(0,38,3,0.08)]">
          <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#EAF9C7] rounded-full flex items-center justify-center shadow">
            <ChevronLeft className="text-[#064734]" />
          </div>
          <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#EAF9C7] rounded-full flex items-center justify-center shadow">
            <ChevronRight className="text-[#064734]" />
          </div>

          <div className="flex justify-center items-center gap-[50px] flex-nowrap overflow-hidden">
            {BADGES.map((badge, i) => (
              <div key={i} className="w-[160px] flex flex-col items-center text-center gap-3 shrink-0">
                <div className="w-[68px] h-[68px] rounded-full flex items-center justify-center" style={{ background: "#F1FBD8" }}>
                  {badge.icon}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#064734]">{badge.title}</p>
                  <p className="text-[13px] text-[#064734] mt-1">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
