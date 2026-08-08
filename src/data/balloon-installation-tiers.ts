import type { PackageTier } from "@/types/package-tier";

export const balloonInstallationTiers: PackageTier[] = [
  {
    id: "signature-starter",
    name: "Signature",
    priceFrom: "$249",
    description:
      "The essentials, done with real craft — a styled backdrop, a hand-tied garland, and finishing touches that make a small space feel like an occasion.",
    includes: [
      "5ft W × 7ft H (approx.) fully styled finish",
      "One large backdrop, custom-fit to your theme",
      "One custom theme cut-out — a personalized focal detail",
      "Hand-tied organic balloon garland to match your theme",
      "Premium balloons in curated colours",
      "Delivery, professional setup & takedown",
    ],
    recommendedFor:
      "First birthdays, baby showers, and intimate milestone celebrations that deserve a polished photo moment without a full production.",
    image: "/packages/signature-starter.jpeg",
    imageAlt:
      "Intimate Jovira styling with a soft balloon cluster above a dressed celebration table",
    highlighted: true,
  },
  {
    id: "mini-luxe",
    name: "Mini Luxe",
    priceFrom: "$349",
    description:
      "A layered step up — two coordinated backdrop moments, a personalized touch, and the kind of detail that makes guests reach for their phones.",
    includes: [
      "7ft W × 7ft H (approx.) fully styled finish",
      "One small and one large backdrop, layered for a full photo moment",
      "One custom theme cut-out — a personalized focal detail",
      "Hand-tied organic balloon garland to match your theme",
      "Premium balloons in curated colours",
      "Personalized name or age lettering on your backdrop",
      "Theme foil balloon accents",
      "Delivery, professional setup & takedown",
    ],
    recommendedFor:
      "Birthdays and graduations where personalized lettering, foil accents, and layered backdrops make for a shareable, social-ready moment.",
    image: "/packages/mini-luxe.jpeg",
    imageAlt:
      "Statement Jovira balloon arch backdrop framed by two styled photo moments",
    highlighted: false,
  },
  {
    id: "glam-luxe",
    name: "Glam Luxe",
    priceFrom: "$449",
    description:
      "An immersive, multi-zone transformation from a shimmer-lit entrance to a photo wall that carries the theme all the way through.",
    includes: [
      "7ft W × 7ft H (approx.) fully styled finish",
      "One medium and one large backdrop for a layered entrance-to-photo-wall look",
      "Shimmer wall accent panel for extra light and glamour",
      "7 ft hand-tied organic balloon garland",
      "Premium balloons in up to 4 curated colours",
      "Welcome sign styled to match your theme",
      "Delivery, professional setup & takedown",
    ],
    recommendedFor:
      "Larger gatherings — sweet sixteens, baby showers, and milestone birthdays that call for a shimmer-lit entrance and a fully immersive photo wall.",
    image: "/packages/glam-luxe.jpeg",
    imageAlt:
      "Full-scale Jovira transformation with an entrance arch, photo wall, and multiple styled zones",
  },
];
