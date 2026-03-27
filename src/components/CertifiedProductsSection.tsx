import cloverDark from "@/assets/clover-green-dark.png";

// ✅ IMPORT YOUR BADGE IMAGES
import makeInIndia from "@/assets/image 3647 [Vectorized].png";
import locallySourced from "@/assets/image 3648 [Vectorized].png";
import authentic from "@/assets/image 3649 [Vectorized].png";
import plantBased from "@/assets/download 3 [Vectorized].png";
import biodegradable from "@/assets/7272213 1 1 (Traced).png";

const BADGES = [
  makeInIndia,
  locallySourced,
  authentic,
  plantBased,
  biodegradable,
];

const CertifiedProductsSection = () => {
  return (
    <section
      className="relative w-full flex justify-center overflow-hidden"
      style={{
        background: "#064734",
        height: "487px",
      }}
    >
      {/* 🌿 CLOVERS (FIXED VISIBILITY) */}
      <img
        src={cloverDark}
        className="absolute pointer-events-none"
        style={{
          width: "240px",
          left: "-60px",
          top: "-20px",
          opacity: 0.1,
          filter: "invert(1) brightness(2)", // 🔥 makes it visible
        }}
      />

      <img
        src={cloverDark}
        className="absolute pointer-events-none"
        style={{
          width: "200px",
          right: "80px",
          top: "60px",
          opacity: 0.1,
          filter: "invert(1) brightness(2)",
        }}
      />

      <img
        src={cloverDark}
        className="absolute pointer-events-none"
        style={{
          width: "220px",
          right: "-40px",
          bottom: "-30px",
          opacity: 0.1,
          filter: "invert(1) brightness(2)",
        }}
      />

      <img
        src={cloverDark}
        className="absolute pointer-events-none"
        style={{
          width: "220px",
          left: "-80px",
          bottom: "-40px",
          opacity: 0.1,
          filter: "invert(1) brightness(2)",
        }}
      />

      {/* ✅ MAIN CONTENT */}
      <div
        className="relative z-[1] flex flex-col items-center justify-center text-center"
        style={{
          width: "100%",
          maxWidth: "1440px",
          height: "100%",
          gap: "32px",
        }}
      >
        {/* Heading */}
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

        {/* ✅ WHITE STRIP */}
        <div
          className="flex items-center justify-center"
          style={{
            width: "1100px",
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "32px 40px",
            gap: "60px",
          }}
        >
          {BADGES.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="badge"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertifiedProductsSection;