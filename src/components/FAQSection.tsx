import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import faqBg from "@/assets/3651.png";
import { getProductFaqs } from "@/data/faqs";

interface FAQSectionProps {
  productName?: string;
  productSlug?: string;
}

const FAQSection = ({ productName = "", productSlug = "" }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState(-1);
  const navigate = useNavigate();
  const faqItems = getProductFaqs(productName, productSlug);

  return (
    <section className="relative w-full flex justify-center overflow-hidden py-10 md:py-14">
      {/* Background */}
      <img
        src={faqBg}
        alt="faq background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Container */}
      <div className="relative w-full max-w-[1440px] flex items-center justify-center md:justify-start px-3 md:px-6 lg:px-8">
        {/* FAQ CARD */}
        <div className="flex flex-col w-full max-w-[720px] md:ml-[52px] bg-[#064734]/95 rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.28)] p-4 sm:p-6 md:p-8">
          {/* Heading */}
          <h2 className="font-bold text-white text-[28px] sm:text-[34px] md:text-[42px] leading-[1.08] mb-4 sm:mb-6">
            Do you have questions?
          </h2>

          {/* Questions */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {faqItems.length === 0 ? (
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                No FAQs are configured for this product yet.
              </p>
            ) : faqItems.map((item, i) => (
              <div
                key={i}
                className="border-b border-white/25 pb-3 cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <div className="flex justify-between items-start gap-3">
                  <span className="font-semibold text-[15px] sm:text-[17px] md:text-[19px] leading-snug text-white">
                    {item.question}
                  </span>

                  {openIndex === i ? (
                    <ChevronUp size={18} color="#FAFAFA" className="mt-0.5 shrink-0" />
                  ) : (
                    <ChevronDown size={18} color="#FAFAFA" className="mt-0.5 shrink-0" />
                  )}
                </div>

                {openIndex === i && (
                  <p className="mt-3 sm:mt-4 text-[13px] sm:text-[15px] leading-relaxed text-white/95 whitespace-pre-line">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 mt-6 sm:mt-7">
            <span className="font-semibold text-sm sm:text-base text-white">
              My question is not here.
            </span>

            <button
              onClick={() => navigate("/contact")}
              className="w-fit px-4 py-2 bg-white rounded-lg border-none flex items-center gap-1 cursor-pointer"
            >
              <span className="font-semibold text-xs sm:text-sm text-[#1B242C]">
                CONNECT US
              </span>
              <ArrowUpRight size={18} color="#1B242C" />
            </button>

            <Link
              to="/faqs"
              className="font-semibold text-xs sm:text-sm text-white underline underline-offset-4"
            >
              ALL FAQS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;