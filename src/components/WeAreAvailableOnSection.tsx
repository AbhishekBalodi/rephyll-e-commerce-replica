import platformStrip from "@/assets/Feature (1).png";
import bgAvailable from "@/assets/bg-available-on.png";

const WeAreAvailableOnSection = () => {
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
