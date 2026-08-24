import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import { pageMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/marketing/PageHero'
import { WhatsAppCta } from '@/components/marketing/WhatsAppCta'

export const metadata: Metadata = pageMetadata({
  title: 'About SupplierTools',
  description:
    'Who builds SupplierTools, why the tools are free, how they make money (they do not), and what happens to your data. An honest page, not a mission statement.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        width="narrow"
        eyebrow="About"
        title="Small tools, built by someone who was doing the packing"
        lede="No company, no funding round, no growth targets. Just a few tools that fix specific annoyances for Indian sellers."
      />

      <Container width="narrow">
        <div className="prose-page pb-20">
          <h2>Where this came from</h2>
          <p>
            A Meesho label PDF comes out of the supplier panel in whatever order the orders came in.
            If you ship forty orders in a morning, you print forty pages, and then you sit on the
            floor sorting them into piles by product and size so that packing goes faster. Everyone
            selling on Meesho has done this. It is fifteen wasted minutes a day and it is the kind of
            thing a computer should obviously be doing.
          </p>
          <p>
            So the first tool got written for exactly that. It worked, other sellers asked for a
            copy, and it turned into this site. The plan is simple: keep finding the boring repeated
            jobs and knock them out one at a time.
          </p>

          <h2>Why it is free</h2>
          <p>
            Because it costs me almost nothing. The site is a set of static files on GitHub Pages and
            the actual work happens inside your browser, not on a server I have to pay for. There is
            no per-user cost, so there is no reason to charge per user.
          </p>
          <p>
            To be completely straight with you: if I later build something heavy that genuinely
            costs money to run, that specific tool will be marked as paid and priced openly. The
            tools that are free today stay free. I am not going to build an audience on a free tool
            and then put it behind a login.
          </p>

          <h2>What I do with your data</h2>
          <p>
            Nothing, because I never receive it. There is no server, no database, no account system
            and no analytics that follow you around. Your label PDFs, your customer addresses and
            your product mapping stay in your own browser storage on your own device.
          </p>
          <p>
            You do not have to trust me on this. The{' '}
            <a href={site.repo.url} target="_blank" rel="noopener noreferrer">
              entire source code is public
            </a>
            , and the tools keep working with your internet switched off, which is not something an
            uploader could do. The <Link href="/privacy/">privacy page</Link> spells out the details.
          </p>

          <h2>Open source</h2>
          <p>
            Everything here is MIT licensed. Fork it, read it, host your own copy, or send a pull
            request if you find a bug. If you run a slightly different label format and want support
            for it, an issue on GitHub or a message on WhatsApp both work.
          </p>

          <h2>Who is behind it</h2>
          <p>
            {site.author.name}. I build software, and I have spent enough time around small Indian
            e-commerce operations to know which parts of the day are pure friction. If you want
            something built, or your own workflow automated, message me at{' '}
            <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
              {site.whatsapp.display}
            </a>
            . Feature requests for these tools are free and I read all of them.
          </p>
        </div>
      </Container>

      <WhatsAppCta />
    </>
  )
}
