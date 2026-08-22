import { ChatWidget } from "@/components/chat/ChatWidget";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionChoreography } from "@/components/ux/SectionChoreography";
import { company, companyMetadata } from "@/data/company";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL(company.siteUrl),
  title: companyMetadata.pages.home.title,
  description: companyMetadata.pages.home.description,
  keywords: [
    "Event Styling",
    "Balloon Installation",
    "Grab and Go Services",
    "Event Planning",
    "Party Supplies",
    "Balloons",
    "Decorations",
    "Event Services",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: companyMetadata.openGraph.home.title,
    description: companyMetadata.openGraph.home.description,
    url: company.siteUrl,
    siteName: company.name,
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  url: company.siteUrl,
  logo: `${company.siteUrl}/jovira-mark.svg`,
  image: `${company.siteUrl}/jovira-mark.svg`,
  description: companyMetadata.site.description,
  priceRange: "$$",
  areaServed: [
    {
      "@type": "City",
      name: "Fredericton, New Brunswick, Canada",
    },
    {
      "@type": "Town",
      name: "New Maryland, New Brunswick, Canada",
    },
    {
      "@type": "Town",
      name: "Hanwell, New Brunswick, Canada",
    },
    {
      "@type": "Town",
      name: "Oromocto, New Brunswick, Canada",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CA",
  },
  serviceType: "Event Styling & Balloon Installation",
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
      <head>
        <meta
          name="google-site-verification"
          content="q8_OxU0kDcPDRHFaVlBikj0Wz5cbD9is2A-YMfSHxpQ"
        />
      </head>
      <body className="site-shell min-h-full flex flex-col">
        <SectionChoreography />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ChatWidget />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
