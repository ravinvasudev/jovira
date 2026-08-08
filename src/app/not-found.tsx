import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#event-styling", label: "Packages" },
  { href: "/#balloon-installation", label: "Installation" },
  { href: "/#inspiration", label: "Inspiration" },
  { href: "/#consultation", label: "Book Consultation" },
] as const;

export default function NotFound() {
  return (
    <div className="w-full pt-20 md:pt-24 bg-ink">
      <section
        className="fluid-section bg-ink text-surface"
        aria-labelledby="not-found-title"
      >
        <div className="max-w-4xl">
          <p className="jov-kicker border-surface/35 bg-surface/10 text-sun">
            404 error
          </p>
          <h1 id="not-found-title" className="jov-heading mt-4 text-surface">
            this page could not be found.
          </h1>
          <p className="jov-subcopy mt-4 text-surface/82">
            The link may be out of date, or the page might have moved. Use one
            of the shortcuts below to continue planning your celebration.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm border border-surface/30 bg-surface/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-surface transition hover:border-sun hover:text-sun"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
