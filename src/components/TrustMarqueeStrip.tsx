const TRUST_TEXT = "99+ ✦ Non-Toxic • Plant-Based • Family Safe";
const OFFER_TEXT = "🌿 Flat 20% Off on Bundles | Code: CLEAN20 ✦ Free Shipping ₹499+ ✦ Non-Toxic • Plant-Based • Family Safe";

const TrustMarqueeStrip = () => {
  const combinedText = `${TRUST_TEXT}     ${OFFER_TEXT}`;

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
          {combinedText}     {combinedText}
        </span>
        <span
          className="text-white text-sm font-normal tracking-wide mx-4"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: "20px" }}
        >
          {combinedText}     {combinedText}
        </span>
      </div>
    </div>
  );
};

export default TrustMarqueeStrip;
