import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService } from "@/integrations/sanity/content";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = await getService(slug); if (!service) return {};
  return {
    title: normalizeSeoTitle(service.seo?.title, service.title),
    description: normalizeSeoDescription(
      service.seo?.description,
      service.summary,
      "Professional on-site assessment and textile care for homes and commercial properties across Johannesburg.",
    ),
    alternates: { canonical: `/services/${slug}` },
    robots: service.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = await getService(slug); if (!service) notFound();
  return <><JsonLd data={serviceJsonLd(service.title, service.summary, `/services/${slug}`)}/><JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:service.title,path:`/services/${slug}`}])}/><Hero eyebrow={service.heroEyebrow || "Specialist service"} title={service.title} body={service.summary}/><TrustStrip/><section className="section"><div className="shell content-grid"><article><p className="eyebrow">Service detail</p><h2>Assess suitability before choosing the method.</h2><p>{service.intro || "The assessment considers the textile, installation, condition and property requirements before the service approach is discussed."}</p>{service.suitableFor?.length ? <div className="info-panel"><h3>Suitable for</h3><ul className="check-list">{service.suitableFor.map((item:string)=><li key={item}>{item}</li>)}</ul></div> : null}</article><aside className="sticky-panel"><p className="eyebrow">Assessment</p><h3>Need this service?</h3><p>Use the residential assessment, or the commercial site assessment if this is for a business property.</p><a className="button button-primary" href="/quote">Get an assessment</a></aside></div></section><ProcessSteps/><CTASection/></>;
}
