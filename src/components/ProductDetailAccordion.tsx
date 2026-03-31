import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { ApiProductDetail } from "@/types/api";

interface ProductDetailAccordionProps {
  product: ApiProductDetail;
}

const ProductDetailAccordion = ({ product }: ProductDetailAccordionProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenSection(openSection === id ? null : id);

  const sections = [
    {
      id: "key-features",
      label: "Key Features",
      content:
        product.description ||
        product.seoDescription ||
        "Premium quality product with advanced cleaning formula.",
    },
    {
      id: "whats-inside",
      label: "What's Inside",
      content:
        product.description ||
        "Plant-based ingredients with eco-friendly formulation.",
    },
    {
      id: "how-to-use",
      label: "How To Use",
      content:
        "Spray directly on the surface and wipe clean with a dry cloth. For tough stains, let it sit for 2-3 minutes before wiping.",
    },
  ];

  return (
    <div className="mt-6 space-y-3">
      {sections.map((section) => {
        const isOpen = openSection === section.id;

        return (
          <div key={section.id}>

            {/* ✅ HEADER (FIGMA STYLE) */}
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all"
              style={{
                background: "#E2F3AF", // 🔥 LIGHT GREEN
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#064734", // 🔥 DARK GREEN TEXT
                }}
              >
                {section.label}
              </span>

              {isOpen ? (
                <Minus size={20} style={{ color: "#064734" }} />
              ) : (
                <Plus size={20} style={{ color: "#064734" }} />
              )}
            </button>

            {/* ✅ CONTENT */}
            {isOpen && (
              <div
                className="px-5 py-4 rounded-xl mt-2"
                style={{
                  background: "#F7FBEF", // subtle light bg (like Figma)
                }}
              >
                <p
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "22px",
                    color: "#064734",
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