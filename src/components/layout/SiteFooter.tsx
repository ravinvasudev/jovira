import { JoviraLogo } from "@/components/brand/JoviraLogo";
import { SectionDivider } from "@/components/ux/SectionDivider";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const quickLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#event-styling", label: "Packages" },
  { href: "/#inspiration", label: "Inspiration" },
] as const;

const quickLinks2 = [
  { href: "/about", label: "About Us" },
  { href: "/policies", label: "Policies" },
  { href: "/faqs", label: "FAQs" },
] as const;

const socialLinks = [
  {
    href: "https://www.instagram.com/madebyjovira/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/madebyjovira/",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://api.whatsapp.com/send/?text&username=madebyjovira&type=username&app_absent=0",
    label: "WhatsApp",
    Icon: FaWhatsapp,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-surface">
      <SectionDivider
        variant="drape"
        from="bg-muted"
        to="bg-ink"
        flip
        className="relative z-10"
      />

      <div className="fluid-section relative flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <JoviraLogo
            variant="footer"
            showWordmark={false}
            showTagline={true}
          />
        </div>

        <div className="grid grid-cols-3 gap-0 sm:gap-10 md:gap-15 lg:gap-20">
          <nav aria-label="Footer primary links">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sun">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-surface/85 transition hover:text-sun"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer policy links">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sun">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {quickLinks2.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-surface/85 transition hover:text-sun"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-sun">
              Say Hello
            </h2>

            <ul
              className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              aria-label="Jovira social media"
            >
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={label} className="flex items-center">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit Jovira on ${label}`}
                    className="inline-flex items-center gap-2 rounded-full border border-surface/25 px-3 py-1.5 text-surface/90 transition hover:border-sun hover:text-sun sm:h-9 sm:w-9 sm:justify-center sm:gap-0 sm:px-0 sm:py-0"
                  >
                    <Icon aria-hidden="true" size={17} />
                    <span className="text-xs font-medium sm:hidden">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="jov-gutter relative border-t border-surface/15 py-6 text-xs text-surface/70">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} JOVIRA Celebrations. All rights
            reserved.
          </p>
          <p className="max-w-lg md:text-right">
            JOVIRA styles and decorates venues provided by customers. We do not
            offer venue rentals yet.
          </p>
        </div>
      </div>
    </footer>
  );
}
