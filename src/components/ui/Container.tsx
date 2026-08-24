import { cx } from '@/lib/utils'

type Width = 'narrow' | 'default' | 'wide'

const widths: Record<Width, string> = {
  narrow: 'max-w-[720px]',
  default: 'max-w-[1040px]',
  wide: 'max-w-[1200px]',
}

export function Container({
  children,
  width = 'default',
  className,
}: {
  children: React.ReactNode
  width?: Width
  className?: string
}) {
  return <div className={cx('mx-auto w-full px-5 sm:px-6', widths[width], className)}>{children}</div>
}
