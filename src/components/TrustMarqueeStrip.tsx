const ITEMS = [
  "Non-Toxic",
  "Plant-Based",
  "Child Safe",
  "Pet Safe",
  "100% Natural",
  "Safe for everyday cleaning",
];

const TrustMarqueeStrip = () => {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        height: "40px",
        background: "#064734",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="flex animate-marquee-slow whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center">
            {ITEMS.map((item, index) => (
              <span
                key={index}
                className="flex items-center"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#FFFFFF",
                  paddingRight: "32px",
                }}
              >
                {item}
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#FFFFFF",
                    borderRadius: "50%",
                    marginLeft: "32px",
                    flexShrink: 0,
                  }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustMarqueeStrip;
