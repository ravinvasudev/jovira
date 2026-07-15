import type { PackageTier } from "@/types/package-tier";

type PackageCardProps = {
  tier: PackageTier;
};

export function PackageCard({ tier }: PackageCardProps) {
  return (
    <article
      className={[
        "fluid-card min-w-[min(86vw,23rem)] flex-1 rounded-[2rem_1.2rem_2rem_1.6rem] border bg-surface p-6 shadow-[0_10px_30px_rgba(110,78,56,0.08)] sm:min-w-[22rem] sm:p-7",
        tier.highlighted
          ? "border-brand/70 ring-2 ring-brand/25"
          : "border-border",
      ].join(" ")}
      aria-label={`${tier.name} package`}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {tier.name}
        </h3>
        {tier.highlighted ? (
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            Most Popular
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm leading-7 text-foreground/85">
        {tier.description}
      </p>

      <p className="mt-4 text-2xl font-semibold tracking-tight text-brand-strong">
        From {tier.priceFrom}
      </p>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
          Includes
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85">
          {tier.includes.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                aria-hidden
                className="mt-[0.45rem] inline-block h-1.5 w-1.5 rounded-full bg-brand"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 rounded-2xl bg-muted px-4 py-3 text-sm leading-6 text-foreground/85">
        <span className="font-semibold text-brand-strong">
          Recommended for:
        </span>{" "}
        {tier.recommendedFor}
      </p>
    </article>
  );
}
