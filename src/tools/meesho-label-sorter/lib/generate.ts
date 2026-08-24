import type { PDFFont, PDFPage } from 'pdf-lib'

/**
 * pdf-lib is only needed once the user actually presses "make the PDF", so it
 * is loaded on demand rather than shipped in the page bundle.
 */
type PdfLib = typeof import('pdf-lib')
let pdfLib: PdfLib | null = null
async function loadPdfLib(): Promise<PdfLib> {
  if (!pdfLib) pdfLib = await import('pdf-lib')
  return pdfLib
}
import type { GeneratedFile, LabelPage, ParsedJob, Preferences } from '../types'
import { viewMap } from './geometry'

/** Helvetica cap height and descender, used to place text inside the box. */
const CAP = 0.72
const DESC = 0.21

/**
 * The built-in PDF fonts only cover Latin. Product names are almost always
 * typed in English, but strip anything unprintable rather than crashing.
 */
function printable(value: string | undefined): string {
  const latin1 = (value ?? '').replace(/[^\x20-\x7E\xA0-\xFF]/g, '').trim()
  if (latin1) return latin1
  const ascii = (value ?? '').replace(/[^\x20-\x7E]/g, '').trim()
  return ascii || '?'
}

function fitSize(font: PDFFont, text: string, maxWidth: number, start: number, min: number): number {
  let size = start
  while (size > min && font.widthOfTextAtSize(text, size) > maxWidth) size -= 0.5
  return size
}

export interface StampLabels {
  size: string
  qty: string
  set: string
}

/**
 * Draws the information block underneath the original label.
 *
 * Nothing on the source page is edited or covered: the box is placed in the
 * blank area below the lowest text found while parsing, so the barcode, the
 * address block and the tax invoice all stay exactly as Meesho produced them.
 */
export function stampPage(
  page: PDFPage,
  info: LabelPage,
  prefs: Preferences,
  fonts: { bold: PDFFont; regular: PDFFont },
  labels: StampLabels,
  draw: Pick<PdfLib, 'rgb' | 'degrees'>,
): void {
  const { rgb, degrees } = draw
  const { width, height } = page.getSize()
  const vm = viewMap(page.getRotation().angle, width, height)

  const margin = Math.max(22, vm.W * 0.075)
  const padX = 20
  const padY = 20
  const gap = 12
  const topGap = 28
  const boxW = vm.W - margin * 2
  const maxW = boxW - padX * 2

  // Build the lines that were actually asked for.
  const primary = prefs.print.product ? printable(info.product).toUpperCase() : ''

  const detailParts: string[] = []
  if (prefs.print.size) detailParts.push(`${labels.size} : ${printable(info.size).toUpperCase()}`)
  if (prefs.print.qty) detailParts.push(`${labels.qty} : ${printable(info.qty)}`)
  const secondary = detailParts.join('     ')

  const tailParts: string[] = []
  if (prefs.print.courier) tailParts.push(printable(info.courier).toUpperCase())
  if (prefs.print.setNumber && info.group) tailParts.push(`${labels.set} ${info.group}`)
  const tail = tailParts.join('   |   ')

  // If the product line is switched off, the detail line takes its place.
  const lineOne = primary || secondary
  const lineTwo = primary ? secondary : ''
  if (!lineOne && !lineTwo && !tail) return

  const sizeOne = lineOne ? fitSize(fonts.bold, lineOne, maxW, 30, 11) : 0
  const sizeTwo = lineTwo ? fitSize(fonts.bold, lineTwo, maxW, 25, 11) : 0
  const sizeTail = tail ? fitSize(fonts.regular, tail, boxW, 10.5, 8) : 0

  const lead = lineTwo ? sizeOne * (1 - CAP) + gap + sizeTwo * CAP : 0
  const boxH = lineOne
    ? padY + sizeOne * CAP + lead + (lineTwo ? sizeTwo * DESC : 0) + padY
    : 0
  const tailH = tail ? 7 + sizeTail : 0

  let top = (info.bottom ?? vm.H * 0.3) - topGap
  if (top - boxH - tailH < 10) top = boxH + tailH + 10
  if (top > vm.H - 10) top = vm.H - 10
  const bottom = top - boxH

  if (boxH > 0) {
    const [bx, by] = vm.back(margin, bottom)
    page.drawRectangle({
      x: bx,
      y: by,
      width: boxW,
      height: boxH,
      borderWidth: 1.6,
      borderColor: rgb(0, 0, 0),
      rotate: degrees(vm.rotation),
    })
  }

  const put = (font: PDFFont, text: string, size: number, viewY: number) => {
    const textWidth = font.widthOfTextAtSize(text, size)
    const [x, y] = vm.back((vm.W - textWidth) / 2, viewY)
    page.drawText(text, { x, y, size, font, color: rgb(0, 0, 0), rotate: degrees(vm.rotation) })
  }

  if (lineOne) {
    const baseline = top - padY - sizeOne * CAP
    put(fonts.bold, lineOne, sizeOne, baseline)
    if (lineTwo) put(fonts.bold, lineTwo, sizeTwo, baseline - lead)
  }
  if (tail) put(fonts.regular, tail, sizeTail, (boxH ? bottom : top) - 7 - sizeTail * CAP)
}

