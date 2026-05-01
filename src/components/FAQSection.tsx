import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import faqBg from "@/assets/3651.png";

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
  const [openIndex, setOpenIndex] = useState(-1);
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full flex justify-center"
      style={{ minHeight: "818px" }}
    >
      {/* Background */}
      <img
        src={faqBg}
        alt="faq background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Container */}
      <div
        className="relative w-full flex items-center justify-center md:justify-start px-3 md:px-0"
        style={{
          maxWidth: "1440px",
          minHeight: "818px",
        }}
      >
        {/* FAQ CARD */}
        <div
          className="flex flex-col w-full max-w-[636px] md:ml-[52px]"
          style={{
            background: "#064734",
            borderRadius: "20px",
            padding: "clamp(18px, 3vw, 36px) clamp(16px, 3vw, 32px)",
          }}
        >
          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 8vw, 42px)",
              lineHeight: "100%",
              letterSpacing: "1%",
              color: "#FAFAFA",
              marginBottom: "20px",
            }}
          >
            Do you have questions?
          </h2>

          {/* Questions */}
          <div className="flex flex-col gap-7 md:gap-12">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1.5px solid rgba(235,235,235,0.25)",
                  paddingBottom: "12px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setOpenIndex(openIndex === i ? -1 : i)
                }
              >
                <div className="flex justify-between items-center">
                  <span
                    style={{
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(16px, 4vw, 20px)",
                      lineHeight: "100%",
                      letterSpacing: "0%",
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
                      marginTop: "30px",
                      fontFamily: "'Nunito Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(13px, 3.5vw, 16px)",
                      lineHeight: "120%",
                      color: "#FAFAFA",
                    }}
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <span
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#FAFAFA",
              }}
            >
              My question is not here.
            </span>

            <button
              onClick={() => navigate("/contact")}
              style={{
                padding: "8px 14px",
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
                  fontSize: "clamp(12px, 2.5vw, 15px)",
                  color: "#1B242C",
                }}
              >
                CONNECT US
              </span>
              <ArrowUpRight size={18} color="#1B242C" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;