import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroKD from "@/assets/bottle-hero-kd.png";
import heroDL from "@/assets/bottle-hero-dl.png";
import heroASC from "@/assets/bottle-hero-asc.png";
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
      <img src={cloverLime} alt="" className="absolute opacity-20 pointer-events-none" style={{ width: "299px", height: "299px", left: "-85px", top: "-113px" }} />
      <img src={cloverLime} alt="" className="absolute opacity-20 pointer-events-none" style={{ width: "293px", height: "293px", left: "496px", top: "-84px" }} />
      <img src={cloverLime} alt="" className="absolute opacity-15 pointer-events-none" style={{ width: "267px", height: "267px", left: "642px", top: "391px" }} />
      <img src={cloverLime} alt="" className="absolute opacity-15 pointer-events-none" style={{ width: "356px", height: "356px", right: "-90px", bottom: "-80px" }} />
      <img src={cloverLime} alt="" className="absolute opacity-20 pointer-events-none" style={{ width: "232px", height: "232px", right: "-60px", top: "-84px" }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full max-w-[1440px] mx-auto">
            {/* Left: Text - positioned absolutely like Figma */}
            <div className="absolute z-10" style={{ left: "134px", top: "50%", transform: "translateY(-50%)" }}>
              <div className="flex flex-col" style={{ gap: "32px", width: "442px" }}>
                {/* Info block */}
                <div className="flex flex-col" style={{ gap: "20px" }}>
                  <h1
                    className="text-white whitespace-pre-line"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: "48px",
                      lineHeight: "120%",
                    }}
                  >
                    {slides[index].heading}
                  </h1>
                  <div className="flex items-center" style={{ gap: "12px" }}>
                    <div className="flex-shrink-0" style={{ width: "2px", height: "56px", background: "#CEF17B" }} />
                    <p
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontSize: "24px",
                        lineHeight: "120%",
                        color: "#BABABA",
                      }}
                    >
                      {slides[index].subtext}
                    </p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex" style={{ gap: "20px" }}>
                  <button
                    onClick={() => {
                      const el = document.getElementById("products-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center justify-center hover:opacity-90 transition-all"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "120%",
                      background: "#CEF17B",
                      color: "#064734",
                      padding: "16px 40px",
                      borderRadius: "43px",
                      gap: "16px",
                    }}
                  >
                    Shop now
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("homecare-kits-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:opacity-90 transition-all"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      lineHeight: "120%",
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

            {/* Right: Bottles - exact Figma positions relative to 1440px container */}
            <motion.div
              key={`bottles-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute"
              style={{ width: "620.77px", height: "493.86px", left: "745.94px", top: "48px" }}
            >
              {/* Left bottle (Kitchen Degreaser) - rotated left */}
              <img
                src={heroKD}
                alt="Kitchen Degreaser"
                className="absolute object-contain"
                style={{
                  width: "185.36px",
                  height: "439.42px",
                  left: "0px",
                  top: "16.98px",
                  transform: "rotate(-23.47deg)",
                }}
              />
              {/* Center bottle (Dishwash Liquid) - tallest, in front */}
              <img
                src={heroDL}
                alt="Dishwash Liquid"
                className="absolute object-contain z-10"
                style={{
                  width: "178px",
                  height: "425px",
                  left: "230.56px",
                  top: "0px",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              />
              {/* Right bottle (All Surface Cleaner) - rotated right */}
              <img
                src={heroASC}
                alt="All Surface Cleaner"
                className="absolute object-contain"
                style={{
                  width: "177.13px",
                  height: "440.04px",
                  left: "331.17px",
                  top: "10.07px",
                  transform: "rotate(15.7deg)",
                }}
              />
            </motion.div>

            {/* Dots */}
            <div className="absolute flex z-10" style={{ bottom: "113px", left: "134px", gap: "8px" }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: "10px",
                    height: "10px",
                    background: i === index ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;
