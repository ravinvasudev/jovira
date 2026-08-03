import {
  JOVIRA_MARK_PATH,
  JOVIRA_MARK_VIEW_BOX,
} from "@/components/brand/jovira-mark";

type JoviraLogoProps = {
  /** Extra classes for the wrapping element. */
  className?: string;
  /** Visual context where the lockup is rendered. */
  variant?: "header" | "footer";
  /** Renders the wordmark alongside the mark. */
  showWordmark?: boolean;
  /** Renders the tagline alongside the mark. */
  showTagline?: boolean;
};

/**
 * Jovira brand lockup: the circular brush monogram beside the JOVIRA wordmark.
 * The mark is filled with `currentColor`, so it inverts automatically on dark
 * surfaces and stays legible on light ones.
 */
export function JoviraLogo({
  className = "",
  variant = "header",
  showWordmark = true,
  showTagline = false,
}: JoviraLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span
      className={[
        "inline-flex min-w-0 items-center",
        isFooter ? "gap-3" : "gap-2 sm:gap-3",
        className,
      ].join(" ")}
    >
      <svg
        viewBox={JOVIRA_MARK_VIEW_BOX}
        aria-hidden="true"
        focusable="false"
        className={[
          "shrink-0",
          isFooter
            ? "h-[clamp(3.6rem,6vw,5.4rem)] w-[clamp(3.6rem,6vw,5.4rem)]"
            : "h-[clamp(2.2rem,6vw,3.9rem)] w-[clamp(2.2rem,6vw,3.9rem)]",
        ].join(" ")}
      >
        <path d={JOVIRA_MARK_PATH} fill="currentColor" fillRule="evenodd" />
      </svg>

      {showWordmark ? (
        <span
          className={[
            "font-semibold uppercase tracking-[0.22em]",
            isFooter
              ? "ml-2 text-[clamp(1.35rem,2.6vw,2rem)]"
              : "ml-1 hidden text-[clamp(1.05rem,3.1vw,2.2rem)] min-[430px]:inline",
          ].join(" ")}
        >
          Jovira
        </span>
      ) : null}

      {showTagline ? (
        <span className="ml-1 max-w-[26ch] text-[clamp(1rem,2.6vw,1.7rem)] font-semibold leading-[1.18] text-surface">
          <span className="font-extrabold text-brand">Jo</span>yful <br />
          <span className="font-extrabold text-brand">Vi</span>brant <br />
          <span className="font-extrabold text-brand">Ra</span>diant
          <br />
          <span className="font-extrabold">Celebrations</span>
          {/* <span className="font-extrabold text-lime-400">Ce</span>
          <span className="font-extrabold text-rose-deep">le</span>
          <span className="font-extrabold text-sun-deep">br</span>
          <span className="font-extrabold text-cyan-400">at</span>
          <span className="font-extrabold text-orange-400">io</span>
          <span className="font-extrabold text-purple-400">ns</span> */}
        </span>
      ) : null}
    </span>
  );
}
