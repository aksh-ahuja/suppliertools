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
import type { GeneratedFile, LabelPage, OutputFile, ParsedJob, Preferences } from '../types'
import { viewMap } from './geometry'
import { cropBoxFromCut, cropLayout, placeInCell } from './crop'

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

interface StampText {
  lineOne: string
  lineTwo: string
  tail: string
}

/** The lines the seller asked to see, in the order they get drawn. */
function stampText(info: LabelPage, prefs: Preferences, labels: StampLabels): StampText {
  const primary = prefs.print.product ? printable(info.product).toUpperCase() : ''

  const detailParts: string[] = []
  if (prefs.print.size) detailParts.push(`${labels.size} : ${printable(info.size).toUpperCase()}`)
  if (prefs.print.qty) detailParts.push(`${labels.qty} : ${printable(info.qty)}`)
  const secondary = detailParts.join('     ')

  const tailParts: string[] = []
  if (prefs.print.courier) tailParts.push(printable(info.courier).toUpperCase())
  if (prefs.print.setNumber && info.group) tailParts.push(`${labels.set} ${info.group}`)

  // If the product line is switched off, the detail line takes its place.
  return {
    lineOne: primary || secondary,
    lineTwo: primary ? secondary : '',
    tail: tailParts.join('   |   '),
  }
}

/** True when there is anything at all to stamp, so the caller can skip the strip. */
export function hasStamp(info: LabelPage, prefs: Preferences, labels: StampLabels): boolean {
  const { lineOne, lineTwo, tail } = stampText(info, prefs, labels)
  return Boolean(lineOne || lineTwo || tail)
}

/**
 * Draws the stamp into a reserved strip on a cropped page.
 *
 * The uncropped path can drop the block into the empty A4 space below the
 * label. Once the invoice is cut away that space is gone, so cropped output
 * reserves a strip and the text is fitted to it.
 */
