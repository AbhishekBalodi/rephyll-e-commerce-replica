import { useRef } from "react";
import platformStrip from "@/assets/Feature (1).png";
import bgAvailable from "@/assets/bg-available-on.png";

const WeAreAvailableOnSection = () => {
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
        src={bgAvailable}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{ width: "100%", maxWidth: "1440px", height: "100%", gap: "24px", zIndex: 1 }}
      >
        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "60px",
            color: "#FFFFFF",
          }}
        >
          We Are Available On
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

        <div className="relative w-full flex justify-center items-center">
          <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center md:hidden">◀</button>
          <div ref={stripRef} className="inline-flex items-center justify-center max-w-full overflow-x-auto rounded-[20px] mt-4 bg-white py-4 px-4" style={{ gap: 24 }}>
            <img
              src={platformStrip}
              alt="Available platforms"
              className="h-[100px] block"
              style={{ width: "auto", display: "block", objectFit: "contain", flex: "0 0 auto" }}
            />
          </div>
          <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center md:hidden">▶</button>
        </div>
      </div>
    </section>
  );
};

export default WeAreAvailableOnSection;
