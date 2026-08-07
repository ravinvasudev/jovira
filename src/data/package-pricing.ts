import type { JourneyType } from "@/types/consultation";

export const eventStylingPackages = ["Elite", "Prestige"] as const;
export const balloonStylingPackages = [
  "Signature",
  "Mini Luxe",
  "Glam Luxe",
] as const;
export const grabAndGoPackages = [
  "Crazy Tower",
  "Party Wall Magic",
  "Mini Magic Surprise",
  "Bubble Of Love",
  "Mega Magic Marquee",
] as const;

export const offerPackages = [
  ...eventStylingPackages,
  ...balloonStylingPackages,
  ...grabAndGoPackages,
] as const;

export type PackageName = (typeof offerPackages)[number];

type PackagePricing = {
  cost: number;
  defaultDiscountPct: number;
  offerDiscountPct: number;
};

const packagePricingTable: Record<PackageName, PackagePricing> = {
  Elite: { cost: 649, defaultDiscountPct: 0, offerDiscountPct: 8 },
  Prestige: { cost: 799, defaultDiscountPct: 0, offerDiscountPct: 10 },
  Signature: { cost: 249, defaultDiscountPct: 0, offerDiscountPct: 10 },
  "Mini Luxe": { cost: 349, defaultDiscountPct: 0, offerDiscountPct: 10 },
  "Glam Luxe": { cost: 449, defaultDiscountPct: 0, offerDiscountPct: 12 },
  "Crazy Tower": { cost: 119, defaultDiscountPct: 0, offerDiscountPct: 10 },
  "Party Wall Magic": {
    cost: 119,
    defaultDiscountPct: 0,
    offerDiscountPct: 10,
  },
  "Mini Magic Surprise": {
    cost: 29,
    defaultDiscountPct: 0,
    offerDiscountPct: 10,
  },
  "Bubble Of Love": { cost: 49, defaultDiscountPct: 0, offerDiscountPct: 10 },
  "Mega Magic Marquee": {
    cost: 79,
    defaultDiscountPct: 0,
    offerDiscountPct: 12,
  },
};

const journeyPackageMap: Record<JourneyType, readonly PackageName[]> = {
  consultation: [],
  eventStyling: eventStylingPackages,
  balloonStyling: balloonStylingPackages,
  grabAndGo: grabAndGoPackages,
  offer: offerPackages,
};

export function getPackagesForJourney(
  journeyType: JourneyType,
): readonly PackageName[] {
  return journeyPackageMap[journeyType];
}

export function isPackageName(value: string): value is PackageName {
  return value in packagePricingTable;
}

export function isPackageAllowedForJourney(
  journeyType: JourneyType,
  packageName: string,
) {
  return getPackagesForJourney(journeyType).includes(
    packageName as PackageName,
  );
}

export function getPackagePricingForJourney(
  journeyType: JourneyType,
  packageName: string,
  options?: {
    seasonalOffer?: boolean;
  },
) {
  if (!isPackageName(packageName)) {
    return null;
  }

  const pricing = packagePricingTable[packageName];
  const discountPct =
    journeyType === "offer" && options?.seasonalOffer
      ? pricing.offerDiscountPct
      : pricing.defaultDiscountPct;

  const discount = Number(((pricing.cost * discountPct) / 100).toFixed(2));
  const effectiveCost = Number((pricing.cost - discount).toFixed(2));

  return {
    packageName,
    cost: pricing.cost,
    discountPct,
    discount,
    effectiveCost,
  };
}

export function formatCadCurrency(amount: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 2,
  }).format(amount);
}
