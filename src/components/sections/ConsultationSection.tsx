import { ConsultationForm } from "@/components/consultation/ConsultationForm";

export function ConsultationSection() {
  return (
    <section
      id="consultation"
      className="fluid-section relative overflow-hidden bg-[#0b162c]"
      aria-labelledby="consultation-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_5%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_88%_92%,rgba(212,175,55,0.12),transparent_28%)]" />

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <h2
            id="consultation-title"
            className="text-[clamp(1.9rem,4.2vw,3.4rem)] font-semibold tracking-tight text-[#f9f6f0]"
          >
            Book Your Consultation
          </h2>
          <p className="mt-3 text-[clamp(1rem,2vw,1.2rem)] leading-8 text-[#f9f6f0]/86 sm:text-lg">
            Tell us about your event and style preferences. We’ll guide you
            through décor options that beautifully transform your
            customer-provided venue.
          </p>
          <p className="mt-4 rounded-[1.35rem] border border-[#d4af37]/30 bg-[#13213f]/65 px-4 py-3 text-sm text-[#f9f6f0]/86">
            We currently style birthdays, graduations, holiday celebrations, and
            personal milestones across Canada.
          </p>
        </div>

        <div className="w-full max-w-2xl rounded-[2rem_1.25rem_2rem_1.5rem] border border-[#d4af37]/30 bg-[#f9f6f0] p-6 shadow-[0_16px_45px_rgb(11_22_44/45%)] sm:p-7">
          <ConsultationForm />
        </div>
      </div>
    </section>
  );
}
