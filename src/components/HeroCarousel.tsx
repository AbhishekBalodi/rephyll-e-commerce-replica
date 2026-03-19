import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import kdFront from "@/assets/KD_Front.png";
import dlFront from "@/assets/DL_Front.png";
import ascFront from "@/assets/ASC_Front.png";
import cloverDark from "@/assets/clover-green-dark.png";
import cloverLime from "@/assets/clover-lime.png";

const slides = [
  {
    heading: "Clean Homes.\nNo Compromise.",
    subtext: "Plant-powered cleaning that's safe for your family and the planet.",
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

const TRUST_ITEMS = [
  "Non-Toxic",
  "Plant-Based",
  "100% Natural",
  "Child Safe",
  "Pet Safe",
  "No Harsh Chemicals",
  "Dermatologically Safe",
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const marqueeText = TRUST_ITEMS.map((t) => `${t} ✦`).join("  ");

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden bg-primary" style={{ height: "520px" }}>
        {/* Large clover decorations - all four corners + middle areas */}
        {/* Top-left corner */}
        <img src={cloverDark} alt="" className="absolute top-[-30px] left-[-30px] w-[220px] opacity-30 pointer-events-none" />
        {/* Top-center */}
        <img src={cloverDark} alt="" className="absolute top-[-20px] left-[35%] w-[180px] opacity-20 pointer-events-none" />
        {/* Top-right corner */}
        <img src={cloverDark} alt="" className="absolute top-[-30px] right-[-30px] w-[240px] opacity-30 pointer-events-none" />
        {/* Middle-left */}
        <img src={cloverLime} alt="" className="absolute top-[35%] left-[-20px] w-[160px] opacity-20 pointer-events-none" />
        {/* Center behind bottles */}
        <img src={cloverDark} alt="" className="absolute top-[40%] left-[50%] w-[200px] opacity-15 pointer-events-none -translate-x-1/2" />
        {/* Middle-right */}
        <img src={cloverLime} alt="" className="absolute top-[25%] right-[-20px] w-[180px] opacity-20 pointer-events-none" />
        {/* Bottom-left corner */}
        <img src={cloverDark} alt="" className="absolute bottom-[-40px] left-[-20px] w-[220px] opacity-25 pointer-events-none" />
        {/* Bottom-center */}
        <img src={cloverDark} alt="" className="absolute bottom-[-30px] left-[45%] w-[200px] opacity-20 pointer-events-none" />
        {/* Bottom-right corner */}
        <img src={cloverDark} alt="" className="absolute bottom-[-40px] right-[-30px] w-[240px] opacity-30 pointer-events-none" />
        {/* Extra fill - between top-left and center */}
        <img src={cloverLime} alt="" className="absolute top-[10%] left-[18%] w-[140px] opacity-15 pointer-events-none" />
        {/* Extra fill - right side mid-bottom */}
        <img src={cloverDark} alt="" className="absolute bottom-[15%] right-[15%] w-[160px] opacity-20 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center"
          >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex items-center justify-between h-full">
              {/* Left: Text */}
              <div className="flex-1 max-w-xl z-10">
                <h1 className="text-4xl md:text-[56px] font-display font-bold text-primary-foreground leading-[1.1] whitespace-pre-line mb-4">
                  {slides[index].heading}
                </h1>
                <div className="flex items-start gap-3 mb-8">
                  <div className="w-1 h-12 bg-accent rounded-full mt-1 flex-shrink-0" />
                  <p className="text-primary-foreground/80 text-base md:text-lg max-w-md">{slides[index].subtext}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("products-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-accent text-primary font-bold px-8 py-3.5 rounded-full text-sm tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    Shop now
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("homecare-kits-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-primary-foreground text-primary font-bold px-8 py-3.5 rounded-full text-sm tracking-wider hover:opacity-90 transition-all"
                  >
                    Explore Kits
                  </button>
                </div>
              </div>

              {/* Right: Tilted arc bottles */}
              <div className="hidden md:flex flex-1 items-end justify-center h-full relative">
                {/* Halo glow behind bottles */}
                <div
                  className="absolute bottom-[10%] w-[380px] h-[380px] rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, hsl(82 82% 71% / 0.6) 0%, transparent 70%)" }}
                />
                <motion.div
                  key={`bottles-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative w-[400px] h-[420px] mb-4"
                >
                  {/* Left bottle - tilted left */}
                  <img
                    src={kdFront}
                    alt="Kitchen Degreaser"
                    className="absolute h-[300px] object-contain drop-shadow-2xl z-0"
                    style={{ left: "20px", bottom: "0px", transform: "rotate(-18deg)" }}
                  />
                  {/* Center bottle - tallest, in front */}
                  <img
                    src={dlFront}
                    alt="Dishwash Liquid"
                    className="absolute h-[360px] object-contain drop-shadow-2xl z-10 left-1/2"
                    style={{ bottom: "0px", transform: "translateX(-50%)" }}
                  />
                  {/* Right bottle - tilted right */}
                  <img
                    src={ascFront}
                    alt="All Surface Cleaner"
                    className="absolute h-[300px] object-contain drop-shadow-2xl z-0"
                    style={{ right: "20px", bottom: "0px", transform: "rotate(18deg)" }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-6 left-6 md:left-12 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 rounded-full transition-all ${
                i === index ? "bg-primary-foreground w-8" : "bg-primary-foreground/40 w-3"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Marquee Strip */}
      <div className="bg-primary overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-primary-foreground text-sm font-semibold tracking-wide mx-4">
            {marqueeText} {marqueeText}
          </span>
          <span className="text-primary-foreground text-sm font-semibold tracking-wide mx-4">
            {marqueeText} {marqueeText}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
