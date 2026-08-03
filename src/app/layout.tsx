import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionChoreography } from "@/components/ux/SectionChoreography";
import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const bodyFont = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jovira.ca"),
  title: "Jovira | Event Styling & Decoration in Canada",
  description:
    "Jovira transforms customer-provided venues with elegant, stress-free event styling, balloon décor, and custom backdrop designs across Canada.",
  openGraph: {
    title: "Jovira | Event Styling & Decoration in Canada",
    description:
      "Consultation-led event styling for birthdays, graduations, and seasonal celebrations in Canada.",
    url: "https://www.jovira.ca",
    siteName: "Jovira",
    locale: "en_CA",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Jovira",
  url: "https://www.jovira.ca",
  logo: "https://www.jovira.ca/jovira-mark.svg",
  image: "https://www.jovira.ca/hero-celebration.svg",
  description:
    "Consultation-led event styling and decoration service that transforms customer-provided venues in Canada.",
  email: "hello@jovira.ca",
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Canada",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "CA",
  },
  serviceType: "Event Styling & Decoration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="site-shell min-h-full flex flex-col">
        <SectionChoreography />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}
