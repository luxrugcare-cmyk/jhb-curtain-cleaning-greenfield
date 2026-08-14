import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/upholstery-couch-cleaning-guide";
const title = "Upholstery and Couch Cleaning Guide";
const description = "A practical guide to professional couch and upholstery cleaning: fabric checks, stain expectations, cushions, drying, delicate textiles and when cleaning should be limited or avoided.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function UpholsteryCouchCleaningGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })} />
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])} />
    <Hero eyebrow="Upholstery guide" title="Couch and upholstery cleaning depends on the fabric, construction and type of soil." body="A sofa may combine face fabric, backing, foam, trims, removable cushions and previous treatments. Those details should be checked before deciding how much moisture, agitation or spotting is appropriate." />
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Start with the textile</p><h2>Fabric identification changes the cleaning plan.</h2><p>Synthetic woven upholstery, natural fibres, velvet-style fabrics, delicate trims and coated materials can respond differently to moisture and chemistry. Colour stability, previous cleaning and existing wear are also relevant.</p><p>A professional assessment should identify obvious risks before aggressive stain treatment begins.</p></article><aside className="sticky-panel"><p className="eyebrow">Need an assessment?</p><h3>Residential or commercial?</h3><Link className="button button-primary" href="/quote">Residential quote</Link><Link className="button button-secondary" href="/commercial-assessment">Commercial assessment</Link></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Common decision factors</p><h2>What affects the service scope.</h2></div><div className="feature-grid"><article><h3>Fabric and colour stability</h3><p>Textile type and dye behaviour affect chemical strength, moisture and agitation choices.</p></article><article><h3>Cushion construction</h3><p>Loose cushions, fixed backs, feather or foam fillings can change drying and handling requirements.</p></article><article><h3>Stains and body oils</h3><p>Food, drink, grease, ink, pet marks and general body soil do not all respond to the same spotting process.</p></article><article><h3>Wear and sun damage</h3><p>Cleaning can remove soil but cannot restore worn fibres, fading or permanent physical damage.</p></article></div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Drying and use</p><h2>Plan for realistic drying conditions.</h2><p>Drying depends on fabric, filling, ventilation, room conditions and treatment method. Heavily upholstered furniture should not be assumed to be immediately ready for normal use after every cleaning method.</p></article><article><p className="eyebrow">Related service</p><h2>Professional upholstery cleaning.</h2><p><Link href="/services/upholstery-cleaning">Explore upholstery cleaning →</Link></p></article></div></section>
    <CTASection />
  </>;
}
