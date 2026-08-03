import {
  faqItems,
  privacyPolicyBlocks,
  refundPolicyBlocks,
  termsOfServiceBlocks,
  type PolicyBlock,
} from "@/data/site-policies";

function PolicyList({ blocks }: { blocks: PolicyBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <article
          key={block.title}
          className="rounded-[1.35rem_1rem_1.45rem_1.15rem] border border-border bg-surface p-5 sm:p-6"
        >
          <h4 className="text-base font-semibold text-foreground">
            {block.title}
          </h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground/84">
            {block.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function PoliciesSection() {
  const updatedOn = "August 2, 2026";

  return (
    <section
      className="fluid-section bg-background"
      aria-labelledby="policies-title"
      data-choreo
    >
      <div className="max-w-4xl" data-choreo-item data-choreo-delay="70">
        <p className="jov-kicker bg-surface text-brand-deep">
          important information
        </p>
        <h2 id="policies-title" className="jov-heading mt-4 text-foreground">
          policies that keep your celebration clear, smooth, and stress-light.
        </h2>
        <p className="jov-subcopy mt-4 text-foreground/84">
          These terms reflect how Jovira provides consultation-led styling and
          package services for customer-provided venues.
        </p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/62">
          Last updated: {updatedOn}
        </p>
      </div>

      <article
        id="faqs"
        className="mt-10 rounded-[1.9rem_1.2rem_2rem_1.35rem] border border-border bg-surface p-5 sm:p-7"
        data-choreo-item
        data-choreo-delay="170"
      >
        <h3 className="text-2xl font-display text-foreground">FAQs</h3>
        <div className="mt-5 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-border bg-surface-soft px-4 py-3"
            >
              <summary className="cursor-pointer list-none pr-6 text-sm font-semibold text-foreground marker:content-none">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-foreground/82">{item.answer}</p>
            </details>
          ))}
        </div>
      </article>

      <div
        className="mt-10 space-y-10"
        data-choreo-item
        data-choreo-delay="240"
      >
        <article id="terms" aria-labelledby="terms-title">
          <h3
            id="terms-title"
            className="text-2xl font-display text-foreground"
          >
            Terms of Service
          </h3>
          <p className="mt-2 text-sm text-foreground/78">
            These terms apply to consultations, package inquiries, and booked
            Jovira styling services.
          </p>
          <div className="mt-5">
            <PolicyList blocks={termsOfServiceBlocks} />
          </div>
        </article>

        <article id="privacy-policy" aria-labelledby="privacy-title">
          <h3
            id="privacy-title"
            className="text-2xl font-display text-foreground"
          >
            Privacy Policy
          </h3>
          <p className="mt-2 text-sm text-foreground/78">
            We only use submitted information to support your request and
            service coordination.
          </p>
          <div className="mt-5">
            <PolicyList blocks={privacyPolicyBlocks} />
          </div>
        </article>

        <article id="refund-policy" aria-labelledby="refund-title">
          <h3
            id="refund-title"
            className="text-2xl font-display text-foreground"
          >
            Refund Policy
          </h3>
          <p className="mt-2 text-sm text-foreground/78">
            Refund outcomes depend on timing, custom preparation, and confirmed
            service scope.
          </p>
          <div className="mt-5">
            <PolicyList blocks={refundPolicyBlocks} />
          </div>
        </article>
      </div>
    </section>
  );
}
