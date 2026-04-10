import { Leaf, Baby, Recycle, PawPrint } from "lucide-react";
import ifraShield from "@/assets/ifra-shield.png";
import bgWhyDifferent from "@/assets/bg-why-different.png";

const BADGES = [
  { icon: <img src={ifraShield} alt="IFRA" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] object-contain" />, title: "IFRA Certified", subtitle: "Safe fragrance standards" },
  { icon: <Leaf size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "100% Natural", subtitle: "Plant-based formulas" },
  { icon: <Baby size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Child Safe", subtitle: "Gentle and safe" },
  { icon: <PawPrint size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Pet Friendly", subtitle: "No harmful ingredients" },
  { icon: <Recycle size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Biodegradable", subtitle: "Eco-friendly formulas" },
];

const WhyChooseUs = () => {
  return (
    <section
      className="relative w-full pt-8 pb-14 md:pt-10 md:pb-20 overflow-hidden"
      style={{
        backgroundImage: `url(${bgWhyDifferent})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 max-w-[1200px] w-full px-4 md:px-6 mx-auto text-center text-white">
        <h2 className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px] font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
          What Makes rePhyl Different
        </h2>
        <p className="text-[14px] md:text-[20px] leading-[22px] md:leading-[28px] mt-2 mb-6 md:mt-2 md:mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Curated Combinations for Effortless Cleaning
        </p>

        {/* White container with Reset / Relief / Safety */}
        <div className="relative bg-white rounded-[16px] md:rounded-[24px] px-4 py-6 md:px-10 md:py-8 shadow-[0px_8px_40px_rgba(0,38,3,0.08)] mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-[60px]">
            {[
              { icon: "↻", title: "Reset", subtitle: "A reset you can feel" },
              { icon: "☘", title: "Relief", subtitle: "Effortless to use" },
              { icon: "🛡", title: "Safety", subtitle: "No harsh residues" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 md:w-[200px]">
                <div className="w-[52px] h-[52px] md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center" style={{ background: "#F1FBD8" }}>
                  <span className="text-[24px] md:text-[28px]">{item.icon}</span>
                </div>
                <p className="text-[14px] md:text-[18px] font-semibold text-[#064734]" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.title}</p>
                <p className="text-[12px] md:text-[14px] text-[#064734]" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Badge pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {BADGES.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded-full px-4 py-2 md:px-5 md:py-2.5 shadow-sm">
              <div className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] flex items-center justify-center">
                {badge.icon}
              </div>
              <span className="text-[12px] md:text-[14px] font-medium text-[#064734]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
