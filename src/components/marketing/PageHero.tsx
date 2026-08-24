import { Container } from '@/components/ui/Container'

/**
 * `ch` resolves against the font size of the element it is set on, so a width
 * cap belongs on the heading itself. Putting it on a wrapper div measures it in
 * 16px body characters and squeezes a 52px heading into a narrow column.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  width = 'default',
  children,
}: {
  eyebrow?: string
  title: string
  lede?: string
  /** Must match the container the page body uses, or the two will not align. */
  width?: 'narrow' | 'default'
  children?: React.ReactNode
}) {
  return (
    <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
      <Container width={width}>
        {eyebrow && (
          <p className="mb-5 text-[13px] font-medium tracking-[0.02em] text-muted">{eyebrow}</p>
        )}
        <h1 className="max-w-[18ch] text-[36px] font-bold leading-[1.06] tracking-[-0.038em] sm:text-[52px]">
          {title}
        </h1>
        {lede && (
          <p className="mt-6 max-w-[56ch] text-[18px] leading-[1.65] text-ink-soft sm:text-[19px]">
            {lede}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </Container>
    </section>
  )
}
