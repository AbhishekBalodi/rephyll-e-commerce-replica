import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: number;
  date: string;
  author: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-clean-kitchen-chimney-at-home",
    title: "How to Clean a Kitchen Chimney at Home: Step-by-Step Guide",
    excerpt: "A kitchen chimney is one of the hardest-working appliances in an Indian home. Here's how to keep it spotless using plant-based cleaners.",
    image: blog1,
    readTime: 6,
    date: "17 March, 2026",
    author: "rePhyl Team",
    content: [
      "A kitchen chimney is one of the hardest-working appliances in an Indian home. From tadka fumes to deep-frying sessions, it silently absorbs grease, smoke, and oil particles day after day. But when was the last time you actually cleaned it?",
      "A dirty chimney not only reduces suction power but can also become a fire hazard. The good news? You don't need harsh chemicals or a professional service to get it sparkling clean. With the right plant-based products and a little patience, you can do it yourself at home.",
      "## Step 1 – Remove the Filters",
      "Turn off the chimney and let it cool completely. Carefully remove the mesh or baffle filters. Most chimneys have clips or screws holding the filters in place — refer to your user manual if unsure.",
      "## Step 2 – Soak in Hot Water",
      "Fill a large tub or your kitchen sink with hot water. Add 2–3 tablespoons of rePhyl's plant-based degreaser or dish wash liquid. Submerge the filters and let them soak for 20–30 minutes. This loosens the grease buildup significantly.",
      "## Step 3 – Scrub Gently",
      "Using a soft brush or an old toothbrush, scrub the mesh gently in circular motions. The soaked grease should come off easily. For stubborn spots, apply a paste of baking soda and water, let it sit for 10 minutes, then scrub again.",
      "## Step 4 – Clean the Hood",
      "While the filters are soaking, spray the inside of the chimney hood with a plant-based multi-surface cleaner. Wipe with a damp microfiber cloth. Avoid spraying directly on the motor or electrical components.",
      "## Step 5 – Rinse and Dry",
      "Rinse the filters thoroughly under running water. Shake off excess water and let them air dry completely before reinstalling. Never put wet filters back — moisture can cause rust and reduce efficiency.",
      "## Tips for Maintenance",
      "• Clean your chimney filters every 2–3 weeks if you cook daily with Indian spices.\n• Use an auto-clean chimney if possible — they require less manual maintenance.\n• Wipe the exterior with a soft cloth weekly to prevent fingerprint buildup.\n• Switch to plant-based cleaners to avoid inhaling chemical fumes while cleaning.",
    ],
  },
  {
    id: "2",
    slug: "how-to-remove-haldi-turmeric-stains-from-clothes",
    title: "How to Remove Haldi (Turmeric) Stains from Clothes – The Complete Guide",
    excerpt: "Haldi is the most-used spice in every Indian kitchen. It goes into dal, sabzi, marinade and almost inevitably, your favourite kurta.",
    image: blog2,
    readTime: 5,
    date: "16 March, 2026",
    author: "rePhyl Team",
    content: [
      "Haldi is the most-used spice in every Indian kitchen. It goes into dal, sabzi, marinade and almost inevitably, your favourite kurta. A haldi stain is one of the most notorious fabric stains in India: bright yellow, fast-setting, and stubborn enough to survive a regular machine wash if left untreated.",
      "The good news? It is entirely removable if you act fast and use the right approach. This guide covers everything: why haldi stains are so difficult to remove, a step-by-step removal method, tips for different fabrics, and what to do when the stain has already dried and set.",
      "## Why Turmeric Stains Are Tough",
      "Turmeric contains curcumin, a natural dye compound. When curcumin comes in contact with fabric fibres, it bonds quickly — especially with cotton and linen. Heat accelerates this bonding, which is why ironing or hot washing a turmeric stain before removing it makes things worse.",
      "## Step 1 – Blot, Don't Rub",
      "As soon as the spill happens, blot the area gently with a clean cloth or tissue. Rubbing pushes the stain deeper into the fabric. Blot from the outside in to prevent spreading.",
      "## Step 2 – Rinse with Cold Water",
      "Hold the stained area under cold running water from the back of the fabric. This pushes the turmeric out rather than further into the fibres. Cold water is key — hot water sets the stain permanently.",
      "## Step 3 – Apply Stain Remover",
      "Spray or apply a plant-based fabric stain remover directly onto the stain and let it sit for 5 to 10 minutes. A formula with plant-based enzymes works well here because enzymes break down both the pigment and the oil carrier. rePhyl's Fabric Stain Remover is designed precisely for this — it is colour-safe, toxin-free, and effective on oil-based stains.",
      "## Step 4 – Gently Work the Stain",
      "Using a soft brush or your fingertip, gently work the stain remover into the fabric in small circular motions. Do not scrub hard — with natural enzyme formulas, patience does the work.",
      "## Step 5 – Rinse and Inspect",
      "Rinse the area again with cold water. Check whether the stain has lifted. If it has reduced significantly, proceed to wash as normal. If colour remains, repeat steps 3 and 4 before washing.",
      "## Common Mistakes to Avoid",
      "• Rubbing the stain instead of blotting\n• Using hot water at any stage before the stain is removed\n• Putting the garment in the tumble dryer before checking\n• Using harsh bleach on coloured fabrics — it removes the stain but also the colour\n• Waiting too long — haldi stains set fast. Treat within minutes, not hours.",
    ],
  },
  {
    id: "3",
    slug: "eco-friendly-bathroom-cleaning-tips",
    title: "Eco-Friendly Bathroom Cleaning Tips That Actually Work",
    excerpt: "Transform your bathroom cleaning routine with plant-based products that are safe for your family and the planet.",
    image: blog3,
    readTime: 9,
    date: "08 February, 2026",
    author: "rePhyl Team",
    content: [
      "The bathroom is one of the most frequently cleaned areas of any home. Unfortunately, it's also where some of the harshest chemicals are used — from hydrochloric acid in toilet cleaners to ammonia in glass sprays. These chemicals don't just clean; they pollute your indoor air, irritate your skin, and flow into water systems.",
      "Switching to eco-friendly bathroom cleaning isn't about compromising on results. It's about using smarter, plant-derived formulas that work just as hard without the toxic side effects. Here's your complete guide.",
      "## Start with the Toilet",
      "The toilet is the most dreaded part of bathroom cleaning, but it doesn't have to be. Pour a plant-based toilet cleaner under the rim and let it sit for 10–15 minutes. The natural citric acid and surfactants will break down limescale and stains. Scrub with a dedicated brush and flush.",
      "## Tackle Soap Scum on Tiles",
      "Soap scum builds up gradually and can make your tiles look dull and grimy. Spray a plant-based bathroom cleaner with eucalyptus or tea tree oil on the tiles. Let it sit for 3–5 minutes, then wipe with a microfiber cloth. The natural essential oils cut through soap residue while leaving a fresh scent.",
      "## Clean the Mirror and Glass",
      "For streak-free mirrors, use a plant-based glass cleaner — spray and wipe with a lint-free cloth in a Z-pattern (not circles). The plant-derived surfactants in eco-friendly glass cleaners lift grime without leaving residue.",
      "## Don't Forget the Drain",
      "Pour half a cup of baking soda down the drain, followed by a cup of white vinegar. Let it fizz for 15 minutes, then flush with hot water. This prevents buildup and keeps drains smelling fresh — no chemical drain cleaners needed.",
      "## Freshening the Air",
      "Skip aerosol air fresheners. Instead, keep a small bowl of baking soda with a few drops of essential oil (lavender or eucalyptus) in the bathroom. It absorbs odours naturally and continuously.",
      "## Weekly vs. Daily Tasks",
      "• **Daily**: Wipe the mirror, squeegee the shower screen, flush the toilet with a quick squirt of cleaner.\n• **Weekly**: Deep clean the toilet, scrub tiles, clean the drain, mop the floor.\n• **Monthly**: Descale showerheads, clean grout with baking soda paste, wash bath mats.",
    ],
  },
  {
    id: "4",
    slug: "ultimate-guide-to-plant-based-floor-cleaning",
    title: "The Ultimate Guide to Plant-Based Floor Cleaning for Indian Homes",
    excerpt: "From marble to vitrified tiles, learn how to clean every type of floor with eco-friendly, pet-safe products.",
    image: blog4,
    readTime: 7,
    date: "04 February, 2026",
    author: "rePhyl Team",
    content: [
      "Indian homes feature a wide variety of flooring — marble, granite, vitrified tiles, mosaic, and even wooden flooring in bedrooms. Each type has its quirks, but one thing is universal: you want floors that are clean, streak-free, and safe for kids and pets crawling on them.",
      "Plant-based floor cleaners are the perfect solution. They use natural surfactants derived from coconut and citrus to lift dirt and grime without leaving chemical residues. Here's how to get the best results with eco-friendly floor care.",
      "## Understanding Your Floor Type",
      "**Marble & Granite**: These natural stones are porous and sensitive to acidic cleaners. Never use vinegar or lemon-based cleaners on marble — they etch the surface. Use a pH-neutral plant-based floor cleaner instead.",
      "**Vitrified Tiles**: The most common flooring in modern Indian homes. These are durable and can handle most plant-based cleaners. A citrus-based formula works brilliantly here.",
      "**Mosaic & Cement Tiles**: Common in older homes. These absorb water, so use a well-wrung mop and avoid soaking. A neem-based cleaner works well for antibacterial protection.",
      "## The Right Mopping Technique",
      "• Sweep or vacuum first — mopping over dust creates mud streaks.\n• Use warm water (not hot) mixed with your plant-based cleaner.\n• Wring the mop thoroughly — excess water can damage grout and seep under tiles.\n• Mop in straight lines, not circles, for streak-free results.\n• For large areas, change the water halfway through.",
      "## Dealing with Stubborn Stains",
      "For stubborn marks, apply the floor cleaner directly on the stain and let it sit for 5 minutes. Gently scrub with a soft brush, then mop clean. Plant-based enzymes in quality cleaners break down organic stains (food, pet accidents) effectively.",
      "## Pet-Safe Cleaning",
      "If you have pets, floor cleaner choice is critical. Dogs and cats walk on floors and lick their paws. Chemical residues from conventional cleaners can cause digestive issues, skin irritation, and worse. Plant-based cleaners with neem, citrus, or tea tree oil are naturally antibacterial and completely pet-safe.",
      "## How Often Should You Mop?",
      "• **Daily**: High-traffic areas like the kitchen and living room.\n• **Every 2–3 days**: Bedrooms, hallways.\n• **Weekly**: Guest rooms, balconies.\n• **Monthly**: Deep clean with concentrated solution, move furniture, clean under rugs.",
    ],
  },
];
