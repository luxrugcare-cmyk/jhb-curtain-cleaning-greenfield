import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/llms-full.txt", "/.well-known/llms.txt"],
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Google-Extended",
          "Amazonbot",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "Bytespider",
          "CCBot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/.well-known/llms.txt", "/guides/"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
