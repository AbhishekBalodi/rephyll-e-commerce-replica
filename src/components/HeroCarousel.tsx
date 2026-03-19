import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ascFront from "@/assets/ASC_Front.png";
import dlFront from "@/assets/DL_Front.png";
import kdFront from "@/assets/KD_Front.png";
import cloverDark from "@/assets/clover-green-dark.png";

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

const cloverDecorations = [
  {
    src: cloverDark,
    alt: "",
    className:
      "absolute left-[-82px] top-[-72px] w-[240px] opacity-[0.16] pointer-events-none z-[1] select-none",
  },
  {
    src: cloverDark,
    alt: "",
    className:
      "absolute left-[-78px] bottom-[-82px] w-[240px] opacity-[0.16] pointer-events-none z-[1] select-none",
  },
  {
    src: cloverDark,
    alt: "",
    className:
      "absolute right-[-82px] top-[-72px] w-[240px] opacity-[0.16] pointer-events-none z-[1] select-none",
  },
  {
    src: cloverDark,
    alt: "",
    className:
      "absolute right-[-78px] bottom-[-82px] w-[240px] opacity-[0.16] pointer-events-none z-[1] select-none",
  },
  {
    src: cloverDark,
    alt: "",
    className:
      "absolute left-[20%] top-[53%] w-[168px] -translate-y-1/2 opacity-[0.14] pointer-events-none z-[1] select-none",
  },
  {
    src: cloverDark,
    alt: "",
    className:
      "absolute left-[47%] top-[48%] w-[148px] -translate-x-1/2 -translate-y-1/2 opacity-[0.08] pointer-events-none z-[1] select-none",
  },
  {
    src: cloverDark,
    alt: "",
    className:
      "absolute right-[18%] top-[30%] w-[178px] opacity-[0.12] pointer-events-none z-[1] select-none",
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

  const marqueeText = TRUST_ITEMS.map((item) => `${item} ✦`).join("  ");

  return (
    <>
      <div className="relative isolate w-full overflow-hidden bg-primary" style={{ height: "520px" }}>
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 70% 48%, hsl(var(--accent) / 0.18) 0%, hsl(var(--accent) / 0.11) 22%, transparent 48%)",
          }}
        />

        {cloverDecorations.map((clover, decorationIndex) => (
          <img key={decorationIndex} src={clover.src} alt={clover.alt} className={clover.className} />
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 z-[2] flex items-center"
          >
            <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 md:px-12">
              <div className="z-10 flex-1 max-w-xl">
                <h1 className="mb-4 whitespace-pre-line text-4xl font-bold leading-[1.1] text-primary-foreground md:text-[56px]">
                  {slides[index].heading}
                </h1>

                <div className="mb-8 flex items-start gap-3">
                  <div className="mt-1 h-12 w-1 flex-shrink-0 rounded-full bg-accent" />
                  <p className="max-w-md text-base text-primary-foreground/80 md:text-lg">
                    {slides[index].subtext}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      const element = document.getElementById("products-section");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold tracking-wider text-primary transition-all hover:opacity-90"
                  >
                    Shop now
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => {
                      const element = document.getElementById("homecare-kits-section");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="rounded-full bg-primary-foreground px-8 py-3.5 text-sm font-bold tracking-wider text-primary transition-all hover:opacity-90"
                  >
                    Explore Kits
                  </button>
                </div>
              </div>

              <div className="relative hidden h-full flex-1 items-end justify-center md:flex">
                <div
                  className="pointer-events-none absolute bottom-[7%] z-[1] h-[430px] w-[430px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--accent) / 0.34) 0%, hsl(var(--accent) / 0.18) 34%, transparent 69%)",
                  }}
                />

                <motion.div
                  key={`bottles-${index}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, delay: 0.08 }}
                  className="relative flex h-[420px] w-[560px] items-end justify-center overflow-visible"
                >
                  <img
                    src={kdFront}
                    alt="Kitchen Degreaser"
                    className="relative z-[2] h-[328px] max-w-none origin-bottom object-contain drop-shadow-2xl"
                    style={{
                      transform: "translateX(88px) rotate(-18deg)",
                      marginRight: "-170px",
                      clipPath: "inset(0 15% 0 5%)",
                    }}
                  />

                  <img
                    src={dlFront}
                    alt="Dishwash Liquid"
                    className="relative z-[5] h-[392px] max-w-none object-contain drop-shadow-2xl"
                    style={{
                      clipPath: "inset(0 10% 0 10%)",
                    }}
                  />

                  <img
                    src={ascFront}
                    alt="All Surface Cleaner"
                    className="relative z-[2] h-[328px] max-w-none origin-bottom object-contain drop-shadow-2xl"
                    style={{
                      transform: "translateX(-88px) rotate(18deg)",
                      marginLeft: "-170px",
                      clipPath: "inset(0 5% 0 15%)",
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 left-6 z-10 flex gap-2 md:left-12">
          {slides.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setIndex(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              className={`h-3 rounded-full transition-all ${
                slideIndex === index ? "w-8 bg-primary-foreground" : "w-3 bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="overflow-hidden bg-primary py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-4 text-sm font-semibold tracking-wide text-primary-foreground">
            {marqueeText} {marqueeText}
          </span>
          <span className="mx-4 text-sm font-semibold tracking-wide text-primary-foreground">
            {marqueeText} {marqueeText}
          </span>
        </div>
      </div>
    </>
  );
};

export default HeroCarousel;
