import type { Metadata } from 'next'
import Link from 'next/link'
import { getTool } from '@/config/tools'
import { absoluteUrl } from '@/lib/seo'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'

const tool = getTool('meesho-label-crop-sort')!

/**
 * The tool used to live here, before it learned to crop and was renamed.
 *
 * A static export has no server to send a 301 from, so this does the next best
 * thing: a canonical pointing at the new page so crawlers consolidate the two,
 * `noindex` so this stub never competes with it, and a meta refresh plus a real
 * link for anyone who followed an old bookmark.
 */
export const metadata: Metadata = {
  title: 'Meesho Label Crop & Sort has moved',
  alternates: { canonical: absoluteUrl(tool.href) },
  robots: { index: false, follow: true },
  other: { refresh: `0; url=${absoluteUrl(tool.href)}` },
}

export default function MovedPage() {
  return (
    <section className="py-24">
      <Container width="narrow">
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">This page has moved</h1>
        <p className="mt-4 text-[16.5px] leading-relaxed text-ink-soft">
          The Label Sorter now crops the tax invoice off as well, and lives at a new address.
        </p>
        <div className="mt-8">
          <ButtonLink href={`${tool.href}/`}>Go to {tool.name}</ButtonLink>
        </div>
        <p className="mt-6 text-[15px] text-muted">
          If you are not sent there automatically,{' '}
          <Link href={`${tool.href}/`} className="font-semibold text-accent hover:underline">
            follow this link
          </Link>
          .
        </p>
      </Container>
    </section>
  )
}
