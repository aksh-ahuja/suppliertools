import { SIZE_TOKENS } from './sizes'
import { cutFromAnchor, fallbackCut } from './crop'
import type { ViewMap } from './geometry'

export interface LabelRow {
  sku: string
  size: string
  qty: string
}

export interface ParsedLabel {
  courier: string
  rows: LabelRow[]
  /** Lowest text on the page, used to place the stamp below the label. */
  bottom: number | null
  /**
   * View-space y of the cut between the label and the tax invoice, for
   * cropping. Null when the page carries no invoice to cut away.
   */
  cut: number | null
  /** False when `cut` is a guess because no TAX INVOICE run was found. */
  cutFound: boolean
}

interface TextItem {
  str: string
  transform: number[]
  width: number
  height: number
}

interface Positioned {
  s: string
  x0: number
  x1: number
  y: number
  fs: number
}

/**
 * Measures how much of a string's width a trailing substring takes up.
 * Used to work out where a run of text like `2pc_COMBO_LEGENDM` splits into a
 * SKU and a size, by checking whether the split lands on the Size column.
 */
let measureCtx: CanvasRenderingContext2D | null = null
function widthRatio(sub: string, full: string): number {
  if (!measureCtx) {
    const canvas = document.createElement('canvas')
    measureCtx = canvas.getContext('2d')
    if (measureCtx) measureCtx.font = '100px Helvetica, Arial, sans-serif'
  }
  if (!measureCtx) return 0
  const base = measureCtx.measureText(full).width
  return base ? measureCtx.measureText(sub).width / base : 0
}

/**
 * Reads one Meesho label page.
 *
 * The layout is a two-column label block on top and a "Product Details" table
 * underneath. We anchor on the `SKU` header cell and read the row below it,
 * using the x positions of the `Size`, `Qty` and `Color` headers as column
 * boundaries. That survives label revisions better than fixed coordinates.
 */
export function parseLabelPage(items: TextItem[], vm: ViewMap): ParsedLabel {
  const texts: Positioned[] = []
  for (const item of items) {
    if (!item.str || !item.str.trim()) continue
    const [x, y] = vm.to(item.transform[4], item.transform[5])
    texts.push({
      s: item.str.trim(),
      x0: x,
      x1: x + item.width,
      y,
      fs: Math.hypot(item.transform[2], item.transform[3]) || item.height || 10,
    })
  }

  const out: ParsedLabel = { courier: '', rows: [], bottom: null, cut: null, cutFound: false }
  if (!texts.length) return out
  out.bottom = Math.min(...texts.map((t) => t.y)) - 3

  /*
   * The cut line for cropping. Anchor on the topmost TAX INVOICE run, since a
   * page can carry more than one invoice block. Everything above the band's
   * top edge is the label; everything below is the invoice.
   */
  const band = texts
    .filter((t) => /^TAX\s+INVOICE$/i.test(t.s))
    .sort((a, b) => b.y - a.y)[0]
  if (band) {
    out.cut = cutFromAnchor(band.y, band.fs)
    out.cutFound = true
  } else if (texts.some((t) => /^BILL TO/i.test(t.s) || /GSTIN/i.test(t.s))) {
    // Invoice-like content but no band we recognise: crop, but flag the guess.
    out.cut = fallbackCut(vm.H)
    out.cutFound = false
  }

  // Delivery partner: the top-most large text in the right half of the label.
  const candidates = texts.filter(
    (t) => t.x0 > vm.W * 0.4 && t.fs >= 13 && vm.H - t.y > 36 && vm.H - t.y < 100,
  )
  if (candidates.length) {
    const top = Math.max(...candidates.map((t) => t.y))
    const row = candidates.filter((t) => t.y > top - 8).sort((a, b) => a.x0 - b.x0)
    out.courier = row[0].s.replace(/[^A-Za-z0-9 .&-]/g, '').trim()
  }

  const header = texts.filter((t) => t.s === 'SKU').sort((a, b) => b.y - a.y)[0]
  if (!header) return out

  const col: { size?: number; qty?: number; color?: number; order?: number } = {}
  for (const t of texts) {
    if (Math.abs(t.y - header.y) > 3) continue
    if (t.s === 'Size') col.size = t.x0
    if (t.s === 'Qty') col.qty = t.x0
    if (t.s === 'Color') col.color = t.x0
    if (/^Order/i.test(t.s) && col.order == null) col.order = t.x0
  }
  if (col.size == null || col.qty == null) return out
  const colEnd = col.color ?? col.order ?? Number.MAX_SAFE_INTEGER

  // Collect the table rows sitting just below the header.
  const lines: { y: number; items: Positioned[] }[] = []
  let prevY = header.y
  for (const t of texts.filter((t) => t.y < header.y - 4).sort((a, b) => b.y - a.y)) {
    if (prevY - t.y > 30) break
    if (/^TAX INVOICE$/i.test(t.s) || /^BILL TO/i.test(t.s)) break
    let line = lines.find((l) => Math.abs(l.y - t.y) < 3)
    if (!line) {
      line = { y: t.y, items: [] }
      lines.push(line)
      prevY = t.y
    }
    line.items.push(t)
  }

  for (const line of lines) {
    const cells = line.items.sort((a, b) => a.x0 - b.x0)
    let sku = cells
      .filter((t) => t.x0 < col.size! - 2)
      .map((t) => t.s)
      .join(' ')
      .trim()
    let size = cells
      .filter((t) => t.x0 >= col.size! - 2 && t.x0 < col.qty! - 2)
      .map((t) => t.s)
      .join(' ')
      .trim()
    const qty = cells
      .filter((t) => t.x0 >= col.qty! - 2 && t.x0 < colEnd - 2)
      .map((t) => t.s)
      .join(' ')
      .trim()

    // Some label versions render the size glued onto the end of the SKU run.
    if (!size) {
      const overhang = cells.filter((t) => t.x0 < col.size! - 2 && t.x1 > col.size! - 2).pop()
      if (overhang) {
        const text = overhang.s
        let best: { distance: number; tail: string } | null = null
        for (const token of SIZE_TOKENS) {
          if (!text.toUpperCase().endsWith(token)) continue
          const tail = text.slice(text.length - token.length)
          const tailWidth = (overhang.x1 - overhang.x0) * widthRatio(tail, text)
          const distance = Math.abs(overhang.x1 - tailWidth - col.size!)
          if (!best || distance < best.distance) best = { distance, tail }
        }
        if (best && best.distance < 6) {
          size = best.tail
          sku = sku.slice(0, sku.length - best.tail.length).trim()
        }
      }
    }

    if (!sku) continue
    out.rows.push({ sku, size: size || '-', qty: qty || '1' })
  }

  return out
}
