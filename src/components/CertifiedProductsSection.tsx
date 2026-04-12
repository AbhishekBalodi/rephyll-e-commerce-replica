import makeInIndia from "@/assets/image 3647 [Vectorized].png";
import locallySourced from "@/assets/image 3648 [Vectorized].png";
import authentic from "@/assets/image 3649 [Vectorized].png";
import plantBased from "@/assets/download 3 [Vectorized].png";
import biodegradable from "@/assets/7272213 1 1 (Traced).png";
import bgCertified from "@/assets/bg-certified-products.png";

const BADGES = [makeInIndia, locallySourced, authentic, plantBased, biodegradable];

import { useRef } from "react";

const CertifiedProductsSection = () => {
  const stripRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (!stripRef.current) return;
    stripRef.current.scrollBy({ left: -Math.max(200, stripRef.current.clientWidth / 2), behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!stripRef.current) return;
    stripRef.current.scrollBy({ left: Math.max(200, stripRef.current.clientWidth / 2), behavior: "smooth" });
  };

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

        <div className="relative w-full flex items-center justify-center">
          <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center md:hidden">◀</button>
          <div
            ref={stripRef}
            className="inline-flex items-center justify-center md:justify-center max-w-full overflow-x-auto py-6 px-4 rounded-[20px] bg-white gap-6"
            style={{ scrollBehavior: "smooth" }}
          >
            {BADGES.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="badge"
                className="w-[100px] h-[100px] object-contain"
                style={{ flex: "0 0 auto" }}
              />
            ))}
          </div>
          <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center md:hidden">▶</button>
        </div>
      </div>
    </section>
  );
};

export default CertifiedProductsSection;
