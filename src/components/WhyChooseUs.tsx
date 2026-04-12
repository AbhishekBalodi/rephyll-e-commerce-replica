import { Leaf, Baby, Recycle, PawPrint } from "lucide-react";
import ifraShield from "@/assets/ifra-shield.png";
import bgWhyDifferent from "@/assets/bg-why-different.png";
import bgWhyDifferentMobile from "@/assets/bg-why-different-mobile.png";
import iconReset from "@/assets/icon-reset.png";
import iconRelief from "@/assets/icon-relief.png";
import iconSafety from "@/assets/icon-safety.png";

const BADGES = [
  { icon: <img src={ifraShield} alt="IFRA" className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] object-contain" />, title: "IFRA Certified" },
  { icon: <Leaf size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "100% Natural" },
  { icon: <Baby size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Child Safe" },
  { icon: <PawPrint size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Pet Friendly" },
  { icon: <Recycle size={28} className="text-[#064734] md:w-8 md:h-8" />, title: "Biodegradable" },
];

const CARDS = [
  { icon: <img src={iconReset} alt="Reset" className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] object-contain" />, title: "Reset", subtitle: "A reset you can feel" },
  { icon: <img src={iconRelief} alt="Relief" className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] object-contain" />, title: "Relief", subtitle: "Effortless to use" },
  { icon: <img src={iconSafety} alt="Safety" className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] object-contain" />, title: "Safety", subtitle: "No harsh residues" },
];

interface WhyChooseUsProps {
  heading?: string;
  subtext?: string;
}

const WhyChooseUs = ({
  heading = "What Makes rePhyl Different",
  subtext,
}: WhyChooseUsProps) => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Desktop bg */}
      <img src={bgWhyDifferent} alt="" aria-hidden="true" className="pointer-events-none select-none hidden md:block absolute inset-0 w-full h-full" style={{ zIndex: 0, width: "100%", height: "100%", objectFit: "fill" }} />
      {/* Mobile bg */}
      <img src={bgWhyDifferentMobile} alt="" aria-hidden="true" className="pointer-events-none select-none md:hidden absolute inset-0 w-full h-full" style={{ zIndex: 0, width: "100%", height: "100%", objectFit: "fill" }} />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-6 text-center text-white pt-12 pb-16 md:pt-16 md:pb-24" style={{ minHeight: "510px" }}>
        <h2
          className="text-[24px] md:text-[40px] leading-[36px] md:leading-[60px] font-semibold max-w-[900px] mx-auto"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {heading}
        </h2>

        {subtext && (
          <p
            className="text-[14px] md:text-[20px] leading-[22px] md:leading-[28px] mt-2 mb-6 md:mb-12"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {subtext}
          </p>
        )}
        {!subtext && <div className="mb-6 md:mb-12" />}

        {/* 3 Separate white cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-6 md:mb-8">
          {CARDS.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-[16px] md:rounded-[24px] px-6 py-6 md:px-8 md:py-8 shadow-[0px_8px_40px_rgba(0,38,3,0.08)] flex flex-col items-center text-center gap-2 w-[200px] md:w-[220px]"
            >
              <div className="w-[52px] h-[52px] md:w-[68px] md:h-[68px] rounded-full flex items-center justify-center bg-[#F1FBD8]">
                <div className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] flex items-center justify-center">{item.icon}</div>
              </div>
              <p
                className="text-[14px] md:text-[18px] font-semibold text-[#064734]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.title}
              </p>
              <p
                className="text-[12px] md:text-[14px] text-[#064734]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Badge pills */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {BADGES.map((badge, i) => (
          <div
              key={i}
              className="flex items-center gap-2 bg-[#F1FBD8] rounded-full px-4 py-2 md:px-5 md:py-2.5 shadow-sm"
            >
              <div className="w-[24px] h-[24px] md:w-[28px] md:h-[28px] flex items-center justify-center">
                {badge.icon}
              </div>
              <span
                className="text-[12px] md:text-[14px] font-medium text-[#064734]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
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
