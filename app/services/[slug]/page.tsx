import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getService } from "@/integrations/sanity/content";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { ProcessSteps } from "@/components/ProcessSteps";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo/metadata";
import { serviceIntent } from "@/lib/growth/service-intent";

const serviceGuides: Record<string, Array<{ href: string; title: string; body: string }>> = {
  "curtain-cleaning": [
    { href: "/advice/how-on-site-curtain-cleaning-works", title: "How on-site curtain cleaning works", body: "Understand assessment, suitability, treatment decisions and the in-place cleaning sequence." },
    { href: "/advice/curtain-cleaning-prices", title: "Curtain cleaning prices", body: "See which fabric, size, access and site factors affect a quotation." },
    { href: "/advice/can-curtains-be-cleaned-without-taking-them-down", title: "Cleaning without taking curtains down", body: "Learn when in-place curtain cleaning is suitable and when another route may be safer." },
  ],
  "blind-cleaning": [{ href: "/advice/blind-cleaning-guide", title: "Blind cleaning guide", body: "Compare material, mechanism and access considerations for fitted blinds." }],
  "upholstery-cleaning": [{ href: "/advice/upholstery-couch-cleaning-guide", title: "Upholstery and couch cleaning guide", body: "Review fabric identification, stain expectations, cushions and drying factors." }],
  "mattress-cleaning": [{ href: "/advice/mattress-cleaning-guide", title: "Mattress cleaning guide", body: "Review textile-hygiene scope, inspection, soil, odour and drying considerations." }],
  "carpet-cleaning": [{ href: "/advice/carpet-cleaning-guide", title: "Carpet cleaning guide", body: "Understand fibre, backing, traffic lanes, spotting and drying considerations before service." }],
  "rug-care": [{ href: "/advice/rug-and-persian-rug-cleaning-guide", title: "Rug and Persian rug cleaning guide", body: "Understand fibre, dyes, construction, fringe and why higher-value rugs require cautious assessment." }],
};

const curtainFaqs = [
  { question: "Can curtains be cleaned while they are still hanging?", answer: "Many curtains can be cleaned in place, but not every curtain is suitable. Fabric, lining, dye stability, existing damage, staining, height and access should be assessed before an on-site method is recommended." },
  { question: "Do all curtains qualify for on-site cleaning?", answer: "No. Fragile construction, unstable dyes, severe existing damage, unsuitable linings or other condition concerns can make another treatment route safer. Suitability should be confirmed before cleaning begins." },
  { question: "What affects curtain cleaning prices?", answer: "Price is influenced by fabric and construction, curtain size and fullness, quantity, condition and staining, access, height and any residential or commercial scheduling requirements. A useful quotation should match the actual scope rather than rely on one flat rate." },
  { question: "Is on-site curtain cleaning the same as dry cleaning?", answer: "Not necessarily. Curtain cleaning describes the service outcome, while the treatment method should be selected for the specific textile and site conditions. Assessment determines which approach is appropriate." },
  { question: "How is curtain fabric suitability assessed?", answer: "Assessment considers fabric and lining construction, colour stability, previous damage or shrinkage, sun exposure, stains, installation and access. The objective is to choose a method that protects the textile while addressing removable soil." },
  { question: "Can residential and commercial curtain cleaning be assessed differently?", answer: "Yes. Residential assessments focus on the rooms, textiles, access and household scope. Commercial assessments also capture operating hours, room sequencing, access controls, repeat-service requirements and other site constraints." },
];

const curtainAreas = [
  { href: "/areas/johannesburg", label: "Curtain cleaning in Johannesburg" },
  { href: "/areas/sandton", label: "Curtain cleaning in Sandton" },
  { href: "/areas/randburg", label: "Curtain cleaning in Randburg" },
  { href: "/areas/roodepoort", label: "Curtain cleaning in Roodepoort" },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return {
    title: normalizeSeoTitle(service.seo?.title, service.title),
    description: normalizeSeoDescription(service.seo?.description, service.summary, "Professional on-site assessment and textile care for homes and commercial properties across Johannesburg."),
    alternates: { canonical: `/services/${slug}` },
    robots: service.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const intent = serviceIntent[slug];
  const guides = serviceGuides[slug] || [];
  const isCurtain = slug === "curtain-cleaning";

  return <>
    <JsonLd data={serviceJsonLd(service.title, service.summary, `/services/${slug}`)} />
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: service.title, path: `/services/${slug}` }])} />
    {isCurtain ? <JsonLd data={faqJsonLd(curtainFaqs)} /> : null}
    <Hero eyebrow={service.heroEyebrow || "Specialist service"} title={service.title} body={service.summary} />
    <TrustStrip />

    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Service detail</p><h2>Assess suitability before choosing the method.</h2><p>{service.intro || intent?.lead || "The assessment considers the textile, installation, condition and property requirements before the service approach is discussed."}</p>{service.suitableFor?.length ? <div className="info-panel"><h3>Suitable for</h3><ul className="check-list">{service.suitableFor.map((item: string) => <li key={item}>{item}</li>)}</ul></div> : intent ? <div className="info-panel"><h3>Common requests</h3><ul className="check-list">{intent.commonRequests.map(item => <li key={item}>{item}</li>)}</ul></div> : null}</article><aside className="sticky-panel"><p className="eyebrow">Assessment</p><h3>Need this service?</h3><p>Choose the assessment that matches the property. Residential and commercial enquiries use separate workflows.</p><a className="button button-primary" href="/quote">Residential assessment</a><a className="button button-secondary" href="/commercial-assessment">Commercial site assessment</a></aside></div></section>

    {intent ? <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Before cleaning</p><h2>What affects the recommended approach?</h2><p>The safest method depends on the textile and its condition rather than the service name alone.</p></div><div className="feature-grid">{intent.decisionPoints.map(item => <article key={item}><h3>{item}</h3><p>This is checked during assessment so the proposed scope matches the material, installation and site conditions.</p></article>)}</div></div></section> : null}

    {isCurtain ? <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Johannesburg service areas</p><h2>Explore curtain cleaning by priority service area.</h2><p>These area pages explain local access and property-planning considerations without changing the underlying fabric-assessment process.</p></div><div className="feature-grid">{curtainAreas.map(area => <article key={area.href}><h3>{area.label}</h3><p>Review how residential and commercial curtain-cleaning visits are planned for this part of the Johannesburg service area.</p><Link href={area.href}>View local curtain-cleaning information →</Link></article>)}</div></div></section> : null}

    {guides.length ? <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Related guidance</p><h2>Read the service-specific guides before requesting treatment.</h2></div><div className="feature-grid">{guides.map(guide => <article key={guide.href}><h3>{guide.title}</h3><p>{guide.body}</p><Link href={guide.href}>Read the guide →</Link></article>)}</div></div></section> : null}

    {isCurtain ? <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Curtain cleaning FAQ</p><h2>Common questions before an assessment.</h2></div><div className="feature-grid">{curtainFaqs.map(item => <article key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></div></section> : null}

    <ProcessSteps />
    {intent?.related.length ? <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Related textile care</p><h2>Services often considered together.</h2></div><div className="feature-grid">{intent.related.map(item => <article key={item.slug}><h3>{item.label}</h3><p>Review the service scope and assessment considerations before deciding what should be included in the visit.</p><Link href={`/services/${item.slug}`}>Explore {item.label.toLowerCase()} →</Link></article>)}</div></div></section> : null}
    <CTASection />
  </>;
}