export function stampIntoRect(
  page: PDFPage,
  info: LabelPage,
  prefs: Preferences,
  fonts: { bold: PDFFont; regular: PDFFont },
  labels: StampLabels,
  rect: { x: number; y: number; width: number; height: number },
  draw: Pick<PdfLib, 'rgb'>,
): void {
  const { rgb } = draw
  const { lineOne, lineTwo, tail } = stampText(info, prefs, labels)
  if (!lineOne && !lineTwo && !tail) return

  const padX = Math.min(10, rect.width * 0.04)
  const padY = Math.min(3.5, rect.height * 0.08)
  const maxW = rect.width - padX * 2

  // Share the strip between the lines that are actually present.
  const inner = rect.height - padY * 2
  const tailH = tail ? Math.min(9, inner * 0.22) : 0
  const body = inner - tailH
  const oneShare = lineTwo ? body * 0.56 : body
  const twoShare = lineTwo ? body * 0.44 : 0

  const sizeOne = lineOne ? fitSize(fonts.bold, lineOne, maxW, oneShare * 0.82, 6) : 0
  const sizeTwo = lineTwo ? fitSize(fonts.bold, lineTwo, maxW, twoShare * 0.82, 6) : 0
  const sizeTail = tail ? fitSize(fonts.regular, tail, maxW, tailH * 0.86, 5) : 0

  const put = (font: PDFFont, text: string, size: number, baseline: number) => {
    const w = font.widthOfTextAtSize(text, size)
    page.drawText(text, {
      x: rect.x + (rect.width - w) / 2,
      y: baseline,
      size,
      font,
      color: rgb(0, 0, 0),
    })
  }

  /*
   * Leading, not the plain descender. SKU-derived product names are full of
   * underscores, which hang lower than DESC allows for and would otherwise
   * touch the line beneath.
   */
  const LEAD = 0.46

  let cursor = rect.y + rect.height - padY
  if (lineOne) {
    cursor -= sizeOne * CAP
    put(fonts.bold, lineOne, sizeOne, cursor)
    cursor -= sizeOne * LEAD
  }
  if (lineTwo) {
    cursor -= sizeTwo * CAP
    put(fonts.bold, lineTwo, sizeTwo, cursor)
    cursor -= sizeTwo * DESC
  }
  if (tail) put(fonts.regular, tail, sizeTail, rect.y + padY)

  page.drawRectangle({
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    borderWidth: 1,
    borderColor: rgb(0, 0, 0),
  })
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

  const { lineOne, lineTwo, tail } = stampText(info, prefs, labels)
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

/** Height of the strip reserved under a cropped label for the stamp. */
function stripHeight(reference: number, wanted: boolean): number {
  if (!wanted) return 0
  return Math.max(24, Math.min(60, reference * 0.14))
}

/**
 * Builds one cropped output document.
 *
 * Each source page is embedded through a form XObject whose BBox is the label
 * region, which is what makes the cut real: the invoice is not part of the
 * embedded content, so it is not in the output to be extracted later. Pages
 * carrying no invoice at all are embedded whole rather than guessed at. Pages
 * whose band was estimated are counted by the caller, which warns about them.
 */
async function buildCropped(
  out: Awaited<ReturnType<PdfLib['PDFDocument']['create']>>,
  sources: Awaited<ReturnType<PdfLib['PDFDocument']['load']>>[],
  file: OutputFile,
  prefs: Preferences,
  fonts: { bold: PDFFont; regular: PDFFont },
  labels: StampLabels,
  draw: Pick<PdfLib, 'rgb' | 'degrees'>,
  onPage: () => Promise<void>,
): Promise<void> {
  const { degrees } = draw

  const embedded = []
  for (const info of file.pages) {
    const srcPage = sources[info.src].getPage(info.idx)
    const { width, height } = srcPage.getSize()
    const rotation = srcPage.getRotation().angle
    const vm = viewMap(rotation, width, height)

    let box
    if (info.cut != null) {
      box = cropBoxFromCut(info.cut, vm)
    } else {
      box = { left: 0, bottom: 0, right: width, top: height }
    }
    embedded.push({
      page: await out.embedPage(srcPage, box),
      info,
      rotation,
    })
  }

  const wantStamp = file.pages.some((p) => hasStamp(p, prefs, labels))
  const first = embedded[0]
  const upright = ((first.rotation % 360) + 360) % 360 % 180 === 0
  const labelW = upright ? first.page.width : first.page.height
  const labelH = upright ? first.page.height : first.page.width

  /*
   * In 'crop' mode the page is the label plus the strip, so the strip has to
   * be measured before the layout and then reused — measuring it again from
   * the finished page height would give a taller strip than the page was
   * sized for, and the label would be squeezed to fit.
   */
  const strip = stripHeight(labelH, wantStamp)
  const layout = cropLayout(
    prefs.crop,
    labelW,
    labelH + (prefs.crop === 'crop' ? strip : 0),
  )
  const cellStrip =
    prefs.crop === 'crop' ? strip : stripHeight(layout.cells[0].height, wantStamp)

  for (let i = 0; i < embedded.length; i += layout.perPage) {
    const page = out.addPage([layout.pageWidth, layout.pageHeight])
    const batch = embedded.slice(i, i + layout.perPage)

    for (let c = 0; c < batch.length; c++) {
      const cell = layout.cells[c]
      const { page: form, info, rotation } = batch[c]

      const placed = placeInCell(
        {
          x: cell.x,
          y: cell.y + cellStrip,
          width: cell.width,
          height: cell.height - cellStrip,
        },
        form.width,
        form.height,
        layout.perPage > 1 ? 6 : 0,
        rotation,
      )

      page.drawPage(form, {
        x: placed.x,
        y: placed.y,
        width: placed.width,
        height: placed.height,
        rotate: degrees(placed.rotate),
      })

      if (cellStrip > 0) {
        stampIntoRect(
          page,
          info,
          prefs,
          fonts,
          labels,
          {
            x: cell.x + 4,
            y: cell.y + 3,
            width: cell.width - 8,
            height: cellStrip - 5,
          },
          draw,
        )
      }
      await onPage()
    }
  }
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

    if (prefs.crop !== 'off') {
      await buildCropped(out, sources, file, prefs, fonts, labels, { rgb, degrees }, async () => {
        done++
        if (done % 6 === 0 || done === total) {
          onProgress(done, total, false)
          await new Promise((r) => setTimeout(r, 0))
        }
      })

      onProgress(done, total, true)
      await new Promise((r) => setTimeout(r, 0))

      const cropped = await out.save()
      const croppedBlob = new Blob([cropped as unknown as BlobPart], { type: 'application/pdf' })
      results.push({
        url: URL.createObjectURL(croppedBlob),
        name: safeFileName(job, shopName, file.key, fileIndex),
        pages: Math.ceil(file.pages.length / (prefs.crop === 'a4-4up' ? 4 : 1)),
        key: file.key,
      })
      continue
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
