import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Are Rephyll products safe for pets and children?",
    a: "Yes! All our products are made with plant-based, non-toxic ingredients that are completely safe for pets and children. No harsh chemicals, no worries.",
  },
  {
    q: "Are Rephyll products as effective as chemical cleaners?",
    a: "Absolutely. Our plant-based formulas are tested and proven to be as effective — if not better — than traditional chemical-based cleaners.",
  },
  {
    q: "What is the shelf life of Rephyll products?",
    a: "Most of our products have a shelf life of 24 months from the date of manufacture. Please check individual product labels for specific details.",
  },
  {
    q: "Do you ship all over India?",
    a: "Yes, we ship pan-India. Orders are typically delivered within 5–7 business days depending on your location.",
  },
  {
    q: "Is the packaging recyclable?",
    a: "Yes, all our packaging is made from recyclable materials. We encourage you to recycle the bottles after use.",
  },
  {
    q: "How do I contact customer support?",
    a: "You can reach us at care@rephyl.com or call us at +91 9313984685. We're happy to help!",
  },
  {
    q: "Do you offer refunds or replacements?",
    a: "Yes, we have a hassle-free refund and replacement policy. If you receive a damaged or defective product, contact us within 7 days of delivery.",
  },
  {
    q: "Are Rephyll products biodegradable?",
    a: "Yes, all our formulas are 100% biodegradable and septic-safe. They break down naturally without harming the environment.",
  },
];

const FAQs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2">FAQs</h1>
        <p className="text-center text-muted-foreground mb-10">Frequently Asked Questions</p>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;
