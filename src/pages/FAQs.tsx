import { useEffect, useMemo, useState, type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useWebsitePageByPath } from "@/hooks/useWebsitePage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Leaf, SprayCan, Droplets, ShowerHead, CookingPot, Headphones, ArrowRight } from "lucide-react";
import faqsHero from "@/assets/faqs-hero.jpg";

type FaqCategory = "all" | "general" | "all-surface" | "toilet" | "dishwash" | "kitchen";

type FaqItem = {
  category: FaqCategory;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    category: "general",
    question: "What is Rephyl?",
    answer: "Rephyl is a plant-powered home care brand focused on effective cleaning with low-tox formulas designed for everyday family use.",
  },
  {
    category: "general",
    question: "Are Rephyl products eco-friendly?",
    answer: "Yes. Our formulas are designed to be gentler on the environment and reduce harsh chemical residue at home.",
  },
  {
    category: "all-surface",
    question: "Can all-surface cleaner be used on marble and granite?",
    answer: "Yes, it is suitable for sealed marble and granite. For delicate finishes, always test on a small hidden patch first.",
  },
  {
    category: "all-surface",
    question: "Will it leave residue after mopping?",
    answer: "When diluted correctly, it dries clean with low residue and no sticky feel.",
  },
  {
    category: "toilet",
    question: "Is toilet cleaner safe for pets?",
    answer: "Yes, when used as directed and after proper rinsing/ventilation. Keep pets away while cleaning wet surfaces.",
  },
  {
    category: "toilet",
    question: "How often should I deep clean the bathroom?",
    answer: "A deep clean once weekly plus quick daily wipe-down keeps odors and stains under control.",
  },
  {
    category: "dishwash",
    question: "Can dishwash liquid remove oily utensils?",
    answer: "Yes, it is designed to cut grease while being gentle on hands in normal usage.",
  },
  {
    category: "dishwash",
    question: "Is it safe for baby feeding utensils?",
    answer: "Yes, wash thoroughly with water after cleaning. Follow standard hygiene practices for feeding products.",
  },
  {
    category: "kitchen",
    question: "Can kitchen degreaser be used on stovetops?",
    answer: "Yes, it works well on stovetops, counters, and tiles. Avoid direct use on unsealed natural wood.",
  },
  {
    category: "kitchen",
    question: "How long should degreaser sit before wiping?",
    answer: "Let it sit for 2 to 5 minutes on heavy grease, then wipe with a damp microfiber cloth.",
  },
];

const FAQ_CATEGORY_META: Record<FaqCategory, { label: string; icon: ReactNode }> = {
  all: { label: "All FAQs", icon: <Search size={16} /> },
  general: { label: "General", icon: <Leaf size={16} /> },
  "all-surface": { label: "All Surface Cleaner", icon: <SprayCan size={16} /> },
  toilet: { label: "Toilet & Bathroom Cleaner", icon: <ShowerHead size={16} /> },
  dishwash: { label: "Dishwash Liquid", icon: <Droplets size={16} /> },
  kitchen: { label: "Kitchen Degreaser", icon: <CookingPot size={16} /> },
};

const FAQ_CATEGORIES: FaqCategory[] = ["all", "general", "all-surface", "toilet", "dishwash", "kitchen"];

