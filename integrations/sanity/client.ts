import { createClient } from "next-sanity";
import { sanityEnv, isSanityConfigured } from "./env";

const readToken = process.env.SANITY_API_READ_TOKEN;
const projectId = "g5y9wcb1";

export const sanityClient = isSanityConfigured
  ? createClient({
      ...sanityEnv,
      projectId,
      useCdn: !readToken,
      perspective: "published",
      token: readToken || undefined,
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
) {
  return sanityClient
    ? sanityClient.fetch<T>(query, params, { next: { revalidate: 300 } })
    : null;
}
