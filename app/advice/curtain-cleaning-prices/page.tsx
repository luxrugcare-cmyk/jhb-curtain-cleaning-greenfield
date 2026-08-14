import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/curtain-cleaning-prices";
const title = "Curtain Cleaning Prices: What Affects the Cost?";
const description = "Understand the main factors that affect professional curtain cleaning prices in Johannesburg, from fabric and size to access, staining and commercial scheduling.";
const published = "2026-08-14";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function CurtainCleaningPricesGuide() {
  return <>
    <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })}/>
    <JsonLd data={breadcrumbJsonLd([{name:"Home",path:"/"},{name:"Advice",path:"/advice"},{name:title,path}])}/>
    <Hero eyebrow="Pricing guide" title="Curtain cleaning prices: what actually affects the cost?" body="Curtain cleaning is difficult to price accurately from one number alone. Fabric, construction, size, condition, access and the amount of work required all influence a useful quotation."/>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">The short answer</p><h2>Price follows scope.</h2><p>Two properties can have the same number of curtains but require very different levels of work. A lightweight unlined curtain at normal height is not the same job as a tall, interlined, heavily soiled curtain with difficult access. A professional quotation should therefore describe what is being cleaned and the conditions that affect the work.</p><p>For this reason, JHB Curtain Cleaning uses an assessment-led process rather than advertising a single flat rate that may not fit the textile or property.</p></article><aside className="sticky-panel"><p className="eyebrow">Get a useful price</p><h3>Send the property details first.</h3><p>Residential enquiries can include photos. Commercial enquiries capture access, operating hours and site scope.</p><a className="button button-primary" href="/quote">Residential assessment</a><a className="button button-secondary" href="/commercial-assessment">Commercial assessment</a></aside></div></section>
    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Main cost factors</p><h2>What changes the quotation?</h2></div><div className="feature-grid"><article><h3>Fabric and construction</h3><p>Fabric type, linings, coatings, pleats and specialist construction can change the safest method and the time required.</p></article><article><h3>Size and quantity</h3><p>Height, width, fullness and the number of drops or windows affect the total cleaning scope more accurately than room count alone.</p></article><article><h3>Condition and staining</h3><p>Routine dust and general soil differ from oily marks, water staining, heavy handling soil or unknown historic stains. Extra stain work may increase time without guaranteeing complete removal.</p></article><article><h3>Access</h3><p>High windows, furniture, restricted working areas, apartment rules or commercial security procedures can affect setup and working time.</p></article><article><h3>On-site logistics</h3><p>Where suitable, cleaning in place can reduce removal and refitting logistics, but the site still needs enough access and working space for safe treatment.</p></article><article><h3>Commercial scheduling</h3><p>Hotels, offices and facilities may require phased work, after-hours access or coordination around occupied rooms and operating schedules.</p></article></div></div></section>
    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">What a quotation should explain</p><h2>Compare scope, not just the bottom-line figure.</h2><p>When comparing providers, check whether the price covers the same curtains, the same treatment assumptions and the same access conditions. Ask how fragile fabrics, stain treatment, difficult access and additional services are handled.</p><p>A low headline price can be misleading if significant parts of the scope are excluded or only discovered after work begins.</p></article><article><p className="eyebrow">Related reading</p><h2>Understand the method before the price.</h2><p><Link href="/advice/how-on-site-curtain-cleaning-works">How professional on-site curtain cleaning works →</Link></p><p><Link href="/services/curtain-cleaning">Curtain cleaning service →</Link></p></article></div></section>
    <CTASection/>
  </>;
}
