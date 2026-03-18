import { ShieldCheck, Leaf, Baby, Heart, Recycle, FlaskConical, PawPrint } from "lucide-react";

const BADGES = [
  { icon: <ShieldCheck size={32} />, title: "Non-Toxic", subtitle: "No harsh chemicals" },
  { icon: <FlaskConical size={32} />, title: "IFRA Certified", subtitle: "Safe fragrance standards" },
  { icon: <Leaf size={32} />, title: "100% Natural", subtitle: "Plant-based formulas" },
  { icon: <Baby size={32} />, title: "Child Safe", subtitle: "Gentle and safe" },
  { icon: <PawPrint size={32} />, title: "Pet Friendly", subtitle: "No harmful ingredients" },
  { icon: <Recycle size={32} />, title: "Biodegradable", subtitle: "Eco-friendly formulas" },
  { icon: <Heart size={32} />, title: "Dermatologically Safe", subtitle: "Tested and approved" },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-background py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground text-center mb-12">
          Why rePhyl is Different
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8">
          {BADGES.map((badge, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary">
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">{badge.title}</p>
                <p className="text-xs text-muted-foreground leading-tight mt-1">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
