import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSector } from "@/integrations/sanity/content";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { CTASection } from "@/components/CTASection";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = await getSector(slug);
  return sector ? {
    title: sector.seo?.title || sector.title,
    description: sector.seo?.description || sector.summary,
    alternates: { canonical: `/commercial/${slug}` },
  } : {};
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const sector = await getSector(slug); if (!sector) notFound();
  return <><Hero commercial eyebrow="Commercial sector" title={sector.title} body={sector.summary}/><TrustStrip/><section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Planning the service</p><h2>Define scope, access and scheduling before work begins.</h2></div><div className="feature-grid"><article><h3>Scope</h3><p>Identify the textiles, rooms, public areas and locations involved.</p></article><article><h3>Scheduling</h3><p>Consider operating hours, access rules and any periods that must remain undisturbed.</p></article><article><h3>Method</h3><p>Assess fabric suitability, treatment requirements and the cleaning sequence for the site.</p></article><article><h3>Follow-up</h3><p>Use the site assessment to capture the operational details needed for a useful service discussion.</p></article></div></div></section><CTASection/></>;
}
