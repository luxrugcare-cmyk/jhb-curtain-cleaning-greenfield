import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { TrackedContactLink } from "@/components/analytics/TrackedContactLink";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "JHB Curtain Cleaning | On-Site Curtain & Textile Care Johannesburg",
    template: "%s | JHB Curtain Cleaning",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/brand/stitch/social-card.png",
        width: 1200,
        height: 630,
        alt: "JHB Curtain Cleaning - On-Site Luxury Fabric & Curtain Care Johannesburg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/brand/stitch/social-card.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Analytics />
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="mobile-cta">
          <TrackedContactLink
            event="call_click"
            placement="mobile_cta"
            href={`tel:${siteConfig.phoneE164}`}
          >
            Call
          </TrackedContactLink>
          <TrackedContactLink
            event="whatsapp_click"
            placement="mobile_cta"
            href={`https://wa.me/${siteConfig.whatsappE164}`}
          >
            WhatsApp
          </TrackedContactLink>
          <a href="/quote">Quote</a>
        </div>
      </body>
    </html>
  );
}
