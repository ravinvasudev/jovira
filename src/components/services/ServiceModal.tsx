"use client";

import Link from "next/link";

import { FluidDialog } from "@/components/ux/FluidDialog";
import type { Service } from "@/types/service";

type ServiceModalProps = {
  service: Service;
  open: boolean;
  onClose: () => void;
};

export function ServiceModal({ service, open, onClose }: ServiceModalProps) {
  const titleId = `${service.id}-detail-title`;

  return (
    <FluidDialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel="Close service details"
    >
      <p className="jov-kicker bg-muted text-brand-deep">our service</p>

      <h2
        id={titleId}
        className="mt-4 max-w-[18ch] font-display text-2xl font-semibold uppercase tracking-tight text-foreground sm:text-3xl"
      >
        {service.title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-foreground/85">
        {service.summary}
      </p>

      <div className="mt-6">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.12em] text-accent">
          What’s Included
        </h3>
        <ul className="mt-3 space-y-2 text-sm text-foreground/85">
          {service.deliverables.map((item) => (
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

      <p className="mt-6 rounded-[1.2rem] bg-muted px-4 py-3 text-sm leading-6 text-foreground/86">
        <span className="font-extrabold text-foreground">Ideal for:</span>{" "}
        {service.idealFor}
      </p>

      <Link
        href={service.navLink}
        onClick={onClose}
        className="jov-cta jov-cta-primary mt-6 w-full sm:w-auto"
      >
        View Packages
      </Link>
    </FluidDialog>
  );
}
