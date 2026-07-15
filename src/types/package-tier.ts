export type PackageTier = {
  id: string;
  name: string;
  priceFrom: string;
  description: string;
  includes: string[];
  recommendedFor: string;
  highlighted?: boolean;
};
