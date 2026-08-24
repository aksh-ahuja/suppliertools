import { articles } from '@/content/posts'
import type { Article } from '@/content/posts/types'

/** Newest first. */
export function listArticles(limit = 60): Article[] {
  return [...articles]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, limit)
}

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function listArticleSlugs(): string[] {
  return articles.map((a) => a.slug)
}

export type { Article }
