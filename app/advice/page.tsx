import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata = { title: "Advice & Textile Cleaning Guides", description: "Practical curtain, carpet, rug, mattress, upholstery and blind-cleaning guidance for Johannesburg homes and commercial properties.", alternates: { canonical: "/advice" } };

const guides = [
  { href: "/advice/how-on-site-curtain-cleaning-works", title: "How professional on-site curtain cleaning works", body: "Assessment, fabric checks, treatment decisions, the cleaning sequence and when in-place treatment may not be suitable." },
  { href: "/advice/curtain-cleaning-prices", title: "Why we don't publish prices online", body: "Because 'one size fits all' doesn't work for curtains. Understand why Stephen personally visits for a free, detailed written assessment." },
  { href: "/advice/can-curtains-be-cleaned-without-taking-them-down", title: "Can curtains be cleaned without taking them down?", body: "When cleaning curtains in place is suitable, why it reduces disruption and when another method may be safer." },
  { href: "/advice/curtain-cleaning-vs-washing-vs-dry-cleaning", title: "Curtain cleaning vs washing vs dry cleaning", body: "Compare the main treatment routes and understand why fabric and construction should determine the method." },
  { href: "/advice/carpet-cleaning-guide", title: "Professional carpet cleaning guide", body: "Fibre, backing, traffic lanes, spots, drying and the variables that change a professional carpet-cleaning plan." },
  { href: "/advice/rug-and-persian-rug-cleaning-guide", title: "Rug and Persian rug cleaning guide", body: "Fibre, dyes, construction, fringe, age, value and the decision between normal and specialist rug care." },
  { href: "/advice/mattress-cleaning-guide", title: "Mattress cleaning guide", body: "Inspection, soil and odour treatment, drying expectations, limitations and when normal textile cleaning is not the right response." },
  { href: "/advice/upholstery-couch-cleaning-guide", title: "Upholstery and couch cleaning guide", body: "Fabric identification, stain expectations, cushions, drying and the factors that change a sofa-cleaning plan." },
  { href: "/advice/blind-cleaning-guide", title: "Blind cleaning guide", body: "Roller, Roman, vertical and fabric blind cleaning decisions, including material and mechanism considerations." },
];

export default function Advice() {
  return <>
    <Hero eyebrow="Advice" title="Practical textile-cleaning guidance." body="Clear guidance on curtain, carpet, rug, upholstery, mattress and blind cleaning methods, pricing factors and professional assessment decisions."/>
    <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Cleaning guides</p><h2>Build the right service decision before requesting treatment.</h2></div><div className="feature-grid">{guides.map(guide=><article key={guide.href}><h3>{guide.title}</h3><p>{guide.body}</p><Link href={guide.href}>Read the guide →</Link></article>)}</div></div></section>
    <section className="section section-soft"><div className="shell feature-grid"><article><h3>Curtain authority</h3><p>Use the curtain guides together with the <Link href="/services/curtain-cleaning">curtain-cleaning service page</Link> and the relevant Johannesburg area page.</p></article><article><h3>Carpet and rug authority</h3><p>Use the new <Link href="/services/carpet-cleaning">carpet-cleaning</Link> and <Link href="/services/rug-care">rug-care</Link> clusters for fitted carpets, area rugs and Persian or Oriental rug assessment.</p></article><article><h3>Commercial maintenance</h3><p>Facilities, offices and hospitality teams can move directly into the <Link href="/commercial-assessment">commercial assessment</Link> when access, sequencing or repeat maintenance matters.</p></article></div></section>
  </>;
}
