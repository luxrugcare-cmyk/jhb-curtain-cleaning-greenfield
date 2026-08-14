import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/curtain-cleaning-vs-washing-vs-dry-cleaning";
const title = "Curtain Cleaning vs Washing vs Dry Cleaning";
const description = "Compare professional on-site curtain cleaning, washing and off-site dry cleaning. The safest choice depends on fabric, lining, construction, condition and installation.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function CurtainMethodsGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })}/>
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])}/>
    <Hero eyebrow="Method comparison" title="Curtain cleaning vs washing vs dry cleaning." body="There is no single best method for every curtain. The right route depends on the fabric, lining, construction, condition, installation and the result you are trying to achieve."/>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">The key principle</p><h2>Choose the method after identifying the textile.</h2><p>Labels can be useful, but professional assessment also considers age, sun exposure, previous cleaning, dye stability, linings, trims and the way the curtain has been installed. A method that works for one synthetic curtain may be unsuitable for a lined natural-fibre curtain or an older textile with weakened seams.</p><p>The comparison below is therefore about practical differences rather than a universal ranking.</p></article><aside className="sticky-panel"><p className="eyebrow">Unsure which route applies?</p><h3>Assess first.</h3><p>We evaluate whether an on-site approach is appropriate before recommending treatment.</p><a className="button button-primary" href="/quote">Residential assessment</a><a className="button button-secondary" href="/commercial-assessment">Commercial assessment</a></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Comparison</p><h2>How the main approaches differ.</h2></div><div className="feature-grid"><article><h3>Professional on-site cleaning</h3><p>Suitable curtains remain installed. This can reduce removal and refitting disruption. The method must be matched to fabric and site conditions, and not every stain or textile is suitable.</p></article><article><h3>Washing</h3><p>Water-based washing may suit some washable curtains, but dimensional change, dye movement, lining behaviour and finishing requirements must be considered before using it.</p></article><article><h3>Off-site dry cleaning</h3><p>Some textiles or constructions may be sent to a specialist facility. This introduces removal, transport and refitting but can be appropriate when in-place treatment is not suitable.</p></article><article><h3>DIY spot cleaning</h3><p>Small home treatments can sometimes create rings, colour loss or local damage if chemistry and moisture are not compatible with the fabric. Test cautiously and follow manufacturer guidance.</p></article></div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Questions to ask</p><h2>What determines the safer route?</h2><ul className="check-list"><li>What is the face fabric and lining?</li><li>Is the fabric sun-damaged, brittle or weakened?</li><li>Are dyes, coatings or finishes stable?</li><li>Has the curtain been cleaned before?</li><li>What type of staining or soiling is present?</li><li>Can the curtain be safely removed and refitted if necessary?</li><li>How much disruption can the property accommodate?</li></ul></article><article><p className="eyebrow">Related reading</p><h2>Continue the decision process.</h2><p><Link href="/advice/can-curtains-be-cleaned-without-taking-them-down">Can curtains be cleaned without taking them down? →</Link></p><p><Link href="/advice/curtain-cleaning-prices">What affects curtain cleaning prices? →</Link></p><p><Link href="/services/curtain-cleaning">Curtain cleaning service →</Link></p></article></div></section>
    <CTASection/>
  </>;
}
