"use client";

import { JoviraLogo } from "@/components/brand/JoviraLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#event-styling", label: "Packages" },
  { href: "/#inspiration", label: "Inspiration" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateHeaderFromScroll = () => {
      const scrollY = window.scrollY;
      const condensed = scrollY > 40;
      const progress = Math.min(scrollY / 180, 1);

      setIsCondensed((prev) => (prev === condensed ? prev : condensed));
      setScrollProgress((prev) =>
        Math.abs(prev - progress) < 0.001 ? prev : progress,
      );
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(updateHeaderFromScroll);
    };

    updateHeaderFromScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isMenuOpen]);

  const floating = !isCondensed && !isMenuOpen;
  const effectiveProgress = isMenuOpen ? 0 : scrollProgress;
  const logoScale = 1 - effectiveProgress * 0.18;
  const isPolicyPage =
    pathname === "/policies" ||
    pathname === "/faqs" ||
    pathname === "/terms" ||
    pathname === "/privacy-policy" ||
    pathname === "/refund-policy";
  const scrolledBackgroundClass = isPolicyPage
    ? "bg-ink/92 text-surface"
    : "bg-transparent text-surface";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        floating
          ? `${scrolledBackgroundClass}`
          : "bg-ink text-surface shadow-[0_10px_30px_rgb(16_35_63/8%)] ",
      ].join(" ")}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-sm focus:bg-sun focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-foreground"
      >
        Skip to main content
      </a>

      <div className="jov-gutter flex h-20 items-center justify-between gap-3">
        <Link
          href="/"
          aria-label="Jovira home"
          className="flex h-full shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="font-semibold uppercase tracking-[0.22em] md:hidden">
            Jovira
          </span>
          <span
            className="hidden items-center md:inline-flex"
            style={{
              transform: `scale(${logoScale})`,
              transformOrigin: "left center",
              transition: "transform 320ms var(--ease-fluid)",
            }}
          >
            <JoviraLogo variant="header" />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-[clamp(1.1rem,2.4vw,2.2rem)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold tracking-wide transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun uppercase"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#consultation"
            className="jov-cta jov-cta-primary shrink-0 whitespace-nowrap px-4 py-2 text-[0.82rem] max-sm:px-3! max-sm:py-1.5! max-sm:text-[0.74rem]! sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Book Now</span>
            <span className="hidden sm:inline">BEGIN YOUR CELEBRATION</span>
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className={[
              "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border-0 transition md:hidden",
            ].join(" ")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="#dfdfdf"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 4h16 M4 12h16 M4 20h16"
                  stroke="#dfdfdf"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!isMenuOpen}
        className="jov-gutter pb-5 md:hidden"
      >
        <nav
          aria-label="Mobile"
          className="rounded-[1.8rem_1rem_1.8rem_1.2rem] border border-border bg-surface p-4 text-foreground shadow-[0_16px_36px_rgb(16_35_63/14%)]"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-semibold transition hover:bg-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/#consultation"
            onClick={() => setIsMenuOpen(false)}
            className="jov-cta jov-cta-primary mt-3 w-full"
          >
            BEGIN YOUR CELEBRATION
          </Link>
        </nav>
      </div>
    </header>
  );
}
