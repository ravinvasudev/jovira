export type InspirationOffer = {
  packageLabel: string;
  originalPrice: number;
  discountPct: number;
};

export type InspirationItem = {
  id: string;
  title: string;
  description: string;
  eventType: string;
  offer: InspirationOffer;
  palette: string;
  image: string;
  imageAlt: string;
};
