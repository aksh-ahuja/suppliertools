/**
 * Articles that ship with the repo.
 *
 * The blog is powered by Sanity, but a brand new site with an empty CMS is bad
 * for both readers and search engines. These posts are authored in the codebase,
 * merged with whatever Sanity returns, and can be moved into the CMS later
 * without changing any URLs.
 */
export interface LocalPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  readingMinutes: number
  category: string
  keywords: string[]
  author: string
  /** Trusted HTML authored in this repo, never user input. */
  html: string
}