const FAQs = () => {
  const { data: pageData } = useWebsitePageByPath("/faqs");
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!pageData) return;
    document.title = pageData.metaTitle || pageData.title || "FAQs - rePhyl";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageData.metaDescription || "");
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", pageData.metaKeywords || "");
    }
  }, [pageData]);

  const heroImage = pageData?.metaImg
    ? `${import.meta.env.VITE_BASE_URL || "https://www.rephyl.com"}${pageData.metaImg}`
    : faqsHero;

  const visibleFaqs = useMemo(() => {
    const byCategory = activeCategory === "all"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

    if (!searchText.trim()) return byCategory;

    const q = searchText.trim().toLowerCase();
    return byCategory.filter(
      (item) => item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
    );
  }, [activeCategory, searchText]);

  const groupedCount = useMemo(() => {
    return FAQ_CATEGORIES.reduce((acc, category) => {
      acc[category] = category === "all"
        ? FAQ_ITEMS.length
        : FAQ_ITEMS.filter((item) => item.category === category).length;
      return acc;
    }, {} as Record<FaqCategory, number>);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-foreground">
      <Navbar />

      <main className="w-full pt-[104px] pb-14">
        <section className="relative w-full overflow-hidden bg-[#F3F8EE]">
          <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-12 md:py-16 grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
            <div className="max-w-[640px]">
              <p className="text-sm tracking-[0.08em] uppercase text-[#648273] font-semibold">FAQs</p>
              <h1 className="mt-2 text-[42px] md:text-[64px] leading-[0.95] font-semibold text-[#0E1F17]">
                How can we help you?
              </h1>
              <p className="mt-4 text-[#5B6E64] text-lg max-w-[48ch]">
                Find quick answers to the most common questions about Rephyl products, orders, shipping and more.
              </p>

              <div className="mt-7 rounded-full border border-[#DFE9DC] bg-white px-4 py-3 flex items-center gap-2 max-w-[520px] shadow-sm">
                <Search size={18} className="text-[#648273]" />
                <input
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search for a question..."
                  className="w-full bg-transparent outline-none text-sm text-[#173428] placeholder:text-[#8DA094]"
                />
              </div>
            </div>
            <div className="relative h-[340px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden">
              <img src={heroImage} alt="FAQ hero" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 -mt-7 relative z-20">
          <div className="rounded-2xl border border-[#E6EDE2] bg-white px-4 md:px-8 py-5 shadow-[0_6px_24px_rgba(0,0,0,0.04)]">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {FAQ_CATEGORIES.map((category) => {
                const meta = FAQ_CATEGORY_META[category];
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 whitespace-nowrap text-[15px] font-medium border transition-colors ${
                      isActive
                        ? "bg-[#064734] text-white border-[#064734]"
                        : "bg-white text-[#385E4E] border-[#DCE8D9] hover:bg-[#F1F6EE]"
                    }`}
                  >
                    {meta.icon}
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 grid lg:grid-cols-[320px_minmax(0,1fr)] gap-8 mt-8">
          <aside className="rounded-2xl border border-[#E4EADF] bg-white p-4">
            <div className="space-y-2">
              {FAQ_CATEGORIES.slice(1).map((category) => {
                const meta = FAQ_CATEGORY_META[category];
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-3 text-left transition-colors ${
                      isActive ? "bg-[#EAF5D7]" : "hover:bg-[#F4F8F1]"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 text-sm text-[#203A2F]">
                      {meta.icon}
                      {meta.label}
                    </span>
                    <span className="text-xs text-[#648273] font-semibold">{groupedCount[category]}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 rounded-xl bg-[#F3F8EC] border border-[#E2ECDD] p-4">
              <div className="w-10 h-10 rounded-full bg-[#D5EFB1] flex items-center justify-center mb-3">
                <Headphones size={18} className="text-[#0D3A2A]" />
              </div>
              <p className="font-semibold text-[#153528]">Still need help?</p>
              <p className="text-sm text-[#5A6E63] mt-1">Our support team is ready to assist you.</p>
              <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#064734] text-white text-sm font-semibold hover:bg-[#053a29]">
                Contact Support
                <ArrowRight size={14} />
              </button>
            </div>
          </aside>

          <div className="rounded-2xl border border-[#E4EADF] bg-white p-6 md:p-8 min-h-[600px]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#EAF5D7] flex items-center justify-center text-[#064734]">
                {FAQ_CATEGORY_META[activeCategory].icon}
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-[#102A20]">{FAQ_CATEGORY_META[activeCategory].label}</h2>
                <p className="text-[#60756A] text-sm">Everything you need to know about Rephyl and our products.</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-3 mt-5">
              {visibleFaqs.map((faq, idx) => (
                <AccordionItem key={`${faq.question}-${idx}`} value={`faq-${idx}`} className="border border-[#E9EFE5] rounded-xl px-5">
                  <AccordionTrigger className="text-left font-semibold text-[#173428] text-[16px] py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5A6E63] leading-relaxed text-[15px] pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {visibleFaqs.length === 0 ? (
              <p className="text-sm text-[#6D7F75] mt-4">No FAQs matched your search.</p>
            ) : null}
          </div>
        </section>

        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#E4EADF] bg-white px-4 md:px-8 py-6 md:py-8 flex flex-wrap items-center justify-between gap-4">
            <img src="/placeholder.svg" alt="support" className="absolute left-0 bottom-0 w-28 h-28 object-cover opacity-25" />
            <div className="relative z-10">
              <p className="text-[30px] md:text-[38px] leading-[1] font-semibold text-[#102A20]">Can&apos;t find what you&apos;re looking for?</p>
              <p className="text-[#60756A] mt-2">We&apos;re here to help.</p>
            </div>
            <button className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#064734] text-white font-semibold hover:bg-[#053a29]">
              Contact Support
              <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQs;
