import type { InspirationItem } from "@/types/inspiration-item";

export const inspirationItems: InspirationItem[] = [
  {
    id: "blush-gold-birthday",
    title: "Blush & Gold Birthday Lounge",
    description:
      "A soft, elegant setup with layered balloons, a custom backdrop focal point, and warm table accents for memorable family photos.",
    palette: "Blush, warm gold, ivory",
    eventType: "Birthday",
    offer: {
      packageLabel: "Bubble Of Love",
      originalPrice: 650,
      discountPct: 5,
    },
    image: "/inspiration/insp1.png",
    imageAlt:
      "Blush and gold birthday lounge with layered balloons and a soft arch backdrop",
  },
  {
    id: "evergreen-christmas-corner",
    title: "Evergreen Christmas Gathering",
    description:
      "A cosy seasonal concept featuring textured greenery tones, festive balloon installation, and a polished photo-ready entrance moment.",
    palette: "Evergreen, champagne, winter white",
    eventType: "Christmas",
    offer: {
      packageLabel: "Bubble Of Love",
      originalPrice: 720,
      discountPct: 10,
    },
    image: "/inspiration/insp2.png",
    imageAlt:
      "Evergreen Christmas garland with champagne baubles above a styled entrance moment",
  },
  {
    id: "classic-grad-celebration",
    title: "Classic Graduation Celebration",
    eventType: "Graduation",
    description:
      "A clean and modern graduation scene with statement signage, coordinated balloons, and décor details designed for guest interaction.",
    palette: "Black, cream, metallic gold",
    offer: {
      packageLabel: "Signature",
      originalPrice: 690,
      discountPct: 15,
    },
    image: "/inspiration/insp3.png",
    imageAlt:
      "Graduation celebration with statement signage, caps, and coordinated cream and gold balloons",
  },
  {
    id: "mothers-day-tea-style",
    title: "Mother’s Day Tea-Inspired Styling",
    eventType: "Mother’s Day",
    description:
      "A delicate setup with floral-inspired tones, soft draping elements, and an intimate backdrop that honours meaningful family moments.",
    palette: "Rose, peach, soft cream",
    offer: {
      packageLabel: "Mini Luxe",
      originalPrice: 620,
      discountPct: 20,
    },
    image: "/inspiration/insp4.png",
    imageAlt:
      "Mother’s Day tea-inspired styling with soft draping, florals, and a dressed table",
  },
];

export function getInspirationItemById(id: string) {
  return inspirationItems.find((item) => item.id === id) ?? null;
}

export function getInspirationItemFromSource(
  source: string | null | undefined,
) {
  if (!source) {
    return null;
  }

  const match = source.match(/^inspiration-(.+)-claim-offer$/);
  if (!match) {
    return null;
  }

  return getInspirationItemById(match[1]);
}

export function getInspirationOfferPricing(item: InspirationItem) {
  const discount = Number(
    ((item.offer.originalPrice * item.offer.discountPct) / 100).toFixed(2),
  );
  const effectiveCost = Number(
    (item.offer.originalPrice - discount).toFixed(2),
  );

  return {
    packageLabel: item.offer.packageLabel,
    cost: item.offer.originalPrice,
    discountPct: item.offer.discountPct,
    discount,
    effectiveCost,
  };
}
