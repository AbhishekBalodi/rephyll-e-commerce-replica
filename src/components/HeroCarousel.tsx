import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import kdFront from "@/assets/KD_Front.png";
import dlFront from "@/assets/DL_Front.png";
import ascFront from "@/assets/ASC_Front.png";
import cloverLime from "@/assets/clover-lime.png";

const slides = [
  {
    heading: "Clean Homes.\nNo Compromise",
    subtext: "Plant-powered cleaning that's safe for your family and the planet",
  },
  {
    heading: "Nature-Powered\nExcellence",
    subtext: "Effective cleaning without harsh chemicals. Gentle on your home, tough on dirt.",
  },
  {
    heading: "Family Safe. Pet\nFriendly.",
    subtext: "100% non-toxic formulas that make cleaning worry-free for everyone at home.",
  },
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "576px",
        background: "radial-gradient(42.27% 42.27% at 75.29% 56.87%, #CEF17B 0%, #00301D 100%)",
      }}
    >
      {/* Decorative clover overlays */}
      <img src={cloverLime} alt="" className="absolute w-[299px] h-[299px] opacity-20 pointer-events-none" style={{ left: "-85px", top: "-113px" }} />
      <img src={cloverLime} alt="" className="absolute w-[293px] h-[293px] opacity-20 pointer-events-none" style={{ left: "496px", top: "-84px" }} />
      <img src={cloverLime} alt="" className="absolute w-[267px] h-[267px] opacity-15 pointer-events-none" style={{ left: "642px", top: "391px" }} />
      <img src={cloverLime} alt="" className="absolute w-[356px] h-[356px] opacity-15 pointer-events-none" style={{ right: "-90px", bottom: "-80px" }} />
      <img src={cloverLime} alt="" className="absolute w-[232px] h-[232px] opacity-20 pointer-events-none" style={{ right: "-60px", top: "-84px" }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center"
        >
          <div className="max-w-[1320px] mx-auto w-full px-6 md:px-12 flex items-center justify-between h-full">
            {/* Left: Text */}
            <div className="flex-1 max-w-[442px] z-10">
              <div className="flex flex-col gap-8">
                {/* Info block */}
                <div className="flex flex-col gap-5">
                  <h1
                    className="text-4xl md:text-[48px] font-semibold text-white leading-[120%] whitespace-pre-line"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {slides[index].heading}
                  </h1>
                  <div className="flex items-center gap-3">
                    <div className="w-[2px] h-14 flex-shrink-0" style={{ background: "#CEF17B" }} />
                    <p
                      className="text-[24px] leading-[120%]"
                      style={{ fontFamily: "'Poppins', sans-serif", color: "#BABABA" }}
                    >
                      {slides[index].subtext}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-5">
                  <button
                    onClick={() => {
                      const el = document.getElementById("products-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center justify-center gap-4 font-semibold text-base hover:opacity-90 transition-all"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      background: "#CEF17B",
                      color: "#064734",
                      padding: "16px 40px",
                      borderRadius: "43px",
                    }}
                  >
                    Shop now
                    <ArrowRight size={15} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("homecare-kits-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-semibold text-base hover:opacity-90 transition-all"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      background: "#FFFFFF",
                      color: "#002E1C",
                      padding: "16px 40px",
                      borderRadius: "43px",
                    }}
                  >
                    Explore Kits
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Bottles arranged in arc */}
            <div className="hidden md:flex flex-1 items-end justify-center h-full relative">
              <motion.div
                key={`bottles-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative w-[620px] h-[494px] mb-4"
              >
                {/* Left bottle - tilted left */}
                <img
                  src={kdFront}
                  alt="Kitchen Degreaser"
                  className="absolute object-contain"
                  style={{
                    width: "185px",
                    height: "440px",
                    left: "0px",
                    top: "65px",
                    transform: "rotate(-23.47deg)",
                  }}
                />
                {/* Center bottle - tallest, in front */}
                <img
                  src={dlFront}
                  alt="Dishwash Liquid"
                  className="absolute object-contain z-10"
                  style={{
                    width: "178px",
                    height: "425px",
                    left: "230px",
                    top: "48px",
                    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                  }}
                />
                {/* Right bottle - tilted right */}
                <img
                  src={ascFront}
                  alt="All Surface Cleaner"
                  className="absolute object-contain"
                  style={{
                    width: "177px",
                    height: "440px",
                    left: "331px",
                    top: "58px",
                    transform: "rotate(15.7deg)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-[113px] left-[134px] flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-[10px] h-[10px] rounded-full transition-all"
            style={{
              background: i === index ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
