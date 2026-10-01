import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "@/components/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, jsonLd } from "@/lib/seo";
import "./globals.css";

const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const bodoni = localFont({
  src: "../node_modules/@fontsource-variable/bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2",
  variable: "--font-bodoni",
  display: "swap",
  weight: "400 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  openGraph: { type: "website", siteName: "HKFitness", locale: "en_AE", images: [{ url: "/images/hk-campaign.jpeg", width: 1280, height: 853, alt: "HKFitness apparel collection" }] },
  twitter: { card: "summary_large_image" },
  title: "HKFitness | Performance in every thread",
  description: "Performance in every thread. Discover HKFitness apparel for women and men.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "HKFitness", url: SITE_URL, logo: `${SITE_URL}/images/hk-logo.jpeg`, slogan: "Performance in every thread" }, { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "HKFitness", url: SITE_URL, publisher: { "@id": `${SITE_URL}/#organization` } }] }) }} />
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
