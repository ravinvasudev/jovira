import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  description:
    "Consultation-led event styling and decoration service that transforms customer-provided venues in Canada.",
  areaServed: "Canada",
  serviceType: "Event Styling & Decoration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="site-shell min-h-full flex flex-col">
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
