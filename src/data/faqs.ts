export type MainFaqCategory =
  | "all"
  | "general"
  | "all-surface"
  | "toilet"
  | "dishwash"
  | "kitchen"
  | "additional";

export type MainFaqItem = {
  category: Exclude<MainFaqCategory, "all">;
  question: string;
  answer: string;
};

export const MAIN_FAQ_CATEGORIES: MainFaqCategory[] = [
  "all",
  "general",
  "all-surface",
  "toilet",
  "dishwash",
  "kitchen",
  "additional",
];

export const MAIN_FAQ_ITEMS: MainFaqItem[] = [
  {
    category: "general",
    question: "What is rePhyl?",
    answer:
      "rePhyl is a plant-powered home care brand focused on effective cleaning for everyday dirt, grease, and grime while being gentler on your home environment.",
  },
  {
    category: "general",
    question: "What does plant-powered mean?",
    answer:
      "Plant-powered means our formulations use naturally derived ingredients such as plant-based surfactants and bio-enzymes to deliver strong cleaning performance.",
  },
  {
    category: "general",
    question: "Are rePhyl products effective enough for Indian homes?",
    answer:
      "Yes. rePhyl products are designed for Indian household cleaning needs like heavy kitchen grease, bathroom stains, hard water marks, dust buildup, and oily utensils.",
  },
  {
    category: "general",
    question: "Are rePhyl products safe for everyday use?",
    answer:
      "Yes, when used as directed. Our products are made for regular home use and designed to be gentler than conventional harsh chemical cleaners.",
  },
  {
    category: "general",
    question: "Are rePhyl products eco-friendly?",
    answer:
      "Yes. rePhyl products are developed with biodegradable, environmentally conscious formulations and recyclable packaging wherever possible.",
  },
  {
    category: "general",
    question: "Are rePhyl products non-toxic cleaning products?",
    answer:
      "Yes. rePhyl products are designed as gentler alternatives to traditional harsh chemical cleaners and avoid unnecessarily aggressive cleaning ingredients.",
  },
  {
    category: "general",
    question: "Are rePhyl products suitable for homes with kids and pets?",
    answer:
      "Yes, when used responsibly and stored safely. As with all cleaning products, keep out of reach of children and avoid eye contact or ingestion.",
  },
  {
    category: "general",
    question: "Do rePhyl products contain harsh chemicals?",
    answer:
      "rePhyl products are formulated without harsh, overpowering cleaning agents commonly associated with strong chemical odours and surface damage.",
  },
  {
    category: "general",
    question: "Do rePhyl products have strong chemical smells?",
    answer:
      "No. rePhyl products are designed to have mild, naturally derived fragrances without overpowering chemical smells.",
  },
  {
    category: "general",
    question: "Are rePhyl products tested on animals?",
    answer:
      "rePhyl follows cruelty-free practices and does not test products on animals.",
  },
  {
    category: "general",
    question: "Do rePhyl products contain artificial dyes or colours?",
    answer:
      "rePhyl products are made without unnecessary artificial dyes and focus on cleaner, minimal formulations.",
  },
  {
    category: "general",
    question: "Can I mix multiple rePhyl products together?",
    answer:
      "No. Each product is made for a specific purpose. Mixing cleaning products is not recommended.",
  },
  {
    category: "general",
    question: "How should I store rePhyl products?",
    answer:
      "Store products in a cool, dry place away from direct sunlight, and keep caps tightly closed after use.",
  },
  {
    category: "general",
    question: "Do rePhyl products have a shelf life?",
    answer:
      "Yes. Please use products within the shelf life period mentioned on the packaging.",
  },
  {
    category: "all-surface",
    question: "What surfaces can rePhyl Plant-Powered All Surface Cleaner be used on?",
    answer:
      "It is safe for most washable hard surfaces including tables, countertops, cabinets, tiles, glass, appliance exteriors, and sealed wood or marble surfaces.",
  },
  {
    category: "all-surface",
    question: "Will it leave streaks or residue?",
    answer:
      "No. It is formulated for a clean wipe-down finish with no sticky residue when used as directed.",
  },
  {
    category: "all-surface",
    question: "Can it be used on wooden surfaces?",
    answer:
      "Yes, on sealed wooden surfaces. Avoid excessive moisture and wipe dry after cleaning.",
  },
  {
    category: "all-surface",
    question: "Is it safe for electronic or appliance surfaces?",
    answer:
      "Yes for appliance exteriors. Do not spray directly on screens or electrical components. Spray on a cloth first and wipe.",
  },
  {
    category: "all-surface",
    question: "Can it be used daily?",
    answer:
      "Yes, it is suitable for everyday cleaning.",
  },
  {
    category: "all-surface",
    question: "Is rePhyl All Surface Cleaner eco-friendly?",
    answer:
      "Yes. It is created with biodegradability and environmental responsibility in mind.",
  },
  {
    category: "all-surface",
    question: "What precautions should I follow while using all-surface cleaner?",
    answer:
      "Avoid contact with eyes, keep out of reach of children, and do a patch test on delicate surfaces.",
  },
  {
    category: "toilet",
    question: "Does rePhyl Toilet and Bathroom Cleaner remove tough bathroom stains?",
    answer:
      "Yes. It helps break down soap scum, hard water marks, and everyday bathroom grime effectively.",
  },
  {
    category: "toilet",
    question: "Is it safe for septic systems?",
    answer:
      "Yes, it is septic-safe and biodegradable.",
  },
  {
    category: "toilet",
    question: "Does it have a harsh acidic smell?",
    answer:
      "No. It offers effective cleaning with a fresher and milder experience than traditional acid-heavy cleaners.",
  },
  {
    category: "toilet",
    question: "Can it remove bad odours from toilets?",
    answer:
      "Yes. It helps neutralize unpleasant odours while cleaning bathroom surfaces.",
  },
  {
    category: "toilet",
    question: "How often should I use it?",
    answer:
      "For best hygiene, use two to three times a week or as needed.",
  },
  {
    category: "toilet",
    question: "Is it safe for coloured tiles or fittings?",
    answer:
      "Yes. It is designed to be gentler than strong acid cleaners and reduces the risk of discoloration.",
  },
  {
    category: "toilet",
    question: "Can it be used on shower areas and partitions?",
    answer:
      "Yes. It can help clean soap scum and water marks on shower tiles and partitions.",
  },
  {
    category: "toilet",
    question: "What precautions should I follow while using toilet and bathroom cleaner?",
    answer:
      "Avoid contact with eyes, keep out of reach of children, and do not mix with other cleaning products.",
  },
  {
    category: "dishwash",
    question: "Can rePhyl Dishwash Liquid be used in a dishwasher machine?",
    answer: "No. It is designed for manual dishwashing only.",
  },
  {
    category: "dishwash",
    question: "How much dishwash liquid should I use per wash?",
    answer:
      "A small amount goes a long way. The concentrated formula is designed for effective cleaning with less product.",
  },
  {
    category: "dishwash",
    question: "Can it cut through Indian cooking grease?",
    answer:
      "Yes. It is designed to tackle oily cookware like kadai, tawa, pressure cookers, and frying pans.",
  },
  {
    category: "dishwash",
    question: "Can I soak utensils in this dishwash liquid?",
    answer:
      "Yes. For heavily soiled utensils, use a diluted solution for soaking before scrubbing.",
  },
  {
    category: "dishwash",
    question: "Is it safe for non-stick cookware?",
    answer:
      "Yes. It is safe for stainless steel, glass, ceramic, and non-stick utensils. Use a soft scrubber for delicate coatings.",
  },
  {
    category: "dishwash",
    question: "Does it remove tough grease effectively?",
    answer:
      "Yes. It is formulated to cut through oil, grease, and food residue effectively.",
  },
  {
    category: "dishwash",
    question: "Does dishwash liquid contain harsh chemicals?",
    answer:
      "No. It is made without harsh chemicals like phosphates, parabens, or strong synthetic additives.",
  },
  {
    category: "dishwash",
    question: "Can it be used daily?",
    answer: "Yes. It is suitable for everyday dishwashing.",
  },
  {
    category: "kitchen",
    question: "What can I use rePhyl Kitchen Degreaser on?",
    answer:
      "It is ideal for kitchen counters, chimneys, hobs, gas stoves, microwave exteriors, cabinets, backsplashes, and tiles.",
  },
  {
    category: "kitchen",
    question: "Can it be used on induction cooktops?",
    answer:
      "Yes. It can be used on induction and glass cooktops. Wipe gently with a soft cloth.",
  },
  {
    category: "kitchen",
    question: "How long should I leave it on tough grease?",
    answer:
      "For heavy grease, leave it for one to two minutes before wiping.",
  },
  {
    category: "kitchen",
    question: "Can it remove old sticky oil buildup?",
    answer:
      "Yes. It helps break down stubborn buildup. For heavy deposits, allow longer contact time and repeat if needed.",
  },
  {
    category: "kitchen",
    question: "Is it safe for painted or laminated kitchen cabinets?",
    answer:
      "Yes, generally. For delicate finishes, do a quick patch test first.",
  },
  {
    category: "kitchen",
    question: "Can it be used on kitchen appliances like microwaves and ovens?",
    answer:
      "Yes. It works on external and internal surfaces of cooled appliances.",
  },
  {
    category: "kitchen",
    question: "Does it require scrubbing?",
    answer:
      "For light grease, wiping is usually enough. For heavy buildup, light scrubbing may be required.",
  },
  {
    category: "kitchen",
    question: "Does kitchen degreaser contain harsh chemicals?",
    answer:
      "No. It is made without strong acids, chlorine, or bleach.",
  },
  {
    category: "kitchen",
    question: "Can it be used on food-contact surfaces?",
    answer:
      "Yes. Wipe the surface with water after use.",
  },
  {
    category: "additional",
    question: "Where can I buy rePhyl products online in India?",
    answer:
      "You can shop from the official rePhyl website and selected online marketplaces in India.",
  },
  {
    category: "additional",
    question: "Do you offer bulk or combo packs?",
    answer:
      "Yes, value packs or combo options may be offered from time to time. Please check the website for current offers.",
  },
  {
    category: "additional",
    question: "How long does delivery take?",
    answer:
      "Delivery timelines vary by location, but orders are typically delivered within a few working days across India.",
  },
  {
    category: "additional",
    question: "What should I do if I receive a damaged or incorrect product?",
    answer:
      "Please contact support at care@rephyl.com with order details and the team will assist you.",
  },
  {
    category: "additional",
    question: "Are rePhyl bottles recyclable?",
    answer:
      "Yes. Packaging is recyclable and we encourage responsible disposal or reuse.",
  },
  {
    category: "additional",
    question: "Can rePhyl products be used in offices or commercial spaces?",
    answer:
      "Yes. They are suitable for homes, offices, and small commercial environments.",
  },
  {
    category: "additional",
    question: "How can I contact rePhyl for support or feedback?",
    answer:
      "Use the contact section on the official website for queries, feedback, or assistance.",
  },
];

