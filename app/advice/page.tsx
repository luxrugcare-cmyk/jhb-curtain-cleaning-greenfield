import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata = { title: "Advice & Guides", description: "Practical curtain cleaning, pricing, fabric-care and professional textile-cleaning guidance from JHB Curtain Cleaning.", alternates: { canonical: "/advice" } };

const guides = [
  { href: "/advice/how-on-site-curtain-cleaning-works", title: "How professional on-site curtain cleaning works", body: "Assessment, fabric checks, treatment decisions, the cleaning sequence and when in-place treatment may not be suitable." },
  { href: "/advice/curtain-cleaning-prices", title: "Curtain cleaning prices: what affects the cost?", body: "The practical factors that change a quotation, including fabric, size, condition, access and commercial scheduling." },
  { href: "/advice/can-curtains-be-cleaned-without-taking-them-down", title: "Can curtains be cleaned without taking them down?", body: "When cleaning curtains in place is suitable, why it reduces disruption and when another method may be safer." },
  { href: "/advice/curtain-cleaning-vs-washing-vs-dry-cleaning", title: "Curtain cleaning vs washing vs dry cleaning", body: "Compare the main treatment routes and understand why fabric and construction should determine the method." },
];

export default function Advice() {
  return <>
    <Hero eyebrow="Advice" title="Practical curtain and textile-care guidance." body="Clear guidance on cleaning methods, prices, fabric decisions, maintenance planning and the factors that affect professional service scope."/>
    <section className="section"><div className="shell"><div className="section-heading"><p className="eyebrow">Curtain cleaning guides</p><h2>Make the cleaning decision with better information.</h2></div><div className="feature-grid">{guides.map(guide=><article key={guide.href}><h3>{guide.title}</h3><p>{guide.body}</p><Link href={guide.href}>Read the guide →</Link></article>)}</div></div></section>
    <section className="section section-soft"><div className="shell feature-grid"><article><h3>Fabric guides</h3><p>Sheers, blackout linings, delicate and designer textiles are next in the publishing programme.</p></article><article><h3>Commercial maintenance</h3><p>Scheduling, operational planning and property maintenance guidance for facilities and hospitality teams.</p></article><article><h3>Service decisions</h3><p>Use the guides with the relevant service page and assessment rather than treating general advice as a fabric diagnosis.</p></article></div></section>
  </>;
}
