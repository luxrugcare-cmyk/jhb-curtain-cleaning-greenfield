import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "JHB Curtain Cleaning | On-Site Curtain & Textile Care", template: "%s | JHB Curtain Cleaning" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: siteConfig.name, title: siteConfig.name, description: siteConfig.description, url: siteConfig.url },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Analytics/><JsonLd data={localBusinessJsonLd()}/><Header/><main>{children}</main><Footer/><div className="mobile-cta"><a href={`tel:${siteConfig.phoneE164}`}>Call</a><a href={`https://wa.me/${siteConfig.whatsappE164}`}>WhatsApp</a><a href="/quote">Quote</a></div></body></html>;
}
