'use client'

import { useEffect, useRef, useState } from 'react'
import { cx } from '@/lib/utils'
import { useLabelSorter } from '../state/store'
import { countSkus } from '../lib/mapping'

/**
 * Switching shops is a daily action for anyone running more than one, so it
 * lives in the header next to the shop name rather than inside Settings.
 * Adding and deleting stay in Settings, where they belong.
 */
export function ShopSwitcher({ onManage }: { onManage: () => void }) {
  const { t, state, shop, useShop } = useLabelSorter()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!shop) return null

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="-ml-1 flex items-center gap-1.5 rounded-lg px-1 py-0.5 text-[13px] text-muted transition-colors hover:text-ink"
      >
        <span className="max-w-[22ch] truncate">{t.home_hi(shop.name)}</span>
        <span aria-hidden className={cx('text-[10px] transition-transform', open && 'rotate-180')}>
          ▾
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 z-40 mt-2 w-[264px] overflow-hidden rounded-xl border border-line bg-card shadow-[var(--shadow-lift)]"
        >
          <p className="border-b border-line-soft px-3.5 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.07em] text-faint">
            {t.set_shops}
          </p>
          <ul className="max-h-[240px] overflow-y-auto p-1.5">
            {state.shops.map((entry) => {
              const active = entry.id === shop.id
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      useShop(entry.id)
                      setOpen(false)
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition-colors hover:bg-bg-sunk"
                  >
                    <span
                      aria-hidden
                      className={cx('w-3 flex-none text-[13px]', active ? 'text-accent' : 'text-transparent')}
                    >
                      ✓
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">{entry.name}</span>
                      <span className="block truncate text-[12.5px] text-muted">
                        {t.tile_mappingSub(entry.products.length, countSkus(entry))}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onManage()
              setOpen(false)
            }}
            className="w-full border-t border-line-soft px-3.5 py-3 text-left text-[14px] font-semibold text-accent transition-colors hover:bg-bg-sunk"
          >
            + {t.set_addShop}
          </button>
        </div>
      )}
    </div>
  )
}
