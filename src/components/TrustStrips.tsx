import { Award, Factory, MapPin, BadgeCheck, Flag, Leaf, Stethoscope, Star } from "lucide-react";
import { DUMMY_REVIEWS } from "@/data/reviews";

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

const TOP_REVIEWS = DUMMY_REVIEWS.filter((r) => r.rating >= 4).slice(0, 4);

const TrustStrips = () => {
  return (
    <div className="mt-16">

      {/* Promotional Banner - More Cleaning, Less Spending */}
      <div className="bg-gradient-to-r from-brand-stream via-brand-lime/30 to-brand-stream py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-background/80 text-foreground text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Buy Together
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
            More Cleaning, Less Spending
          </h2>
          <p className="text-foreground/70 text-sm md:text-base max-w-xl mx-auto mb-6">
            Bundle your favourites and save big on eco-friendly cleaning essentials for the whole home.
          </p>
          <span className="inline-block bg-foreground text-background font-bold text-sm px-8 py-3 rounded-full uppercase tracking-wider">
            Shop Kits
          </span>
        </div>
      </div>

      {/* Trusted by Families - Reviews Strip */}
      <div className="bg-foreground py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-background text-center mb-10">
            Trusted by Families
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-card/10 backdrop-blur border border-background/10 rounded-xl p-5 flex flex-col"
              >
                <h4 className="text-sm font-bold text-background mb-2">{review.title}</h4>
                <p className="text-background/70 text-sm leading-relaxed flex-1 mb-4">
                  {review.content.length > 150 ? review.content.substring(0, 150) + "..." : review.content}
                </p>
                <div className="mt-auto">
                  <span className="text-background font-semibold text-sm">{review.name}</span>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={s <= Math.floor(review.rating) ? "fill-primary text-primary" : "text-background/30"}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
