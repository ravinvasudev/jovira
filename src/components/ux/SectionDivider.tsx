type DividerVariant = "wave" | "drape";

type SectionDividerProps = {
  variant: DividerVariant;
  /** Tailwind background class of the section below — this paints the shape. */
  to: string;
  /** Tailwind background class of the section above. Omit to let it show through. */
  from?: string;
  /** Mirror the sweep so consecutive edges fall in opposite directions. */
  flip?: boolean;
  className?: string;
};

/**
 * Decorative shaped edge between two sections. Pure CSS masking, no imagery,
 * so it stays crisp at any width and costs nothing at runtime.
 */
export function SectionDivider({
  variant,
  to,
  from = "",
  flip = false,
  className = "",
}: SectionDividerProps) {
  return (
    <div aria-hidden className={`section-edge ${from} ${className}`.trim()}>
      <span
        className={[
          "section-edge__shape",
          `section-edge__shape--${variant}`,
          to,
          flip ? "-scale-x-100" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
