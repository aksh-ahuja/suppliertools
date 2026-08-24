import { cx } from '@/lib/utils'

type Tone = 'neutral' | 'accent' | 'ok' | 'warn'

const tones: Record<Tone, string> = {
  neutral: 'bg-bg-sunk text-muted border-line',
  accent: 'bg-accent-soft text-accent border-accent-line',
  ok: 'bg-ok-soft text-ok border-ok/20',
  warn: 'bg-warn-soft text-warn border-warn/20',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-2.5 py-1 text-[12.5px] font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
