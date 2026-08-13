export const sanityEnv = { projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-13" };
export const isSanityConfigured = Boolean(sanityEnv.projectId);
