export interface PostAuthor {
  name: string
  role?: string
  image?: SanityImage
}

export interface SanityImage {
  url: string
  alt?: string
  width?: number
  height?: number
  lqip?: string
}

export interface PostSummary {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  readingMinutes?: number
  category?: string
  cover?: SanityImage
  author?: PostAuthor
}

export interface Post extends PostSummary {
  /** Portable Text blocks. Typed loosely because the schema can grow. */
  body: unknown[]
  seoTitle?: string
  seoDescription?: string
  keywords?: string[]
}
