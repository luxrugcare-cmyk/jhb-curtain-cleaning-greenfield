import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSector } from "@/integrations/sanity/content";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { CTASection } from "@/components/CTASection";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const sector = await getSector(slug); return sector ? { title: sector.seo?.title || sector.title, description: sector.seo?.description || sector.summary } : {}; }

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const sector = await getSector(slug); if (!sector) notFound();
  return <><Hero commercial eyebrow="Commercial sector" title={sector.title} body={sector.summary}/><TrustStrip/><section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Operational template</p><h2>A commercial page must answer procurement questions.</h2></div><div className="feature-grid"><article><h3>Scope</h3><p>What textiles, rooms, public areas and locations are involved?</p></article><article><h3>Scheduling</h3><p>What operating hours, shutdown limitations and access rules apply?</p></article><article><h3>Method</h3><p>How will fabric suitability, pre-treatment, cleaning and inspection be controlled?</p></article><article><h3>Evidence</h3><p>What verified case studies, documentation and compliance evidence support the proposal?</p></article></div></div></section><CTASection/></>;
}
