"use client";

import Link from "next/link";

import { FluidDialog } from "@/components/ux/FluidDialog";
import { GoodToKnow } from "@/components/ux/GoodToKnow";
import { buildConsultationHref } from "@/lib/consultation-intent";
import type { JourneyType } from "@/types/consultation";
import type { PackageTier } from "@/types/package-tier";

export type PackageTierDialogProps = {
  tier: PackageTier;
  open: boolean;
  onClose: () => void;
};

type PackageTierModalProps = PackageTierDialogProps & {
  flow: JourneyType;
  source: string;
  notes: readonly string[];
  ctaLabel: string;
  ctaSpacingClassName?: string;
};

export function PackageTierModal({
  tier,
  open,
  onClose,
  flow,
  source,
  notes,
  ctaLabel,
  ctaSpacingClassName = "mt-8",
}: PackageTierModalProps) {
  const titleId = `${tier.id}-detail-title`;

  return (
    <FluidDialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel="Close package details"
      className="[--dialog-width:min(94vw,52rem)]"
    >
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div>
          <p className="jov-kicker bg-muted text-brand-deep">
            {tier.highlighted ? "most popular package" : "our package"}
          </p>

          <h2
            id={titleId}
            className="mt-4 max-w-[18ch] font-display text-2xl font-semibold uppercase tracking-tight text-foreground sm:text-3xl"
          >
            {tier.name}
          </h2>

          <p className="mt-2 text-2xl font-extrabold tracking-tight text-accent">
            From {tier.priceFrom}
          </p>

          <p className="mt-3 text-sm leading-7 text-foreground/85">
            {tier.description}
          </p>

          <div className="mt-6">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
              Highlights
            </h3>
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

          <Link
            href={buildConsultationHref({
              flow,
              packageChoice: tier.name,
              lockPackage: true,
              source,
            })}
            onClick={onClose}
            className={`jov-cta jov-cta-primary ${ctaSpacingClassName} w-full sm:w-auto`}
          >
            {ctaLabel}
          </Link>
        </div>

        <aside className="rounded-3xl bg-muted p-5 md:mt-12 md:self-start">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
            Recommended for
          </h3>
          <p className="mt-2 text-sm leading-6 text-foreground/86">
            {tier.recommendedFor}
          </p>

          <hr className="my-5 border-border" />

          <GoodToKnow notes={notes} />
        </aside>
      </div>
    </FluidDialog>
  );
}
