import Link from 'next/link'
import { site } from '@/config/site'
import { liveTools } from '@/config/tools'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

const columns = [
  {
    title: 'Site',
    links: [
      { label: 'Home', href: '/' },
      { label: 'All tools', href: '/tools/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'About', href: '/about/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Editorial policy', href: '/editorial/' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-sunk/60">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <Logo size={34} />
              <span className="text-[17px] font-bold tracking-[-0.02em]">{site.name}</span>
            </div>
            <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-muted">
              Free tools for Indian e-commerce sellers. Built in the open, run entirely in your browser.
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-faint">Tools</h3>
            <ul className="mt-3.5 grid gap-2.5">
              {liveTools.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`${tool.href}/`}
                    className="text-[14.5px] text-ink-soft transition-colors hover:text-accent"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.08em] text-faint">
                {col.title}
              </h3>
              <ul className="mt-3.5 grid gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14.5px] text-ink-soft transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13.5px] text-muted">
            © {new Date().getFullYear()} {site.name}. Free to use, always.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px]">
            <a
              href={site.repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-soft transition-colors hover:text-accent"
            >
              Source code on GitHub
            </a>
            <a
              href={site.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-soft transition-colors hover:text-accent"
            >
              WhatsApp {site.whatsapp.display}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
