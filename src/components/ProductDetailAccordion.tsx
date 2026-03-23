import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { ApiProduct } from "@/types/api";

interface ProductDetailAccordionProps {
  product: ApiProduct;
}

const ProductDetailAccordion = ({ product }: ProductDetailAccordionProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  const sections = [
    {
      id: "key-features",
      label: "Key Features",
      content: product.productDetails || product.metaDescription || "Premium quality product with advanced cleaning formula.",
    },
    {
      id: "whats-inside",
      label: "What's Inside",
      content: product.ingredients || "Plant-based ingredients with eco-friendly formulation.",
    },
    {
      id: "how-to-use",
      label: "How To Use",
      content: product.nutritionAnalysis || "Spray directly on the surface and wipe clean with a dry cloth. For tough stains, let it sit for 2-3 minutes before wiping.",
    },
  ];

  return (
    <div className="border-t border-border mt-6">
      {sections.map((section) => (
        <div key={section.id} className="border-b border-border">
          <button
            onClick={() => toggle(section.id)}
            className="w-full flex items-center justify-between py-5 px-0 text-left"
          >
            <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#1A1A1A" }}>
              {section.label}
            </span>
            {openSection === section.id ? (
              <Minus size={20} className="text-foreground flex-shrink-0" />
            ) : (
              <Plus size={20} className="text-foreground flex-shrink-0" />
            )}
          </button>
          {openSection === section.id && (
            <div className="pb-5 pr-8">
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "22px", color: "#666" }}>
                {section.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductDetailAccordion;
