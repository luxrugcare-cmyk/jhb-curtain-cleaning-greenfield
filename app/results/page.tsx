import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { getPublishedCaseStudies } from "@/integrations/sanity/content";

export const metadata = {
  title: "Curtain & Textile Cleaning Results",
  description: "View how JHB Curtain Cleaning documents residential and commercial project evidence, including property type, textile scope, assessment, cleaning approach and verified outcomes.",
  alternates: { canonical: "/results" },
};

const evidenceFields = [
  { title: "Property and service", body: "Property type, service area and the textile or room scope establish the context for the work." },
  { title: "Textile and condition", body: "Fabric, lining, construction, visible soil, staining and existing damage are recorded before treatment expectations are set." },
  { title: "Assessment decision", body: "The published record should explain why the chosen method was suitable and note any risks or limitations identified before cleaning." },
  { title: "Operational scope", body: "Access, room availability, sequencing and commercial operating constraints are included where they materially affected the project plan." },
  { title: "Documented outcome", body: "Only observable, supportable outcomes should be published. Permanent damage, remaining stains or limitations should not be hidden." },
  { title: "Approved evidence", body: "Photography, client identifiers or quotations are published only when suitable evidence and permission are available." },
];

export default async function Results() {
  const caseStudies = await getPublishedCaseStudies();

  return <>
    <Hero eyebrow="Results" title="Project evidence, documented clearly." body="This page is designed for verifiable residential and commercial case studies. We do not publish invented client stories, unsupported outcomes or placeholder reviews as if they were completed projects."/>

    {caseStudies.length > 0 ? <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Published case studies</p><h2>Approved project records from completed work.</h2><p>These records are displayed only when the case study is explicitly marked as published and publication approval has been confirmed in the content system.</p></div><div className="feature-grid">{caseStudies.map(study => <article key={study.slug}><p className="eyebrow">{[study.propertyType, study.area].filter(Boolean).join(" · ")}</p><h3>{study.title}</h3><p><strong>Service:</strong> {study.service}{study.textile ? ` · ${study.textile}` : ""}</p><p><strong>Initial condition:</strong> {study.initialCondition}</p><p><strong>Assessment:</strong> {study.assessment}</p><p><strong>Approach:</strong> {study.approach}</p>{study.operationalNotes ? <p><strong>Operational notes:</strong> {study.operationalNotes}</p> : null}<p><strong>Documented outcome:</strong> {study.outcome}</p>{study.limitations ? <p><strong>Limitations:</strong> {study.limitations}</p> : null}{study.testimonial?.permissionConfirmed && study.testimonial.quote ? <blockquote><p>“{study.testimonial.quote}”</p>{study.testimonial.attribution ? <footer>— {study.testimonial.attribution}</footer> : null}</blockquote> : null}</article>)}</div></div></section> : null}

    <section className={caseStudies.length > 0 ? "section section-soft" : "section"}><div className="shell content-grid"><article><p className="eyebrow">Evidence standard</p><h2>A useful case study should show more than a before-and-after image.</h2><p>For curtain and textile cleaning, the important details include what was assessed, why a method was chosen, what operating constraints affected the work and what outcome could actually be observed. That context helps future clients compare a real project with their own property rather than relying on a generic testimonial.</p>{caseStudies.length === 0 ? <p>No case study is currently published from the content system. Completed project stories will appear here only after the supporting scope and publication approval are recorded.</p> : <p>Additional completed project stories will be added only when the supporting scope and publication approval are recorded.</p>}</article><aside className="info-panel"><h3>Have a similar requirement?</h3><p>Use the appropriate assessment path and describe the property, textile, access and required scope. Photos can be included with a residential enquiry where useful.</p><Link className="button button-primary" href="/quote">Residential assessment</Link><Link className="button button-secondary" href="/commercial-assessment">Commercial assessment</Link></aside></div></section>

    <section className="section section-soft"><div className="shell"><div className="section-heading"><p className="eyebrow">Case-study model</p><h2>What every published project record should contain.</h2><p>The structure below is ready for real evidence without requiring fabricated clients, claims or results.</p></div><div className="feature-grid">{evidenceFields.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>

    <section className="section"><div className="shell content-grid"><article><p className="eyebrow">Curtain-cleaning evidence</p><h2>Start with the service and assessment criteria.</h2><p>Current curtain-cleaning guidance explains how fabric, lining, dye stability, existing damage, staining and access influence whether an on-site route is appropriate.</p><p><Link href="/services/curtain-cleaning">Explore curtain cleaning →</Link></p><p><Link href="/advice/how-on-site-curtain-cleaning-works">See how on-site curtain cleaning works →</Link></p></article><article><p className="eyebrow">Johannesburg coverage</p><h2>Compare the local planning context.</h2><p>Area pages cover Johannesburg, Sandton, Randburg, Roodepoort, Fourways and Midrand without inventing local landmarks, travel times or unsupported project history.</p><p><Link href="/areas/johannesburg">Curtain and textile cleaning in Johannesburg →</Link></p><p><Link href="/areas/sandton">Curtain and textile cleaning in Sandton →</Link></p></article></div></section>

    <CTASection/>
  </>;
}
