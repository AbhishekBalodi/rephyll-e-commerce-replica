import cloverDark from "@/assets/clover-green-dark.png";

const PLATFORMS = [
  { name: "Amazon", color: "#FF9900", text: "amazon", style: { fontWeight: 700, fontSize: "36px", fontFamily: "'Poppins', sans-serif" } },
  { name: "Blinkit", color: "#0c831f", text: "blinkit", style: { fontWeight: 700, fontSize: "32px", fontFamily: "'Poppins', sans-serif" } },
  { name: "Zepto", color: "#7B2FF2", text: "zepto", style: { fontWeight: 700, fontSize: "36px", fontFamily: "'Poppins', sans-serif" } },
  { name: "Flipkart", color: "#2874F0", text: "Flipkart", style: { fontWeight: 600, fontSize: "28px", fontFamily: "'Poppins', sans-serif" } },
  { name: "Swiggy", color: "#FC8019", text: "Swiggy", style: { fontWeight: 700, fontSize: "28px", fontFamily: "'Poppins', sans-serif" } },
];

const WeAreAvailableOnSection = () => {
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
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "40px", lineHeight: "60px", color: "#FFFFFF", fontStyle: "italic" }}>
            We Are Available On
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "20px", lineHeight: "28px", color: "#FFFFFF" }}>
            Curated Combinations for Effortless Cleaning
          </p>
        </div>

        <div className="bg-white rounded-2xl px-12 py-10 flex items-center justify-center gap-16" style={{ maxWidth: "1100px", width: "100%" }}>
          {PLATFORMS.map((platform) => (
            <span
              key={platform.name}
              style={{ color: platform.color, ...platform.style }}
            >
              {platform.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeAreAvailableOnSection;
