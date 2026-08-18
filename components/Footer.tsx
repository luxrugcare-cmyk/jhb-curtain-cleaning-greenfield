import Link from "next/link";
import Image from "next/image";
import { areas, sectors, services } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink } from "@/integrations/whatsapp/link";
import { TrackedContactLink } from "@/components/analytics/TrackedContactLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand">
            <Image
              src="/brand/stitch/elite-logo.png"
              alt="JHB Curtain Cleaning Elite Logo"
              width={40}
              height={40}
              className="brand-logo-img"
            />
            <span>
              <strong>JHB Curtain Cleaning</strong>
              <small>Specialist on-site textile care</small>
            </span>
          </div>
          <p>
            Premium on-site curtain, blind, upholstery, carpet, mattress and delicate rug care for luxury residences, hotels, corporate suites and healthcare facilities across Johannesburg and Gauteng.
          </p>
          <div style={{ marginTop: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                background: "rgba(226, 190, 88, 0.1)",
                border: "1px solid rgba(226, 190, 88, 0.3)",
                borderRadius: "4px",
                color: "#e2be58",
                fontSize: "12px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <span>📷 Instagram (@curtaincleaningjhb)</span>
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "4px",
                color: "#d4d4d4",
                fontSize: "12px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <span>👍 Facebook Page</span>
            </a>
          </div>
        </div>
        <div>
          <h3>Services</h3>
          {services.slice(0, 6).map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`}>
              {s.title}
            </Link>
          ))}
          <Link href="/services">All Services →</Link>
        </div>
        <div>
          <h3>Commercial</h3>
          {sectors.slice(0, 5).map((s) => (
            <Link key={s.slug} href={`/commercial/${s.slug}`}>
              {s.title}
            </Link>
          ))}
          <Link href="/commercial">Commercial Hub →</Link>
        </div>
        <div>
          <h3>Service Areas</h3>
          {areas.map((a) => (
            <Link key={a} href={`/areas/${a.toLowerCase().replaceAll(" ", "-")}`}>
              {a}
            </Link>
          ))}
          <Link href="/trade">10% Trade Partner Hub</Link>
        </div>
        <div>
          <h3>Direct Contact (Stephen)</h3>
          <TrackedContactLink event="call_click" placement="footer" href={`tel:${siteConfig.phoneE164}`}>
            Call: {siteConfig.phoneDisplay}
          </TrackedContactLink>
          <TrackedContactLink
            event="whatsapp_click"
            placement="footer"
            href={whatsappLink("Hi Stephen, I'd like to book an on-site curtain evaluation.")}
          >
            WhatsApp: {siteConfig.whatsappDisplay}
          </TrackedContactLink>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <Link href="/quote" className="card-link">
            Send Photos For Quote →
          </Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 JHB Curtain Cleaning. All rights reserved.</span>
        <span>Meta Business ID: {siteConfig.social.metaBusinessId} · POPIA Section 69 Compliant</span>
      </div>
    </footer>
  );
}
