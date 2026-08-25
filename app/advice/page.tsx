import Link from "next/link";
import { Hero } from "@/components/Hero";

export const metadata = {
  title: "Advice & Textile Cleaning Guides | JHB Curtain Cleaning",
  description: "Practical curtain, blackout drapery, hotel maintenance, carpet, rug, mattress, upholstery and blind-cleaning guidance for Johannesburg homes and commercial properties.",
  alternates: { canonical: "/advice" },
};

const guides = [
  {
    href: "/advice/how-often-should-curtains-be-cleaned",
    title: "How often should curtains be cleaned in Johannesburg?",
    body: "Highveld dry winter dust storms, seasonal pollen, traffic pollution, and intense UV exposure: understand the ideal cleaning frequency for Gauteng homes and businesses.",
  },
  {
    href: "/advice/cleaning-blackout-lined-delicate-curtains",
    title: "Cleaning blackout, lined and delicate velvet curtains safely",
    body: "Protecting thermal foam backings, preventing acrylic coating breakdown, velvet pile care, and avoiding differential shrinkage on luxury interlined drapery.",
  },
  {
    href: "/advice/hotel-curtain-cleaning-maintenance-guide",
    title: "The hotel GM's guide to in-room curtain hygiene & rapid turnover",
    body: "Eliminating room downtime, executive housekeeping scheduling, preserving SANS 1423 flame retardancy, and achieving same-day room turnover.",
  },
  {
    href: "/advice/how-on-site-curtain-cleaning-works",
    title: "How professional on-site curtain cleaning works",
    body: "Assessment, fabric checks, treatment decisions, the cleaning sequence and when in-place treatment may not be suitable.",
  },
  {
    href: "/advice/curtain-cleaning-prices",
    title: "Why we don't publish prices online",
    body: "Because 'one size fits all' doesn't work for curtains. Understand why Stephen personally visits for a free, detailed written assessment.",
  },
  {
    href: "/advice/can-curtains-be-cleaned-without-taking-them-down",
    title: "Can curtains be cleaned without taking them down?",
    body: "When cleaning curtains in place is suitable, why it reduces disruption and when another method may be safer.",
  },
  {
    href: "/advice/curtain-cleaning-vs-washing-vs-dry-cleaning",
    title: "Curtain cleaning vs washing vs dry cleaning",
    body: "Compare the main treatment routes and understand why fabric and construction should determine the method.",
  },
  {
    href: "/advice/carpet-cleaning-guide",
    title: "Professional carpet cleaning guide",
    body: "Fibre, backing, traffic lanes, spots, drying and the variables that change a professional carpet-cleaning plan.",
  },
  {
    href: "/advice/rug-and-persian-rug-cleaning-guide",
    title: "Rug and Persian rug cleaning guide",
    body: "Fibre, dyes, construction, fringe, age, value and the decision between normal and specialist rug care.",
  },
  {
    href: "/advice/mattress-cleaning-guide",
    title: "Mattress cleaning guide",
    body: "Inspection, soil and odour treatment, drying expectations, limitations and when normal textile cleaning is not the right response.",
  },
  {
    href: "/advice/upholstery-couch-cleaning-guide",
    title: "Upholstery and couch cleaning guide",
    body: "Fabric identification, stain expectations, cushions, drying and the factors that change a sofa-cleaning plan.",
  },
  {
    href: "/advice/blind-cleaning-guide",
    title: "Blind cleaning guide",
    body: "Roller, Roman, vertical and fabric blind cleaning decisions, including material and mechanism considerations.",
  },
];

export default function Advice() {
  return (
    <>
      <Hero
        eyebrow="Specialist Advice &amp; Guides"
        title="Practical Textile-Cleaning Guidance."
        body="Clear, authoritative guidance on curtain care, delicate fabric preservation, hospitality turnaround workflows, carpet maintenance, and professional assessment decisions across Johannesburg."
      />
      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Curtain &amp; Textile Knowledge Base</p>
            <h2>Make Informed Textile Decisions Before Requesting Service</h2>
          </div>
          <div className="feature-grid">
            {guides.map((guide) => (
              <article key={guide.href}>
                <div style={{ fontSize: "0.75rem", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                  <time dateTime="2026-08-18">Updated August 2026</time> · Verified Guide
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.3rem", lineHeight: 1.35 }}>
                  {guide.title}
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.6 }}>{guide.body}</p>
                <Link href={guide.href} style={{ fontWeight: 600, color: "#c99c2d", display: "inline-block", marginTop: "8px" }}>
                  Read the full guide →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="shell feature-grid">
          <article>
            <h3>Curtain Authority</h3>
            <p>
              Use the curtain guides together with the <Link href="/services/curtain-cleaning">curtain-cleaning service page</Link> and our <Link href="/results">verified project results</Link>.
            </p>
          </article>
          <article>
            <h3>Carpet &amp; Rug Care</h3>
            <p>
              Explore dedicated guidance for <Link href="/services/carpet-cleaning">fitted carpets</Link> and <Link href="/services/rug-care">Persian &amp; Oriental rug restoration</Link>.
            </p>
          </article>
          <article>
            <h3>Commercial Operations</h3>
            <p>
              Facilities managers and hospitality teams can request an on-site evaluation directly through the <Link href="/commercial-assessment">commercial assessment portal</Link>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
