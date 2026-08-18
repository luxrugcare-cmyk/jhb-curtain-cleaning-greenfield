import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/how-often-should-curtains-be-cleaned";
const title = "How Often Should Curtains Be Cleaned in Johannesburg? | Specialist Guide";
const description = "Learn how often curtains should be professionally cleaned in Johannesburg. Discover how Highveld dry winter dust storms, spring pollen, traffic pollution, and intense UV exposure affect fabric longevity.";
const published = "2026-08-18";

export const metadata: Metadata = { title, description, alternates: { canonical: path } };

export default function HowOftenCleanCurtainsGuide() {
  return (
    <>
      <JsonLd data={articleJsonLd({ headline: title, description, path, datePublished: published })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Advice", path: "/advice" }, { name: "How Often Clean Curtains", path }])} />
      
      <Hero
        eyebrow="Johannesburg Fabric Care Guide"
        title="How Often Should Curtains Be Cleaned in Johannesburg?"
        body="Because curtains act as the primary passive air filter in your home, Johannesburg's distinct climate — from dry winter Highveld dust to spring pollen and intense UV radiation — dictates a different care frequency than other global cities."
      />

      {/* Main Content Grid */}
      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">The General Rule of Thumb</p>
            <h2>The 12-to-18 Month Standard (and Why Gauteng Is Different)</h2>
            <p>
              In moderate climates, standard interior design recommendations suggest deep cleaning residential drapery every 2 to 3 years. However, in <strong>Johannesburg and across Gauteng</strong>, textile specialists recommend professional cleaning every <strong>12 to 18 months</strong> for general living spaces, and every <strong>6 to 12 months</strong> for high-exposure rooms.
            </p>
            <p>
              Curtains continuously trap airborne pollutants, soot from winter wood burners, pollen from spring flowering, and fine red Highveld topsoil blowing in through open windows. Left untreated, these fine particulates settle deep into textile weaves.
            </p>

            <div style={{ background: "#f8fafc", borderLeft: "4px solid #c99c2d", padding: "20px", borderRadius: "0 8px 8px 0", margin: "24px 0" }}>
              <strong style={{ color: "#1a1a1a", fontSize: "1.05rem" }}>The Hidden Threat: Microscopic Abrasion &amp; UV Sun-Bake</strong>
              <p style={{ margin: "8px 0 0", fontSize: "0.95rem", color: "#475569" }}>
                Gauteng has one of the highest UV radiation indexes in the world. When airborne grit and dust settle into curtain fibers, every gust of wind rubs these sharp particles against the sun-weakened yarns like sandpaper. Regular extraction removes this grit before permanent thread breakage occurs.
              </p>
            </div>

            <h2>Factors That Require More Frequent Curtain Cleaning</h2>
            <p>
              You should consider scheduling an on-site assessment sooner (every 6 to 12 months) if your property experiences any of the following:
            </p>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.7", color: "#374151" }}>
              <li><strong>Open Patio / Garden-Facing Doors:</strong> Double-volume lounge drapes adjacent to gardens, swimming pools, or equestrian arenas (e.g., Kyalami, Dainfern, Waterfall).</li>
              <li><strong>Roadside &amp; CBD Exposure:</strong> Proximity to major transit corridors (Sandton CBD, William Nicol / Winnie Mandela Dr, M1 motorway) where diesel particulate settles on window fabrics.</li>
              <li><strong>Allergy, Sinus &amp; Asthma Sufferers:</strong> Curtains accumulate dust mites, pet dander, and grass pollen that are released into the air every time curtains are opened or drawn.</li>
              <li><strong>Kitchen-Adjacent Dining Areas:</strong> Airborne cooking oils and aromas bind to sheer and textured fabrics, turning clear fabrics dull and attracting sticky dust.</li>
              <li><strong>Winter Fireplaces &amp; Heating:</strong> Open wood-burning fireplaces and braai areas release micro-soot that attaches to cold window glass and adjacent drapes.</li>
            </ul>
          </article>

          <aside className="sticky-panel">
            <p className="eyebrow">Professional Assessment</p>
            <h3>Inspect your curtains before fabric degradation starts.</h3>
            <p>
              Stephen visits your home to inspect fabric condition, track stability, and lining health with zero obligation.
            </p>
            <Link className="button button-primary" href="/quote">
              Book Free Residential Assessment →
            </Link>
            <Link className="button button-secondary" href="/advice/curtain-cleaning-prices">
              Why We Don&apos;t Publish Flat Prices →
            </Link>
          </aside>
        </div>
      </section>

      {/* Recommended Cleaning Schedule Table */}
      <section className="section section-soft">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">Cleaning Frequency Schedule</p>
            <h2>Recommended Timelines by Room and Sector</h2>
          </div>
          <div className="feature-grid">
            <article>
              <h3 style={{ color: "#c99c2d" }}>Bedrooms &amp; Guest Rooms</h3>
              <p><strong>Frequency:</strong> Every 12–18 months</p>
              <p>Essential for sleep hygiene, dust mite reduction, and maintaining clean blackout lining integrity without odours.</p>
            </article>
            <article>
              <h3 style={{ color: "#c99c2d" }}>Living &amp; Patio Areas</h3>
              <p><strong>Frequency:</strong> Every 6–12 months</p>
              <p>High foot traffic, open sliding doors, and garden dust exposure make regular in-situ extraction vital for fabric longevity.</p>
            </article>
            <article>
              <h3 style={{ color: "#c99c2d" }}>Hotels &amp; Guest Lodges</h3>
              <p><strong>Frequency:</strong> Every 6–12 months (Phased)</p>
              <p>Scheduled floor-by-floor during morning checkout windows to eliminate room downtime while upholding brand quality.</p>
            </article>
            <article>
              <h3 style={{ color: "#c99c2d" }}>Corporate Boardrooms</h3>
              <p><strong>Frequency:</strong> Every 12 months</p>
              <p>Completed after-hours to remove stale air, dust, and odours from executive suites with full compliance documentation.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Signs Your Curtains Need Cleaning Now */}
      <section className="section">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Visual &amp; Tactile Signals</p>
            <h2>Signs Your Curtains Are Past Due for Professional Care</h2>
            <p>If you observe any of the following symptoms, your curtains require immediate specialist extraction:</p>
            <ol style={{ paddingLeft: "20px", lineHeight: "1.8", color: "#374151" }}>
              <li><strong>Dark or Grimy Pleat Tops:</strong> Dust settling on top headings and folds indicates heavy internal contamination.</li>
              <li><strong>A Stuffy or Musty Odour in the Room:</strong> Especially when morning sunlight heats up window glass and warms the drapes.</li>
              <li><strong>Visible "Graying" on Sheer Fabrics:</strong> Clear voile or linen sheers appearing yellowed or greyed from pollution.</li>
              <li><strong>Allergy Flare-Ups:</strong> Increased sneezing, morning congestion, or coughing when spending time in the room.</li>
              <li><strong>Stiff or Scratchy Fabric Hand:</strong> Accumulated micro-particles stiffening the natural drape and fold memory.</li>
            </ol>
          </article>

          <article>
            <p className="eyebrow">Related Guides</p>
            <h2>Explore Further Curtain Care Guidance</h2>
            <p><Link href="/advice/can-curtains-be-cleaned-without-taking-them-down">Can curtains be cleaned without taking them down? →</Link></p>
            <p><Link href="/advice/how-on-site-curtain-cleaning-works">How professional on-site curtain cleaning works →</Link></p>
            <p><Link href="/advice/curtain-cleaning-vs-washing-vs-dry-cleaning">Curtain cleaning vs washing vs dry cleaning →</Link></p>
            <p><Link href="/services/curtain-cleaning">Explore our on-site curtain cleaning service →</Link></p>
          </article>
        </div>
      </section>

      <CTASection />
    </>
  );
}
