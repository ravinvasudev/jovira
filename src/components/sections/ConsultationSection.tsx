import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { Suspense } from "react";

export function ConsultationSection() {
  return (
    <section
      id="consultation"
      className="fluid-section bg-muted"
      aria-labelledby="consultation-title"
      data-choreo
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl" data-choreo-item data-choreo-delay="40">
          <p className="jov-kicker bg-surface text-brand-deep">let’s do this</p>
          <h2
            id="consultation-title"
            className="jov-heading mt-4 text-foreground"
          >
            begin your next celebration.
          </h2>
          <p className="jov-subcopy mt-4 text-foreground/84">
            Tell us about your event and style preferences. We’ll guide you
            through options that beautifully transform your space.
          </p>
          <p className="mt-4 rounded-[1.25rem] border border-border bg-surface px-4 py-3 text-sm text-foreground/86">
            We currently style birthdays, graduations, holiday celebrations, and
            personal milestones in Fredericton and surrounding areas.
          </p>
        </div>

        <div
          className="w-full max-w-2xl rounded-[2rem_1.25rem_2rem_1.5rem] border border-border bg-surface p-6 shadow-[0_14px_35px_rgb(16_35_63/14%)] sm:p-7"
          data-choreo-item
          data-choreo-delay="170"
        >
          <Suspense
            fallback={
              <p className="text-sm text-foreground/80">
                Loading consultation flow...
              </p>
            }
          >
            <ConsultationForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
