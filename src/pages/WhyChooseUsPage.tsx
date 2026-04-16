import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Stethoscope, Flag, ShieldCheck, Droplets, Baby, Leaf, Recycle, Heart, FlaskConical, Award } from "lucide-react";

const VALUES = [
  {
    icon: <Stethoscope size={32} />,
    title: "Designed by Doctors",
    description: "Our formulas are developed in collaboration with dermatologists and healthcare professionals to ensure they're safe for your family.",
  },
  {
    icon: <Flag size={32} />,
    title: "Proudly Made in India",
    description: "Every rePhyl product is manufactured in India, supporting local communities and reducing our carbon footprint.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Dermatologically Approved",
    description: "All our products undergo rigorous dermatological testing to ensure they're gentle on even the most sensitive skin.",
  },
  {
    icon: <Droplets size={32} />,
    title: "No Added Colors",
    description: "We never use synthetic dyes or artificial colors. What you see is the natural color of our plant-based ingredients.",
  },
  {
    icon: <Baby size={32} />,
    title: "Baby Safe Products",
    description: "Our products are formulated to be safe around babies and toddlers. No harsh chemicals, no worries.",
  },
  {
    icon: <Leaf size={32} />,
    title: "100% Plant-Based",
    description: "Every ingredient in our products comes from plants. No petroleum-based chemicals, ever.",
  },
  {
    icon: <Recycle size={32} />,
    title: "Recyclable Packaging",
    description: "All our bottles and boxes are made from recyclable materials. We're committed to reducing plastic waste.",
  },
  {
    icon: <Heart size={32} />,
    title: "Cruelty Free",
    description: "We never test on animals. Our products are certified cruelty-free and vegan-friendly.",
  },
  {
    icon: <FlaskConical size={32} />,
    title: "No Harsh Chemicals",
    description: "Free from phosphates, parabens, SLS, ammonia, and hydrochloric acid. Clean cleaning, the natural way.",
  },
  {
    icon: <Award size={32} />,
    title: "Quality Guaranteed",
    description: "Every batch is tested for quality and effectiveness. If you're not satisfied, we'll make it right.",
  },
];

const WhyChooseUsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="bg-secondary/50 py-16 md:py-24 px-4 md:px-6 pt-[104px]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Why Choose rePhyl?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe cleaning your home shouldn't mean harming the planet. Here's what makes rePhyl different from every other cleaning brand.
          </p>
        </div>
      </section>

      {/* Values grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((v, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-primary mb-4">{v.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4 md:px-6 text-center">
        <h2 className="text-3xl font-display font-bold mb-4">Ready to Make the Switch?</h2>
        <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
          Join thousands of Indian families who've chosen plant-based cleaning for a healthier home.
        </p>
        <a href="/" className="inline-block bg-background text-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
          Shop Now
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default WhyChooseUsPage;
