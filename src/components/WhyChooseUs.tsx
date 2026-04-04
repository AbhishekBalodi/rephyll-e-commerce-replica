import { Leaf, Baby, Recycle, PawPrint, Heart } from "lucide-react";
import clover from "@/assets/clover-green-dark.png";
import ifraShield from "@/assets/ifra-shield.png";

const BADGES = [
  { icon: <img src={ifraShield} alt="IFRA" className="w-[32px] h-[32px] object-contain" />, title: "IFRA Certified", subtitle: "Safe fragrance standards" },
  { icon: <Leaf size={32} className="text-[#064734]" />, title: "100% Natural", subtitle: "Plant-based formulas" },
  { icon: <Baby size={32} className="text-[#064734]" />, title: "Child Safe", subtitle: "Gentle and safe" },
  { icon: <PawPrint size={32} className="text-[#064734]" />, title: "Pet Friendly", subtitle: "No harmful ingredients" },
  { icon: <Recycle size={32} className="text-[#064734]" />, title: "Biodegradable", subtitle: "Eco-friendly formulas" },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full bg-[#064734] pt-10 pb-20 overflow-hidden">
      {/* Clovers */}
      <img src={clover} className="absolute w-[153px] h-[153px] top-[20px] left-[40px] z-0" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] top-[30px] right-[60px] z-0" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] bottom-[20px] left-[60px] z-0" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />
      <img src={clover} className="absolute w-[153px] h-[153px] bottom-[0px] right-[40px] z-0" style={{ opacity: 0.5, filter: "brightness(1.5)" }} />

      <div className="relative z-10 max-w-[1200px] w-full px-6 mx-auto text-center text-white">
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", textAlign: "center" }}>
          How We Are Making Difference
        </h2>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", marginTop: "8px", marginBottom: "48px" }}>
          Curated Combinations for Effortless Cleaning
        </p>

        {/* White container */}
        <div className="relative bg-white rounded-[24px] px-10 py-8 shadow-[0px_8px_40px_rgba(0,38,3,0.08)]">

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