"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ComponentType } from "react";

import { getBlobShape } from "@/components/ux/blob-shapes";
import type { PackageTier } from "@/types/package-tier";

import type { PackageTierDialogProps } from "./PackageTierModal";

type PackageTierCardProps = {
  tier: PackageTier;
  index: number;
  ModalComponent: ComponentType<PackageTierDialogProps>;
};

export function PackageTierCard({
  tier,
  index,
  ModalComponent,
}: PackageTierCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shape = getBlobShape(index);

  return (
    <article
      className={`blob-drift ${shape.offset} min-w-[min(84vw,22rem)] flex-1 sm:min-w-84 md:min-w-0 md:max-w-[24rem]`}
      style={{ "--blob-drift": shape.drift } as CSSProperties}
      aria-label={`${tier.name} package`}
    >
      <div
        className="fluid-blob group relative flex h-[clamp(23rem,46vw,28rem)] flex-col items-center justify-center bg-brand-deep/70 px-[clamp(2rem,11%,3.25rem)] py-10 text-center"
        style={
          {
            "--blob-from": shape.from,
            "--blob-to": shape.to,
          } as CSSProperties
        }
      >
        <div className="fluid-blob__media">
          <Image
            src={tier.image}
            alt={tier.imageAlt}
            fill
            sizes="(max-width: 768px) 84vw, 22rem"
            className="blob-parallax object-cover"
          />
        </div>
        <span aria-hidden className="fluid-blob__veil" />

        {tier.highlighted ? (
          <p className="jov-kicker mb-3 border-sun/60 bg-ink/45 text-sun">
            Most Popular
          </p>
        ) : null}

        <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-balance text-surface">
          {tier.name}
        </h3>

        <p className="mt-2 text-2xl font-extrabold tracking-tight text-sun">
          From {tier.priceFrom}
        </p>

        <p className="mt-3 line-clamp-3 rounded-md bg-ink/25 p-0.5 text-md leading-7 text-pretty text-surface">
          {tier.description}
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="blob-reveal mt-5 inline-flex items-center gap-2 rounded-sm border border-sun/60 bg-ink/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-sun transition-all duration-300 ease-(--ease-fluid) hover:bg-sun hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
        >
          View inclusions
          <span className="sr-only">for the {tier.name} package</span>
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5 12h13M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isOpen ? (
        <ModalComponent
          tier={tier}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </article>
  );
}
