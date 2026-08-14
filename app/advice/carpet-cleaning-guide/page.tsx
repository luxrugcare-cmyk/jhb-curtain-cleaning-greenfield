import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/carpet-cleaning-guide";
const title = "Professional Carpet Cleaning Guide";
const description = "A practical Johannesburg carpet-cleaning guide covering fibre, backing, traffic lanes, spots, drying, expectations and when professional assessment matters.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function CarpetCleaningGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })}/>
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])}/>
    <Hero eyebrow="Carpet cleaning guide" title="Professional carpet cleaning: what changes the right approach?" body="Carpet cleaning is not one universal process. Fibre, backing, installation, soil load, spotting history and drying conditions all affect the safest and most useful treatment plan."/>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Before cleaning</p><h2>Identify the carpet, installation and problem first.</h2><p>Professional carpet cleaning should begin with the material and condition rather than the machine. A fitted synthetic carpet, wool blend, loop-pile product or delicate natural-fibre carpet can respond differently to moisture, chemistry and agitation.</p><p>Backing and installation also matter. The cleaning plan should take account of how the carpet is fitted, the subfloor, ventilation and how quickly the area must return to use.</p></article><aside className="sticky-panel"><p className="eyebrow">Service page</p><h3>Need carpet cleaning in Johannesburg?</h3><p>Review the carpet-cleaning service scope or request an assessment for a residential or commercial property.</p><Link className="button button-primary" href="/services/carpet-cleaning">Carpet cleaning service</Link><Link className="button button-secondary" href="/quote">Residential assessment</Link></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Key variables</p><h2>What affects the cleaning plan?</h2></div><div className="feature-grid"><article><h3>Fibre and construction</h3><p>Fibre type, pile construction and backing influence cleaning chemistry, agitation and moisture decisions.</p></article><article><h3>Traffic lanes</h3><p>Entrances, passages and high-use zones often hold compacted soil differently from low-use areas and may need additional attention.</p></article><article><h3>Spots and staining</h3><p>Food, drink, oils, dyes, pet-related marks and unknown historic spots do not all respond in the same way. Permanent colour change cannot always be reversed.</p></article><article><h3>Drying conditions</h3><p>Ventilation, humidity, airflow, carpet thickness and room use affect drying. A professional scope should set realistic re-use expectations.</p></article></div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Residential carpet cleaning</p><h2>Think room use, not just square metres.</h2><p>Bedrooms, lounges, stairs and passages experience different traffic and soil. A useful quote therefore considers the number and type of areas, furniture access, spotting and whether other textiles such as curtains or upholstery are being cleaned at the same visit.</p><p><Link href="/residential">Explore residential textile care →</Link></p></article><article><p className="eyebrow">Commercial carpet cleaning</p><h2>Access and operating hours affect the scope.</h2><p>Offices, hospitality properties, schools and managed facilities may need work sequenced around occupied areas, access controls and drying windows. The commercial assessment captures those operating constraints before scheduling.</p><p><Link href="/commercial-assessment">Request a commercial site assessment →</Link></p></article></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Expectations</p><h2>Cleaning improves soil; it does not undo every form of damage.</h2><p>Permanent fading, fibre wear, bleaching, dye damage, burns, delamination or old chemical damage are condition issues rather than removable soil. Assessment helps distinguish cleaning potential from permanent change before work begins.</p></div></div></section>
    <CTASection/>
  </>;
}
