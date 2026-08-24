'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { site } from '@/config/site'
import { cx } from '@/lib/utils'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

const nav = [
  { label: 'Tools', href: '/tools/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the drawer whenever the route changes, otherwise it stays open
  // behind the new page on mobile.
  useEffect(() => setOpen(false), [pathname])

  // Lock body scroll while the drawer is up.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <Logo size={34} />
            <span className="text-[17px] font-bold tracking-[-0.02em]">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    'rounded-[var(--radius-pill)] px-3.5 py-2 text-[15px] font-medium transition-colors',
                    active ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <a
              href={site.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-[var(--radius-pill)] border border-line bg-card px-4 py-2 text-[15px] font-semibold text-ink transition-colors hover:border-faint"
            >
              WhatsApp
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-card md:hidden"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={cx(
                  'absolute left-0 block h-[1.8px] w-4 bg-ink transition-transform duration-200',
                  open ? 'top-1.5 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cx(
                  'absolute left-0 top-1.5 block h-[1.8px] w-4 bg-ink transition-opacity duration-200',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cx(
                  'absolute left-0 block h-[1.8px] w-4 bg-ink transition-transform duration-200',
                  open ? 'top-1.5 -rotate-45' : 'top-3',
                )}
              />
            </span>
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <Container>
            <nav className="grid gap-1 py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-[16px] font-medium text-ink hover:bg-bg-sunk"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={site.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 rounded-xl bg-accent px-3 py-3 text-center text-[16px] font-semibold text-white"
              >
                Message on WhatsApp
              </a>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
