import type { Metadata } from 'next'
import { listArticles } from '@/lib/posts'
import { pageMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/marketing/PageHero'
import { PostCard } from '@/components/marketing/PostCard'
import { WhatsAppCta } from '@/components/marketing/WhatsAppCta'

export const metadata: Metadata = pageMetadata({
  title: 'Blog for Meesho and Indian e-commerce sellers',
  description:
    'Practical guides on shipping labels, packing, returns and running a Meesho supplier account. Written for sellers, not for search engines.',
  path: '/blog',
})

export default async function BlogIndexPage() {
  const posts = await listArticles(60)

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the packing table"
        lede="Guides on labels, packing, returns and the small operational things that quietly eat a seller's day."
      />
      <Container>
        <div className="pb-8">
          {posts.length === 0 ? (
            <div className="rounded-[var(--radius-card)] border border-dashed border-line p-10 text-center">
              <p className="text-[17px] font-semibold">No posts published yet</p>
              <p className="mx-auto mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">
                The first guides are being written. In the meantime, the tools themselves each have a
                full how-to page.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </Container>
      <WhatsAppCta
        title="Want a guide on something specific?"
        body="Tell me what you keep getting stuck on and I will write it up properly."
      />
    </>
  )
}
