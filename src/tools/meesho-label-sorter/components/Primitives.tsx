'use client'

import { cx } from '@/lib/utils'

export function Panel({
  children,
  className,
  padded = true,
}: {
  children: React.ReactNode
  className?: string
  padded?: boolean
}) {
  return (
    <section
      className={cx(
        'rounded-[var(--radius-card)] border border-line bg-card shadow-[var(--shadow-card)]',
        padded && 'p-5 sm:p-6',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function PanelHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-[18px] font-bold tracking-[-0.02em]">{title}</h2>
      {hint && <p className="mt-1 text-[14px] leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

export function TextField({
  value,
  onChange,
  placeholder,
  onEnter,
  autoFocus,
  ariaLabel,
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onEnter?: () => void
  autoFocus?: boolean
  ariaLabel?: string
  className?: string
}) {
  return (
    <input
      type="text"
      value={value}
      aria-label={ariaLabel ?? placeholder}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onEnter) {
          e.preventDefault()
          onEnter()
        }
      }}
      className={cx(
        'w-full rounded-xl border-[1.5px] border-line bg-card px-3.5 py-3 text-[16px] text-ink outline-none',
        'transition-colors placeholder:text-faint focus:border-accent',
        className,
      )}
    />
  )
}

/** Big tappable checkbox row. Sized for thumbs, not mouse pointers. */
export function CheckRow({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl px-1 py-2.5 transition-colors hover:bg-bg-sunk/60">
      <span
        className={cx(
          'mt-0.5 grid h-[22px] w-[22px] flex-none place-items-center rounded-[7px] border-2 transition-colors',
          checked ? 'border-accent bg-accent text-white' : 'border-line bg-card',
        )}
      >
        {checked && (
          <svg viewBox="0 0 14 14" className="h-3 w-3" aria-hidden>
            <path
              d="M2 7.5 5.5 11 12 3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className="min-w-0">
        <span className="block text-[16px] leading-snug">{label}</span>
        {hint && <span className="mt-0.5 block text-[13.5px] leading-relaxed text-muted">{hint}</span>}
      </span>
    </label>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[16px] font-semibold leading-snug">{label}</p>
        {hint && <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cx(
          'relative mt-0.5 h-7 w-12 flex-none rounded-full transition-colors',
          checked ? 'bg-accent' : 'bg-line',
        )}
      >
        <span
          className={cx(
            'absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </div>
  )
}

/** Reorderable list of sort fields. Up and down buttons beat drag on a phone. */
export function OrderList({
  items,
  onMove,
}: {
  items: { key: string; label: string }[]
  onMove: (index: number, direction: -1 | 1) => void
}) {
  return (
    <ol className="grid gap-2">
      {items.map((item, i) => (
        <li
          key={item.key}
          className="flex items-center gap-3 rounded-xl border border-line bg-bg-sunk/40 px-3 py-2.5"
        >
          <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-ink text-[13px] font-bold text-white">
            {i + 1}
          </span>
          <span className="min-w-0 flex-1 truncate text-[15.5px] font-medium">{item.label}</span>
          <span className="flex flex-none gap-1.5">
            <ArrowButton label="Move up" disabled={i === 0} onClick={() => onMove(i, -1)} up />
            <ArrowButton
              label="Move down"
              disabled={i === items.length - 1}
              onClick={() => onMove(i, 1)}
            />
          </span>
        </li>
      ))}
    </ol>
  )
}

function ArrowButton({
  onClick,
  disabled,
  up,
  label,
}: {
  onClick: () => void
  disabled: boolean
  up?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card text-[15px] text-ink-soft transition-colors disabled:opacity-35 enabled:hover:border-faint"
    >
      {up ? '↑' : '↓'}
    </button>
  )
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-bg-sunk">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-200"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      {label && <p className="mt-2 text-[13.5px] text-muted">{label}</p>}
    </div>
  )
}

export function Notice({
  tone = 'info',
  icon,
  title,
  children,
}: {
  tone?: 'info' | 'warn' | 'ok'
  icon?: string
  title?: string
  children?: React.ReactNode
}) {
  const tones = {
    info: 'border-accent-line bg-accent-soft text-ink-soft',
    warn: 'border-warn/25 bg-warn-soft text-ink-soft',
    ok: 'border-ok/20 bg-ok-soft text-ink-soft',
  }
  return (
    <div className={cx('rounded-xl border px-4 py-3.5', tones[tone])}>
      <div className="flex gap-3">
        {icon && (
          <span aria-hidden className="text-[17px] leading-tight">
            {icon}
          </span>
        )}
        <div className="min-w-0 text-[14.5px] leading-relaxed">
          {title && <p className="mb-0.5 font-bold text-ink">{title}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}
