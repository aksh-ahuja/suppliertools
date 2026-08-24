import { Container } from '@/components/ui/Container'

export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string
  title: string
  lede?: string
  children?: React.ReactNode
}) {
  return (
    <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
      <Container>
        <div className="max-w-[24ch]">
          {eyebrow && (
            <p className="mb-5 text-[13px] font-medium tracking-[0.02em] text-muted">{eyebrow}</p>
          )}
          <h1 className="text-[36px] font-bold leading-[1.06] tracking-[-0.038em] sm:text-[52px]">
            {title}
          </h1>
        </div>
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
