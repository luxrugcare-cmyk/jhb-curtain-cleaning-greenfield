import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/blind-cleaning-guide";
const title = "Blind Cleaning Guide: Fabric, Roller, Roman and Vertical Blinds";
const description = "A practical blind-cleaning guide covering fabric and fitted blinds, dust, spotting, mechanisms, material limits and when professional assessment is advisable.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function BlindCleaningGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })} />
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])} />
    <Hero eyebrow="Blind cleaning guide" title="Blind cleaning depends on both the material and the mechanism." body="Roller, Roman, vertical and fabric blinds combine textiles or rigid materials with fittings and operating components. Cleaning decisions should protect both the surface and the blind system." />
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Assessment first</p><h2>Identify what the blind is made from.</h2><p>Fabric, coated textiles, vinyl, aluminium, wood-style materials and specialist finishes do not respond to the same treatment. The age and condition of cords, tracks, chains and mechanisms also matter.</p><p>Before wet treatment or spotting, the technician should check for fading, weak fabric, unstable finishes and any existing mechanical problems.</p></article><aside className="sticky-panel"><p className="eyebrow">Related service</p><h3>Blind cleaning assessment.</h3><p>Review the dedicated service page for current suitability factors.</p><Link className="button button-primary" href="/services/blind-cleaning">Explore blind cleaning</Link></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Typical considerations</p><h2>Cleaning method follows blind type.</h2></div><div className="feature-grid"><article><h3>Roller blinds</h3><p>Surface material, coatings and edge condition affect whether more than dry dust removal is advisable.</p></article><article><h3>Roman blinds</h3><p>Fabric folds, linings, rods and cords create a more complex construction that should be inspected carefully.</p></article><article><h3>Vertical blinds</h3><p>Individual louvres can accumulate dust and handling soil, while hooks and tracks need to remain protected.</p></article><article><h3>Delicate or aged blinds</h3><p>Brittle coatings, sun damage or weakened mechanisms can limit how aggressively the blind can be treated.</p></article></div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">What cleaning cannot fix</p><h2>Mechanical wear is not a cleaning problem.</h2><p>Cleaning can improve dust, soil and many surface marks, but it does not repair damaged tracks, broken chains, warped louvres, peeling coatings or permanent sun fading.</p></article><article><p className="eyebrow">Curtains and blinds together</p><h2>Window treatments can be assessed as one scope.</h2><p>Where a property has both curtains and blinds, a combined assessment can reduce duplicated access and planning.</p><p><Link href="/services/curtain-cleaning">Explore curtain cleaning →</Link></p></article></div></section>
    <CTASection />
  </>;
}
