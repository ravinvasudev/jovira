"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { InspirationCard } from "@/components/inspiration/InspirationCard";
import type { InspirationItem } from "@/types/inspiration-item";

type InspirationCarouselProps = {
  items: InspirationItem[];
};

const SCROLL_TOLERANCE = 8;

export function InspirationCarousel({ items }: InspirationCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const canScrollBackRef = useRef(false);
  const canScrollForwardRef = useRef(true);

  const syncBounds = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maxScroll = track.scrollWidth - track.clientWidth;
    const nextCanScrollBack = track.scrollLeft > SCROLL_TOLERANCE;
    const nextCanScrollForward =
      track.scrollLeft < maxScroll - SCROLL_TOLERANCE;

    if (nextCanScrollBack !== canScrollBackRef.current) {
      canScrollBackRef.current = nextCanScrollBack;
      setCanScrollBack(nextCanScrollBack);
    }

    if (nextCanScrollForward !== canScrollForwardRef.current) {
      canScrollForwardRef.current = nextCanScrollForward;
      setCanScrollForward(nextCanScrollForward);
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    syncBounds();
    track.addEventListener("scroll", syncBounds, { passive: true });
    window.addEventListener("resize", syncBounds);

    return () => {
      track.removeEventListener("scroll", syncBounds);
      window.removeEventListener("resize", syncBounds);
    };
  }, [syncBounds]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const card = track.querySelector<HTMLElement>("[data-carousel-item]");
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    track.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="mt-10" data-choreo-item data-choreo-delay="280">
      <div className="flex justify-end gap-3">
        <CarouselArrow
          direction="back"
          disabled={!canScrollBack}
          onClick={() => scrollByCard(-1)}
        />
        <CarouselArrow
          direction="forward"
          disabled={!canScrollForward}
          onClick={() => scrollByCard(1)}
        />
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Inspiration carousel"
        tabIndex={0}
        className="fluid-scroll-row mt-5 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-deep"
      >
        {items.map((item, index) => (
          <InspirationCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

type CarouselArrowProps = {
  direction: "back" | "forward";
  disabled: boolean;
  onClick: () => void;
};

function CarouselArrow({ direction, disabled, onClick }: CarouselArrowProps) {
  const isBack = direction === "back";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border bg-surface text-brand-deep shadow-[0_10px_24px_rgb(16_35_63/10%)] transition-all duration-300 ease-(--ease-fluid) hover:border-brand hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-deep disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
    >
      <span className="sr-only">
        {isBack ? "Previous inspiration concepts" : "Next inspiration concepts"}
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d={isBack ? "M19 12H6M13 5l-7 7 7 7" : "M5 12h13M11 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
