'use client'

import { useRef, useState } from 'react'
import { cx } from '@/lib/utils'
import { useLabelSorter } from '../state/store'
import { NoLabelsFoundError, NotAPdfError, readLabelPdfs } from '../lib/pdfjs'
import type { ParsedJob } from '../types'
import { Notice, Panel, ProgressBar } from './Primitives'

export function UploadStep({ onParsed }: { onParsed: (job: ParsedJob) => void }) {
  const { t, rememberSkus } = useLabelSorter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [error, setError] = useState('')

  const handleFiles = async (fileList: FileList | null) => {
    const files = Array.from(fileList ?? [])
    if (!files.length) return

    setError('')
    setBusy(true)
    setProgress({ done: 0, total: 0 })

    try {
      const job = await readLabelPdfs(files, setProgress)
      rememberSkus(job.pages.map((p) => p.sku).filter(Boolean))
      onParsed(job)
    } catch (err) {
      if (err instanceof NotAPdfError) setError(t.e_notPdf)
      else if (err instanceof NoLabelsFoundError) setError(t.e_noLabels)
      else {
        console.error(err)
        setError(t.e_readFail)
      }
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const percent = progress.total ? (progress.done / progress.total) * 100 : 0

  return (
    <Panel>
      <h1 className="text-[20px] font-bold tracking-[-0.02em]">{t.up_title}</h1>
      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{t.up_body}</p>

      {error && (
        <div className="mt-4">
          <Notice tone="warn" icon="⚠️">
            {error}
          </Notice>
        </div>
      )}

      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          void handleFiles(e.dataTransfer.files)
        }}
        className={cx(
          'mt-5 grid w-full place-items-center rounded-[var(--radius-card)] border-2 border-dashed px-5 py-12 transition-colors',
          dragging ? 'border-accent bg-accent-soft' : 'border-line bg-bg-sunk/40 hover:border-faint',
          busy && 'cursor-wait opacity-60',
        )}
      >
        <span className="text-[34px]" aria-hidden>
          📄
        </span>
        <span className="mt-3 text-[16.5px] font-semibold">{t.up_pick}</span>
        <span className="mt-1 text-[13.5px] text-muted">{t.up_multi}</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        multiple
        className="sr-only"
        onChange={(e) => void handleFiles(e.target.files)}
      />

      {busy && (
        <div className="mt-5">
          <ProgressBar
            value={percent}
            label={
              progress.total ? t.up_reading(progress.done, progress.total) : t.up_opening
            }
          />
        </div>
      )}

      <p className="mt-6 text-[13px] leading-relaxed text-muted">{t.privacyNote}</p>
    </Panel>
  )
}
