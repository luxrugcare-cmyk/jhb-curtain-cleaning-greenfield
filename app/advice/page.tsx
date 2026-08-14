import { Hero } from "@/components/Hero";

export const metadata = { title: "Advice & Guides", alternates: { canonical: "/advice" } };

export default function Advice() {
  return <><Hero eyebrow="Advice" title="Practical curtain and textile-care guidance." body="Guidance on fabrics, cleaning decisions, maintenance planning and the factors that can affect service scope."/><section className="section"><div className="shell feature-grid"><article><h3>Curtain care</h3><p>Cleaning frequency, dust, stains and fabric-specific considerations.</p></article><article><h3>Fabric guides</h3><p>Sheers, blackout linings, delicate and designer textiles.</p></article><article><h3>Commercial maintenance</h3><p>Scheduling, operational planning and property maintenance.</p></article><article><h3>Pricing factors</h3><p>Understand the variables that can affect assessment and quotation.</p></article></div></section></>;
}
