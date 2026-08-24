import type { Metadata } from 'next'
import { site } from '@/config/site'
import { pageMetadata } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/marketing/PageHero'

export const metadata: Metadata = pageMetadata({
  title: 'Terms of use',
  description:
    'Plain terms for using the free tools on SupplierTools. No account, no fees, no warranty, check your labels before you ship.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Terms of use" lede="Last updated 24 August 2026." />

      <Container width="narrow">
        <div className="prose-page pb-20">
          <h2>Using the tools</h2>
          <p>
            The tools on {site.domain} are provided free of charge for anyone to use, personally or
            commercially. No account is required and no fee is charged for anything currently listed
            as free.
          </p>

          <h2>Check your output</h2>
          <p>
            These tools rearrange and annotate documents automatically. Label layouts change, and an
            unusual file can be read incorrectly. Always check the sorted PDF against your orders
            before you print and hand parcels over to a courier. You remain responsible for what you
            ship.
          </p>

          <h2>No warranty</h2>
          <p>
            The software is provided &ldquo;as is&rdquo;, without warranty of any kind, express or
            implied. To the maximum extent permitted by law, the author is not liable for any loss,
            including lost orders, mis-shipped parcels, penalties or lost income, arising from use of
            these tools.
          </p>

          <h2>Your data</h2>
          <p>
            Nothing you open in these tools is transmitted to us. Everything stored by a tool sits in
            your own browser and is yours to delete at any time. See the privacy page for detail.
          </p>

          <h2>Trademarks</h2>
          <p>
            Meesho, Flipkart, Amazon and other marketplace names belong to their respective owners.
            This site is an independent project and is not affiliated with, endorsed by or sponsored
            by any of them. Their names are used only to describe which file formats a tool works
            with.
          </p>

          <h2>Licence</h2>
          <p>
            The source code is released under the MIT licence and is available at{' '}
            <a href={site.repo.url} target="_blank" rel="noopener noreferrer">
              {site.repo.label}
            </a>
            . You may run your own copy.
          </p>

          <h2>Changes</h2>
          <p>
            These terms may be updated. Continued use after a change means you accept the updated
            terms.
          </p>
        </div>
      </Container>
    </>
  )
}
