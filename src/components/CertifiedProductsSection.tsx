import makeInIndia from "@/assets/image 3647 [Vectorized].png";
import locallySourced from "@/assets/image 3648 [Vectorized].png";
import authentic from "@/assets/image 3649 [Vectorized].png";
import plantBased from "@/assets/download 3 [Vectorized].png";
import biodegradable from "@/assets/7272213 1 1 (Traced).png";
import bgCertified from "@/assets/bg-certified-products.png";
import { useEffect, useRef, useState } from "react";

const BADGES = [makeInIndia, locallySourced, authentic, plantBased, biodegradable];

const CertifiedProductsSection = () => {
  const stripRef = useRef<HTMLDivElement | null>(null);
  const badgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeBadge, setActiveBadge] = useState(0);

  const updateActiveBadge = () => {
    const strip = stripRef.current;
    if (!strip || badgeRefs.current.length === 0) return;

    const stripCenter = strip.scrollLeft + strip.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    badgeRefs.current.forEach((badge, index) => {
      if (!badge) return;
      const badgeCenter = badge.offsetLeft + badge.clientWidth / 2;
      const distance = Math.abs(stripCenter - badgeCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveBadge(closestIndex);
  };

  const scrollToBadge = (index: number) => {
    const strip = stripRef.current;
    const badge = badgeRefs.current[index];
    if (!strip || !badge) return;

    const targetLeft = badge.offsetLeft - (strip.clientWidth - badge.clientWidth) / 2;
    strip.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  };

  useEffect(() => {
    updateActiveBadge();
    const onResize = () => updateActiveBadge();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      className="relative w-full flex justify-center overflow-hidden"
      style={{ height: "487px" }}
    >
      <img
        src={bgCertified}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      <div
        className="relative z-[1] flex flex-col items-center justify-center text-center"
        style={{ width: "100%", maxWidth: "1440px", height: "100%", gap: "32px" }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              fontSize: "40px",
              lineHeight: "60px",
              color: "#FFFFFF",
            }}
          >
            Certified Products
          </h2>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "28px",
              color: "#FFFFFF",
            }}
          >
            Curated Combinations for Effortless Cleaning
          </p>
        </div>

        <div className="relative w-full flex flex-col items-center justify-center">
          <div
            ref={stripRef}
            onScroll={updateActiveBadge}
            className="mx-auto inline-flex h-auto w-full max-w-[1237px] items-center justify-start gap-5 overflow-x-auto rounded-[24px] bg-white px-5 py-5 shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:h-[213px] md:justify-between md:gap-[50px] md:px-10 md:py-0"
            style={{ scrollBehavior: "smooth" }}
          >
            {BADGES.map((img, index) => (
              <div
                key={index}
                ref={(el) => {
                  badgeRefs.current[index] = el;
                }}
                className="flex h-[108px] w-[108px] shrink-0 items-center justify-center md:h-[148px] md:w-[148px]"
                style={{ flex: "0 0 auto" }}
              >
                <img
                  src={img}
                  alt="badge"
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 md:hidden">
            {BADGES.map((_, index) => (
              <button
                key={`badge-dot-${index}`}
                type="button"
                onClick={() => scrollToBadge(index)}
                aria-label={`Go to badge ${index + 1}`}
                className={`rounded-full transition-all ${
                  activeBadge === index
                    ? "h-2.5 w-6 bg-white"
                    : "h-2.5 w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertifiedProductsSection;
