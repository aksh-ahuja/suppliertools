import { cx } from '@/lib/utils'

export function Card({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
}) {
  return (
    <Tag
      className={cx(
        'rounded-[var(--radius-card)] border border-line bg-card shadow-[var(--shadow-card)]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
