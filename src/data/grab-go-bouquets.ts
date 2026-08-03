import type { PackageTier } from "@/types/package-tier";

export const packageTiers: PackageTier[] = [
  {
    id: "mini-magic-surprise",
    name: "Mini Magic Surprise",
    priceFrom: "$29",
    description:
      "A compact and charming balloon arrangement designed to deliver instant joy. Thoughtfully styled with creative details, this petite surprise is perfect for birthdays, thank-yous, congratulations, and just-because moments.",
    includes: [
      "Big personality in a petite package",
      "Styled for the sweetest of gestures",
      "Creative details that make every moment feel special",
      "Ready to surprise — no occasion too small",
    ],
    recommendedFor:
      "Birthday dinners, at-home milestones, and small family celebrations.",
    image: "/grabgobouquet/mini-magic-surprise.png",
    imageAlt:
      "Intimate Jovira styling with a soft balloon cluster above a dressed celebration table",
    highlighted: false,
  },
  {
    id: "bubble-of-love",
    name: "Bubble Of Love",
    priceFrom: "$49",
    description:
      "A dreamy balloon arrangement filled with love and charm, designed to make hearts smile and create unforgettable memories.",
    includes: [
      "A love in balloon form",
      "Dreamy charm that makes hearts genuinely smile",
      "Every balloon placed with intention and warmth",
      "Built to be felt, not just seen",
    ],
    recommendedFor:
      "Baby showers, graduations, and milestone birthdays that need standout visuals.",
    image: "/grabgobouquet/bubble-of-love.jpeg",
    imageAlt:
      "Statement Jovira balloon arch backdrop framed by two styled photo moments",
    highlighted: true,
  },
  {
    id: "mega-magic-marquee",
    name: "Mega Magic Marquee",
    priceFrom: "$79",
    description:
      "A show-stopping balloon marquee crafted with premium details, stunning visual impact, and unforgettable presentation - making every celebration feel extraordinary.",
    includes: [
      "A marquee moment that commands the room",
      "Premium details that photograph beautifully",
      "Transforms any space into an extraordinary celebration",
      "The centrepiece your milestone deserves",
    ],
    recommendedFor:
      "Large seasonal events and once-in-a-lifetime family celebrations.",
    image: "/grabgobouquet/mega-magic-marquee.jpeg",
    imageAlt:
      "Full-scale Jovira transformation with an entrance arch, photo wall, and multiple styled zones",
  },
];
