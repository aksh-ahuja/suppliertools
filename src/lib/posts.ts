import { getPost, getPostSlugs, getPosts } from '@/lib/sanity/queries'
import { localPosts, getLocalPost } from '@/content/posts'
import type { PostSummary } from '@/lib/sanity/types'

/**
 * The blog reads from two places: Sanity for anything published through the
 * CMS, and the repo for the seed articles. Sanity always wins on a slug clash,
 * so a post can be moved into the CMS later without breaking its URL.
 */

export interface Article extends PostSummary {
  /** Portable Text from Sanity. */
  body?: unknown[]
  /** Trusted HTML from a repo article. */
  html?: string
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
}

function localToSummary(slug: string): PostSummary & { html: string; keywords: string[] } {
  const post = getLocalPost(slug)!
  return {
    _id: `local-${post.slug}`,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt ?? post.publishedAt,
    readingMinutes: post.readingMinutes,
    category: post.category,
    author: { name: post.author },
    html: post.html,
    keywords: post.keywords,
  }
}

export async function listArticles(limit = 60): Promise<PostSummary[]> {
  const fromSanity = await getPosts(limit)
  const sanitySlugs = new Set(fromSanity.map((p) => p.slug))
  const fromRepo = localPosts
    .filter((p) => !sanitySlugs.has(p.slug))
    .map((p) => localToSummary(p.slug))

  return [...fromSanity, ...fromRepo]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit)
}

export async function findArticle(slug: string): Promise<Article | null> {
  const fromSanity = await getPost(slug)
  if (fromSanity) return fromSanity
  if (getLocalPost(slug)) return localToSummary(slug)
  return null
}

export async function listArticleSlugs(): Promise<string[]> {
  const fromSanity = await getPostSlugs()
  const all = new Set([...fromSanity, ...localPosts.map((p) => p.slug)])
  return [...all]
}
