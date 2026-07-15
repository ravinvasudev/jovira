import type { PackageTier } from "@/types/package-tier";

export const packageTiers: PackageTier[] = [
  {
    id: "signature-starter",
    name: "Signature Starter",
    priceFrom: "$349",
    description:
      "A polished styling foundation for intimate celebrations with a cohesive look and stress-free setup.",
    includes: [
      "Theme direction and styling checklist",
      "Balloon arrangement and focal décor zone",
      "On-site setup at your customer-provided venue",
    ],
    recommendedFor:
      "Birthday dinners, at-home milestones, and small family celebrations.",
  },
  {
    id: "elegant-moments",
    name: "Elegant Moments",
    priceFrom: "$699",
    description:
      "Our most popular package with elevated décor layers, photo-ready zones, and refined finishing details.",
    includes: [
      "Consultation-led concept and palette planning",
      "Statement backdrop with premium balloon styling",
      "Two styled photo moments with coordinated accents",
    ],
    recommendedFor:
      "Baby showers, graduations, and milestone birthdays that need standout visuals.",
    highlighted: true,
  },
  {
    id: "grand-celebration",
    name: "Grand Celebration",
    priceFrom: "$1,190",
    description:
      "A full-scale transformation package for hosts who want immersive styling from entrance to photo wall.",
    includes: [
      "Advanced theme planning and décor mapping",
      "Multi-zone styling with custom focal installations",
      "Extended setup detailing for a premium guest experience",
    ],
    recommendedFor:
      "Large seasonal events and once-in-a-lifetime family celebrations.",
  },
];
