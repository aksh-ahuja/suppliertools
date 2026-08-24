import Link from 'next/link'
import type { Tool } from '@/config/tools'

/** A row, not a card. Cards with icon tiles are what every generated site does. */
export function ToolRow({ tool }: { tool: Tool }) {
  const planned = tool.status === 'planned'

  const body = (
    <>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-[20px] font-bold tracking-[-0.02em] transition-colors group-hover:text-accent sm:text-[22px]">
            {tool.name}
          </span>
          <span className="text-[12.5px] font-medium uppercase tracking-[0.07em] text-faint">
            {tool.marketplaces.join(', ')}
          </span>
        </span>
        <span className="mt-1.5 block max-w-[60ch] text-[15.5px] leading-relaxed text-muted">
          {tool.tagline}
        </span>
      </span>
      <span className="flex flex-none items-center gap-5">
        <span className="text-[13px] font-semibold uppercase tracking-[0.07em] text-faint">
          {planned ? 'Soon' : tool.pricing === 'free' ? 'Free' : tool.pricing}
        </span>
        {!planned && (
          <span
            aria-hidden
            className="text-[18px] text-faint transition-transform group-hover:translate-x-1 group-hover:text-accent"
          >
            →
          </span>
        )}
      </span>
    </>
  )

  const classes = 'flex flex-wrap items-center gap-x-6 gap-y-2 py-7'

  return (
    <li className="border-b border-line">
      {planned ? (
        <div className={`${classes} opacity-55`}>{body}</div>
      ) : (
        <Link href={`${tool.href}/`} className={`group ${classes}`}>
          {body}
        </Link>
      )}
    </li>
  )
}
