import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata = { title: "Advice & Guides", description: "Practical curtain, mattress, upholstery, blind and textile-cleaning guidance from JHB Curtain Cleaning.", alternates: { canonical: "/advice" } };

const guides = [
  { href: "/advice/how-on-site-curtain-cleaning-works", title: "How professional on-site curtain cleaning works", body: "Assessment, fabric checks, treatment decisions, the cleaning sequence and when in-place treatment may not be suitable." },
  { href: "/advice/curtain-cleaning-prices", title: "Curtain cleaning prices: what affects the cost?", body: "The practical factors that change a quotation, including fabric, size, condition, access and commercial scheduling." },
  { href: "/advice/can-curtains-be-cleaned-without-taking-them-down", title: "Can curtains be cleaned without taking them down?", body: "When cleaning curtains in place is suitable, why it reduces disruption and when another method may be safer." },
  { href: "/advice/curtain-cleaning-vs-washing-vs-dry-cleaning", title: "Curtain cleaning vs washing vs dry cleaning", body: "Compare the main treatment routes and understand why fabric and construction should determine the method." },
  { href: "/advice/mattress-cleaning-guide", title: "Mattress cleaning guide", body: "Inspection, soil and odour treatment, drying expectations, limitations and when normal textile cleaning is not the right response." },
  { href: "/advice/upholstery-couch-cleaning-guide", title: "Upholstery and couch cleaning guide", body: "Fabric identification, stain expectations, cushions, drying and the factors that change a sofa-cleaning plan." },
  { href: "/advice/blind-cleaning-guide", title: "Blind cleaning guide", body: "Roller, Roman, vertical and fabric blind cleaning decisions, including material and mechanism considerations." },
];

export default function Advice() {
  return <>
    <Hero eyebrow="Advice" title="Practical curtain and textile-care guidance." body="Clear guidance on cleaning methods, prices, fabric decisions, maintenance planning and the factors that affect professional service scope."/>
    <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Cleaning guides</p><h2>Build the right service decision before requesting treatment.</h2></div><div className="feature-grid">{guides.map(guide=><article key={guide.href}><h3>{guide.title}</h3><p>{guide.body}</p><Link href={guide.href}>Read the guide →</Link></article>)}</div></div></section>
    <section className="section section-soft"><div className="shell feature-grid"><article><h3>Curtain authority</h3><p>Use the curtain guides together with the <Link href="/services/curtain-cleaning">curtain-cleaning service page</Link> and the relevant location page.</p></article><article><h3>Adjacent textile services</h3><p>Mattress, upholstery and blind guides now connect higher-volume cleaning searches into the same assessment-led service architecture.</p></article><article><h3>Commercial maintenance</h3><p>Facilities, offices and hospitality teams can move directly into the <Link href="/commercial-assessment">commercial assessment</Link> when access, sequencing or repeat maintenance matters.</p></article></div></section>
  </>;
}
