import Link from "next/link";
import { TrackedContactLink } from "@/components/analytics/TrackedContactLink";
import { whatsappLink } from "@/integrations/whatsapp/link";
import { siteConfig } from "@/lib/site-config";

export function WhyNoPrices() {
  return (
    <div className="why-no-prices-container">
      {/* Introduction Card */}
      <div className="pricing-manifesto-card">
        <p className="eyebrow">Pricing Philosophy</p>
        <h2>Why We Don’t Publish Prices Online</h2>
        <p className="pricing-lead">
          Because <em>&ldquo;one size fits all&rdquo;</em> doesn&rsquo;t work for curtains. Here&rsquo;s why we do it differently — and why you&rsquo;ll be glad we do.
        </p>

        <blockquote className="pricing-quote">
          &ldquo;Every job genuinely requires a proper assessment first — fabric type, lining construction, track or rod hardware, the cleaning method required, and your specific sector requirements all affect the process and the outcome.&rdquo;
        </blockquote>

        <p>
          Publishing a price without seeing your curtains would mean either overcharging you or cutting corners — and we&rsquo;re not willing to do either.
        </p>
        <p>
          Instead, we offer a completely free, no-obligation on-site assessment. <strong>Stephen personally visits</strong>, evaluates everything properly, and provides a detailed written quote you can trust.
        </p>
        <p>
          Most clients are genuinely surprised by how affordable professional on-site cleaning is compared to replacement or conventional services.
        </p>

        {/* Free Assessment Action Box */}
        <div className="assessment-action-box">
          <div className="assessment-details">
            <span className="badge-highlight">Free · No obligation · Stephen visits within 48 hours</span>
            <div className="assessment-contacts">
              <p><strong>Direct Booking &amp; Quotes (Stephen):</strong></p>
              <ul>
                <li>
                  Call:{" "}
                  <TrackedContactLink event="call_click" placement="pricing_guide" href={`tel:${siteConfig.phoneE164}`}>
                    {siteConfig.phoneDisplay}
                  </TrackedContactLink>
                </li>
                <li>
                  WhatsApp:{" "}
                  <TrackedContactLink
                    event="whatsapp_click"
                    placement="pricing_guide"
                    href={whatsappLink("Hi Stephen, I'd like to book a free on-site curtain evaluation.")}
                  >
                    {siteConfig.whatsappDisplay}
                  </TrackedContactLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="assessment-cta">
            <Link className="button button-primary" href="/quote">
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: What Affects Your Quote */}
      <div className="factors-section">
        <div className="section-heading">
          <p className="eyebrow">Quotation Variables</p>
          <h2>What Affects Your Quote</h2>
        </div>
        <div className="factors-grid">
          <article className="factor-card">
            <span className="factor-icon" role="img" aria-label="Fabric Type">🧵</span>
            <h3>Fabric Type</h3>
            <p>Sheer, lined, blackout, velvet — each requires a different approach and cleaning agent.</p>
          </article>
          <article className="factor-card">
            <span className="factor-icon" role="img" aria-label="Track or Rod Hardware">🏗️</span>
            <h3>Track or Rod Hardware</h3>
            <p>Ceiling tracks, face-fit rods, motorised systems — access affects labour and time.</p>
          </article>
          <article className="factor-card">
            <span className="factor-icon" role="img" aria-label="Sector Requirements">🏢</span>
            <h3>Sector Requirements</h3>
            <p>Hotels, hospitals, offices, and homes each have different standards and scheduling needs.</p>
          </article>
          <article className="factor-card">
            <span className="factor-icon" role="img" aria-label="Size & Quantity">📏</span>
            <h3>Size &amp; Quantity</h3>
            <p>Floor-to-ceiling vs standard height, single panel vs full suite — it all matters.</p>
          </article>
        </div>
      </div>

      {/* Grid: What You Get Instead of a Price List */}
      <div className="value-section">
        <div className="section-heading">
          <p className="eyebrow">The On-Site Standard</p>
          <h2>What You Get Instead of a Price List</h2>
          <p>When Stephen visits for your free assessment, you&rsquo;ll receive:</p>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <span className="value-icon" role="img" aria-label="Detailed Written Quote">📝</span>
            <h3>Detailed Written Quote</h3>
            <p>Itemised breakdown of every item, method, and cost — no surprises.</p>
          </article>
          <article className="value-card">
            <span className="value-icon" role="img" aria-label="Honest Assessment">✅</span>
            <h3>Honest Assessment</h3>
            <p>If something doesn’t need cleaning, Stephen will tell you. No upselling.</p>
          </article>
          <article className="value-card">
            <span className="value-icon" role="img" aria-label="Flexible Scheduling">⏱️</span>
            <h3>Scheduling That Works for You</h3>
            <p>After hours, weekends, or during business — we work around your needs.</p>
          </article>
        </div>
      </div>
    </div>
  );
}
