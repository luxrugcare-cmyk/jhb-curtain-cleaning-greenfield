import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/can-curtains-be-cleaned-without-taking-them-down";
const title = "Can Curtains Be Cleaned Without Taking Them Down?";
const description = "Yes, many curtains can be professionally cleaned while hanging, but fabric, lining, condition and installation must be assessed first. Learn when on-site cleaning is suitable.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function NoRemovalCurtainCleaningGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })}/>
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])}/>
    <Hero eyebrow="Curtain cleaning guide" title="Can curtains be cleaned without taking them down?" body="Often, yes. Suitable curtains can be professionally cleaned while they remain installed, which can reduce removal, transport and refitting. Suitability still depends on the textile and its condition."/>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">The practical answer</p><h2>Cleaning in place is a method decision, not a promise for every curtain.</h2><p>On-site curtain cleaning is valuable because it can keep the curtain on its track or rod during treatment. That is particularly useful for large installations, fitted interiors, occupied homes and commercial properties where removing many curtains creates disruption.</p><p>However, a technician should first inspect the fabric, lining, dye stability, previous damage, staining and installation. A curtain that is brittle from sun exposure, structurally weak or made from an unsuitable specialist textile may require another route.</p></article><aside className="sticky-panel"><p className="eyebrow">Check suitability</p><h3>Start with an assessment.</h3><p>Photos help with initial residential triage, but final method selection depends on the actual textile and site conditions.</p><a className="button button-primary" href="/quote">Residential assessment</a><a className="button button-secondary" href="/commercial-assessment">Commercial assessment</a></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">When it works well</p><h2>Why cleaning curtains while hanging can make sense.</h2></div><div className="feature-grid"><article><h3>Less handling</h3><p>Suitable curtains do not need to be unhooked, folded, transported and reinstalled simply to carry out routine professional cleaning.</p></article><article><h3>Lower room disruption</h3><p>Homes, hotel rooms, offices and public spaces can often remain easier to manage when window treatments stay installed.</p></article><article><h3>Large or fitted installations</h3><p>Tall drops, multiple windows and fitted tracks can make removal and refitting a substantial part of the job.</p></article><article><h3>Commercial sequencing</h3><p>For businesses, rooms or areas can be scheduled in phases around access and operating requirements.</p></article></div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">When removal may still be necessary</p><h2>Not every curtain should be treated in place.</h2><p>Severe fabric weakness, unstable dyes, unusual coatings, specialist embellishment, major contamination or certain construction methods can make on-site treatment inappropriate. Existing water damage or building moisture may also need to be resolved before textile cleaning is considered.</p><p>The correct professional answer is sometimes “do not clean this in place.” Protecting the textile is more important than forcing one method.</p></article><article><p className="eyebrow">Related reading</p><h2>See the full process.</h2><p><Link href="/advice/how-on-site-curtain-cleaning-works">How professional on-site curtain cleaning works →</Link></p><p><Link href="/advice/curtain-cleaning-prices">What affects curtain cleaning prices? →</Link></p><p><Link href="/services/curtain-cleaning">Curtain cleaning service →</Link></p></article></div></section>
    <CTASection/>
  </>;
}
