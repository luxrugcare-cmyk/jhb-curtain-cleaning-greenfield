import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArea } from "@/integrations/sanity/content";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo/metadata";
import { getAreaIntent } from "@/lib/growth/area-intent";

const slugByAreaName: Record<string, string> = {
  Johannesburg: "johannesburg",
  Sandton: "sandton",
  Randburg: "randburg",
  Roodepoort: "roodepoort",
  Fourways: "fourways",
  Midrand: "midrand",
};

const curtainGuides = [
  { href: "/advice/how-on-site-curtain-cleaning-works", label: "How on-site curtain cleaning works" },
  { href: "/advice/curtain-cleaning-prices", label: "What affects curtain cleaning prices" },
  { href: "/advice/can-curtains-be-cleaned-without-taking-them-down", label: "When curtains can be cleaned without taking them down" },
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = await getArea(slug);
  const intent = getAreaIntent(slug);
  return area ? {
    title: normalizeSeoTitle(area.seo?.title, `Curtain & Textile Care in ${area.title}`),
    description: normalizeSeoDescription(area.seo?.description, intent?.intro || area.summary, `Professional on-site curtain and textile care for residential and commercial properties in ${area.title} and surrounding areas.`),
    alternates: { canonical: `/areas/${slug}` },
  } : {};
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = await getArea(slug);
  if (!area) notFound();
  const intent = getAreaIntent(slug);

  return <>
    <JsonLd data={serviceJsonLd(`Curtain & Textile Care in ${area.title}`, intent?.intro || area.summary, `/areas/${slug}`)}/>
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:area.title,path:`/areas/${slug}`}])}/>
    <Hero eyebrow="Service area" title={intent?.title || `On-site textile care in ${area.title}.`} body={intent?.intro || area.summary}/>

    {intent ? <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Local service planning</p><h2>What affects a textile-cleaning visit in {area.title}?</h2></div><div className="feature-grid">{intent.localFactors.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section> : null}

    <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Available services</p><h2>Explore services available for properties in this area.</h2></div><ServiceGrid limit={6}/></div></section>

    {intent ? <section className="section section-soft"><div className="shell content-grid"><article><p className="eyebrow">Curtain cleaning in {area.title}</p><h2>Start with the installed textile and the room conditions.</h2><p>For curtains in {area.title}, assessment covers fabric, lining, condition, staining, installation and access before a cleaning route is recommended. Where suitable, on-site treatment can reduce removal and refitting disruption while keeping the scope tied to the actual textile.</p><p><Link href="/services/curtain-cleaning">Professional curtain cleaning service →</Link></p><p><Link href="/quote">Request a residential curtain assessment →</Link></p><p><Link href="/commercial-assessment">Request a commercial curtain assessment →</Link></p></article><article><p className="eyebrow">Curtain cleaning guidance</p><h2>Understand method, suitability and price before booking.</h2>{curtainGuides.map(guide => <p key={guide.href}><Link href={guide.href}>{guide.label} →</Link></p>)}</article></div></section> : null}

    {intent?.nearby.length ? <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Nearby service areas</p><h2>Continue to related Johannesburg service areas.</h2></div><div className="feature-grid">{intent.nearby.map(name => { const nearbySlug = slugByAreaName[name]; return nearbySlug ? <article key={name}><h3>{name}</h3><p>Review curtain and textile-cleaning planning for properties in {name}.</p><Link href={`/areas/${nearbySlug}`}>Explore {name} service area →</Link></article> : null; })}</div></div></section> : null}

    <CTASection/>
  </>;
}
