import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findArticle, listArticleSlugs } from '@/lib/posts'
import { absoluteUrl, jsonLd, pageMetadata } from '@/lib/seo'
import { site } from '@/config/site'
import { formatDate } from '@/lib/utils'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/ui/Container'
import { PortableBody } from '@/components/marketing/PortableBody'
import { WhatsAppCta } from '@/components/marketing/WhatsAppCta'

interface Params {
  params: Promise<{ slug: string }>
}

/** Only these slugs exist in the export. Anything else renders the 404 page. */
export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await listArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = await findArticle(slug)
  if (!post) {
    return pageMetadata({ title: 'Post not found', description: '', path: `/blog/${slug}`, noIndex: true })
  }

  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    image: post.cover?.url,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    keywords: post.keywords,
  })
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = await findArticle(slug)
  if (!post) notFound()

  return (
    <>
      <JsonLd
        data={jsonLd({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          ...(post.cover?.url ? { image: post.cover.url } : {}),
          author: { '@type': 'Person', name: post.author?.name ?? site.author.name },
          publisher: { '@id': `${site.url}/#organization` },
          isAccessibleForFree: true,
          ...(post.keywords?.length ? { keywords: post.keywords.join(', ') } : {}),
        })}
      />

      <article>
        <Container width="narrow">
          <div className="pt-12 pb-8 sm:pt-16">
            <Link href="/blog/" className="text-[14.5px] font-semibold text-accent hover:underline">
              ← All posts
            </Link>
            <h1 className="mt-5 text-[32px] font-bold leading-[1.14] tracking-[-0.03em] sm:text-[42px]">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-[14px] text-muted">
              {post.author?.name && (
                <span className="font-medium text-ink-soft">{post.author.name}</span>
              )}
              {post.author?.name && <span aria-hidden>·</span>}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.readingMinutes ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.readingMinutes} min read</span>
                </>
              ) : null}
            </div>
          </div>
        </Container>

        {post.cover?.url && (
          <Container>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover.url}
              alt={post.cover.alt ?? ''}
              className="aspect-[16/8] w-full rounded-[var(--radius-card)] border border-line object-cover"
            />
          </Container>
        )}

        <Container width="narrow">
          <div className="prose-page py-12">
            {post.html ? (
              // Authored in this repository, never user supplied.
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            ) : post.body ? (
              <PortableBody value={post.body} />
            ) : null}
          </div>
        </Container>
      </article>

      <WhatsAppCta />
    </>
  )
}
