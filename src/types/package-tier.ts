export type PackageTier = {
  id: string;
  name: string;
  priceFrom: string;
  description: string;
  includes: string[];
  recommendedFor: string;
  image: string;
  imageAlt: string;
  highlighted?: boolean;
};
