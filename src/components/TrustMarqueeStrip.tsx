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
    <div className="marquee-container">
      <div className="marquee-track">
        
        {/* REPEAT MANY TIMES → removes gap */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="marquee-group">
            {ITEMS.map((item, index) => (
              <div key={index} className="item">
                <span>{item}</span>
                <span className="dot" />
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
};

export default TrustMarqueeStrip;