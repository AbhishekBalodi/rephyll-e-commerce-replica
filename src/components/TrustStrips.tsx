import { Award, Factory, MapPin, BadgeCheck, Flag, Leaf, Stethoscope } from "lucide-react";

const CERTIFICATIONS = [
  { icon: <Award size={28} />, label: "IFRA Certified" },
  { icon: <Factory size={28} />, label: "GMP Certified" },
  { icon: <MapPin size={28} />, label: "Locally Sourced" },
  { icon: <BadgeCheck size={28} />, label: "100% Authentic" },
  { icon: <Flag size={28} />, label: "Made in India" },
  { icon: <Leaf size={28} />, label: "Plant Based" },
  { icon: <Stethoscope size={28} />, label: "Clinically Proven" },
];

const FEATURES = [
  {
    icon: "📦",
    title: "Delivers in 3–5 days",
    desc: "Your eco-friendly cleaning essentials, delivered fast within 3–5 days!",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Loves kids",
    desc: "Gentle, chemical-free products made with kids' safety in mind.",
  },
  {
    icon: "🌱",
    title: "Biodegradable",
    desc: "Cleans your home while protecting the planet with biodegradable, eco-friendly formulas.",
  },
  {
    icon: "🐕",
    title: "Safe for pets",
    desc: "Pet-friendly cleaning solutions that care for your furry family members.",
  },
];

const TrustStrips = () => {
  return (
    <div className="mt-16">
      {/* Certifications strip */}
      <div className="bg-background border-y border-border py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {CERTIFICATIONS.map((cert, i) => (
            <div key={i} className="flex flex-col items-center gap-2 text-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary border-2 border-primary/20">
                {cert.icon}
              </div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide leading-tight">
                {cert.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-secondary/40 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-3xl mb-4">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrips;
