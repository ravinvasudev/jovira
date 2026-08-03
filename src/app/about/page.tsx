import { SectionDivider } from "@/components/ux/SectionDivider";
import { aboutUsContent } from "@/data/about-us";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | JOVIRA",
  description: "Learn more about JOVIRA, our mission, and how we operate.",
};

const policyNavLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/faqs", label: "FAQs" },
] as const;

export default function AboutUsPage() {
  return (
    <div className="w-full pt-20 md:pt-24 bg-ink">
      <section
        className="fluid-section bg-ink text-surface"
        aria-labelledby="policy-page-title"
        data-choreo
      >
        <div className="max-w-4xl" data-choreo-item data-choreo-delay="80">
          <p className="jov-kicker border-surface/35 bg-surface/10 text-sun">
            Company
          </p>
          <h1 id="policy-page-title" className="jov-heading mt-4 text-surface">
            About Us
          </h1>
          <p className="jov-subcopy mt-4 text-surface/82">
            Learn more about JOVIRA, our mission, and how we operate.
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
          <div className="space-y-5">
            {aboutUsContent.map(({ title, content }) => (
              <article
                key={title}
                className="rounded-[1.35rem_1rem_1.45rem_1.15rem] border border-border bg-surface p-5 sm:p-6"
              >
                <h2 className="text-base font-semibold text-foreground">
                  {title}
                </h2>
                <p className="mt-3 space-y-2 text-sm text-foreground/84">
                  {content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
