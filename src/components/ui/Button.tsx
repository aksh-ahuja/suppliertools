import Link from 'next/link'
import { cx } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-semibold ' +
  'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55 select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-card text-ink border border-line hover:border-faint',
  ghost: 'text-ink-soft hover:text-ink hover:bg-bg-sunk',
}

const sizes: Record<Size, string> = {
  sm: 'text-[14px] px-3.5 py-2',
  md: 'text-[15px] px-5 py-2.5',
  lg: 'text-[16px] px-6 py-3.5',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = cx(base, variants[variant], sizes[size], className)
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  )
}
