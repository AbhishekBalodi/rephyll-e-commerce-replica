import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import bottleSurface from "@/assets/bottle-surface-cleaner.png";
import bottleDegreaser from "@/assets/bottle-kitchen-degreaser.png";
import bottleDishwash from "@/assets/bottle-dishwash.png";

const slides = [
  {
    heading: "Clean Homes. No\nCompromise.",
    subtext: "Plant-powered cleaning that's safe for your family and the planet.",
    image: bottleSurface,
  },
  {
    heading: "Nature-Powered\nExcellence",
    subtext: "Effective cleaning without harsh chemicals. Gentle on your home, tough on dirt.",
    image: bottleDegreaser,
  },
  {
    heading: "Family Safe. Pet\nFriendly.",
    subtext: "100% non-toxic formulas that make cleaning worry-free for everyone at home.",
    image: bottleDishwash,
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
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const marqueeText = TRUST_ITEMS.map((t) => `${t} ✦`).join(" ");

  return (
    <>
      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden bg-primary" style={{ height: "520px" }}>
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
                <h1 className="text-4xl md:text-[56px] font-display font-bold text-primary-foreground leading-[1.1] whitespace-pre-line mb-6">
                  {slides[index].heading}
                </h1>
                <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-md">
                  {slides[index].subtext}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const el = document.getElementById("products-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-primary-foreground text-primary font-bold px-8 py-3.5 rounded-md text-sm uppercase tracking-wider hover:opacity-90 transition-all"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById("homecare-kits-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border-2 border-primary-foreground text-primary-foreground font-bold px-8 py-3.5 rounded-md text-sm uppercase tracking-wider hover:bg-primary-foreground/10 transition-all"
                  >
                    Explore Kits
                  </button>
                </div>
              </div>

              {/* Right: Product bottle */}
              <div className="hidden md:flex flex-1 items-center justify-end h-full">
                <motion.img
                  key={`img-${index}`}
                  src={slides[index].image}
                  alt="rePhyl product"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="h-[420px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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
