/**
 * pdf.js needs its worker served as a real file. Copy it into /public at build
 * time so the version can never drift from the library in node_modules.
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const source = resolve(root, 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs')
const target = resolve(root, 'public/vendor/pdf.worker.min.mjs')

mkdirSync(dirname(target), { recursive: true })
copyFileSync(source, target)
console.log('[copy-pdf-worker] public/vendor/pdf.worker.min.mjs')
