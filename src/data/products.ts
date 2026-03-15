import product1 from "@/assets/product-1.jpg";
import product1Alt1 from "@/assets/product-1-alt1.jpg";
import product1Alt2 from "@/assets/product-1-alt2.jpg";
import product1Alt3 from "@/assets/product-1-alt3.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

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
      {
        name: "Suhail Ahmad",
        rating: 5,
        date: "7/02/2026",
        verified: true,
        comment: "Best cleaner! Leaves clothes fresh and clean every time.",
      },
      {
        name: "Netra Siddharth Naik",
        rating: 5,
        date: "7/02/2026",
        verified: true,
        comment: "Best product. Very effective and smells great.",
      },
      {
        name: "Priya Sharma",
        rating: 4,
        date: "15/01/2026",
        verified: true,
        comment:
          "Good product, works well on tough stains. Wish the fragrance lasted longer.",
      },
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
    whatsIn: [
      "Plant-based surfactants",
      "Citrus essential oils",
      "Purified water",
      "Natural solubilizers",
    ],
    moreDetails:
      "Shelf Life: 18 months from date of manufacture. Storage: Store in a cool, dry place. Packaging: Recyclable PET bottle with trigger spray. Made in India.",
    customerReviews: [
      {
        name: "Ankit Verma",
        rating: 5,
        date: "20/01/2026",
        verified: true,
        comment: "Excellent cleaner! My windows have never looked this clean.",
      },
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
    whatsIn: [
      "Sodium percarbonate",
      "Plant-based chelating agents",
      "Natural fragrance",
      "Binding agents",
    ],
    moreDetails:
      "Shelf Life: 24 months. Storage: Keep sealed, store in dry place. Packaging: Recyclable cardboard box. Made in India.",
    customerReviews: [
      {
        name: "Meera Joshi",
        rating: 5,
        date: "10/02/2026",
        verified: true,
        comment:
          "These tablets are amazing! My white shirts look brand new again.",
      },
      {
        name: "Rahul Desai",
        rating: 4,
        date: "28/01/2026",
        verified: true,
        comment: "Works well, dissolves quickly. Good eco-friendly alternative.",
      },
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
    whatsIn: [
      "Citric acid",
      "Plant-derived surfactants",
      "Pine essential oil",
      "Purified water",
    ],
    moreDetails:
      "Shelf Life: 24 months. Storage: Keep upright, store in dry place. Packaging: Recyclable HDPE bottles. Made in India.",
    customerReviews: [
      {
        name: "Kavita Nair",
        rating: 5,
        date: "5/02/2026",
        verified: true,
        comment: "Excellent value for money! Two bottles at this price is a steal.",
      },
      {
        name: "Arjun Patel",
        rating: 5,
        date: "1/02/2026",
        verified: true,
        comment:
          "Really effective on hard water stains. Love that it's eco-friendly.",
      },
    ],
  },
];
