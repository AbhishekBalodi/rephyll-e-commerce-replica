export type SeoMetaEntry = {
  title: string;
  description: string;
};

export const DEFAULT_SEO_META: SeoMetaEntry = {
  title: "Rephyl Plant-Powered Home Care Products for Healthy Living",
  description:
    "Discover Rephyl's eco-friendly, plant-powered home care products designed for safer cleaning, healthier homes, and sustainable everyday living.",
};

export const SEO_META_BY_PATH: Record<string, SeoMetaEntry> = {
  "/": {
    title: "Rephyl Plant-Powered Home Care Products for Healthy Living",
    description:
      "Discover Rephyl's eco-friendly, plant-powered home care products designed for safer cleaning, healthier homes, and sustainable everyday living.",
  },
  "/about": {
    title: "About Rephyl | Our Mission for Sustainable Home Care",
    description:
      "Learn about Rephyl's journey, values, and commitment to creating effective plant-powered cleaning and home care solutions.",
  },
  "/b2b-orders": {
    title: "B2B Orders | Bulk Plant-Based Cleaning Solutions by Rephyl",
    description:
      "Partner with Rephyl for bulk home care and cleaning product orders tailored for businesses, retailers, hotels, and institutions.",
  },
  "/blogs": {
    title: "Rephyl Blogs | Cleaning Tips, Sustainable Living & Home Care Guides",
    description:
      "Explore expert cleaning tips, eco-friendly living ideas, and practical home care guides from the Rephyl blog.",
  },
  "/kitchen-care": {
    title: "Kitchen Care Products | Plant-Powered Cleaning Solutions",
    description:
      "Shop Rephyl kitchen care products including dishwash liquids and degreasers made with plant-powered ingredients for effective cleaning.",
  },
  "/laundry-care": {
    title: "Laundry Care Products | Gentle & Effective Fabric Cleaning",
    description:
      "Discover Rephyl laundry care solutions designed to clean clothes effectively while being gentle on fabrics and the environment.",
  },
  "/personal-care": {
    title: "Personal Care Products | Safe & Natural Everyday Essentials",
    description:
      "Explore Rephyl personal care products crafted with safe, effective, and naturally inspired ingredients for daily use.",
  },
  "/surface-care": {
    title: "Surface Care Products | Multi-Surface Cleaning by Rephyl",
    description:
      "Keep every surface spotless with Rephyl's plant-powered surface cleaners designed for safe and effective everyday cleaning.",
  },
  "/washroom-care": {
    title: "Washroom Care Products | Bathroom Cleaning Solutions",
    description:
      "Shop Rephyl washroom care products for hygienic bathrooms with powerful plant-based toilet and bathroom cleaning solutions.",
  },
  "/contact": {
    title: "Contact Rephyl | Customer Support & Business Enquiries",
    description:
      "Get in touch with Rephyl for customer support, product enquiries, partnerships, or business-related assistance.",
  },
  "/faqs": {
    title: "FAQs | Common Questions About Rephyl Products",
    description:
      "Find answers to frequently asked questions about Rephyl products, orders, shipping, usage, and sustainability practices.",
  },
  "/homecare-kits": {
    title: "Home Care Kits | Complete Cleaning Solutions by Rephyl",
    description:
      "Explore Rephyl home care kits featuring curated plant-powered cleaning essentials for kitchens, bathrooms, and surfaces.",
  },
  "/kitchen-care/plant-powered-dishwash-liquid": {
    title: "Plant-Powered Dishwash Liquid | Tough on Grease, Gentle on Hands",
    description:
      "Clean dishes effectively with Rephyl's plant-powered dishwash liquid that removes grease while remaining gentle on hands.",
  },
  "/kitchen-care/plant-powered-kitchen-degreaser": {
    title: "Plant-Powered Kitchen Degreaser | Fast Grease Removal Solution",
    description:
      "Remove stubborn grease and kitchen stains easily with Rephyl's powerful plant-based kitchen degreaser spray.",
  },
  "/our-story": {
    title: "Our Story | The Rephyl Journey Towards Sustainable Cleaning",
    description:
      "Discover the inspiration and vision behind Rephyl's mission to redefine home care with eco-friendly cleaning products.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Rephyl Data & Information Practices",
    description:
      "Read Rephyl's privacy policy to understand how your personal information is collected, used, and protected.",
  },
  "/refund-policy": {
    title: "Refund Policy | Returns & Refund Information",
    description:
      "Learn about Rephyl's refund and return policy, including eligibility, timelines, and order support details.",
  },
  "/shop": {
    title: "Shop Plant-Powered Home Care Products | Rephyl Official Store",
    description:
      "Browse and shop Rephyl's complete range of eco-friendly home cleaning and personal care products online.",
  },
  "/surface-care/plant-powered-all-surface-cleaner": {
    title: "Plant-Powered All Surface Cleaner | Safe Multi-Surface Cleaning",
    description:
      "Clean tables, countertops, glass, and more with Rephyl's plant-powered all surface cleaner for everyday hygiene.",
  },
  "/terms": {
    title: "Terms & Conditions | Rephyl Website Usage Policy",
    description:
      "Review Rephyl's terms and conditions covering website usage, purchases, policies, and customer responsibilities.",
  },
  "/washroom-care/plant-powered-toilet-bathroom-cleaner": {
    title: "Plant-Powered Toilet & Bathroom Cleaner | Hygienic Washroom Care",
    description:
      "Keep toilets and bathrooms fresh and hygienic with Rephyl's effective plant-powered bathroom cleaning solution.",
  },
  "/why-choose-us": {
    title: "Why Choose Rephyl | Safe, Sustainable & Effective Cleaning",
    description:
      "Discover why customers trust Rephyl for plant-powered, eco-friendly, and highly effective home cleaning solutions.",
  },
};