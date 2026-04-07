import { Leaf, Baby, Recycle, PawPrint } from "lucide-react";
import clover from "@/assets/clover-green-dark.png";
import ifraShield from "@/assets/ifra-shield.png";

const BADGES = [
  { icon: <img src={ifraShield} alt="IFRA" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] object-contain" />, title: "IFRA Certified", subtitle: "Safe fragrance standards" },
  { icon: <Leaf size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "100% Natural", subtitle: "Plant-based formulas" },
  { icon: <Baby size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Child Safe", subtitle: "Gentle and safe" },
  { icon: <PawPrint size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Pet Friendly", subtitle: "No harmful ingredients" },
  { icon: <Recycle size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Biodegradable", subtitle: "Eco-friendly formulas" },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full bg-[#064734] pt-8 pb-14 md:pt-10 md:pb-20 overflow-hidden">
      {/* Clovers */}
      <img src={clover} className="absolute w-[80px] h-[80px] md:w-[153px] md:h-[153px] top-[10px] left-[10px] md:top-[20px] md:left-[40px] z-0" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[80px] h-[80px] md:w-[153px] md:h-[153px] top-[10px] right-[10px] md:top-[30px] md:right-[60px] z-0" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] bottom-[20px] left-[60px] z-0 hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] bottom-[0px] right-[40px] z-0 hidden md:block" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />

      <div className="relative z-10 max-w-[1200px] w-full px-4 md:px-6 mx-auto text-center text-white">
        <h2 className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px] font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
          How We Are Making Difference
        </h2>
        <p className="text-[14px] md:text-[20px] leading-[22px] md:leading-[28px] mt-2 mb-6 md:mt-2 md:mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Curated Combinations for Effortless Cleaning
        </p>

        {/* White container */}
        <div className="relative bg-white rounded-[16px] md:rounded-[24px] px-4 py-6 md:px-10 md:py-8 shadow-[0px_8px_40px_rgba(0,38,3,0.08)]">
          <div className="grid grid-cols-2 gap-4 md:flex md:justify-center md:items-center md:gap-[50px] md:flex-nowrap md:overflow-hidden">
            {BADGES.map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 md:gap-3 md:w-[160px] md:shrink-0">
                <div className="w-[52px] h-[52px] md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center" style={{ background: "#F1FBD8" }}>
                  {badge.icon}
                </div>
                <div>
                  <p className="text-[13px] md:text-[16px] font-semibold text-[#064734]">{badge.title}</p>
                  <p className="text-[11px] md:text-[13px] text-[#064734] mt-0.5 md:mt-1">{badge.subtitle}</p>
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
