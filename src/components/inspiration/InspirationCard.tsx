import type { InspirationItem } from "@/types/inspiration-item";

type InspirationCardProps = {
  item: InspirationItem;
};

export function InspirationCard({ item }: InspirationCardProps) {
  return (
    <article className="fluid-card mb-6 break-inside-avoid overflow-hidden rounded-[2rem_1.2rem_2rem_1.6rem] border border-border bg-surface shadow-[0_10px_30px_rgba(110,78,56,0.08)]">
      <div
        className="fluid-mask m-4 h-44 bg-[linear-gradient(140deg,#f4e3d8,#fff6f0)]"
        role="img"
        aria-label={`${item.title} décor inspiration placeholder image`}
      />

      <div className="px-6 pb-6 pt-2">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-strong">
          {item.eventType}
        </p>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {item.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-foreground/85">
          {item.description}
        </p>

        <p className="mt-4 rounded-xl bg-muted px-3 py-2 text-sm text-foreground/85">
          <span className="font-semibold text-brand-strong">Palette:</span>{" "}
          {item.palette}
        </p>
      </div>
    </article>
  );
}
