import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/rug-and-persian-rug-cleaning-guide";
const title = "Rug & Persian Rug Cleaning Guide";
const description = "A practical guide to rug and Persian rug cleaning covering fibre, dyes, construction, fringe, age, value, spotting and specialist-care decisions.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function RugCleaningGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })}/>
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])}/>
    <Hero eyebrow="Rug care guide" title="Rug and Persian rug cleaning starts with identification." body="A rug should not automatically be treated like a small carpet. Fibre, dyes, construction, age, fringe and value all influence whether normal on-site cleaning or specialist off-site care is the safer route."/>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Assessment first</p><h2>Identify fibre, dyes and construction before cleaning.</h2><p>Machine-made synthetic area rugs can have very different cleaning tolerances from wool, silk, hand-knotted Persian or Oriental rugs. Even rugs that look similar can use different dyes, foundations, backing systems or fringe construction.</p><p>Existing wear, colour movement, previous repairs and historic staining should be documented before any cleaning method is recommended.</p></article><aside className="sticky-panel"><p className="eyebrow">Rug care</p><h3>Need a rug assessed?</h3><p>Review the rug-care service page for the factors used to decide whether normal cleaning or a specialist pathway is appropriate.</p><Link className="button button-primary" href="/services/rug-care">Rug care service</Link><Link className="button button-secondary" href="/quote">Residential assessment</Link></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Persian and Oriental rugs</p><h2>Higher-value or delicate rugs require greater caution.</h2></div><div className="feature-grid"><article><h3>Dye stability</h3><p>Some dyes can migrate or bleed when exposed to inappropriate moisture, chemistry or dwell time. Colourfastness should not be assumed.</p></article><article><h3>Foundation and knots</h3><p>Hand-knotted construction, foundation fibres and overall structural condition affect handling and treatment choices.</p></article><article><h3>Fringe</h3><p>Fringe can be weaker or more stained than the body of the rug. Aggressive treatment can damage already fragile fibres.</p></article><article><h3>Age and repairs</h3><p>Older rugs may contain worn areas, previous repairs or weakened sections that change what is safe to attempt.</p></article></div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">On-site or off-site?</p><h2>The correct location depends on the rug.</h2><p>Some robust rugs can be treated as part of a normal textile-cleaning visit. Delicate, unstable, heavily contaminated or higher-value rugs may need a more controlled specialist process. The assessment should decide that before treatment, not after a problem occurs.</p></article><article><p className="eyebrow">Stains and odours</p><h2>Not every historic mark can be safely removed.</h2><p>Unknown stains, dye damage, bleaching, pet-related contamination and previous DIY chemistry can limit the achievable result. Protecting the rug takes priority over aggressive stain chasing.</p></article></div></section>
    <section className="section section-soft"><div className="shell content-grid"><article><p className="eyebrow">Johannesburg rug cleaning</p><h2>Combine rug assessment with the wider property scope where useful.</h2><p>Rugs are often assessed alongside carpets, curtains and upholstery when a home or managed property needs a coordinated textile-care plan.</p><p><Link href="/services/carpet-cleaning">Explore carpet cleaning →</Link></p></article><article><p className="eyebrow">Commercial properties</p><h2>Hospitality and managed spaces may need inventory-based planning.</h2><p>Where multiple rugs or textile types are involved, the commercial assessment can capture location, access, condition and sequencing before a maintenance plan is discussed.</p><p><Link href="/commercial-assessment">Request a commercial site assessment →</Link></p></article></div></section>
    <CTASection/>
  </>;
}
