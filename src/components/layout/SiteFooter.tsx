import Link from "next/link";

const quickLinks = [
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#inspiration", label: "Inspiration" },
  { href: "#consultation", label: "Book Consultation" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[#d4af37]/30 bg-[#0b162c] text-[#f9f6f0]">
      <div className="fluid-section flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <h2 className="text-xl font-semibold text-brand">Jovira</h2>
          <p className="mt-3 text-sm leading-6 text-[#f9f6f0]/85">
            We style meaningful celebrations with warm, elegant details so your
            family and guests can enjoy every moment.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f9f6f0]/65">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[#f9f6f0]/88 transition hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#f9f6f0]/65">
            Contact
          </h3>
          <address className="mt-4 space-y-2 text-sm not-italic text-[#f9f6f0]/88">
            <p>Email: hello@jovira.ca</p>
            <p>Phone: +1 (000) 000-0000</p>
            <p>Serving celebrations across Canada</p>
          </address>
        </div>
      </div>

      <div className="border-t border-[#d4af37]/25 px-[clamp(1.1rem,4vw,4rem)] py-5 text-xs text-[#f9f6f0]/70">
        <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jovira. All rights reserved.</p>
          <p>
            We decorate customer-provided venues. Venue rentals are not
            included.
          </p>
        </div>
      </div>
    </footer>
  );
}
