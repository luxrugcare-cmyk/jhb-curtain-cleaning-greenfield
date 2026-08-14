import { createClient } from "@sanity/client";
import { sanityEnv, isSanityConfigured } from "./env";

// Published Sanity content is intentionally read through the public dataset/CDN.
// The production dataset has been verified to allow anonymous published-content
// reads, so the website does not depend on a runtime bearer token. Studio/schema
// deployment and content-writing credentials remain separate and private.
export const sanityClient = isSanityConfigured
  ? createClient({
      ...sanityEnv,
      useCdn: true,
      perspective: "published",
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!sanityClient) return null;

  try {
    return await sanityClient.fetch<T>(query, params, { next: { revalidate: 300 } });
  } catch (error) {
    const statusCode =
      typeof error === "object" && error !== null && "statusCode" in error
        ? String((error as { statusCode?: unknown }).statusCode ?? "unknown")
        : "unknown";

    console.error(`Sanity content fetch failed (status ${statusCode}); using site fallback content.`);
    return null;
  }
}
