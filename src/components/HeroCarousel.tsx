import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { getWebsiteAssetUrl, useHomepageSlider } from "@/hooks/useWebsiteAssets";
import { useIsMobile } from "@/hooks/use-mobile";
import heroBottles from "@/assets/kit-bottles-hero.png";
import bgHeroCarousel from "@/assets/bg-hero-carousel.png";
import bgHeroMobile from "@/assets/bg-hero-carousel-mobile.png";

interface SlideData {
  id: number;
  imagePath: string;
  targetLink: string;
  displayOrder: number;
}

const DEFAULT_SLIDES: SlideData[] = [
  {
    id: 1,
    imagePath: "",
    targetLink: "/shop",
    displayOrder: 1,
  },
  {
    id: 2,
    imagePath: "",
    targetLink: "/shop",
    displayOrder: 2,
  },
  {
    id: 3,
    imagePath: "",
    targetLink: "/shop",
    displayOrder: 3,
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const { websiteSlides, mobileSlides } = useHomepageSlider();

  const deviceSlides = isMobile ? (mobileSlides.length > 0 ? mobileSlides : websiteSlides) : websiteSlides;
  const slides: SlideData[] = deviceSlides.length > 0 ? deviceSlides.map((slide) => ({ ...slide })) : DEFAULT_SLIDES;

  useEffect(() => {
    setIndex((prev) => (prev >= slides.length ? 0 : prev));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides]);

  const activeSlide = slides[index];
  const activeImage = activeSlide?.imagePath ? getWebsiteAssetUrl(activeSlide.imagePath) : "";
  const hasApiImage = Boolean(activeImage);

  return (
    <section className="relative w-full overflow-hidden pt-[104px]" aria-label="Featured products banner">
      {/* Desktop wrapper */}
      <div
        className="relative w-full hidden md:block overflow-hidden cursor-pointer"
        style={{
          height: "575px",
          backgroundImage: hasApiImage ? "none" : `url(${bgHeroCarousel})`,
          backgroundSize: hasApiImage ? undefined : "100% 100%",
          backgroundPosition: hasApiImage ? undefined : "center",
          backgroundRepeat: hasApiImage ? undefined : "no-repeat",
        }}
        onClick={() => navigate("/shop")}
      >
        {hasApiImage && (
          <img
            src={activeImage}
            alt="rePhyl banner"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {!hasApiImage && <div className="absolute inset-0 bg-black/25" />}

        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full max-w-[1440px] mx-auto">
              <div className="absolute bottom-[78px] left-[134px] z-10 flex flex-col gap-2">
                <div className="z-10 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  {slides.map((_, slideIndex) => (
                    <button
                      key={slideIndex}
                      type="button"
                      aria-label={`Go to slide ${slideIndex + 1}`}
                      onClick={() => setIndex(slideIndex)}
                      className="h-[10px] w-[10px] rounded-full transition-all"
                      style={{
                        background: slideIndex === index ? "hsl(var(--primary-foreground))" : "hsl(var(--primary-foreground) / 0.3)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {!hasApiImage && (
                <motion.div
                  key={`bottles-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="absolute z-[5] flex items-end justify-center"
                  style={{ right: "0", bottom: "20px", left: "50%", width: "50%" }}
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
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile wrapper */}
      <div
        className="relative w-full md:hidden overflow-hidden cursor-pointer"
        style={{
          height: hasApiImage ? "auto" : "clamp(180px, 56vw, 320px)",
          backgroundImage: hasApiImage ? "none" : `url(${bgHeroMobile})`,
          backgroundSize: hasApiImage ? undefined : "100% 100%",
          backgroundPosition: hasApiImage ? undefined : "center",
          backgroundRepeat: hasApiImage ? undefined : "no-repeat",
        }}
        onClick={() => navigate("/shop")}
      >
        {hasApiImage && (
          <img
            src={activeImage}
            alt="rePhyl banner"
            className="block w-full h-auto object-contain"
          />
        )}
        {!hasApiImage && <div className="absolute inset-0 bg-black/30" />}

        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <div className={hasApiImage ? "absolute bottom-0 left-4 z-10 flex flex-col items-start gap-1.5" : "absolute bottom-[8px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"}>
                <div className="z-10 flex gap-2" onClick={(e) => e.stopPropagation()}>
                  {slides.map((_, slideIndex) => (
                    <button
                      key={slideIndex}
                      type="button"
                      aria-label={`Go to slide ${slideIndex + 1}`}
                      onClick={() => setIndex(slideIndex)}
                      className="h-[8px] w-[8px] rounded-full transition-all"
                      style={{
                        background: slideIndex === index ? "hsl(var(--primary-foreground))" : "hsl(var(--primary-foreground) / 0.3)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {!hasApiImage && (
                <motion.div
                  key={`bottles-mobile-${index}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="absolute z-[5] flex items-end justify-center bottom-0 left-1/2 -translate-x-1/2"
                >
                  <img
                    src={heroBottles}
                    alt="rePhyl cleaning products"
                    draggable={false}
                    className="select-none object-contain h-[140px]"
                    style={{ filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))" }}
                  />
                </motion.div>
              )}

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroCarousel;
