import type { ViewMap } from './geometry'
import { viewMap } from './geometry'
import { parseLabelPage } from './parseLabel'
import type { LabelPage, ParsedJob } from '../types'

/** Path of the worker copied into /public by scripts/copy-pdf-worker.mjs. */
const WORKER_SRC = '/vendor/pdf.worker.min.mjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pdfjs: any = null

/**
 * pdf.js is heavy and browser-only, so it is imported on demand the first time
 * a file is opened rather than in the page bundle.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadPdfjs(): Promise<any> {
  if (pdfjs) return pdfjs

  // Safari before 17 lacks Promise.withResolvers, which pdf.js 4 relies on.
  if (typeof Promise.withResolvers !== 'function') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(Promise as any).withResolvers = function withResolvers<T>() {
      let resolve!: (value: T | PromiseLike<T>) => void
      let reject!: (reason?: unknown) => void
      const promise = new Promise<T>((res, rej) => {
        resolve = res
        reject = rej
      })
      return { promise, resolve, reject }
    }
  }

  const lib = await import('pdfjs-dist')
  lib.GlobalWorkerOptions.workerSrc = WORKER_SRC
  pdfjs = lib
  return pdfjs
}

export class NotAPdfError extends Error {}
export class NoLabelsFoundError extends Error {}

export interface ReadProgress {
  done: number
  total: number
}

/**
 * Opens every selected file, reads the text layer of each page and turns it
 * into a flat list of label pages. The raw bytes are kept because pdf-lib needs
 * them again to copy the original pages into the output.
 */
export async function readLabelPdfs(
  files: File[],
  onProgress: (p: ReadProgress) => void,
): Promise<ParsedJob> {
  const lib = await loadPdfjs()

  const job: ParsedJob = { sourceBytes: [], sourceNames: [], pages: [], files: [] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const documents: any[] = []

  for (const file of files) {
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
    if (!isPdf) throw new NotAPdfError(file.name)

    const bytes = await file.arrayBuffer()
    job.sourceBytes.push(bytes)
    job.sourceNames.push(file.name)
    // pdf.js takes ownership of the buffer it is given, so hand it a copy.
    const task = lib.getDocument({ data: new Uint8Array(bytes.slice(0)) })
    documents.push(await task.promise)
  }

  const total = documents.reduce((sum, doc) => sum + doc.numPages, 0)
  let done = 0
  onProgress({ done, total })

  for (let s = 0; s < documents.length; s++) {
    const doc = documents[s]
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n)
      const view = page.view as number[]
      const vm: ViewMap = viewMap(page.rotate || 0, view[2] - view[0], view[3] - view[1])
      const content = await page.getTextContent()
      const parsed = parseLabelPage(content.items, vm)
      const first = parsed.rows[0]

      const labelPage: LabelPage = {
        src: s,
        idx: n - 1,
        sku: first ? first.sku : '',
        size: first ? first.size : '-',
        qty: first ? first.qty : '1',
        courier: parsed.courier || '-',
        bottom: parsed.bottom,
      }
      job.pages.push(labelPage)
      page.cleanup()

      done++
      if (done % 4 === 0 || done === total) {
        onProgress({ done, total })
        await new Promise((r) => setTimeout(r, 0))
      }
    }
    doc.destroy()
  }

  if (!job.pages.some((p) => p.sku)) throw new NoLabelsFoundError()
  return job
}
