import Link from 'next/link'
import type { Metadata } from 'next'
import { site } from '@/config/site'
import { liveTools, getTool } from '@/config/tools'
import { siteFaqs } from '@/content/faqs'
import { labelSorterSteps } from '@/content/steps'
import { listArticles } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { pageMetadata, jsonLd, faqSchema, howToSchema } from '@/lib/seo'
import { JsonLd } from '@/components/JsonLd'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { LabelStackDemo } from '@/components/marketing/LabelStackDemo'

export const metadata: Metadata = pageMetadata({
  title: 'Meesho Label Crop & Sort Tool — Free 4x6 Thermal, No Sign-up',
  description:
    'Free Meesho label crop tool. Cut the tax invoice off your shipping labels, print a true 4x6 thermal label or four to an A4 sheet, and group identical products together. No sign-up, nothing uploaded, runs in your browser.',
  path: '/',
  keywords: [
    'meesho label crop',
    'meesho label crop tool',
    'meesho shipping label crop',
    'meesho label cropper',
    'meesho label 4x6 thermal',
    'meesho label sorter',
    'meesho seller tools',
    'meesho supplier tools',
  ],
})

export default function HomePage() {
  const sorter = getTool('meesho-label-crop-sort')!
  const posts = listArticles(3)

  return (
    <>
      <JsonLd
        data={jsonLd(
          faqSchema(siteFaqs),
          howToSchema({
            name: 'How to crop and sort a Meesho shipping label PDF',
            description:
              'Cut the tax invoice off a Meesho shipping label PDF, print it at 4x6 thermal size or four to an A4 sheet, and group the pages by delivery partner, product, size and quantity.',
            steps: labelSorterSteps.map((s) => ({ name: s.name, text: s.text })),
          }),
        )}
      />

      {/* ---------------------------------------------------------- hero */}
      <section className="pt-20 pb-16 sm:pt-32 sm:pb-24">
        <Container>
          <p className="text-[13px] font-medium tracking-[0.02em] text-muted">
            Free · No sign-up · Runs on your device
          </p>
          <h1 className="mt-6 max-w-[18ch] text-[42px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[68px]">
            Crop the invoice off. Sort the pile.
          </h1>
          <p className="mt-7 max-w-[54ch] text-[18px] leading-[1.65] text-ink-soft sm:text-[20px]">
            Drop in the shipping label PDF from your Meesho panel. Get back clean labels at a true
            4&times;6 thermal size, or four to an A4 sheet, with identical products stacked together
            and the product name printed on every one.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href={`${sorter.appHref}/`} size="lg">
              Crop my labels
            </ButtonLink>
            <Link
              href={`${sorter.href}/`}
              className="text-[16px] font-medium text-ink-soft underline decoration-line underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
            >
              How it works
            </Link>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- the transform */}
      <section className="border-y border-line bg-card">
        <Container>
          <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:py-24">
            <div>
              <h2 className="max-w-[20ch] text-[26px] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[32px]">
                Half the page is an invoice you throw away
              </h2>
              <div className="mt-6 space-y-5 text-[16.5px] leading-[1.7] text-ink-soft">
                <p>
                  Meesho puts the shipping label and the tax invoice on one A4 page. If you print to
                  a thermal roll you want the top half, and if you print to A4 you would rather fit
                  four labels on a sheet than waste three quarters of it.
                </p>
                <p>
                  Meesho also prints in the order the orders arrived, so the same product shows up on
                  page 1, page 9 and page 23 and you end up sorting paper on the floor. This crops
                  and groups in one pass, and prints a name you recognise, because{' '}
                  <span className="font-mono text-[14.5px] text-ink">2pc_COMB0_LEGEND</span> means
                  nothing at six in the morning.
                </p>
              </div>
              <Link
                href={`${sorter.href}/`}
                className="mt-7 inline-flex items-center gap-1.5 text-[16px] font-semibold text-accent hover:underline"
              >
                Read the full guide <span aria-hidden>→</span>
              </Link>
            </div>
            <LabelStackDemo />
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- tools */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">The tools</h2>
            <p className="text-[15px] text-muted">More are on the way.</p>
          </div>

          <ul className="mt-10 border-t border-line">
            {liveTools.map((tool) => (
              <li key={tool.slug} className="border-b border-line">
                <Link
                  href={`${tool.href}/`}
                  className="group flex flex-wrap items-center gap-x-6 gap-y-2 py-7 transition-colors"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[20px] font-bold tracking-[-0.02em] transition-colors group-hover:text-accent sm:text-[22px]">
                      {tool.name}
                    </span>
                    <span className="mt-1 block text-[15.5px] leading-relaxed text-muted">
                      {tool.tagline}
                    </span>
                  </span>
                  <span className="flex flex-none items-center gap-5">
                    <span className="text-[13px] font-semibold uppercase tracking-[0.07em] text-faint">
                      {tool.pricing === 'free' ? 'Free' : tool.pricing}
                    </span>
                    <span
                      aria-hidden
                      className="text-[18px] text-faint transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            <li className="border-b border-line">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-7">
                <span className="min-w-0 flex-1">
                  <span className="block text-[20px] font-bold tracking-[-0.02em] text-faint sm:text-[22px]">
                    Your tool here
                  </span>
                  <span className="mt-1 block text-[15.5px] leading-relaxed text-muted">
                    Tell me what you do by hand every day and I will look at building it.
                  </span>
                </span>
                <a
                  href={site.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-none text-[15.5px] font-semibold text-accent hover:underline"
                >
                  WhatsApp me
                </a>
              </div>
            </li>
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------- the cut line */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <h2 className="max-w-[18ch] text-[26px] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[32px]">
              Why other croppers leave a black bar on your label
            </h2>
            <div className="space-y-5 text-[16.5px] leading-[1.7] text-ink-soft">
              <p>
                Because they cut at a fixed distance down the page. The invoice band does not sit in
                the same place on every label. Across one real 152 page export it started at five
                different positions depending on the delivery partner, a spread of about 33 points,
                so a fixed cut is simply wrong for some couriers. What is left over is the black{' '}
                <span className="font-mono text-[14.5px] text-ink">TAX INVOICE</span> strip you see
                printed along the bottom of labels from other tools.
              </p>
              <p>
                This one reads every page and finds the band, so the cut lands in the right place
                whichever courier the label is for. It also takes the invoice out of the file rather
                than hiding it under a smaller page box, which is the other common shortcut: your
                GSTIN and the buyer&rsquo;s billing details stay inside a file you hand to a packer.
                Open a cropped file from here and search it for{' '}
                <span className="font-mono text-[14.5px] text-ink">GSTIN</span>. There is nothing to
                find.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- privacy */}
      <section className="border-y border-line bg-card py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <h2 className="max-w-[16ch] text-[26px] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[32px]">
              Your customers&rsquo; addresses never leave your phone
            </h2>
            <div className="space-y-5 text-[16.5px] leading-[1.7] text-ink-soft">
              <p>
                A shipping label carries your customer&rsquo;s full name, address and phone number.
                Most free PDF tools upload your file to a server to process it. This one has no
                server to upload to.
              </p>
              <p>
                The site is static files. The PDF is read and rewritten by JavaScript in your own
                browser tab. Load the page once, switch off your internet, and it still sorts a file.
                Nothing that talks to a server could do that.
              </p>
              <p className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                <a
                  href={site.repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  Read the source on GitHub
                </a>
                <Link href="/privacy/" className="font-semibold text-accent hover:underline">
                  Privacy details
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- blog */}
      {posts.length > 0 && (
        <section className="py-16 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">Writing</h2>
              <Link href="/blog/" className="text-[15px] font-semibold text-accent hover:underline">
                All posts →
              </Link>
            </div>
            <ul className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}/`} className="group block">
                    <p className="text-[12.5px] font-medium uppercase tracking-[0.07em] text-faint">
                      {post.category} · {formatDate(post.publishedAt)}
                    </p>
                    <h3 className="mt-2.5 text-[18.5px] font-bold leading-[1.32] tracking-[-0.02em] transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* ----------------------------------------------------------- faq */}
      <section className="border-t border-line py-16 sm:py-24">
        <Container width="narrow">
          <h2 className="text-[26px] font-bold tracking-[-0.03em] sm:text-[32px]">
            Questions
          </h2>
          <div className="mt-9">
            <FaqAccordion faqs={siteFaqs} />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------- contact */}
      <section className="pb-24">
        <Container width="narrow">
          <div className="border-t border-line pt-12">
            <h2 className="max-w-[24ch] text-[22px] font-bold leading-[1.28] tracking-[-0.025em] sm:text-[26px]">
              Need something built, or a feature added?
            </h2>
            <p className="mt-3 max-w-[52ch] text-[16.5px] leading-relaxed text-muted">
              I read every message. Feature requests for these tools are free.
            </p>
            <a
              href={site.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-[18px] font-bold tracking-[-0.01em] text-accent hover:underline"
            >
              {site.whatsapp.display}
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
