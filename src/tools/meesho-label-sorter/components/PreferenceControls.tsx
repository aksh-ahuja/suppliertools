'use client'

import { useLabelSorter } from '../state/store'
import { PRINT_FIELDS, type PrintField, type SortField } from '../types'
import { normaliseSortOrder } from '../lib/sort'
import { CheckRow, OrderList, Toggle } from './Primitives'

/** Shared by onboarding and settings so the two can never drift apart. */

export function SortOrderControl() {
  const { t, state, setPrefs } = useLabelSorter()
  const order = normaliseSortOrder(state.prefs.sortOrder)

  const move = (index: number, direction: -1 | 1) => {
    const next = [...order]
    const target = index + direction
    ;[next[index], next[target]] = [next[target], next[index]]
    setPrefs({ sortOrder: next })
  }

  return (
    <OrderList
      items={order.map((field) => ({ key: field, label: t[`f_${field}` as const] }))}
      onMove={move}
    />
  )
}

export function SplitControl() {
  const { t, state, setPrefs } = useLabelSorter()
  const order = normaliseSortOrder(state.prefs.sortOrder)
  const split = state.prefs.splitBy

  const toggle = (field: SortField, on: boolean) => {
    const next = split.filter((f) => f !== field)
    if (on) next.push(field)
    // Keep the split fields in the same priority order as the sort.
    setPrefs({ splitBy: order.filter((f) => next.includes(f)) })
  }

  return (
    <div className="grid">
      {order.map((field) => (
        <CheckRow
          key={field}
          checked={split.includes(field)}
          onChange={(on) => toggle(field, on)}
          label={t[`f_${field}` as const]}
        />
      ))}
    </div>
  )
}

export function PrintControl() {
  const { t, state, setPrefs } = useLabelSorter()
  const print = state.prefs.print

  return (
    <div className="grid">
      {PRINT_FIELDS.map((field: PrintField) => (
        <CheckRow
          key={field}
          checked={print[field]}
          onChange={(on) => setPrefs({ print: { ...print, [field]: on } })}
          label={field === 'setNumber' ? t.f_setNumber : t[`f_${field}` as const]}
        />
      ))}
    </div>
  )
}

export function MappingToggle() {
  const { t, state, setPrefs } = useLabelSorter()
  return (
    <Toggle
      checked={state.prefs.mappingEnabled}
      onChange={(on) => setPrefs({ mappingEnabled: on })}
      label={t.set_mappingOn}
      hint={t.set_mappingHint}
    />
  )
}

/** A live preview of what the stamp will look like on a label. */
export function StampPreview() {
  const { t, state } = useLabelSorter()
  const print = state.prefs.print

  const details = [
    print.size ? `${t.lbl_size} : M` : null,
    print.qty ? `${t.lbl_qty} : 1` : null,
  ].filter(Boolean)
  const tail = [print.courier ? 'VALMO' : null, print.setNumber ? `${t.lbl_set} 3` : null]
    .filter(Boolean)
    .join('   |   ')

  const nothing = !print.product && details.length === 0 && !tail

  return (
    <div className="rounded-xl border border-line bg-bg-sunk/50 p-4">
      <p className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.06em] text-faint">
        {t.set_print}
      </p>
      {nothing ? (
        <p className="py-4 text-center text-[13.5px] text-muted">—</p>
      ) : (
        <div className="mx-auto max-w-[320px]">
          {(print.product || details.length > 0) && (
            <div className="rounded-[3px] border-2 border-ink bg-white px-3 py-3 text-center">
              {print.product && (
                <p className="text-[15px] font-bold leading-tight tracking-wide">LEGEND BLACK</p>
              )}
              {details.length > 0 && (
                <p className="mt-1.5 text-[13px] font-bold leading-tight tracking-wide">
                  {details.join('     ')}
                </p>
              )}
            </div>
          )}
          {tail && <p className="mt-1.5 text-center text-[10.5px] tracking-wide">{tail}</p>}
        </div>
      )}
    </div>
  )
}
