const env = (name: string, fallback = "") => (process.env[name] || fallback).trim();

export const sanityEnv = {
  projectId: env("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: env("NEXT_PUBLIC_SANITY_DATASET", "production"),
  apiVersion: env("NEXT_PUBLIC_SANITY_API_VERSION", "2026-08-13"),
};

export const isSanityConfigured = Boolean(sanityEnv.projectId);
