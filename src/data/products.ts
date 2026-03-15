import product1 from "@/assets/product-1.jpg";
import product1Alt1 from "@/assets/product-1-alt1.jpg";
import product1Alt2 from "@/assets/product-1-alt2.jpg";
import product1Alt3 from "@/assets/product-1-alt3.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product5Alt1 from "@/assets/product-5-alt1.jpg";
import product5Alt2 from "@/assets/product-5-alt2.jpg";
import product5Alt3 from "@/assets/product-5-alt3.jpg";
import product5Alt4 from "@/assets/product-5-alt4.jpg";
import product5Alt5 from "@/assets/product-5-alt5.jpg";

export type ProductCategory =
  | "Sale"
  | "New In"
  | "Laundry"
  | "Glass Care"
  | "Floor Care"
  | "Toilet Care"
  | "Eco Kits"
  | "Plant-Based";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  keyFeatures: string[];
  whatsIn: string[];
  moreDetails: string;
  categories: ProductCategory[];
  customerReviews: {
    name: string;
    rating: number;
    date: string;
    verified: boolean;
    comment: string;
  }[];
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Concentrated Liquid Laundry Detergent - 1L Bottle (100 Loads)",
    price: 619,
    originalPrice: 749,
    discount: 17,
    rating: 4.5,
    reviews: 110,
    images: [product1, product1Alt1, product1Alt2, product1Alt3],
    categories: ["Laundry", "Plant-Based", "Sale"],
    description:
      "Rephyll Concentrated Liquid Laundry Detergent is a plant-based, biodegradable formula designed for effective cleaning without harsh chemicals. Suitable for front-load and top-load machines, it delivers 100 loads per bottle while being gentle on skin and the environment.",
    keyFeatures: [
      "Plant-based & biodegradable formula",
      "100 loads per 1L bottle",
      "Safe for sensitive skin",
      "No phosphates, parabens or SLS",
      "Works in hot & cold water",
      "Compatible with all washing machines",
    ],
    whatsIn: [
      "Coconut-derived surfactants",
      "Organic essential oils (Lavender & Eucalyptus)",
      "Plant-based enzymes",
      "Purified water",
    ],
    moreDetails:
      "Shelf Life: 24 months from date of manufacture. Storage: Store in a cool, dry place away from direct sunlight. Packaging: 100% recyclable HDPE bottle. Made in India.",
    customerReviews: [
      { name: "Suhail Ahmad", rating: 5, date: "7/02/2026", verified: true, comment: "Best cleaner! Leaves clothes fresh and clean every time." },
      { name: "Netra Siddharth Naik", rating: 5, date: "7/02/2026", verified: true, comment: "Best product. Very effective and smells great." },
      { name: "Priya Sharma", rating: 4, date: "15/01/2026", verified: true, comment: "Good product, works well on tough stains. Wish the fragrance lasted longer." },
    ],
  },
  {
    id: 2,
    name: "Plant-Based Glass & Multi-Surface Cleaner - 500ml Bottle",
    price: 159,
    originalPrice: 209,
    discount: 23,
    rating: 4.8,
    reviews: 3,
    images: [product2, product2, product2],
    categories: ["Glass Care", "Plant-Based", "Sale"],
    description:
      "Rephyll Multi-Surface Cleaner uses plant-derived ingredients to cut through grease and grime on glass, countertops, tiles, and more. Streak-free finish with a refreshing citrus scent.",
    keyFeatures: [
      "Streak-free glass cleaning",
      "Works on multiple surfaces",
      "Plant-derived ingredients",
      "No ammonia or harsh chemicals",
      "Refreshing citrus fragrance",
      "Biodegradable formula",
    ],
    whatsIn: ["Plant-based surfactants", "Citrus essential oils", "Purified water", "Natural solubilizers"],
    moreDetails:
      "Shelf Life: 18 months from date of manufacture. Storage: Store in a cool, dry place. Packaging: Recyclable PET bottle with trigger spray. Made in India.",
    customerReviews: [
      { name: "Ankit Verma", rating: 5, date: "20/01/2026", verified: true, comment: "Excellent cleaner! My windows have never looked this clean." },
    ],
  },
  {
    id: 3,
    name: "Plant-Based Fabric Whitener Tablets - 30 Loads",
    price: 369,
    originalPrice: 369,
    discount: 0,
    rating: 4.3,
    reviews: 73,
    images: [product3, product3, product3],
    categories: ["Laundry", "Plant-Based", "New In"],
    description:
      "Rephyll Fabric Whitener Tablets use oxygen-based bleaching to brighten whites without chlorine. Safe for colors when used as directed. Each box contains 30 pre-measured tablets.",
    keyFeatures: [
      "Oxygen-based whitening",
      "No chlorine or optical brighteners",
      "Pre-measured tablets — no mess",
      "Safe on colored fabrics",
      "Biodegradable ingredients",
      "Septic-safe",
    ],
    whatsIn: ["Sodium percarbonate", "Plant-based chelating agents", "Natural fragrance", "Binding agents"],
    moreDetails:
      "Shelf Life: 24 months. Storage: Keep sealed, store in dry place. Packaging: Recyclable cardboard box. Made in India.",
    customerReviews: [
      { name: "Meera Joshi", rating: 5, date: "10/02/2026", verified: true, comment: "These tablets are amazing! My white shirts look brand new again." },
      { name: "Rahul Desai", rating: 4, date: "28/01/2026", verified: true, comment: "Works well, dissolves quickly. Good eco-friendly alternative." },
    ],
  },
  {
    id: 4,
    name: "Eco-Friendly Toilet Bowl Cleaner Liquid - 500ml Bottle x 2",
    price: 249,
    originalPrice: 398,
    discount: 37,
    rating: 4.7,
    reviews: 154,
    images: [product4, product4, product4],
    categories: ["Toilet Care", "Plant-Based", "Sale"],
    description:
      "Rephyll Toilet Bowl Cleaner is a powerful yet eco-friendly formula that removes tough stains, limescale, and odors. The angled nozzle makes under-rim cleaning effortless. Pack of 2 bottles.",
    keyFeatures: [
      "Removes limescale & tough stains",
      "Angled nozzle for under-rim cleaning",
      "Plant-based surfactants",
      "No hydrochloric acid",
      "Fresh pine fragrance",
      "Pack of 2 (500ml each)",
    ],
    whatsIn: ["Citric acid", "Plant-derived surfactants", "Pine essential oil", "Purified water"],
    moreDetails:
      "Shelf Life: 24 months. Storage: Keep upright, store in dry place. Packaging: Recyclable HDPE bottles. Made in India.",
    customerReviews: [
      { name: "Kavita Nair", rating: 5, date: "5/02/2026", verified: true, comment: "Excellent value for money! Two bottles at this price is a steal." },
      { name: "Arjun Patel", rating: 5, date: "1/02/2026", verified: true, comment: "Really effective on hard water stains. Love that it's eco-friendly." },
    ],
  },
  {
    id: 5,
    name: "Plant-Based Floor Cleaner - Citrus - 500ml Bottle",
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 4.6,
    reviews: 87,
    images: [product5, product5Alt1, product5Alt2, product5Alt3, product5Alt4, product5Alt5],
    categories: ["Floor Care", "Plant-Based", "Sale"],
    description:
      "Rephyll Plant-Based Floor Cleaner with natural citrus extracts delivers sparkling clean floors while being safe for pets and kids. Powered by nature, it kills 99.9% germs without harsh chemicals.",
    keyFeatures: [
      "Plant-powered formula",
      "Kills 99.9% germs",
      "Pet & child safe",
      "Made with natural citrus extracts",
      "Pure essential oils",
      "Non-toxic & biodegradable",
    ],
    whatsIn: ["Plant-based surfactants", "Natural citrus extracts", "Pure essential oils", "Purified water"],
    moreDetails:
      "Shelf Life: 24 months. Usage: Pour 1 capful in half a bucket of water. Mop regularly. Storage: Store in a cool, dry place. Packaging: Recyclable bottle. Made in India.",
    customerReviews: [
      { name: "Roshni Gupta", rating: 5, date: "10/03/2026", verified: true, comment: "Love the citrus fragrance! Floors are sparkling clean and safe for my dog." },
      { name: "Vikram Singh", rating: 4, date: "25/02/2026", verified: true, comment: "Great eco-friendly floor cleaner. Works really well on tiles." },
    ],
  },
  // ---- NEW DUMMY PRODUCTS ----
  {
    id: 6,
    name: "Lavender Fabric Softener - 1L Bottle (80 Loads)",
    price: 449,
    originalPrice: 549,
    discount: 18,
    rating: 4.4,
    reviews: 62,
    images: [product1, product1Alt1, product1Alt2, product1Alt3],
    categories: ["Laundry", "New In"],
    description:
      "Rephyll Lavender Fabric Softener leaves your clothes irresistibly soft with a calming lavender scent. Plant-based and free from harsh chemicals.",
    keyFeatures: [
      "Plant-based softening agents",
      "80 loads per bottle",
      "Calming lavender fragrance",
      "No synthetic dyes",
      "Safe for sensitive skin",
      "Biodegradable formula",
    ],
    whatsIn: ["Plant-derived softening agents", "Lavender essential oil", "Purified water", "Natural emulsifiers"],
    moreDetails: "Shelf Life: 24 months. Storage: Store in a cool, dry place. Packaging: Recyclable HDPE bottle. Made in India.",
    customerReviews: [
      { name: "Aarti Mehta", rating: 5, date: "1/03/2026", verified: true, comment: "My towels have never been this soft! Amazing product." },
      { name: "Deepak Jain", rating: 4, date: "20/02/2026", verified: true, comment: "Great softener, love the lavender smell." },
    ],
  },
  {
    id: 7,
    name: "Glass Cleaner Refill Pouch - 1L Economy Pack",
    price: 219,
    originalPrice: 319,
    discount: 31,
    rating: 4.6,
    reviews: 45,
    images: [product2, product2, product2],
    categories: ["Glass Care", "Sale"],
    description:
      "Rephyll Glass Cleaner Refill Pouch is an economical and eco-friendly way to refill your spray bottle. Same streak-free formula, less plastic waste.",
    keyFeatures: [
      "Economy 1L refill pouch",
      "Streak-free formula",
      "80% less plastic than bottles",
      "Plant-derived ingredients",
      "Fresh citrus scent",
      "Easy-pour spout",
    ],
    whatsIn: ["Plant-based surfactants", "Citrus extracts", "Purified water", "Natural solubilizers"],
    moreDetails: "Shelf Life: 18 months. Storage: Store upright. Packaging: Recyclable flexible pouch. Made in India.",
    customerReviews: [
      { name: "Sneha Kulkarni", rating: 5, date: "5/03/2026", verified: true, comment: "Love the refill concept! Great for the environment." },
    ],
  },
  {
    id: 8,
    name: "Toilet Bowl Cleaning Tablets - Mint Fresh (Pack of 20)",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.5,
    reviews: 38,
    images: [product4, product4, product4],
    categories: ["Toilet Care", "New In"],
    description:
      "Rephyll Toilet Cleaning Tablets dissolve in your toilet bowl to provide deep cleaning and a fresh mint fragrance. Just drop and flush!",
    keyFeatures: [
      "Drop-and-flush convenience",
      "Deep cleaning action",
      "Fresh mint fragrance",
      "No scrubbing needed",
      "Septic-safe formula",
      "20 tablets per pack",
    ],
    whatsIn: ["Sodium bicarbonate", "Citric acid", "Peppermint essential oil", "Plant-based surfactants"],
    moreDetails: "Shelf Life: 24 months. Storage: Keep dry. Packaging: Recyclable cardboard box. Made in India.",
    customerReviews: [
      { name: "Rajesh Kumar", rating: 5, date: "28/02/2026", verified: true, comment: "So convenient! Just drop it in and the toilet is sparkling." },
      { name: "Sunita Rao", rating: 4, date: "15/02/2026", verified: true, comment: "Works great, love the mint smell." },
    ],
  },
  {
    id: 9,
    name: "Floor Cleaner - Neem & Tea Tree - 1L Bottle",
    price: 329,
    originalPrice: 449,
    discount: 26,
    rating: 4.7,
    reviews: 91,
    images: [product5, product5Alt1, product5Alt2, product5Alt3, product5Alt4, product5Alt5],
    categories: ["Floor Care", "Plant-Based"],
    description:
      "Rephyll Neem & Tea Tree Floor Cleaner provides antibacterial protection with the power of natural neem and tea tree oils. Safe for marble, tiles, and wooden floors.",
    keyFeatures: [
      "Natural antibacterial action",
      "Neem & tea tree oil powered",
      "Safe on all floor types",
      "Pet & child friendly",
      "Long-lasting freshness",
      "Concentrated formula",
    ],
    whatsIn: ["Neem extract", "Tea tree essential oil", "Plant-based surfactants", "Purified water"],
    moreDetails: "Shelf Life: 24 months. Usage: 1 capful per half bucket. Packaging: Recyclable HDPE bottle. Made in India.",
    customerReviews: [
      { name: "Pooja Reddy", rating: 5, date: "12/03/2026", verified: true, comment: "The neem scent is amazing and floors feel so clean!" },
      { name: "Amit Sharma", rating: 5, date: "1/03/2026", verified: true, comment: "Best floor cleaner I've used. Natural ingredients are a big plus." },
    ],
  },
  {
    id: 10,
    name: "Complete Home Cleaning Eco Kit - 5 Products",
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.9,
    reviews: 210,
    images: [product1, product5, product2, product4],
    categories: ["Eco Kits", "Sale", "Plant-Based"],
    description:
      "The rePhyl Complete Home Cleaning Kit includes everything you need — laundry detergent, glass cleaner, floor cleaner, toilet cleaner, and fabric softener — all plant-based and eco-friendly.",
    keyFeatures: [
      "5 full-size products",
      "All plant-based formulas",
      "Saves 27% vs individual purchase",
      "Beautiful gift-ready packaging",
      "Zero harsh chemicals",
      "Complete home coverage",
    ],
    whatsIn: ["1L Laundry Detergent", "500ml Glass Cleaner", "500ml Floor Cleaner", "500ml x2 Toilet Cleaner", "1L Fabric Softener"],
    moreDetails: "Shelf Life: 24 months. Packaging: Recycled kraft paper box. Perfect as a housewarming gift. Made in India.",
    customerReviews: [
      { name: "Nisha Agarwal", rating: 5, date: "8/03/2026", verified: true, comment: "Gifted this to my sister — she loved it! Great value." },
      { name: "Karan Malhotra", rating: 5, date: "25/02/2026", verified: true, comment: "Everything you need in one box. Amazing quality." },
    ],
  },
  {
    id: 11,
    name: "Laundry Starter Eco Kit - Detergent + Whitener",
    price: 899,
    originalPrice: 1118,
    discount: 19,
    rating: 4.6,
    reviews: 55,
    images: [product1, product3, product1Alt2, product1Alt3],
    categories: ["Eco Kits", "Laundry"],
    description:
      "The rePhyl Laundry Starter Kit pairs our bestselling concentrated detergent with fabric whitener tablets for the ultimate eco-friendly laundry experience.",
    keyFeatures: [
      "2 bestselling products",
      "Plant-based & biodegradable",
      "Save 19% vs buying separately",
      "Perfect for new households",
      "Eco-friendly packaging",
      "130 total loads",
    ],
    whatsIn: ["1L Concentrated Laundry Detergent", "30-pack Fabric Whitener Tablets"],
    moreDetails: "Shelf Life: 24 months. Packaging: Recycled kraft paper box. Made in India.",
    customerReviews: [
      { name: "Simran Kaur", rating: 5, date: "5/03/2026", verified: true, comment: "Perfect starter kit! Both products work brilliantly." },
    ],
  },
  {
    id: 12,
    name: "Bathroom Cleaning Spray - Eucalyptus - 500ml",
    price: 179,
    originalPrice: 249,
    discount: 28,
    rating: 4.3,
    reviews: 29,
    images: [product2, product2, product2],
    categories: ["Toilet Care", "Plant-Based", "New In"],
    description:
      "Rephyll Bathroom Spray with eucalyptus essential oil cuts through soap scum and hard water stains. Perfect for tiles, faucets, and shower screens.",
    keyFeatures: [
      "Cuts through soap scum",
      "Eucalyptus essential oil",
      "Works on tiles & faucets",
      "No harsh acids",
      "Fresh natural scent",
      "Trigger spray bottle",
    ],
    whatsIn: ["Plant-based surfactants", "Eucalyptus essential oil", "Citric acid", "Purified water"],
    moreDetails: "Shelf Life: 18 months. Storage: Store in cool, dry place. Packaging: Recyclable PET bottle. Made in India.",
    customerReviews: [
      { name: "Divya Iyer", rating: 4, date: "10/03/2026", verified: true, comment: "Makes my bathroom smell amazing and look spotless." },
      { name: "Rohit Verma", rating: 5, date: "1/03/2026", verified: true, comment: "Finally an eco bathroom cleaner that actually works!" },
    ],
  },
];
