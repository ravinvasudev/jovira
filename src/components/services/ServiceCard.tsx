"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, type CSSProperties } from "react";

import { getBlobShape } from "@/components/ux/blob-shapes";
import type { Service } from "@/types/service";

type ServiceCardProps = {
  service: Service;
  index: number;
};

type ServiceModalProps = {
  service: Service;
  open: boolean;
  onClose: () => void;
};

const ServiceModal = dynamic<ServiceModalProps>(
  () =>
    import("@/components/services/ServiceModal").then(
      (module) => module.ServiceModal,
    ),
  {
    loading: () => null,
  },
);

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shape = getBlobShape(index);

  return (
    <article
      className={`blob-drift ${shape.offset} min-w-[min(84vw,22rem)] flex-1 sm:min-w-84 md:min-w-0 md:max-w-120`}
      style={{ "--blob-drift": shape.drift } as CSSProperties}
    >
      <div
        className="fluid-blob group relative flex h-[clamp(22rem,44vw,27rem)] flex-col items-center justify-center px-[clamp(2rem,11%,3.25rem)] py-10 text-center"
        style={
          {
            "--blob-from": shape.from,
            "--blob-to": shape.to,
          } as CSSProperties
        }
      >
        <div className="fluid-blob__media">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 84vw, 22rem"
            className="blob-parallax object-cover"
          />
        </div>
        <span aria-hidden className="fluid-blob__veil" />

        <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-surface text-balance">
          {service.title}
        </h3>

        <p className="mt-2 text-lg font-extrabold tracking-tight text-sun">
          {service.tagline}
        </p>

        <p className="bg-ink/25 rounded-md p-0.5 mt-3 line-clamp-3 text-md leading-7 text-surface text-pretty">
          {service.summary}
        </p>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="blob-reveal mt-5 inline-flex items-center gap-2 rounded-sm border border-sun/60 bg-ink/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-sun transition-all duration-300 ease-(--ease-fluid) hover:bg-sun hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100"
        >
          Learn more
          <span className="sr-only">about {service.title}</span>
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
        <ServiceModal
          service={service}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </article>
  );
}
