import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQ_ITEMS = [
  {
    question: "What is your return policy?",
    answer: "We offer a 15-day return window for all unused or unopened items. Returns must include original packaging and proof of purchase for processing.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship across India. International shipping is coming soon. Stay tuned for updates!",
  },
  {
    question: "What if I receive a damaged or defective product?",
    answer: "If you receive a damaged product, please contact our support team within 48 hours with photos. We'll arrange a replacement or refund.",
  },
  {
    question: "Are the product colors on the website accurate?",
    answer: "We try to display colors as accurately as possible. However, slight variations may occur due to screen settings and lighting conditions.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "818px" }}>
      {/* Background image placeholder - using gradient fallback */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)" }} />

      <div className="relative z-[1] flex h-full">
        {/* FAQ Panel */}
        <div
          className="flex flex-col"
          style={{
            width: "636px",
            marginLeft: "52px",
            marginTop: "74px",
            background: "#064734",
            borderRadius: "20px",
            padding: "36px 32px 44px",
            gap: "40px",
          }}
        >
          <div className="flex flex-col" style={{ gap: "24px", width: "572px" }}>
            <h2 style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700, fontSize: "42px", lineHeight: "57px", letterSpacing: "0.01em", color: "#FAFAFA" }}>
              Do you have questions?
            </h2>

            <div className="flex flex-col" style={{ gap: "16px" }}>
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="cursor-pointer"
                  style={{ borderBottom: "1.5px solid rgba(235, 235, 235, 0.25)", padding: "16px 0" }}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  <div className="flex justify-between items-center">
                    <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600, fontSize: "20px", lineHeight: "27px", color: "#FAFAFA" }}>
                      {item.question}
                    </span>
                    {openIndex === i ? <ChevronUp size={16} color="#FAFAFA" /> : <ChevronDown size={16} color="#FAFAFA" />}
                  </div>
                  {openIndex === i && (
                    <p className="mt-3" style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "22px", color: "#FAFAFA" }}>
                      {item.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center" style={{ gap: "16px" }}>
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "30px", letterSpacing: "0.01em", color: "#FAFAFA" }}>
              My question is not here.
            </span>
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center justify-center"
              style={{ padding: "10px 20px 10px 24px", gap: "4px", background: "#FAFAFA", borderRadius: "8px", border: "none", cursor: "pointer" }}
            >
              <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600, fontSize: "15px", lineHeight: "20px", letterSpacing: "0.02em", color: "#1B242C" }}>
                CONTACT US
              </span>
              <ArrowUpRight size={20} color="#1B242C" />
            </button>
          </div>
        </div>

        {/* Right side - product image area (decorative) */}
        <div className="flex-1 relative">
          {/* Decorative area - can show product imagery */}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
