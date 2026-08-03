"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { memo, useState, type CSSProperties } from "react";

import { getBlobShape } from "@/components/ux/blob-shapes";
import type { InspirationItem } from "@/types/inspiration-item";

type InspirationCardProps = {
  item: InspirationItem;
  index: number;
};

type InspirationModalProps = {
  item: InspirationItem;
  open: boolean;
  onClose: () => void;
};

const InspirationModal = dynamic<InspirationModalProps>(
  () =>
    import("@/components/inspiration/InspirationModal").then(
      (module) => module.InspirationModal,
    ),
  {
    loading: () => null,
  },
);

export const InspirationCard = memo(function InspirationCard({
  item,
  index,
}: InspirationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shape = getBlobShape(index);

  return (
    <article
      className={`${shape.offset} w-[min(78vw,20rem)] shrink-0 snap-start sm:w-76`}
      data-carousel-item
    >
      <div
        className="fluid-blob group relative flex h-[clamp(20rem,40vw,24rem)] flex-col items-center justify-center px-[clamp(2rem,11%,3rem)] py-10 text-center"
        style={
          {
            "--blob-from": shape.from,
            "--blob-to": shape.to,
          } as CSSProperties
        }
      >
        <div className="fluid-blob__media">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 78vw, 20rem"
            className="blob-parallax-x object-cover"
          />
        </div>
        <span aria-hidden className="fluid-blob__veil" />

        <h3 className="font-display text-3xl font-semibold tracking-tight text-balance text-surface">
          {item.title}
          <span className="sr-only"> — {item.title}</span>
        </h3>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="blob-reveal mt-5 inline-flex items-center gap-2 rounded-sm border border-sun/60 bg-ink/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-sun transition-all duration-300 ease-(--ease-fluid) hover:bg-sun hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          View Details
          <span className="sr-only">of {item.title}</span>
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
        <InspirationModal
          item={item}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </article>
  );
});
