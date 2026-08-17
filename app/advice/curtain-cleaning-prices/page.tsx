import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { WhyNoPrices } from "@/components/WhyNoPrices";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

const path = "/advice/curtain-cleaning-prices";
const title = "Why We Don't Publish Prices Online | JHB Curtain Cleaning";
const description =
  "Discover why one size fits all doesn't work for curtain cleaning. Free, no-obligation on-site assessments in Johannesburg by Stephen with detailed written quotes.";
const published = "2026-08-14";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
};

export default function CurtainCleaningPricesGuide() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: title,
          description,
          path,
          datePublished: published,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Advice", path: "/advice" },
          { name: "Pricing Guide", path },
        ])}
      />
      <Hero
        eyebrow="Pricing Philosophy"
        title="Why We Don't Publish Prices Online"
        body="Because 'one size fits all' doesn't work for curtains. Here's why we do it differently — and why you'll be glad we do."
        imageSrc="/brand/stitch/curtain-cleaning-hero.png"
        imageAlt="Professional on-site curtain assessment in Johannesburg"
        cardTitle="Free On-Site Assessment"
        cardSubtitle="Stephen visits within 48 hours"
      />

      <section className="section">
        <div className="shell">
          <WhyNoPrices />
        </div>
      </section>

      <section className="section surface">
        <div className="shell content-grid">
          <article>
            <p className="eyebrow">Related Guidance</p>
            <h2>Understand the on-site cleaning method.</h2>
            <p>
              Learn more about how Stephen evaluates your fabric and how our on-site cleaning sequence works without removing your curtains.
            </p>
            <p>
              <Link href="/advice/how-on-site-curtain-cleaning-works">
                How professional on-site curtain cleaning works →
              </Link>
            </p>
          </article>
          <article>
            <p className="eyebrow">Service Scope</p>
            <h2>Explore our specialist services.</h2>
            <p>
              <Link href="/services/curtain-cleaning">Curtain cleaning service →</Link>
            </p>
            <p>
              <Link href="/services/blind-cleaning">Blind cleaning service →</Link>
            </p>
            <p>
              <Link href="/services/upholstery-cleaning">Upholstery cleaning →</Link>
            </p>
          </article>
        </div>
      </section>

      <CTASection />
    </>
  );
}
