import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SectionChoreography } from "@/components/ux/SectionChoreography";
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
  metadataBase: new URL("https://www.jovira.ca"),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/logo.jpeg", sizes: "180x180", type: "image/jpeg" }],
  },
  title:
    "Jovira | Event Styling & Balloon Decoration in and around Fredericton, New Brunswick, Canada",
  description:
    "Jovira transforms customer-provided venues with elegant, stress-free event styling, balloon décor, and custom backdrop designs in and around Fredericton, New Brunswick, including Oromocto, New Maryland, Hanwell.",
  keywords: [
    "Event Styling",
    "Balloon Decoration",
    "Grab and Go Services",
    "Event Planning",
    "Fredericton",
    "Oromocto",
    "New Maryland",
    "Hanwell",
    "New Brunswick",
    "Canada",
  ],
  alternates: {
    canonical: "/",
  },
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
    title:
      "Jovira | Event Styling & Balloon Decoration in and around Fredericton, New Brunswick, Canada",
    description:
      "Consultation-led event styling for birthdays, graduations, and seasonal celebrations in and around Fredericton, New Brunswick, including Oromocto, New Maryland, Hanwell.",
    url: "https://www.jovira.ca",
    siteName: "Jovira",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Jovira event styling and balloon decoration services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Jovira | Event Styling & Balloon Decoration in and around Fredericton, New Brunswick, Canada",
    description:
      "Consultation-led event styling for birthdays, graduations, and seasonal celebrations in and around Fredericton, New Brunswick, including Oromocto, New Maryland, Hanwell.",
    images: ["/logo.jpeg"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Jovira",
  url: "https://www.jovira.ca",
  logo: "https://www.jovira.ca/jovira-mark.svg",
  image: "https://www.jovira.ca/jovira-mark.svg",
  description:
    "Consultation-led event styling and decoration service that transforms customer-provided venues in and around Fredericton, New Brunswick, including Oromocto, New Maryland, Hanwell.",
  // email: "hello@jovira.ca",
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
  serviceType: "Event Styling & Balloon Decoration",
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
        <Analytics />
      </body>
    </html>
  );
}
