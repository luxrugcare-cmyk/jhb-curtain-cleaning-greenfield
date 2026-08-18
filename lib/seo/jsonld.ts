import { siteConfig } from "@/lib/site-config";

export function masterGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Organization Schema
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: "JHB Curtain Cleaning (Pty) Ltd",
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteConfig.url}/#logo`,
          url: `${siteConfig.url}/brand/stitch/elite-logo.png`,
          caption: "JHB Curtain Cleaning Logo",
        },
        image: `${siteConfig.url}/brand/stitch/curtain-cleaning-hero.png`,
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.facebook,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.phoneE164,
            contactType: "customer support",
            areaServed: "ZA",
            availableLanguage: ["en", "af"],
          },
        ],
      },

      // 2. LocalBusiness / CleaningService Schema
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        url: siteConfig.url,
        telephone: siteConfig.phoneE164,
        email: siteConfig.email,
        priceRange: "$$",
        image: `${siteConfig.url}/brand/stitch/curtain-cleaning-hero.png`,
        logo: `${siteConfig.url}/brand/stitch/elite-logo.png`,
        description: siteConfig.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sandton",
          addressRegion: "Gauteng",
          addressCountry: "ZA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -26.1076,
          longitude: 28.0567,
        },
        areaServed: siteConfig.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "127",
          bestRating: "5",
          worstRating: "1",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:30",
            closes: "17:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "08:00",
            closes: "14:00",
          },
        ],
      },

      // 3. WebSite Schema
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },

      // 4. Primary Service Schemas
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#service-residential`,
        name: "On-Site Residential Curtain Cleaning",
        serviceType: "Curtain and Drapery Cleaning",
        description: "Specialist on-site cleaning of residential drapes, sheers, and double-volume curtains hanging on tracks with zero fabric shrinkage.",
        provider: { "@id": `${siteConfig.url}/#localbusiness` },
        areaServed: { "@type": "AdministrativeArea", name: "Johannesburg & Sandton" },
        termsOfService: "Zero fabric shrinkage guarantee. Cleaned in-situ without taking down.",
      },
      {
        "@type": "Service",
        "@id": `${siteConfig.url}/#service-commercial`,
        name: "Commercial & Hotel Curtain Cleaning",
        serviceType: "Hospitality Drapery Hygiene & SANS 1423 Compliance",
        description: "Zero room downtime curtain cleaning for hotels, guest lodges, and corporate offices with SANS 1423 flame retardancy certification.",
        provider: { "@id": `${siteConfig.url}/#localbusiness` },
        areaServed: { "@type": "AdministrativeArea", name: "Gauteng" },
      },

      // 5. Core FAQPage Schema
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Do I need to take my curtains down before cleaning?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. We clean all curtains, drapes, pelmets, and sheers on-site while hanging on their tracks. You do not need to take them down, unhook brackets, or transport them.",
            },
          },
          {
            "@type": "Question",
            name: "Will on-site curtain cleaning shrink my curtains?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Because our process uses specialized low-moisture micro-extraction without immersion in water or harsh dry cleaning solvents, we provide a 100% Zero Fabric Shrinkage Guarantee.",
            },
          },
          {
            "@type": "Question",
            name: "How does commercial hotel curtain cleaning work without lost room nights?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We execute rapid low-moisture cleaning between 10:00 AM check-out and 14:00 PM check-in turnover. Guest suites are ready for incoming guests the same afternoon with zero lost room revenue.",
            },
          },
        ],
      },
    ],
  };
}

export function localBusinessJsonLd() {
  return masterGraphJsonLd();
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    areaServed: { "@type": "AdministrativeArea", name: "Gauteng" },
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phoneE164,
      image: `${siteConfig.url}/brand/stitch/curtain-cleaning-hero.png`,
    },
    url: new URL(path, siteConfig.url).toString(),
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished = "2026-08-17T00:00:00Z",
  dateModified = "2026-08-18T00:00:00Z",
}: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": new URL(path, siteConfig.url).toString(),
    },
    author: {
      "@type": "Person",
      name: siteConfig.contactPerson,
      jobTitle: "Textile Restoration Specialist",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/brand/stitch/elite-logo.png`,
      },
    },
    datePublished,
    dateModified,
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
