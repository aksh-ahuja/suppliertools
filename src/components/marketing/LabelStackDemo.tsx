import { cx } from '@/lib/utils'

interface Row {
  name: string
  size: string
  tone: 0 | 1 | 2
}

const tones = ['bg-accent', 'bg-ink', 'bg-faint']

const before: Row[] = [
  { name: 'LEGEND COMBO BLACK', size: 'M', tone: 0 },
  { name: 'WHITE TEE', size: 'XL', tone: 1 },
  { name: 'LION PRINT RED', size: 'L', tone: 2 },
  { name: 'LEGEND COMBO BLACK', size: 'L', tone: 0 },
  { name: 'WHITE TEE', size: 'M', tone: 1 },
  { name: 'LEGEND COMBO BLACK', size: 'M', tone: 0 },
]

const after: { rows: Row[]; count: string }[] = [
  {
    rows: [
      { name: 'LEGEND COMBO BLACK', size: 'M', tone: 0 },
      { name: 'LEGEND COMBO BLACK', size: 'M', tone: 0 },
      { name: 'LEGEND COMBO BLACK', size: 'L', tone: 0 },
    ],
    count: 'Set 1',
  },
  {
    rows: [
      { name: 'WHITE TEE', size: 'M', tone: 1 },
      { name: 'WHITE TEE', size: 'XL', tone: 1 },
    ],
    count: 'Set 2',
  },
  {
    rows: [{ name: 'LION PRINT RED', size: 'L', tone: 2 }],
    count: 'Set 3',
  },
]

function LabelRow({ row }: { row: Row }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-card px-3 py-2.5">
      <span className={cx('h-6 w-1 flex-none rounded-full', tones[row.tone])} />
      <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold tracking-[-0.01em]">
        {row.name}
      </span>
      <span className="flex-none rounded bg-bg-sunk px-1.5 py-0.5 text-[11px] font-bold text-muted">
        {row.size}
      </span>
    </div>
  )
}

/**
 * Shows the actual transformation rather than describing it. A seller
 * recognises their own printer output in the left column immediately.
 */
export function LabelStackDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-5">
      <div>
        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.1em] text-faint">
          What the panel gives you
        </p>
        <div className="grid gap-1.5">
          {before.map((row, i) => (
            <LabelRow key={i} row={row} />
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="hidden self-center text-[20px] text-faint sm:block sm:pt-8"
      >
        →
      </div>

      <div>
        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.1em] text-accent">
          What you get back
        </p>
        <div className="grid gap-3">
          {after.map((group) => (
            <div key={group.count}>
              <div className="grid gap-1.5">
                {group.rows.map((row, i) => (
                  <LabelRow key={i} row={row} />
                ))}
              </div>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                {group.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
