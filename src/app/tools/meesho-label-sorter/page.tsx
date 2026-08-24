import type { Metadata } from 'next'
import Link from 'next/link'
import { getTool } from '@/config/tools'
import { labelSorterSteps } from '@/content/steps'
import { site } from '@/config/site'
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  jsonLd,
  pageMetadata,
  softwareApplicationSchema,
} from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { Steps } from '@/components/marketing/Steps'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { LabelStackDemo } from '@/components/marketing/LabelStackDemo'
import { WhatsAppCta } from '@/components/marketing/WhatsAppCta'

const tool = getTool('meesho-label-sorter')!

export const metadata: Metadata = pageMetadata({
  title: 'Meesho Label Sorter · Free label sorting and product name printing',
  description:
    'Free Meesho label sorter. Upload your shipping label PDF and get it back sorted by delivery partner, product, size and quantity, with the product name printed on every label. No sign-up, nothing uploaded.',
  path: tool.href,
  keywords: tool.keywords,
})

const features = [
  {
    title: 'Sorts by four things at once',
    body: 'Delivery partner, then product, then size, then quantity. You set the priority order, and the first one makes the biggest piles.',
  },
  {
    title: 'Prints a name you recognise',
    body: 'Each page gets a boxed line with the product name, size and quantity in large type, placed under the label so it never touches the barcode.',
  },
  {
    title: 'Many SKU IDs, one product',
    body: 'A product usually has several Meesho SKU IDs. Map them all to one name once and every future file just works. Switch it off if you prefer raw SKUs.',
  },
  {
    title: 'Separate files when you want them',
    body: 'Tick the delivery partner and you get one PDF per courier. Tick the product and you get one per product. Tick nothing and you get a single sorted file.',
  },
  {
    title: 'Set numbers on every page',
    body: 'Each run of identical items is numbered, so you can see where one pile ends without reading any names.',
  },
  {
    title: 'Nine languages',
    body: 'English, Hindi, Gujarati, Marathi, Tamil, Telugu, Kannada, Bengali and Punjabi, because your packing staff should not need English.',
  },
]

export default function LabelSorterLandingPage() {
  return (
    <>
      <JsonLd
        data={jsonLd(
          softwareApplicationSchema(tool),
          faqSchema(tool.faqs),
          howToSchema({
            name: 'How to sort a Meesho shipping label PDF',
            description: tool.description,
            steps: labelSorterSteps.map((s) => ({ name: s.name, text: s.text })),
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: tool.name, path: tool.href },
          ]),
        )}
      />

      <section className="pt-14 pb-14 sm:pt-20 sm:pb-20">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 text-[13.5px] text-muted">
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            <span className="px-2" aria-hidden>
              /
            </span>
            <Link href="/tools/" className="hover:text-accent">
              Tools
            </Link>
            <span className="px-2" aria-hidden>
              /
            </span>
            <span className="text-ink-soft">{tool.name}</span>
          </nav>

          <p className="text-[13px] font-medium tracking-[0.02em] text-muted">
            Free forever · Nothing uploaded · No sign-up
          </p>
          <h1 className="mt-6 max-w-[15ch] text-[40px] font-bold leading-[1.04] tracking-[-0.04em] sm:text-[60px]">
            Meesho Label Sorter
          </h1>
          <p className="mt-7 max-w-[56ch] text-[18px] leading-[1.65] text-ink-soft sm:text-[20px]">
            Upload the label PDF from your supplier panel. Get it back with identical products
            stacked together and the product name printed in large letters on every single label.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href={`${tool.appHref}/`} size="lg">
              Open the tool
            </ButtonLink>
            <Link
              href="#how"
              className="text-[16px] font-medium text-ink-soft underline decoration-line underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
            >
              How it works
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-card py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <h2 className="max-w-[18ch] text-[26px] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[32px]">
                What actually changes
              </h2>
              <div className="mt-6 space-y-5 text-[16.5px] leading-[1.7] text-ink-soft">
                <p>
                  Pages are reordered but never redrawn. Your barcode, QR code, address block and tax
                  invoice are the original ones, untouched.
                </p>
                <p>
                  The only thing added is a bordered box in the blank space below the label,
                  carrying the product name, size and quantity, plus optionally the delivery partner
                  and the set number.
                </p>
              </div>
            </div>
            <LabelStackDemo />
          </div>
        </Container>
      </section>

      <section id="how" className="py-16 sm:py-24">
        <Container>
          <h2 className="max-w-[20ch] text-[26px] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[32px]">
            Set it up once, then it is three taps a day
          </h2>
          <p className="mt-4 max-w-[56ch] text-[17px] leading-relaxed text-muted">
            The first run asks a few questions so the output matches how you pack. After that your
            settings are remembered on your device.
          </p>
          <div className="mt-10">
            <Steps steps={labelSorterSteps} />
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-card py-16 sm:py-24">
        <Container>
          <h2 className="text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">What it can do</h2>
          <dl className="mt-10 grid gap-x-14 gap-y-10 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title}>
                <dt className="text-[17.5px] font-bold leading-snug tracking-[-0.02em]">
                  {f.title}
                </dt>
                <dd className="mt-2 text-[16px] leading-relaxed text-muted">{f.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <div className="prose-page">
            <h2>Is it safe to put a shipping label into a website?</h2>
            <p>
              Usually that is a fair thing to worry about. A Meesho label carries your customer&rsquo;s
              name, full address and phone number, and most free PDF sites upload your file to their
              server to process it.
            </p>
            <p>
              This one does not, and it cannot. The site is static files with no backend. The PDF is
              parsed and rewritten by JavaScript in your own browser tab. Load the page once, turn off
              your internet, and it will still sort a file for you, which is proof enough on its own.
              The <a href={site.repo.url} target="_blank" rel="noopener noreferrer">source code is
              public</a> if you want to check.
            </p>

            <h2>Does it change my invoice or GST details?</h2>
            <p>
              No. Nothing on the original page is edited, removed or covered. The tool only adds a new
              block in the empty space and reorders pages, so the label and the tax invoice stay
              exactly as Meesho generated them.
            </p>

            <h2>What about SKU IDs I have not named yet?</h2>
            <p>
              They still come through. Those labels print the SKU ID instead of a name and are kept
              at the end of their courier pile so they are easy to spot and name later. The tool never
              guesses a name.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container width="narrow">
          <h2 className="text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">Questions</h2>
          <div className="mt-9">
            <FaqAccordion faqs={tool.faqs} />
          </div>
          <div className="mt-12">
            <ButtonLink href={`${tool.appHref}/`} size="lg">
              Open the Label Sorter
            </ButtonLink>
          </div>
        </Container>
      </section>

      <WhatsAppCta />
    </>
  )
}
