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

export default function BlogIndexPage() {
  const posts = listArticles(60)

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the packing table"
        lede="Guides on labels, packing, returns and the small operational things that quietly eat a seller's day."
      />
      <Container>
        <div className="pb-8">
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </Container>
      <WhatsAppCta
        title="Want a guide on something specific?"
        body="Tell me what you keep getting stuck on and I will write it up properly."
      />
    </>
  )
}
