"use client";

import { useEffect } from "react";

const MOBILE_BREAKPOINT = 768;
const CHOREOGRAPHY_PROFILE = "calm-luxury" as const;

const MOTION_PROFILE = {
  sectionDurationMs: 920,
  itemDurationMs: 760,
  sectionLiftPx: 18,
  itemLiftPx: 14,
  sectionBlurPx: 1,
  staggerStepMs: 140,
  staggerCapMs: 760,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  threshold: 0.18,
  rootMargin: "0px 0px -14% 0px",
} as const;

export function SectionChoreography() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-choreo]"),
    );

    if (sections.length === 0) {
      return;
    }

    const profile = MOTION_PROFILE;
    const root = document.documentElement;

    root.dataset.choreoProfile = CHOREOGRAPHY_PROFILE;
    root.style.setProperty(
      "--choreo-section-duration",
      `${profile.sectionDurationMs}ms`,
    );
    root.style.setProperty(
      "--choreo-item-duration",
      `${profile.itemDurationMs}ms`,
    );
    root.style.setProperty(
      "--choreo-section-lift",
      `${profile.sectionLiftPx}px`,
    );
    root.style.setProperty("--choreo-item-lift", `${profile.itemLiftPx}px`);
    root.style.setProperty(
      "--choreo-section-blur",
      `${profile.sectionBlurPx}px`,
    );
    root.style.setProperty("--choreo-easing", profile.easing);

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT;

    sections.forEach((section) => {
      section.classList.add("choreo-target");

      const items = Array.from(
        section.querySelectorAll<HTMLElement>("[data-choreo-item]"),
      );

      items.forEach((item, index) => {
        item.classList.add("choreo-item");

        const delayFromMarkup = item.dataset.choreoDelay;
        const delay =
          delayFromMarkup && !Number.isNaN(Number(delayFromMarkup))
            ? Number(delayFromMarkup)
            : Math.min(index * profile.staggerStepMs, profile.staggerCapMs);

        item.style.setProperty("--choreo-delay", `${delay}ms`);
      });
    });

    if (isReducedMotion || isMobileViewport) {
      sections.forEach((section) => {
        section.classList.add("is-visible");
        section
          .querySelectorAll<HTMLElement>(".choreo-item")
          .forEach((item) => item.classList.add("is-visible"));
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          section.classList.add("is-visible");
          section
            .querySelectorAll<HTMLElement>(".choreo-item")
            .forEach((item) => item.classList.add("is-visible"));

          activeObserver.unobserve(section);
        });
      },
      {
        threshold: profile.threshold,
        rootMargin: profile.rootMargin,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return null;
}
