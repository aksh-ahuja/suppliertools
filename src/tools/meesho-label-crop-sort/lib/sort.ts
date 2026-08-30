import type { LabelPage, OutputFile, ParsedJob, Preferences, Shop, SortField } from '../types'
import { SORT_FIELDS } from '../types'
import { buildIndex, findProductName } from './mapping'
import { sizeRank } from './sizes'

export const DEFAULT_SORT: SortField[] = ['courier', 'product', 'size', 'qty']

/** Joins set keys. A control character can never appear in real label text. */
const KEY_SEP = String.fromCharCode(1)

export function normaliseSortOrder(order: SortField[] | undefined): SortField[] {
  const clean = (order ?? []).filter((f) => SORT_FIELDS.includes(f))
  for (const field of DEFAULT_SORT) if (!clean.includes(field)) clean.push(field)
  return clean.slice(0, SORT_FIELDS.length)
}

function fieldValue(page: LabelPage, field: SortField): string {
  if (field === 'courier') return page.courier
  if (field === 'product') return page.product ?? ''
  if (field === 'size') return page.size
  return page.qty
}

function compare(a: LabelPage, b: LabelPage, field: SortField): number {
  if (field === 'size') return sizeRank(a.size) - sizeRank(b.size)
  if (field === 'qty') return (Number.parseInt(a.qty, 10) || 0) - (Number.parseInt(b.qty, 10) || 0)
  return fieldValue(a, field).localeCompare(fieldValue(b, field), undefined, { sensitivity: 'base' })
}

/**
 * Resolves product names, sorts the pages, splits them into output files and
 * numbers each run of identical items. Pure enough that the UI can call it
 * again after every mapping change.
 */
export function organise(job: ParsedJob, shop: Shop | null, prefs: Preferences): ParsedJob {
  const index = buildIndex(prefs.mappingEnabled ? shop : null)

  for (const page of job.pages) {
    const name = prefs.mappingEnabled ? findProductName(index, page.sku) : null
    page.mapped = prefs.mappingEnabled ? !!name : true
    page.product = name ?? page.sku ?? '?'
  }

  const order = normaliseSortOrder(prefs.sortOrder)

  /**
   * Unnamed pages go last, but only inside their own courier pile when the
   * courier leads: a Delhivery label can never travel in the Valmo stack.
   */
  const flagAt = order[0] === 'courier' ? 1 : 0

  job.pages.sort((a, b) => {
    for (let i = 0; i < order.length; i++) {
      if (i === flagAt) {
        const flag = (a.mapped ? 0 : 1) - (b.mapped ? 0 : 1)
        if (flag) return flag
      }
      const result = compare(a, b, order[i])
      if (result) return result
    }
    return a.src - b.src || a.idx - b.idx
  })

  const split = (prefs.splitBy ?? []).filter((f) => SORT_FIELDS.includes(f))
  const files: OutputFile[] = []
  const byKey = new Map<string, OutputFile>()

  for (const page of job.pages) {
    const key = split.length ? split.map((f) => fieldValue(page, f)).join(' - ') : ''
    let file = byKey.get(key)
    if (!file) {
      file = { key, index: files.length, pages: [] }
      byKey.set(key, file)
      files.push(file)
    }
    file.pages.push(page)
    page.fileIdx = file.index
  }

  // Number each set inside its own file, so the printed number shows where one
  // pile ends and the next begins.
  for (const file of files) {
    let group = 0
    let previous: string | null = null
    for (const page of file.pages) {
      const key = [page.product, page.size, page.qty, page.courier].join(KEY_SEP)
      if (key !== previous) {
        group++
        previous = key
      }
      page.group = group
    }
    file.groups = group
  }

  job.files = files
  return job
}

export interface SummaryRow {
  group: number
  product: string
  size: string
  qty: string
  courier: string
  count: number
  mapped: boolean
}

/** Collapses a file's pages into one row per set, for the review table. */
export function summarise(file: OutputFile): SummaryRow[] {
  const rows: SummaryRow[] = []
  for (const page of file.pages) {
    const last = rows[rows.length - 1]
    if (last && last.group === page.group) {
      last.count++
      continue
    }
    rows.push({
      group: page.group ?? 0,
      product: page.product ?? '',
      size: page.size,
      qty: page.qty,
      courier: page.courier,
      count: 1,
      mapped: page.mapped ?? false,
    })
  }
  return rows
}
