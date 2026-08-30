import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container width="narrow">
      <div className="py-28 text-center">
        <p className="text-[13px] font-bold uppercase tracking-[0.09em] text-accent">404</p>
        <h1 className="mt-3 text-[32px] font-bold tracking-[-0.03em]">This page does not exist</h1>
        <p className="mx-auto mt-4 max-w-[44ch] text-[16.5px] leading-relaxed text-muted">
          The link may be old, or the page moved. The tools are all listed on one page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/tools/" size="lg">
            See all tools
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="secondary">
            Go home
          </ButtonLink>
        </div>
        <p className="mt-8 text-[14px] text-muted">
          Looking for the label sorter?{' '}
          <Link href="/tools/meesho-label-crop-sort/" className="font-semibold text-accent hover:underline">
            It is here
          </Link>
          .
        </p>
      </div>
    </Container>
  )
}
