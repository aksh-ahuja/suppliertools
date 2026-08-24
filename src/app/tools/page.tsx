import type { Metadata } from 'next'
import { tools } from '@/config/tools'
import { absoluteUrl, jsonLd, pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/marketing/PageHero'
import { ToolRow } from '@/components/marketing/ToolCard'
import { WhatsAppCta } from '@/components/marketing/WhatsAppCta'

export const metadata: Metadata = pageMetadata({
  title: 'All tools for Indian sellers',
  description:
    'Every free tool on SupplierTools, in one list. Shipping label sorting for Meesho today, more marketplaces on the way.',
  path: '/tools',
})

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={jsonLd({
          '@type': 'ItemList',
          name: 'Free tools for Indian e-commerce sellers',
          itemListElement: tools.map((tool, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: tool.name,
            description: tool.tagline,
            url: absoluteUrl(tool.href),
          })),
        })}
      />
      <PageHero
        eyebrow="Tools"
        title="Everything on the site"
        lede="Each one opens straight away, needs no account and never uploads your files."
      />
      <Container>
        <ul className="border-t border-line pb-8">
          {tools.map((tool) => (
            <ToolRow key={tool.slug} tool={tool} />
          ))}
        </ul>
      </Container>
      <WhatsAppCta />
    </>
  )
}
