import cloverDark from "@/assets/clover-green-dark.png";
import platformStrip from "@/assets/Feature (1).png";

const WeAreAvailableOnSection = () => {
  return (
    <section
      className="relative w-full flex justify-center overflow-hidden"
      style={{
        background: "#064734",
        height: "487px",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* 🌿 CLOVERS (NOW VISIBLE) */}

      <img
        src={cloverDark}
        className="absolute pointer-events-none"
        style={{
          width: "153px",
          height: "153px",
          left: "-60px",
          top: "-20px",
          opacity: 0.12,
          zIndex: 0,
          filter: "invert(1) brightness(2)",
        }}
      />

      <img
        src={cloverDark}
        className="absolute pointer-events-none"
        style={{
          width: "153px",
          height: "153px",
          right: "80px",
          top: "60px",
          opacity: 0.12,
          zIndex: 0,
          filter: "invert(1) brightness(2)",
        }}
      />

      <img
        src={cloverDark}
        className="absolute pointer-events-none"
        style={{
          width: "153px",
          height: "153px",
          right: "-40px",
          bottom: "-30px",
          opacity: 0.12,
          zIndex: 0,
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
          opacity: 0.12,
          zIndex: 0,
          filter: "invert(1) brightness(2)",
        }}
      />

      {/* ✅ CONTENT (ABOVE CLOVERS) */}
      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{
          width: "100%",
          maxWidth: "1440px",
          height: "100%",
          gap: "24px",
          zIndex: 1, // 🔥 IMPORTANT
        }}
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

        <img
          src={platformStrip}
          alt="Available platforms"
          style={{
            width: "100%",
            maxWidth: "1100px",
            borderRadius: "16px",
            marginTop: "16px",
          }}
        />
      </div>
    </section>
  );
};

export default WeAreAvailableOnSection;