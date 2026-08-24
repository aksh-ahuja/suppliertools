import type { Metadata } from 'next'
import Link from 'next/link'
import { site } from '@/config/site'
import { pageMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/marketing/PageHero'

export const metadata: Metadata = pageMetadata({
  title: 'Editorial policy and corrections',
  description:
    'How the guides on SupplierTools are written and reviewed, what counts as a source, how conflicts of interest are disclosed, and how to report an error.',
  path: '/editorial',
})

export default function EditorialPage() {
  return (
    <>
      <PageHero
        width="narrow"
        eyebrow="Editorial"
        title="How these guides are written, and how to correct them"
        lede="Last updated 24 August 2026."
      />

      <Container width="narrow">
        <div className="prose-page pb-20">
          <h2>Who writes these</h2>
          <p>
            Every article on this site is written by {site.author.name}, who also builds the tools.
            There is no content team, no freelancer pool and no guest posts. If a page has a byline,
            that person wrote it.
          </p>

          <h2>The conflict of interest, stated plainly</h2>
          <p>
            Most of these guides end up recommending a tool on this site, because the tools were
            built to solve the problems the guides describe. That is a real conflict and it is
            disclosed in the body of each article rather than buried here.
          </p>
          <p>
            Two things limit the damage. The tools are free, so there is no revenue attached to the
            recommendation. And every article explains the manual method first, so the advice still
            works if you never touch the tool.
          </p>
          <p>
            There are no affiliate links anywhere on this site, no sponsored content and no paid
            placements. If that ever changes, it will be labelled on the page, not in a policy nobody
            reads.
          </p>

          <h2>What counts as a source</h2>
          <p>Claims fall into three buckets, and each is handled differently:</p>
          <ul>
            <li>
              <strong>Verifiable facts</strong> about how a system behaves are linked to the primary
              source, usually the marketplace&rsquo;s own panel or the documentation of the software
              involved.
            </li>
            <li>
              <strong>Operational estimates</strong>, such as how long a task takes or the volume at
              which a printer pays for itself, are labelled as estimates from practice. They come
              from running small seller operations, not from a controlled study, and the articles say
              so.
            </li>
            <li>
              <strong>Market statistics</strong> are only used when a specific, dated source can be
              cited. Where a number would be useful but no source exists, the article leaves it out
              rather than inventing a plausible figure.
            </li>
          </ul>

          <h2>Review before publishing</h2>
          <p>
            Each guide is checked against a written quality rubric before it goes live, covering
            intent match, structure, evidence, disclosure and factual consistency. Where a check
            fails, either the article is fixed or the gap is stated openly in the article itself.
          </p>
          <p>
            This site is a one-person project, so there is no second human reviewer. That is a real
            limitation and worth knowing when you weigh the advice.
          </p>

          <h2>Corrections</h2>
          <p>
            If something here is wrong, tell me and I will fix it. Message{' '}
            <a href={site.whatsapp.link} target="_blank" rel="noopener noreferrer">
              {site.whatsapp.display}
            </a>{' '}
            on WhatsApp or open an issue on{' '}
            <a href={site.repo.url} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
          <p>How corrections are handled:</p>
          <ul>
            <li>
              <strong>Factual errors</strong> are corrected in place and the article&rsquo;s
              last-reviewed date is updated.
            </li>
            <li>
              <strong>Material corrections</strong>, meaning ones that change the advice, get a note
              at the point of the change saying what was wrong and when it was fixed.
            </li>
            <li>
              <strong>Typos and clarity edits</strong> are made silently.
            </li>
          </ul>
          <p>
            Because the whole site is{' '}
            <a href={site.repo.url} target="_blank" rel="noopener noreferrer">
              public on GitHub
            </a>
            , every edit to every article has a timestamped diff. You do not have to take my word for
            what changed, you can read the commit.
          </p>

          <h2>Updates</h2>
          <p>
            Marketplace panels change. Guides are reviewed when something they describe visibly
            changes, and the last-reviewed date at the foot of each article tells you when that last
            happened. A date that looks old means nothing has changed, not that the page was
            abandoned.
          </p>

          <p>
            <Link href="/privacy/">Privacy</Link> · <Link href="/terms/">Terms</Link> ·{' '}
            <Link href="/about/">About</Link>
          </p>
        </div>
      </Container>
    </>
  )
}
