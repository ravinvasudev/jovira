import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-screen overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(175deg,rgba(11,22,44,0.72),rgba(11,22,44,0.62)_45%,rgba(11,22,44,0.88))]" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end gap-10 px-[clamp(1.1rem,4vw,4rem)] pb-[clamp(3.2rem,8vh,5.8rem)] pt-28 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
        <div className="max-w-3xl">
          <p className="inline-flex items-center rounded-full border border-[#d4af37]/60 bg-[#0b162c]/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#f9f6f0]">
            Event Styling & Decoration in Canada
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2rem,6.3vw,4.8rem)] font-semibold leading-[1.02] tracking-tight text-[#f9f6f0]"
          >
            We transform your space, you make the memories.
          </h1>

          <p className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.35rem)] leading-[1.65] text-[#f9f6f0]/90">
            Jovira brings stress-free consultation, thoughtful theme planning,
            and elegant setup to your customer-provided venue—so your
            celebration feels beautifully you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#consultation"
              className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3 text-sm font-semibold text-[#0b162c] transition hover:bg-[#e1be4e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Book Consultation
            </Link>
            <Link
              href="#inspiration"
              className="inline-flex items-center justify-center rounded-full border border-[#f9f6f0]/40 bg-[#0b162c]/40 px-7 py-3 text-sm font-semibold text-[#f9f6f0] transition hover:border-brand hover:text-brand"
            >
              View Inspiration
            </Link>
          </div>
        </div>

        <div
          className="fluid-mask relative w-full max-w-xl overflow-hidden border border-white/30 bg-[linear-gradient(145deg,rgba(249,246,240,0.88),rgba(249,246,240,0.65))] p-6 shadow-[0_20px_55px_rgb(11_22_44/35%)]"
          role="img"
          aria-label="Preview placeholder of Jovira’s past event styling moments"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,#fff8de_0,#f7efe1_48%)]" />
          <div className="relative flex flex-wrap gap-4">
            <div className="h-56 rounded-2xl bg-[linear-gradient(140deg,#e8cfbf,#f8f1ec)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                Birthday Styling
              </p>
            </div>
            <div className="h-56 rounded-2xl bg-[linear-gradient(140deg,#f2d9e0,#fff5f2)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                Graduation Themes
              </p>
            </div>
            <div className="h-32 w-full rounded-2xl bg-[linear-gradient(140deg,#efe5dc,#fff)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/65">
                Seasonal Backdrop Concepts
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll to services"
        className="pulse-arrow absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-brand"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
