import { siteConfig } from "@/lib/site-config";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    logo: `${siteConfig.url}/brand/stitch/elite-logo.png`,
    image: `${siteConfig.url}/brand/stitch/curtain-cleaning-hero.png`,
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ],
    priceRange: "Assessment-based custom quotation",
    areaServed: siteConfig.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    description: siteConfig.description,
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
  };
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
