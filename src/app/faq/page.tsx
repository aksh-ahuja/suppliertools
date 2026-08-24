import type { Metadata } from 'next'
import { siteFaqs } from '@/content/faqs'
import { tools } from '@/config/tools'
import { faqSchema, jsonLd, pageMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/marketing/PageHero'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { WhatsAppCta } from '@/components/marketing/WhatsAppCta'

export const metadata: Metadata = pageMetadata({
  title: 'Frequently asked questions',
  description:
    'Is it free, is it safe, where does my data go, does it work on a phone. Every question sellers ask about SupplierTools, answered directly.',
  path: '/faq',
})

export default function FaqPage() {
  const allFaqs = [...siteFaqs, ...tools.flatMap((t) => t.faqs)]

  return (
    <>
      <JsonLd data={jsonLd(faqSchema(allFaqs))} />
      <PageHero
        width="narrow"
        eyebrow="FAQ"
        title="Questions, answered properly"
        lede="No marketing language. If the answer is no, it says no."
      />

      <Container width="narrow">
        <div className="pb-8">
          <h2 className="mb-5 text-[20px] font-bold tracking-[-0.02em]">About the site</h2>
          <FaqAccordion faqs={siteFaqs} />

          {tools.map((tool) => (
            <div key={tool.slug} className="mt-12">
              <h2 className="mb-5 text-[20px] font-bold tracking-[-0.02em]">{tool.name}</h2>
              <FaqAccordion faqs={tool.faqs} />
            </div>
          ))}
        </div>
      </Container>

      <WhatsAppCta
        title="Still stuck?"
        body="Send me a screenshot on WhatsApp and I will tell you what is going on."
      />
    </>
  )
}
