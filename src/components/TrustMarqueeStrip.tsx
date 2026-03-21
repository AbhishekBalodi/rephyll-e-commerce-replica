const SEGMENTS = [
  "99+ ✦ Non-Toxic • Plant-Based • Family Safe",
  "🌿 Flat 20% Off on Bundles | Code: CLEAN20",
  "✦ Free Shipping ₹499+",
  "✦ Non-Toxic • Plant-Based • Family Safe",
];

const SEP = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
const combinedText = SEGMENTS.join(SEP);
const fullText = `${combinedText}${SEP}${combinedText}`;

const TrustMarqueeStrip = () => {
  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{ background: "#064734" }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        <span
          className="text-white text-sm font-normal tracking-wide mx-4"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px" }}
        >
          {fullText}
        </span>
        <span
          className="text-white text-sm font-normal tracking-wide mx-4"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px" }}
        >
          {fullText}
        </span>
      </div>
    </div>
  );
};

export default TrustMarqueeStrip;
