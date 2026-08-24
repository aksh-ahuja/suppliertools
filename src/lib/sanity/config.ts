/**
 * Sanity is optional at build time. If the project id is not set the site still
 * builds and the blog renders an honest empty state instead of crashing CI.
 */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01',
} as const

export const sanityEnabled = sanityConfig.projectId.length > 0
