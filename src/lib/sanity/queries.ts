import { sanityFetch } from './client'
import type { Post, PostSummary } from './types'

const imageFragment = `{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip
}`

const summaryFields = `
  _id,
  title,
  "slug": slug.current,
  "excerpt": coalesce(excerpt, ""),
  publishedAt,
  "updatedAt": _updatedAt,
  readingMinutes,
  "category": category->title,
  "cover": cover ${imageFragment},
  "author": author->{ name, role, "image": image ${imageFragment} }
`

const postsQuery = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    | order(publishedAt desc)[0...$limit] { ${summaryFields} }
`

const postQuery = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${summaryFields},
    body,
    seoTitle,
    seoDescription,
    keywords
  }
`

const slugsQuery = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
`

export function getPosts(limit = 50): Promise<PostSummary[]> {
  return sanityFetch<PostSummary[]>(postsQuery, { limit }, [])
}

export function getPost(slug: string): Promise<Post | null> {
  return sanityFetch<Post | null>(postQuery, { slug }, null)
}

export function getPostSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(slugsQuery, {}, [])
}
