import Image from "next/image";
import Link from "next/link";

import { SectionDivider } from "@/components/ux/SectionDivider";
import { buildConsultationHref } from "@/lib/consultation-intent";

const trustPoints = [
  "Consultation-led Event Planning",
  "Balloon Installation",
  "Grab 'n Go Collection",
] as const;

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/hero-celebration.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
          className="parallax-layer object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/55 to-ink/80 md:from-ink/45 md:via-ink/15 md:to-ink/55"
        />
        <div aria-hidden className="hero-fluid-overlay fluid-blob">
          <div className="fluid-blob__media">
            <Image
              src="/hero/hero.png"
              alt=""
              fill
              priority
              style={{ objectFit: "cover" }}
              aria-hidden="true"
              // sizes="(max-width: 768px) 100vw, 42rem"
              className="blob-parallax object-cover"
            />
          </div>
          {/* <span
            aria-hidden
            className="fluid-blob__veil hero-fluid-overlay__veil"
          /> */}
        </div>
      </div>

      <div className="jov-gutter relative pb-[clamp(8.5rem,15vh,11rem)] pt-[clamp(7rem,18vh,11rem)]">
        <p className="jov-kicker border-sun/45 bg-ink/35 text-xs text-sun backdrop-blur-sm tracking-wide sm:text-sm">
          Event styling &amp; balloon decoration · Fredericton
        </p>

        <h1
          id="hero-title"
          className="jov-heading mt-6 max-w-[18ch] text-surface"
        >
          We transform your
          <br /> space.{" "}
          <span>
            You make
            <br /> the memories.
          </span>
        </h1>

        <p className="jov-subcopy mt-6 text-surface/88">&nbsp;</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={buildConsultationHref({
              flow: "consultation",
              source: "hero-request-free-consultation",
            })}
            className="jov-cta jov-cta-primary"
          >
            Request free Consultation
          </Link>
          <Link href="#inspiration" className="jov-cta jov-cta-ghost">
            See Our Inspiration
          </Link>
        </div>

        <ul className="mt-9 flex flex-col gap-y-3 text-sm font-medium text-surface/85 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-sun"
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#services"
        aria-label="Scroll to our services"
        className="pulse-arrow absolute bottom-[clamp(4.25rem,5.5vw,5.75rem)] left-1/2 z-10 -translate-x-1/2 rounded-[4px] p-2 text-sun focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <SectionDivider variant="drape" to="bg-muted" flip />
    </section>
  );
}
