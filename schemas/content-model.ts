/** Vendor-neutral CMS contract. Implement in Sanity after project/dataset credentials are created. */
export const contentModel = {
  service: ["title", "slug", "summary", "intro", "benefits", "process", "faq", "seo"],
  sector: ["title", "slug", "summary", "operationalProblems", "solutions", "caseStudies", "faq", "seo"],
  area: ["title", "slug", "intro", "serviceAvailability", "nearbyAreas", "caseStudies", "faq", "seo"],
  caseStudy: ["title", "slug", "sector", "location", "challenge", "method", "result", "gallery", "seo"],
  guide: ["title", "slug", "excerpt", "body", "relatedServices", "relatedAreas", "seo"],
  review: ["reviewer", "organisation", "rating", "quote", "source", "sourceUrl", "publishedAt"],
  faq: ["question", "answer", "category"],
  siteSettings: ["brand", "contact", "social", "navigation", "footer", "defaultSeo"],
} as const;
