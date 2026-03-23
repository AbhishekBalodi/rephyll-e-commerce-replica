import cloverDark from "@/assets/clover-green-dark.png";

const BADGES = [
  { label: "Make in India", text: "MAKE IN INDIA", style: "bg-gray-100" },
  { label: "Locally Sourced", text: "LOCALLY SOURCED" },
  { label: "100% Authentic", text: "100% AUTHENTIC" },
  { label: "Plant Based", text: "PLANT BASED" },
  { label: "Biodegradable", text: "BIODEGRADABLE" },
];

const CertifiedProductsSection = () => {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#064734", height: "487px" }}>
      {/* Clovers */}
      <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "252px", right: "-20px", top: "-41px", opacity: 0.15 }} />
      <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "221px", right: "100px", bottom: "-30px", opacity: 0.12 }} />
      <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "221px", right: "150px", top: "80px", opacity: 0.12 }} />
      <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "221px", left: "-110px", top: "-41px", opacity: 0.12 }} />
      <img src={cloverDark} alt="" aria-hidden="true" className="absolute pointer-events-none" style={{ width: "227px", left: "-20px", bottom: "-30px", opacity: 0.1 }} />

      <div className="relative z-[1] mx-auto max-w-[1280px] px-4 flex flex-col items-center justify-center h-full gap-8">
        <div className="text-center">
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", color: "#FFFFFF" }}>
            Certified Products
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", color: "#FFFFFF" }}>
            Curated Combinations for Effortless Cleaning
          </p>
        </div>

        <div className="bg-white rounded-2xl px-12 py-10 flex items-center justify-center gap-12" style={{ maxWidth: "1100px", width: "100%" }}>
          {BADGES.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-3">
              <div className="w-[120px] h-[120px] rounded-full border-2 border-[#064734] flex items-center justify-center" style={{ background: badge.style === "bg-gray-100" ? "#f3f4f6" : "transparent" }}>
                <span className="text-[#064734] font-bold text-center text-xs leading-tight px-2">{badge.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertifiedProductsSection;
