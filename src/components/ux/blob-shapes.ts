export type BlobShape = {
  /** Resting border-radius pair. */
  from: string;
  /** Morph target border-radius pair. */
  to: string;
  /** Per-card scroll drift distance. */
  drift: string;
  /** Vertical stagger applied from `md` up so the row never reads as a grid. */
  offset: string;
};

/** Irregular droplet shapes so no two neighbouring cards share a silhouette. */
const BLOB_SHAPES: readonly BlobShape[] = [
  {
    from: "58% 42% 46% 54% / 44% 38% 62% 56%",
    to: "46% 54% 60% 40% / 56% 52% 48% 44%",
    drift: "26px",
    offset: "",
  },
  {
    from: "42% 58% 62% 38% / 56% 44% 56% 44%",
    to: "60% 40% 38% 62% / 42% 60% 40% 58%",
    drift: "40px",
    offset: "",
  },
  {
    from: "54% 46% 38% 62% / 62% 46% 54% 38%",
    to: "38% 62% 56% 44% / 44% 58% 42% 56%",
    drift: "18px",
    offset: "",
  },
];

export function getBlobShape(index: number): BlobShape {
  return BLOB_SHAPES[index % BLOB_SHAPES.length];
}
