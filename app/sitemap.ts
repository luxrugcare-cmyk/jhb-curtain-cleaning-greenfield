import type { MetadataRoute } from "next";
import { services, sectors, areas } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/residential",
    "/commercial",
    "/services",
    "/results",
    "/advice",
    "/advice/how-on-site-curtain-cleaning-works",
    "/advice/curtain-cleaning-prices",
    "/advice/can-curtains-be-cleaned-without-taking-them-down",
    "/advice/curtain-cleaning-vs-washing-vs-dry-cleaning",
    "/advice/mattress-cleaning-guide",
    "/advice/upholstery-couch-cleaning-guide",
    "/advice/blind-cleaning-guide",
    "/advice/carpet-cleaning-guide",
    "/advice/rug-and-persian-rug-cleaning-guide",
    "/about",
    "/contact",
    "/quote",
    "/commercial-assessment",
    "/privacy",
  ];
  const dynamicPaths = [
    ...services.map(s => `/services/${s.slug}`),
    ...sectors.map(s => `/commercial/${s.slug}`),
    ...areas.map(a => `/areas/${a.toLowerCase().replaceAll(" ", "-")}`),
  ];
  return [...staticPaths, ...dynamicPaths].map(path => ({
    url: new URL(path || "/", siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: path === "" || path.startsWith("/advice/") ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : path === "/services" || path.startsWith("/services/") || path.startsWith("/commercial/")
          ? 0.8
          : path.startsWith("/advice/")
            ? 0.7
            : 0.6,
  }));
}
