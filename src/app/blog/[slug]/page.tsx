import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findArticle, listArticleSlugs } from '@/lib/posts'
import { absoluteUrl, faqSchema, jsonLd, pageMetadata } from '@/lib/seo'
import { site } from '@/config/site'
import { formatDate } from '@/lib/utils'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/ui/Container'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { WhatsAppCta } from '@/components/marketing/WhatsAppCta'

interface Params {
  params: Promise<{ slug: string }>
}

/** Only these slugs exist in the export. Anything else renders the 404 page. */
export const dynamicParams = false

export function generateStaticParams() {
  return listArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const post = findArticle(slug)
  if (!post) {
    return pageMetadata({ title: 'Post not found', description: '', path: `/blog/${slug}`, noIndex: true })
  }

  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    keywords: post.keywords,
  })
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const post = findArticle(slug)
  if (!post) notFound()

  const updated = post.updatedAt ?? post.publishedAt

  return (
    <>
      <JsonLd
        data={jsonLd(
          {
            '@type': 'BlogPosting',
            headline: post.title,
            // The extractable answer doubles as the description an answer
            // engine is most likely to lift.
            description: post.answer,
            abstract: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: updated,
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            author: { '@type': 'Person', name: post.author, url: absoluteUrl('/about') },
            publisher: { '@id': `${site.url}/#organization` },
            isAccessibleForFree: true,
            inLanguage: 'en-IN',
            keywords: post.keywords.join(', '),
            articleSection: post.category,
            wordCount: post.readingMinutes * 200,
          },
          // Generated from the same data the page renders, so the schema can
          // never claim an answer the visitor cannot see.
          faqSchema(post.faqs),
        )}
      />

      <article>
        <Container width="narrow">
          <div className="pt-16 pb-8 sm:pt-24">
            <Link href="/blog/" className="text-[14.5px] font-semibold text-accent hover:underline">
              ← All posts
            </Link>
            <h1 className="mt-6 max-w-[20ch] text-[34px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[46px]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-[14px] text-muted">
              <span className="font-medium text-ink-soft">{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <>
                  <span aria-hidden>·</span>
                  <span>Updated {formatDate(post.updatedAt)}</span>
                </>
              )}
            </div>
          </div>

          {/* Standalone answer block. Written to survive being lifted out of
              the page by an answer engine with no surrounding context. */}
          <div className="rounded-[var(--radius-card)] border border-line bg-card p-5 shadow-[var(--shadow-card)] sm:p-6">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.09em] text-accent">
              Short answer
            </p>
            <p className="text-[17px] leading-[1.6] text-ink">{post.answer}</p>
          </div>

          <div className="prose-page pt-10">
            {/* Authored in this repository, never user supplied. */}
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </Container>

        <Container width="narrow">
          <section className="mt-14 border-t border-line pt-12">
            <h2 className="text-[24px] font-bold tracking-[-0.028em]">
              Frequently asked questions
            </h2>
            <div className="mt-7">
              <FaqAccordion faqs={post.faqs} />
            </div>
          </section>

          <aside className="mt-12 rounded-[var(--radius-card)] border border-line bg-bg-sunk/50 p-6">
            <p className="text-[12px] font-bold uppercase tracking-[0.09em] text-faint">
              About the author
            </p>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">{post.author}</strong> is a software
              engineer who builds{' '}
              <Link href="/tools/" className="font-medium text-accent hover:underline">
                free tools for Indian e-commerce sellers
              </Link>{' '}
              at {site.domain}, including the Meesho Label Sorter described in these guides. He wrote
              the PDF parsing behind it and has spent enough time around small Meesho operations to
              know which parts of dispatch are pure friction. Everything is open source and runs in
              your browser.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              He also builds the tool this article recommends, which is a conflict worth knowing
              about. The tools are free and the manual method is explained first in every guide. See
              the{' '}
              <Link href="/editorial/" className="font-medium text-accent hover:underline">
                editorial policy
              </Link>{' '}
              for how sources and corrections are handled, or message{' '}
              <a
                href={site.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                {site.whatsapp.display}
              </a>{' '}
              to report an error.
            </p>
            <p className="mt-3 text-[13.5px] text-muted">
              Last reviewed {formatDate(updated)}. Written by a single author with no second
              reviewer.
            </p>
          </aside>
        </Container>
      </article>

      <WhatsAppCta />
    </>
  )
}
