import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 👉 IMPORT YOUR IMAGE HERE
import faqBg from "@/assets/image 3652.png"; 
// (change path based on your project)

const FAQ_ITEMS = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 15-day return window for all unused or unopened items. Returns must include original packaging and proof of purchase for processing.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Currently, we ship across India. International shipping is coming soon. Stay tuned for updates!",
  },
  {
    question: "What if I receive a damaged or defective product?",
    answer:
      "If you receive a damaged product, please contact our support team within 48 hours with photos. We'll arrange a replacement or refund.",
  },
  {
    question: "Are the product colors on the website accurate?",
    answer:
      "We try to display colors as accurately as possible. However, slight variations may occur due to screen settings and lighting conditions.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full flex justify-center"
      style={{ height: "818px" }} // Figma height
    >
      {/* ✅ Background Image */}
      <img
        src={faqBg}
        alt="faq background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay container */}
      <div
        className="relative w-full flex"
        style={{
          maxWidth: "1440px", // Figma width
          height: "818px",
        }}
      >
        {/* ✅ FAQ CARD */}
        <div
          className="flex flex-col justify-between"
          style={{
            width: "636px", // Figma width
            height: "594px", // Figma height (IMPORTANT FIX)
            marginLeft: "52px",
            marginTop: "74px",
            background: "#064734",
            borderRadius: "20px",
            padding: "36px 32px 44px",
          }}
        >
          {/* Top content */}
          <div>
            <h2
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 700,
                fontSize: "42px",
                lineHeight: "57px",
                color: "#FAFAFA",
                marginBottom: "24px",
              }}
            >
              Do you have questions?
            </h2>

            <div>
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "1.5px solid rgba(235,235,235,0.25)",
                    padding: "16px 0",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setOpenIndex(openIndex === i ? -1 : i)
                  }
                >
                  <div className="flex justify-between items-center">
                    <span
                      style={{
                        fontFamily: "'Nunito Sans'",
                        fontWeight: 600,
                        fontSize: "20px",
                        color: "#FAFAFA",
                      }}
                    >
                      {item.question}
                    </span>

                    {openIndex === i ? (
                      <ChevronUp size={16} color="#FAFAFA" />
                    ) : (
                      <ChevronDown size={16} color="#FAFAFA" />
                    )}
                  </div>

                  {openIndex === i && (
                    <p
                      style={{
                        marginTop: "12px",
                        fontSize: "16px",
                        color: "#FAFAFA",
                      }}
                    >
                      {item.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex items-center gap-4">
            <span
              style={{
                fontSize: "16px",
                color: "#FAFAFA",
              }}
            >
              My question is not here.
            </span>

            <button
              onClick={() => navigate("/contact")}
              style={{
                padding: "10px 20px 10px 24px",
                background: "#FAFAFA",
                borderRadius: "8px",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#1B242C",
                }}
              >
                CONNECT US
              </span>
              <ArrowUpRight size={20} color="#1B242C" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;