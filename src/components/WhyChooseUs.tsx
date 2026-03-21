import { ShieldCheck, Leaf, Baby, Heart, Recycle, FlaskConical, PawPrint, ChevronLeft, ChevronRight } from "lucide-react";
import clover from "@/assets/clover-green.png";

const BADGES = [
  { icon: <ShieldCheck size={40} />, title: "Non-Toxic", subtitle: "No harsh chemicals" },
  { icon: <FlaskConical size={40} />, title: "IFRA Certified", subtitle: "Safe fragrance standards" },
  { icon: <Leaf size={40} />, title: "100% Natural", subtitle: "Plant-based formulas" },
  { icon: <Baby size={40} />, title: "Child Safe", subtitle: "Gentle and safe" },
  { icon: <PawPrint size={40} />, title: "Pet Friendly", subtitle: "No harmful ingredients" },
  { icon: <Recycle size={40} />, title: "Biodegradable", subtitle: "Eco-friendly formulas" },
  { icon: <Heart size={40} />, title: "Dermatologically Safe", subtitle: "Tested and approved" },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full bg-[#064734] py-24 overflow-hidden">

      {/* 🌿 CLOVERS (FIXED + VISIBLE) */}

      {/* TOP LEFT */}
      <img
        src={clover}
        className="absolute w-[180px] top-[20px] left-[40px] opacity-25 mix-blend-soft-light z-0"
      />

      {/* TOP CENTER */}
      <img
        src={clover}
        className="absolute w-[140px] top-[0px] left-1/2 -translate-x-1/2 opacity-25 mix-blend-soft-light z-0"
      />

      {/* TOP RIGHT */}
      <img
        src={clover}
        className="absolute w-[160px] top-[30px] right-[60px] opacity-25 mix-blend-soft-light z-0"
      />

      {/* RIGHT SIDE BIG */}
      <img
        src={clover}
        className="absolute w-[220px] top-[140px] right-[0px] opacity-25 mix-blend-soft-light z-0"
      />

      {/* LEFT SIDE MID */}
      <img
        src={clover}
        className="absolute w-[160px] top-[220px] left-[20px] opacity-25 mix-blend-soft-light z-0"
      />

      {/* BOTTOM LEFT */}
      <img
        src={clover}
        className="absolute w-[180px] bottom-[20px] left-[60px] opacity-25 mix-blend-soft-light z-0"
      />

      {/* BOTTOM RIGHT */}
      <img
        src={clover}
        className="absolute w-[220px] bottom-[0px] right-[40px] opacity-25 mix-blend-soft-light z-0"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1700px] w-full px-6 mx-auto text-center text-white">

        {/* TITLE */}
        <h2 className="text-[40px] font-semibold leading-[60px]">
          How We Are Making Difference
        </h2>

        <p className="text-[20px] mt-2 mb-12">
          Curated Combinations for Effortless Cleaning
        </p>

        {/* WHITE CONTAINER */}
        <div className="relative bg-white rounded-[24px] px-10 py-8 shadow-[0px_8px_40px_rgba(0,38,3,0.08)]">

          {/* LEFT ARROW */}
          <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#EAF9C7] rounded-full flex items-center justify-center shadow">
            <ChevronLeft className="text-[#064734]" />
          </div>

          {/* RIGHT ARROW */}
          <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#EAF9C7] rounded-full flex items-center justify-center shadow">
            <ChevronRight className="text-[#064734]" />
          </div>

          {/* FEATURES */}
          <div className="flex justify-center items-center gap-[50px] flex-nowrap overflow-hidden">

            {BADGES.map((badge, i) => (
              <div key={i} className="w-[180px] flex flex-col items-center text-center gap-4 shrink-0">

                {/* ICON */}
                <div className="w-[76px] h-[76px] rounded-full bg-[#F1FBD8] flex items-center justify-center shadow-sm">
                  <div className="text-[#064734]">
                    {badge.icon}
                  </div>
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-[18px] font-semibold text-[#064734]">
                    {badge.title}
                  </p>
                  <p className="text-[14px] text-[#064734] mt-1">
                    {badge.subtitle}
                  </p>
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