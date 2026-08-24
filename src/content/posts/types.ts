/**
 * Articles ship with the repository.
 *
 * There is no CMS on purpose: the site is a static export with no server, and a
 * headless CMS would mean a build-time dependency on a third party for content
 * that changes a few times a month. Posts are TypeScript modules, so a missing
 * field fails the build rather than the page.
 */

export interface ArticleFaq {
  question: string
  /**
   * Answer engines extract best from 40 to 60 words. Kept as data rather than
   * HTML so the visible FAQ and the FAQPage schema are generated from one
   * source and cannot drift apart.
   */
  answer: string
}

export interface Article {
  slug: string
  title: string
  /** One or two sentences. Used on cards and as the meta description. */
  excerpt: string
  /**
   * A standalone 25 to 50 word answer to the article's head query, written so
   * it survives being lifted out of the page with no surrounding context.
   */
  answer: string
  /** ISO date. */
  publishedAt: string
  updatedAt?: string
  readingMinutes: number
  category: string
  author: string
  keywords: string[]
  /** Overrides the title in search results. */
  seoTitle?: string
  /** Overrides the excerpt as the meta description. */
  seoDescription?: string
  /** Trusted HTML authored in this repository, never user input. */
  html: string
  faqs: ArticleFaq[]
}
