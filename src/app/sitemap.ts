import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { tools } from '@/config/tools'
import { listArticles } from '@/lib/posts'

const staticPaths: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/tools/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/about/', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/faq/', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms/', priority: 0.3, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listArticles(200)
  const now = new Date()

  return [
    ...staticPaths.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...tools
      .filter((t) => t.status !== 'planned')
      .map((t) => ({
        url: `${site.url}${t.href}/`,
        lastModified: new Date(t.updated),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}/`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}

export const dynamic = 'force-static'
