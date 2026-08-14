import { createClient } from "@sanity/client";
import { sanityEnv, isSanityConfigured } from "./env";

const readToken = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = isSanityConfigured
  ? createClient({
      ...sanityEnv,
      useCdn: !readToken,
      perspective: "published",
      token: readToken || undefined,
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
