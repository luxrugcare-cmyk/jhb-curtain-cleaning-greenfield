import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/mattress-cleaning-guide";
const title = "Mattress Cleaning Guide: What Professional Cleaning Can and Cannot Do";
const description = "A practical Johannesburg mattress-cleaning guide covering inspection, spotting, odour and soil removal, drying expectations, limitations and when replacement or specialist remediation may be more appropriate.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function MattressCleaningGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })} />
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])} />
    <Hero eyebrow="Mattress cleaning guide" title="Professional mattress cleaning starts with condition and expectations." body="Mattress cleaning can improve accumulated soil, many spots and odours, but the correct scope depends on the mattress condition, contamination type and how much moisture the construction can tolerate." />
    <section className="section"><div className="shell content-grid"><article>
      <p className="eyebrow">What is assessed</p><h2>Not every mattress problem is the same.</h2>
      <p>A useful assessment looks at mattress construction, age, staining, general soil, odour, previous treatments and any signs of damage or contamination. These factors affect both the treatment method and what result is realistic.</p>
      <p>Professional cleaning is not a substitute for medical treatment, pest control, mould remediation or replacement of a structurally damaged mattress.</p>
    </article><aside className="sticky-panel"><p className="eyebrow">Need a quote?</p><h3>Send the mattress details.</h3><p>Residential enquiries can include item count, condition and optional photos.</p><Link className="button button-primary" href="/quote">Request a residential quote</Link></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Typical scope</p><h2>What professional cleaning may address.</h2></div><div className="feature-grid">
      <article><h3>General body soil</h3><p>Regular use can leave oils, dust and surface soil that benefit from professional textile cleaning.</p></article>
      <article><h3>Spots and marks</h3><p>Individual marks are assessed before treatment because age, chemistry and fabric colour can affect removal potential.</p></article>
      <article><h3>Odour</h3><p>Cleaning can reduce many odours associated with ordinary use, but persistent odour from deep contamination may require a different response.</p></article>
      <article><h3>Drying conditions</h3><p>Ventilation, room temperature, treatment method and mattress construction all influence drying time.</p></article>
    </div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Important limits</p><h2>Cleaning does not reverse every form of damage.</h2><p>Permanent discolouration, chemical damage, fibre deterioration, deep biological contamination and structural failure may remain after cleaning. Where the issue falls outside normal textile care, the safer recommendation may be specialist remediation or replacement.</p></article><article><p className="eyebrow">Related service</p><h2>Mattress cleaning assessment.</h2><p>The service page explains the practical assessment factors used before treatment.</p><p><Link href="/services/mattress-cleaning">Explore mattress cleaning →</Link></p></article></div></section>
    <CTASection />
  </>;
}
