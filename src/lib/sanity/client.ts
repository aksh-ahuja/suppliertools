import { createClient, type SanityClient } from '@sanity/client'
import { sanityConfig, sanityEnabled } from './config'

let cached: SanityClient | null = null

export function sanityClient(): SanityClient | null {
  if (!sanityEnabled) return null
  if (!cached) {
    cached = createClient({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset,
      apiVersion: sanityConfig.apiVersion,
      // The site is a static export, so every query runs once at build time.
      useCdn: true,
      perspective: 'published',
    })
  }
  return cached
}

/** Runs a GROQ query, returning the fallback when Sanity is not configured. */
export async function sanityFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  const client = sanityClient()
  if (!client) return fallback
  try {
    return await client.fetch<T>(query, params)
  } catch (error) {
    // A missing dataset should not take the whole build down.
    console.warn('[sanity] query failed, using fallback:', error)
    return fallback
  }
}
