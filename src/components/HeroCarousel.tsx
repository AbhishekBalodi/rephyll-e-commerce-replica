import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroBottles from "@/assets/kit-bottles-hero.png";
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

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden" aria-label="Featured products banner">
      <div
        className="relative mx-auto h-[575px] w-full overflow-hidden"
        style={{
          background: "radial-gradient(13.36% 42.27% at 75.29% 56.87%, hsl(var(--accent)) 0%, hsl(var(--hero-forest)) 100%)",
        }}
      >
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute opacity-20" style={{ width: "299px", height: "299px", left: "-85px", top: "-113px" }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute opacity-20" style={{ width: "293px", height: "293px", left: "496px", top: "-84px" }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute opacity-15" style={{ width: "267px", height: "267px", left: "642px", top: "391px" }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute opacity-15" style={{ width: "356px", height: "356px", left: "1170.5px", top: "302px" }} />
        <img src={cloverLime} alt="" aria-hidden="true" className="pointer-events-none absolute opacity-20" style={{ width: "232px", height: "232px", left: "1268.5px", top: "-84px" }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <div
                className="absolute z-10 flex w-[442px] -translate-y-1/2 flex-col gap-8"
                style={{ left: "134px", top: "50%" }}
              >
                <div className="flex flex-col gap-5">
                  <h1
                    className="w-[408px] whitespace-pre-line text-[48px] font-semibold leading-[120%] text-primary-foreground"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {slides[index].heading}
                  </h1>

                  <div className="flex items-center gap-3">
                    <div className="h-14 w-[2px] bg-accent" />
                    <p
                      className="text-[24px] font-normal leading-[120%] text-primary-foreground/70"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {slides[index].subtext}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <button
                    onClick={() => scrollToSection("products-section")}
                    className="flex items-center justify-center gap-4 rounded-[43px] bg-accent px-10 py-4 text-[16px] font-semibold leading-[120%] text-primary transition-opacity hover:opacity-90"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Shop now
                    <ArrowRight size={15} strokeWidth={1.5} />
                  </button>

                  <button
                    onClick={() => scrollToSection("homecare-kits-section")}
                    className="rounded-[43px] bg-background px-10 py-4 text-[16px] font-semibold leading-[120%] text-primary transition-opacity hover:opacity-90"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Explore Kits
                  </button>
                </div>
              </div>

              {/* Hero product image - single grouped bottles image */}
              <motion.div
                key={`bottles-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="absolute z-[5]"
                style={{ right: "100px", bottom: "20px" }}
              >
                <img
                  src={heroBottles}
                  alt="rePhyl cleaning products"
                  draggable={false}
                  className="select-none object-contain"
                  style={{
                    height: "460px",
                    width: "auto",
                    filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.25))",
                  }}
                />
              </motion.div>

              <div className="absolute bottom-[113px] left-[134px] z-10 flex gap-2">
                {slides.map((_, slideIndex) => (
                  <button
                    key={slideIndex}
                    type="button"
                    aria-label={`Go to slide ${slideIndex + 1}`}
                    onClick={() => setIndex(slideIndex)}
                    className="h-[10px] w-[10px] rounded-full transition-all"
                    style={{
                      background:
                        slideIndex === index ? "hsl(var(--primary-foreground))" : "hsl(var(--primary-foreground) / 0.3)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroCarousel;