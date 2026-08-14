import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArea } from "@/integrations/sanity/content";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = await getArea(slug);
  return area ? {
    title: area.seo?.title || `Curtain & Textile Care in ${area.title}`,
    description: area.seo?.description || area.summary,
    alternates: { canonical: `/areas/${slug}` },
  } : {};
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const area = await getArea(slug); if (!area) notFound();
  return <><JsonLd data={serviceJsonLd(`Curtain & Textile Care in ${area.title}`, area.summary, `/areas/${slug}`)}/><JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:area.title,path:`/areas/${slug}`}])}/><Hero eyebrow="Service area" title={`On-site textile care in ${area.title}.`} body={area.summary}/><section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Available services</p><h2>Explore services available for properties in this area.</h2></div><ServiceGrid limit={4}/></div></section><CTASection/></>;
}
