import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import bottleSurface from "@/assets/bottle-surface-cleaner.png";
import bottleDegreaser from "@/assets/bottle-kitchen-degreaser.png";
import bottleDishwash from "@/assets/bottle-dishwash.png";
import bottleToilet from "@/assets/bottle-toilet-cleaner.png";
import cloverDark from "@/assets/clover-green-dark.png";
import cloverLime from "@/assets/clover-lime.png";

const slides = [
  {
    heading: "Clean Homes.\nNo Compromise.",
    subtext: "Plant-powered cleaning that's safe for your family and the planet.",
    bottles: [bottleDegreaser, bottleDishwash, bottleSurface],
  },
  {
    heading: "Nature-Powered\nExcellence",
    subtext: "Effective cleaning without harsh chemicals. Gentle on your home, tough on dirt.",
    bottles: [bottleSurface, bottleToilet, bottleDegreaser],
  },
  {
    heading: "Family Safe. Pet\nFriendly.",
    subtext: "100% non-toxic formulas that make cleaning worry-free for everyone at home.",
    bottles: [bottleDishwash, bottleSurface, bottleToilet],
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
        {/* Clover decorations */}
        <img src={cloverDark} alt="" className="absolute top-[-40px] left-[-50px] w-[140px] opacity-30 pointer-events-none" />
        <img src={cloverDark} alt="" className="absolute bottom-[-30px] left-[15%] w-[100px] opacity-20 pointer-events-none" />
        <img src={cloverDark} alt="" className="absolute top-[20%] right-[-40px] w-[120px] opacity-25 pointer-events-none" />
        <img src={cloverLime} alt="" className="absolute top-[-20px] right-[30%] w-[80px] opacity-15 pointer-events-none" />
        <img src={cloverLime} alt="" className="absolute bottom-[10%] right-[10%] w-[90px] opacity-10 pointer-events-none" />
        <img src={cloverDark} alt="" className="absolute bottom-[-50px] right-[-30px] w-[130px] opacity-20 pointer-events-none" />

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
                  <p className="text-primary-foreground/80 text-base md:text-lg max-w-md">
                    {slides[index].subtext}
                  </p>
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

              {/* Right: Product bottles grouped together with halo */}
              <div className="hidden md:flex flex-1 items-end justify-center h-full relative">
                {/* Halo glow behind bottles */}
                <div className="absolute bottom-[10%] w-[380px] h-[380px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, hsl(82 82% 71% / 0.6) 0%, transparent 70%)' }} />
                <motion.div
                  key={`bottles-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative flex items-end justify-center gap-[-10px] pb-0"
                >
                  {/* Left bottle - slightly behind */}
                  <img
                    src={slides[index].bottles[0]}
                    alt="rePhyl product"
                    className="h-[320px] object-contain drop-shadow-2xl -mr-8 relative z-0"
                  />
                  {/* Center bottle - tallest, in front */}
                  <img
                    src={slides[index].bottles[1]}
                    alt="rePhyl product"
                    className="h-[380px] object-contain drop-shadow-2xl relative z-10"
                  />
                  {/* Right bottle - slightly behind */}
                  <img
                    src={slides[index].bottles[2]}
                    alt="rePhyl product"
                    className="h-[320px] object-contain drop-shadow-2xl -ml-8 relative z-0"
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
                i === index
                  ? "bg-primary-foreground w-8"
                  : "bg-primary-foreground/40 w-3"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Marquee Strip */}
      <div className="bg-primary overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-primary-foreground text-sm font-semibold tracking-wide mx-4">
            {marqueeText}  {marqueeText}
          </span>
          <span className="text-primary-foreground text-sm font-semibold tracking-wide mx-4">
            {marqueeText}  {marqueeText}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