export interface GenerateOptions {
  job: ParsedJob
  prefs: Preferences
  shopName: string
  labels: StampLabels
  onProgress: (done: number, total: number, saving: boolean) => void
}

function safeFileName(job: ParsedJob, shopName: string, key: string, index: number): string {
  const shop = shopName.replace(/[^\w-]+/g, '_') || 'labels'
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  const day = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const part = key ? `_${key.replace(/[^\w-]+/g, '-').replace(/^-|-$/g, '')}` : ''
  const nth = job.files.length > 1 && !key ? `_${index + 1}` : ''
  return `${shop}_sorted${part}${nth}_${day}.pdf`
}

/**
 * Copies the original pages into new documents in sorted order and stamps each
 * one. Pages are copied, never re-rendered, so the output keeps the exact
 * barcodes and invoice of the source file.
 */
export async function generateSortedPdfs({
  job,
  prefs,
  shopName,
  labels,
  onProgress,
}: GenerateOptions): Promise<GeneratedFile[]> {
  const lib = await loadPdfLib()
  const { PDFDocument, StandardFonts, rgb, degrees } = lib

  const sources = []
  for (const bytes of job.sourceBytes) {
    sources.push(await PDFDocument.load(bytes, { ignoreEncryption: true }))
  }

  const results: GeneratedFile[] = []
  const total = job.pages.length
  let done = 0

  for (let fileIndex = 0; fileIndex < job.files.length; fileIndex++) {
    const file = job.files[fileIndex]
    const out = await PDFDocument.create()
    const fonts = {
      bold: await out.embedFont(StandardFonts.HelveticaBold),
      regular: await out.embedFont(StandardFonts.Helvetica),
    }

    // Copy in one call per source document, then place them in sorted order.
    const byDoc = new Map<number, { page: LabelPage; order: number }[]>()
    file.pages.forEach((page, order) => {
      const list = byDoc.get(page.src) ?? []
      list.push({ page, order })
      byDoc.set(page.src, list)
    })

    const slots = new Array<Awaited<ReturnType<typeof out.copyPages>>[number]>(file.pages.length)
    for (const [src, list] of byDoc) {
      const copied = await out.copyPages(sources[src], list.map((x) => x.page.idx))
      list.forEach((x, k) => {
        slots[x.order] = copied[k]
      })
    }

    for (let i = 0; i < slots.length; i++) {
      out.addPage(slots[i])
      stampPage(slots[i], file.pages[i], prefs, fonts, labels, { rgb, degrees })
      done++
      if (done % 6 === 0 || done === total) {
        onProgress(done, total, false)
        await new Promise((r) => setTimeout(r, 0))
      }
    }

    onProgress(done, total, true)
    await new Promise((r) => setTimeout(r, 0))

    const bytes = await out.save()
    const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' })
    results.push({
      url: URL.createObjectURL(blob),
      name: safeFileName(job, shopName, file.key, fileIndex),
      pages: file.pages.length,
      key: file.key,
    })
  }

  return results
}
