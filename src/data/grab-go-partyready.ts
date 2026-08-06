import type { PackageTier } from "@/types/package-tier";

export const grabGoPartyReadyTiers: PackageTier[] = [
  {
    id: "crazy-tower",
    name: "Crazy Tower",
    priceFrom: "$119",
    description:
      "Our signature theme balloon tower combines personalized numbers, custom colors, character themes, and eye-catching balloon artistry into one unforgettable centerpiece. Because Amazing Parties Can't Wait.",
    includes: [
      "Theme direction and styling consultation",
      "7ft H custom organic balloon column with premium balloons",
      "Personalized number, name or message detail",
      "Custom theme props coordinated to your celebration",
    ],
    recommendedFor:
      "Last-minute family celebrations.",
    image: "/grabgoparty/crazy-tower.jpeg",
    imageAlt:
      "Intimate Jovira styling with a soft balloon cluster above a dressed celebration table",
    highlighted: true,
  },
  {
    id: "party-wall-magic",
    name: "Party Wall Magic",
    priceFrom: "$119",
    description:
      "Create a stunning, photo-worthy party backdrop in minutes with our ready-to-hang themed balloon garlands. Designed to deliver maximum impact with minimal effort, this collection is perfect for busy hosts who want a professionally styled celebration without the stress or expense of full event decorating.",
    includes: [
      "Theme direction and styling consultation",
      "7ft H custom organic balloon column",
      "Statement backdrop with premium balloon installation",
      "Personalized number, name or message detail",
      "Custom theme props coordinated to your celebration",
    ],
    recommendedFor:
      "Last-minute family celebrations.",
    image: "/grabgoparty/party-wall-magic.jpeg",
    imageAlt:
      "Statement Jovira balloon arch backdrop framed by two styled photo moments",
    highlighted: false,
  },
];
