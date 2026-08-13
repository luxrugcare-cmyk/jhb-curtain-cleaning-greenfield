import { createClient } from "next-sanity";
import { sanityEnv, isSanityConfigured } from "./env";
export const sanityClient = isSanityConfigured ? createClient({ ...sanityEnv, useCdn: true, perspective: "published" }) : null;
export async function sanityFetch<T>(query:string, params:Record<string,unknown>={}){ return sanityClient ? sanityClient.fetch<T>(query, params, { next:{revalidate:300} }) : null; }
