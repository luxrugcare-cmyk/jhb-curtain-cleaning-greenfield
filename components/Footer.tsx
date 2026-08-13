import Link from "next/link";
import { areas, sectors, services } from "@/lib/site-data";
import { whatsappLink } from "@/integrations/whatsapp/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">JHB</span><span><strong>JHB Curtain Cleaning</strong><small>Specialist on-site textile care</small></span></div>
          <p>Premium residential and commercial textile-care pathways for Johannesburg and Gauteng.</p>
        </div>
        <div><h3>Services</h3>{services.slice(0,6).map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div>
        <div><h3>Commercial</h3>{sectors.slice(0,5).map(s => <Link key={s.slug} href={`/commercial/${s.slug}`}>{s.title}</Link>)}</div>
        <div><h3>Areas</h3>{areas.map(a => <Link key={a} href={`/areas/${a.toLowerCase().replaceAll(" ", "-")}`}>{a}</Link>)}</div>
        <div><h3>Contact</h3><a href="tel:+27750119200">+27 75 011 9200</a><a href={whatsappLink("Hi, I'd like to enquire about your services.")}>WhatsApp us</a><Link href="/contact">Contact</Link><Link href="/quote">Get a quote</Link></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 JHB Curtain Cleaning</span><span>Privacy • POPIA • Terms</span></div>
    </footer>
  );
}