export type ProductFaqItem = {
  question: string;
  answer: string;
};

type ProductFaqKey = "all-surface" | "toilet" | "dishwash" | "kitchen";

const PRODUCT_FAQ_MAP: Record<ProductFaqKey, ProductFaqItem[]> = {
  "all-surface": [
    {
      question: "What is rePhyl Plant-Powered All Surface Cleaner?",
      answer:
        "A versatile plant-powered cleaner designed for everyday surface cleaning across your home. It effectively removes dust, grime, smudges, and everyday messes while delivering a fresher cleaning experience without harsh chemical residue.",
    },
    {
      question: "What is rePhyl Plant-Powered All Surface Cleaner made with?",
      answer:
        "It is formulated with thoughtfully selected plant-powered cleaning agents and naturally inspired ingredients designed to clean effectively while being gentler on your home environment. It is typically free from harsh chemicals such as ammonia, parabens, sulphates, and phthalates.",
    },
    {
      question: "Is rePhyl Plant-Powered All Surface Cleaner safe for homes with kids and pets?",
      answer:
        "Yes, Rephyl Plant Powered All Surface Cleaner has a non-toxic and gentle formula, making it suitable for households with children and pets when used as directed.",
    },
    {
      question: "What surfaces can I use rePhyl Plant-Powered All Surface Cleaner on?",
      answer:
        "You can use rePhyl Plant-Powered All Surface Cleaner on most hard, non-porous surfaces, such as:\n• Kitchen countertops\n• Dining tables\n• Glass and mirrors\n• Cabinets\n• Appliance exteriors\n• Bathroom surfaces\n• Tiles\n• Sealed furniture surfaces",
    },
    {
      question: "Does rePhyl Plant-Powered All Surface Cleaner leave streaks or residue?",
      answer:
        "No. It is formulated for a clean wipe-down finish with no sticky residue when used correctly.",
    },
    {
      question: "Is rePhyl Plant-Powered All Surface Cleaner safe for homes with kids and pets?",
      answer:
        "Yes, when used as directed. It is designed as a gentler alternative to conventional chemical-heavy surface cleaners. It is formulated without harsh chemicals like chlorine, ammonia, or synthetic fragrances, making it safer for families.",
    },
    {
      question: "How do I use rePhyl Plant-Powered All Surface Cleaner?",
      answer:
        "• Spray rePhyl All Surface Cleaner directly onto the surface\n• Wipe with a clean cloth or sponge\n• For food-contact surfaces, wipe once with water after cleaning",
    },
  ],
  toilet: [
    {
      question: "What makes rePhyl Plant-Powered Toilet & Bathroom Cleaner different?",
      answer:
        "Unlike traditional bathroom cleaners that rely on HCL and harsh fumes, rePhyl uses a plant-powered cleaning approach to tackle bathroom grime effectively. It cleans powerfully while creating a more pleasant cleaning experience. rePhyl Plant-Powered Toilet & Bathroom Cleaner is formulated with plant-based ingredients, such as natural surfactants and organic acids that help break down stains, grime, and limescale.",
    },
    {
      question: "Is rePhyl Plant-Powered Toilet & Bathroom Cleaner safe for homes with kids and pets?",
      answer:
        "Yes, when used responsibly and as directed. rePhyl Plant-Powered Toilet & Bathroom Cleaner is designed to be non-toxic and gentle, making it suitable for Indian households with children and pets.",
    },
    {
      question: "Where can I use rePhyl Plant-Powered Toilet & Bathroom Cleaner?",
      answer:
        "You can use it on multiple bathroom surfaces, including:\n• Toilet bowls\n• Bathroom tiles\n• Wash basins\n• Faucets\n• Shower areas\n• Bathroom floors",
    },
    {
      question: "Does rePhyl Plant-Powered Toilet & Bathroom Cleaner contain harsh chemicals?",
      answer:
        "No, rePhyl Plant-Powered Toilet & Bathroom Cleaner is typically made without unnecessarily aggressive acid-heavy ingredients (like Chlorine & HCL) commonly found in conventional bathroom cleaners. This makes it safer for regular use and reduces strong chemical fumes.",
    },
    {
      question: "How do I use rePhyl Plant-Powered Toilet & Bathroom Cleaner?",
      answer:
        "For toilets:\nApply under the rim, leave for a few minutes, scrub, and flush.\n\nFor other bathroom surfaces:\nApply directly, leave briefly, scrub if needed, and rinse.",
    },
    {
      question: "Does rePhyl Plant-Powered Toilet & Bathroom Cleaner remove tough stains and limescale?",
      answer:
        "Yes, rePhyl Plant-Powered Toilet & Bathroom Cleaner helps break down tough stains, soap scum, and limescale. For older or heavier deposits, allow slightly longer contact time or repeat application.",
    },
  ],
  dishwash: [
    {
      question: "What is rePhyl Plant-Powered Dishwash Liquid?",
      answer:
        "A plant-powered dishwashing liquid formulated to cut through grease effectively while being gentler on your hands. Designed for Indian kitchens and everyday cookware. It is formulated with thoughtfully selected plant-powered cleaning agents and naturally inspired ingredients designed to break down grease effectively while being gentle on your hands.",
    },
    {
      question: "Is rePhyl Plant-Powered Dishwash Liquid safe for hands?",
      answer:
        "Yes, its thoughtfully balanced formulation is designed to be gentle on hands, causing no dryness and irritation compared to traditional dishwashing liquids that contain harsh chemicals.",
    },
    {
      question: "Can I use rePhyl Plant-Powered Dishwash Liquid for baby utensils?",
      answer:
        "Yes, it is suitable for cleaning baby bottles, utensils, and kitchenware when used as directed, thanks to its mild, non-toxic formulation.",
    },
    {
      question: "How do I use rePhyl Plant-Powered Dishwash Liquid?",
      answer:
        "You can use it directly or dilute it based on your washing preference.\n• Take a small amount on a sponge\n• Scrub utensils to remove grease and food residue\n• Rinse thoroughly with water\nA small amount goes a long way. The concentrated formula is designed for efficient everyday dishwashing.",
    },
    {
      question: "Does it leave any residue or smell on utensils?",
      answer:
        "No, it rinses clean and does not leave behind sticky residue or strong chemical odour.",
    },
    {
      question: "Can it be used in a dishwasher machine?",
      answer: "No. This product is intended for manual dishwashing only.",
    },
  ],
  kitchen: [
    {
      question: "What is rePhyl Plant-Powered Kitchen Degreaser designed for?",
      answer:
        "A high-performance plant-powered cleaner built to tackle stubborn kitchen grease, sticky residue, and oily buildup common in Indian cooking spaces.",
    },
    {
      question: "Is rePhyl Plant-Powered Kitchen Degreaser safe for daily kitchen use?",
      answer:
        "Yes, rePhyl Plant-Powered Kitchen Degreaser is designed for regular use in active kitchens. Its non-toxic formula makes it suitable for everyday cleaning in kitchens. Plant-based degreasers are formulated to be gentle while still effective on grease.",
    },
    {
      question: "Where can I use rePhyl Plant-Powered Kitchen Degreaser?",
      answer:
        "rePhyl Plant-Powered Kitchen Degreaser is ideal for:\n• Gas stoves\n• Hobs\n• Chimneys\n• Kitchen counters\n• Backsplashes\n• Tiles\n• Cabinets\n• Microwave exteriors\n• Exhaust Fans\n• Stainless steel surfaces\nPlant-based degreasers are commonly designed for multi-surface kitchen cleaning.",
    },
    {
      question: "Does rePhyl Plant-Powered Kitchen Degreaser remove tough grease?",
      answer:
        "Yes, it is formulated to cut through heavy oil, spice stains, cooking buildup, and sticky residue, which are common during cooking. Plant-based formulas are effective in breaking down grease and grime.",
    },
    {
      question: "How do I use rePhyl Plant-Powered Kitchen Degreaser?",
      answer:
        "• Spray directly onto greasy surfaces\n• Let it sit briefly (or longer for heavy grease)\n• Wipe clean with a cloth or sponge\n• For heavy buildup, repeat if needed\nThis method is standard for most kitchen degreasers.",
    },
    {
      question: "Can it be used on chimneys and heavy grease areas?",
      answer:
        "It works well on chimney exteriors and grease-prone surfaces. Heavier buildup and old grease may require repeated application or light scrubbing.",
    },
  ],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function getProductFaqs(productName: string, productSlug?: string): ProductFaqItem[] {
  const combined = normalize(`${productName} ${productSlug || ""}`);

  if (combined.includes("plant powered all surface cleaner") || combined.includes("all surface")) {
    return PRODUCT_FAQ_MAP["all-surface"];
  }
  if (combined.includes("plant powered toilet bathroom cleaner") || combined.includes("toilet") || combined.includes("bathroom")) {
    return PRODUCT_FAQ_MAP.toilet;
  }
  if (combined.includes("plant powered dishwash liquid") || combined.includes("dishwash")) {
    return PRODUCT_FAQ_MAP.dishwash;
  }
  if (combined.includes("plant powered kitchen degreaser") || combined.includes("degreaser") || combined.includes("kitchen")) {
    return PRODUCT_FAQ_MAP.kitchen;
  }

  return [];
}
