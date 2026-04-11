import makeInIndia from "@/assets/image 3647 [Vectorized].png";
import locallySourced from "@/assets/image 3648 [Vectorized].png";
import authentic from "@/assets/image 3649 [Vectorized].png";
import plantBased from "@/assets/download 3 [Vectorized].png";
import biodegradable from "@/assets/7272213 1 1 (Traced).png";
import bgCertified from "@/assets/bg-certified-products.png";

const BADGES = [makeInIndia, locallySourced, authentic, plantBased, biodegradable];

const CertifiedProductsSection = () => {
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
              style={{ width: "120px", height: "120px", objectFit: "contain" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertifiedProductsSection;
