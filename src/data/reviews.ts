export interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified?: boolean;
}

export const DUMMY_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Ranjini",
    rating: 3.5,
    title: "Usage of kitchen cleaner and degreaser",
    content: "Can the kitchen degreaser be used on granite surface and for cleaning stainless steel sink?",
    date: "10/17/2025",
    verified: true,
  },
  {
    id: "2",
    name: "Garima",
    rating: 5,
    title: "This is the best grease cleaner",
    content: "Awesome product. Immediately grease came out very easily. My aluminium doors, windows, fans, everything is looking brand new now. Thankyou so much team. Bought this from Instamart. Fantastic product. I am your fan now.",
    date: "10/16/2025",
  },
  {
    id: "3",
    name: "Akanksha",
    rating: 4,
    title: "The most effective kitchen cleaner I've ever used.",
    content: "This product has changed my kitchen cleaning routine. It easily tackles tough grease and grime, leaving my counters and stovetop sparkling. The nontoxic formula is a huge benefit, and it works better than any other brand I've tried.",
    date: "10/06/2025",
  },
  {
    id: "4",
    name: "Renu",
    rating: 5,
    title: "The best kitchen cleaner, hands down!",
    content: "My kitchen has never been this clean! This cleaner and degreaser tackles everything from food splatters to grease marks on my cabinets. It leaves a clean, nongreasy finish and has a pleasant, subtle scent. It's so much more effective and safer than the harsh chemical degreasers I've used in the past.",
    date: "10/05/2025",
  },
  {
    id: "5",
    name: "Shreya Rao",
    rating: 3.5,
    title: "This degreaser is a lifesaver!",
    content: "I was so tired of scrubbing away at greasy messes on my stove. This cleaner makes the job so easy. I just spray, let it sit for a minute, and wipe — the grease comes right off. Love that it's plant-based too!",
    date: "10/04/2025",
  },
  {
    id: "6",
    name: "Ketan",
    rating: 5,
    title: "Best eco-friendly cleaner!",
    content: "Finally found a cleaning product that actually works and is safe for my family. The floor cleaner leaves such a fresh scent. Highly recommend to anyone looking for green alternatives.",
    date: "09/28/2025",
  },
];
