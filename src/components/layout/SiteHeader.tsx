import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#packages", label: "Packages" },
  { href: "#inspiration", label: "Inspiration" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-[clamp(0.8rem,3vw,2.4rem)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <div className="flex w-full items-center justify-between rounded-full border border-white/25 bg-[#0b162c]/70 px-4 py-3 shadow-[0_18px_40px_rgb(11_22_44/40%)] backdrop-blur md:px-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-[#f9f6f0] sm:text-2xl"
        >
          Jovira
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#f9f6f0]/90 transition hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#consultation"
          className="inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-xs font-semibold text-[#0b162c] transition hover:bg-[#e1be4e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
