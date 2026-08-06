import type { PackageTier } from "@/types/package-tier";

export const eventStylingTiers: PackageTier[] = [
  {
    id: "elite",
    name: "Elite",
    priceFrom: "$649",
    description:
      "A tailored full-service production — grand-entrance styling, coordinated table moments, and every finishing detail considered.",
    includes: [
      "8ft W × 8ft H finished size",
      "Two large backdrops for full entrance-to-photo-wall impact",
      "Hand-tied organic balloon garland",
      "Premium balloons in curated colours",
      "Welcome sign + coordinating theme props",
      "Projected ambient lighting for an elevated evening glow",
      "Number sign-light styled to your milestone",
      "Table centerpieces styled to your palette",
      "Theme props coordinated to your celebration",
      "Delivery, professional setup & pickup",
    ],
    recommendedFor:
      "Milestone birthdays and anniversaries where every detail from the grand entrance to the styled table needs to feel completely intentional.",
    image: "/packages/elite.jpeg",
    imageAlt:
      "Full-scale Jovira transformation with an entrance arch, photo wall, and multiple styled zones",
  },
  {
    id: "prestige",
    name: "Prestige",
    priceFrom: "$799",
    description:
      "Our grandest transformation — a sweeping backdrop, a memory board guests will linger at, and ambient lighting that carries the celebration into the evening.",
    includes: [
      "9ft W × 8ft H finished size",
      "Two large and one medium backdrops for a grand entrance-to-photo-wall transformation",
      "Hand-tied organic balloon garland",
      "Premium balloons in curated colours",
      "Photo memory board for guests to sign and celebrate",
      "Projected ambient lighting for an elevated evening glow",
      "Number sign-light styled to your milestone",
      "Table centerpieces styled to match your palette",
      "Theme props coordinated to your celebration",
      "Delivery, professional setup & pickup",
    ],
    recommendedFor:
      "Grand celebrations — quinceañeras, sweet sixteens, milestone anniversaries where you want a sweeping atmosphere and a memory board guests will linger at all evening.",
    image: "/packages/prestige.jpeg",
    imageAlt:
      "Full-scale Jovira transformation with an entrance arch, photo wall, and multiple styled zones",
  },
];
