import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { ApiProductDetail } from "@/types/api";

interface ProductDetailAccordionProps {
  product: ApiProductDetail;
}

const ProductDetailAccordion = ({
  product,
}: ProductDetailAccordionProps) => {
  const [openSection, setOpenSection] = useState<string | null>(
    null
  );

  const toggle = (id: string) =>
    setOpenSection(
      openSection === id ? null : id
    );

  // show only backend sections that have content
  const sections = [
    {
      id: "key-features",
      label: "Key Features",
      content:
        product.keyFeatures ?? "",
    },
    {
      id: "whats-inside",
      label: "What's Inside",
      content:
        product.whatsInside ?? "",
    },
    {
      id: "how-to-use",
      label: "How To Use",
      content:
        product.howToUse ?? "",
    },
  ].filter(
    (section) =>
      section.content.trim() !== ""
  );

  return (
    <div className="mt-6 space-y-3">
      {sections.map((section) => {
        const isOpen =
          openSection === section.id;

        return (
          <div key={section.id}>
            {/* HEADER */}
            <button
              type="button"
              onClick={() =>
                toggle(section.id)
              }
              className="w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all"
              style={{
                background:
                  "#E2F3AF",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color:
                    "#064734",
                }}
              >
                {section.label}
              </span>

              {isOpen ? (
                <Minus
                  size={20}
                  style={{
                    color:
                      "#064734",
                  }}
                />
              ) : (
                <Plus
                  size={20}
                  style={{
                    color:
                      "#064734",
                  }}
                />
              )}
            </button>

            {/* CONTENT */}
            {isOpen && (
              <div
                className="px-5 py-4 rounded-xl mt-2"
                style={{
                  background:
                    "#F7FBEF",
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "22px",
                    color:
                      "#064734",
                    whiteSpace:
                      "pre-line",
                  }}
                >
                  {section.content}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductDetailAccordion;