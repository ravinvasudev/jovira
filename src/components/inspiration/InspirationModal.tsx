"use client";

import Image from "next/image";
import Link from "next/link";

import { FluidDialog } from "@/components/ux/FluidDialog";
import { getInspirationOfferPricing } from "@/data/inspiration-items";
import { buildConsultationHref } from "@/lib/consultation-intent";
import type { InspirationItem } from "@/types/inspiration-item";

const cadCurrency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

type InspirationModalProps = {
  item: InspirationItem;
  open: boolean;
  onClose: () => void;
};

export function InspirationModal({
  item,
  open,
  onClose,
}: InspirationModalProps) {
  const titleId = `${item.id}-detail-title`;
  const pricing = getInspirationOfferPricing(item);

  return (
    <FluidDialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel="Close inspiration details"
      className="[--dialog-max-height:min(92dvh,62rem)] [--dialog-width:min(96vw,80rem)]"
    >
      <div className="grid gap-6 sm:grid-cols-[1.15fr_1fr] sm:items-center sm:gap-10">
        <div className="relative min-h-72 overflow-hidden rounded-[1.3rem] border border-border bg-muted sm:min-h-120 sm:self-center">
          <Image
            src={item.image}
            alt={item.imageAlt}
            width={800}
            height={800}
            sizes="(max-width: 640px) 90vw, 42vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="sm:self-end">
          <p className="jov-kicker bg-muted text-brand-deep">
            {item.eventType}
          </p>

          <h2
            id={titleId}
            className="mt-4 max-w-[18ch] font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {item.title}
          </h2>

          <p className="mt-3 text-sm leading-7 text-foreground/85">
            {item.description}
          </p>

          <p className="mt-6 rounded-[1.2rem] bg-muted px-4 py-3 text-sm leading-6 text-foreground/86">
            <span className="font-extrabold text-foreground">Palette:</span>{" "}
            {item.palette}
          </p>

          <p className="mt-3 rounded-[1.2rem] bg-muted px-4 py-3 text-sm leading-6 text-foreground/86">
            <span className="font-extrabold text-foreground">Package:</span>{" "}
            {item.offer.packageLabel}
          </p>

          <div className="mt-4 rounded-2xl border border-brand-deep/25 bg-linear-to-r from-brand-deep/10 via-brand-deep/5 to-brand-deep/15 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-deep/90">
              Limited-time concept offer
            </p>

            <p className="mt-1 text-sm leading-6 text-foreground/85">
              Love this look? We can recreate this exact theme at your venue.
            </p>

            <p className="mt-2 text-sm leading-6 text-foreground">
              <span className="text-foreground/60 line-through">
                {cadCurrency.format(pricing.cost)}
              </span>
              <span className="mx-2 font-bold text-brand-deep">→</span>
              <span className="font-extrabold text-brand-deep">
                {cadCurrency.format(pricing.effectiveCost)}
              </span>
              <span className="ml-2 rounded-full bg-brand-deep px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-[0.08em] text-white">
                {pricing.discountPct}% off
              </span>
            </p>
          </div>

          <Link
            href={buildConsultationHref({
              flow: "offer",
              packageChoice: item.offer.packageLabel,
              lockPackage: true,
              source: `inspiration-${item.id}-claim-offer`,
            })}
            onClick={onClose}
            className="jov-cta jov-cta-primary mt-6 w-full sm:w-auto"
          >
            Claim offer!
          </Link>
        </div>
      </div>
    </FluidDialog>
  );
}
