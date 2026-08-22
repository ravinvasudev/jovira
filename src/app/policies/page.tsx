import { companyMetadata } from "@/data/company";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: companyMetadata.pages.policies.title,
  description: companyMetadata.pages.policies.description,
};

export default function PoliciesPage() {
  return (
    <div className="w-full pt-20 md:pt-24 bg-ink">
      <section
        className="fluid-section bg-muted"
        aria-labelledby="policies-hub-title"
      >
        <div className="max-w-4xl">
          <p className="jov-kicker bg-surface text-brand-deep">
            important information
          </p>
          <h1
            id="policies-hub-title"
            className="jov-heading mt-4 text-foreground"
          >
            policies and frequently asked questions.
          </h1>
          <p className="jov-subcopy mt-4 text-foreground/84">
            Choose a page below to read each policy as a standalone document.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {companyMetadata.policiesHubLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="fluid-card rounded-[1.5rem_1rem_1.5rem_1.15rem] border border-border bg-surface p-5 transition hover:border-accent"
            >
              <h2 className="text-lg font-semibold text-foreground">
                {link.title}
              </h2>
              <p className="mt-2 text-sm text-foreground/78">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
