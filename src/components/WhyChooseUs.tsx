import { Stethoscope, Flag, ShieldCheck, Droplets, Baby } from "lucide-react";

const BADGES = [
  { icon: <Stethoscope size={24} />, title: "Designed", subtitle: "by doctors" },
  { icon: <Flag size={24} />, title: "Proudly", subtitle: "Made in India" },
  { icon: <ShieldCheck size={24} />, title: "Dermatologically", subtitle: "Approved" },
  { icon: <Droplets size={24} />, title: "No Added", subtitle: "Colors" },
  { icon: <Baby size={24} />, title: "Baby Safe", subtitle: "Products" },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-secondary/50 py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Why We're Different?
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Discover essential cleaning solutions that keep your home safe and fresh.
          </p>
        </div>

        <div className="bg-secondary/80 rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {BADGES.map((badge, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 ${i < BADGES.length - 1 ? "md:border-r md:border-border md:pr-8" : ""}`}
              >
                <div className="text-primary">{badge.icon}</div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{badge.title}</p>
                  <p className="text-sm text-muted-foreground leading-tight">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
