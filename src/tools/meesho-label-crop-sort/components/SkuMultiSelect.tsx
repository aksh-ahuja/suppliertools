'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { cx } from '@/lib/utils'
import { looseSku, normaliseSku } from '../lib/sku'
import type { Dict } from '../i18n'

interface Props {
  t: Dict
  /** SKUs this product already owns. */
  selected: string[]
  /** SKUs no product owns yet. Combined with `selected` to build the list. */
  available: string[]
  onChange: (skus: string[]) => void
  disabled?: boolean
}

/**
 * The right-hand half of a mapping row: a searchable multi-select that only
 * offers SKU IDs which are still free, plus the ones this product already has.
 * Choosing a SKU here removes it from every other product's list, which is what
 * keeps "one SKU belongs to one product" true without the user thinking about it.
 */
export function SkuMultiSelect({ t, selected, available, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  const options = useMemo(() => {
    const seen = new Set<string>()
    const all: string[] = []
    for (const sku of [...selected, ...available]) {
      const key = normaliseSku(sku)
      if (seen.has(key)) continue
      seen.add(key)
      all.push(sku)
    }
    return all.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  }, [selected, available])

  const filtered = useMemo(() => {
    const q = looseSku(query)
    if (!q) return options
    return options.filter((sku) => looseSku(sku).includes(q))
  }, [options, query])

  const isSelected = (sku: string) => selected.some((s) => normaliseSku(s) === normaliseSku(sku))

  const toggle = (sku: string) => {
    if (isSelected(sku)) {
      onChange(selected.filter((s) => normaliseSku(s) !== normaliseSku(sku)))
    } else {
      onChange([...selected, sku])
    }
  }

  return (
    <div ref={rootRef}>
      <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cx(
          'flex w-full items-center justify-between gap-3 rounded-xl border-[1.5px] px-3.5 py-3 text-left transition-colors',
          open ? 'border-accent' : 'border-line',
          disabled ? 'cursor-not-allowed bg-bg-sunk opacity-60' : 'bg-card hover:border-faint',
        )}
      >
        <span className="min-w-0 flex-1 truncate text-[15.5px]">
          {selected.length ? (
            <span className="font-medium">{t.map_selected(selected.length)}</span>
          ) : (
            <span className="text-faint">{t.map_selectSkus}</span>
          )}
        </span>
        <span aria-hidden className={cx('flex-none text-muted transition-transform', open && 'rotate-180')}>
          ▾
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-line bg-card shadow-[var(--shadow-lift)]">
          <div className="border-b border-line-soft p-2.5">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.map_search}
              aria-label={t.map_search}
              className="w-full rounded-lg border-[1.5px] border-line bg-bg px-3 py-2.5 text-[15px] outline-none focus:border-accent"
            />
          </div>
          <div className="max-h-[280px] overflow-y-auto overscroll-contain p-1.5" role="listbox">
            {filtered.length === 0 ? (
              <p className="px-3 py-6 text-center text-[14px] text-muted">
                {options.length === 0 ? t.map_noUnmapped : t.map_noResults}
              </p>
            ) : (
              filtered.map((sku) => {
                const on = isSelected(sku)
                return (
                  <button
                    key={sku}
                    type="button"
                    role="option"
                    aria-selected={on}
                    onClick={() => toggle(sku)}
                    className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors hover:bg-bg-sunk"
                  >
                    <span
                      className={cx(
                        'grid h-[20px] w-[20px] flex-none place-items-center rounded-[6px] border-2',
                        on ? 'border-accent bg-accent text-white' : 'border-line',
                      )}
                    >
                      {on && (
                        <svg viewBox="0 0 14 14" className="h-2.5 w-2.5" aria-hidden>
                          <path
                            d="M2 7.5 5.5 11 12 3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-mono text-[13.5px]">{sku}</span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
      </div>

      {selected.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {selected.map((sku) => (
            <li
              key={sku}
              className="flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-accent-line bg-accent-soft py-1 pl-2.5 pr-1.5 text-[12.5px] font-medium"
            >
              <span className="max-w-[26ch] truncate">{sku}</span>
              <button
                type="button"
                onClick={() => toggle(sku)}
                aria-label={`${t.remove} ${sku}`}
                className="grid h-4 w-4 place-items-center rounded-full text-[13px] leading-none text-accent hover:bg-accent hover:text-white"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}
