import { SectionDivider } from "@/components/ux/SectionDivider";
import Link from "next/link";
import type { ReactNode } from "react";

type PolicyPageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

const policyNavLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/faqs", label: "FAQs" },
] as const;

export function PolicyPageShell({
  title,
  description,
  children,
}: PolicyPageShellProps) {
  const updatedOn = "August 2, 2026";

  return (
    <div className="w-full pt-20 md:pt-24 bg-ink">
      <section
        className="fluid-section bg-ink text-surface"
        aria-labelledby="policy-page-title"
        data-choreo
      >
        <div className="max-w-4xl" data-choreo-item data-choreo-delay="80">
          <p className="jov-kicker border-surface/35 bg-surface/10 text-sun">
            important information
          </p>
          <h1 id="policy-page-title" className="jov-heading mt-4 text-surface">
            {title}
          </h1>
          <p className="jov-subcopy mt-4 text-surface/82">{description}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-surface/62">
            Last updated: {updatedOn}
          </p>
        </div>

        <nav
          aria-label="Policies navigation"
          className="mt-8 flex flex-wrap gap-2"
          data-choreo-item
          data-choreo-delay="140"
        >
          {policyNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm border border-surface/30 bg-surface/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-surface transition hover:border-sun hover:text-sun"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </section>

      <SectionDivider variant="drape" from="bg-ink" to="bg-muted" />

      <section className="fluid-section bg-muted" data-choreo>
        <div className="max-w-5xl" data-choreo-item data-choreo-delay="120">
          {children}
        </div>
      </section>
    </div>
  );
}
