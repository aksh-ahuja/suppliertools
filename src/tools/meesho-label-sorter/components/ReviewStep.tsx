'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useLabelSorter } from '../state/store'
import { organise, summarise } from '../lib/sort'
import { generateSortedPdfs } from '../lib/generate'
import type { GeneratedFile, ParsedJob } from '../types'
import { Notice, Panel, ProgressBar } from './Primitives'

interface Props {
  job: ParsedJob
  onFixNames: () => void
  onAgain: () => void
  onSettings: () => void
}

export function ReviewStep({ job, onFixNames, onAgain, onSettings }: Props) {
  const { t, state, shop } = useLabelSorter()
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0, saving: false })
  const [results, setResults] = useState<GeneratedFile[]>([])
  const [error, setError] = useState('')
  const urlsRef = useRef<string[]>([])

  // Re-run whenever the mapping or the preferences change, so the table always
  // matches what pressing the button would produce.
  const organised = useMemo(
    () => organise(job, shop, state.prefs),
    [job, shop, state.prefs],
  )

  // Any change invalidates a previously generated download.
  useEffect(() => {
    setResults([])
  }, [organised, state.prefs])

  useEffect(
    () => () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    },
    [],
  )

  const stats = useMemo(() => {
    const pages = organised.pages
    const products = new Set(pages.filter((p) => p.mapped).map((p) => p.product))
    const couriers = new Set(pages.map((p) => p.courier))
    const missingPages = pages.filter((p) => !p.mapped)
    const missingSkus = new Set(missingPages.map((p) => p.sku).filter(Boolean))
    return {
      pages: pages.length,
      products: products.size,
      couriers: couriers.size,
      missingPages: missingPages.length,
      missingSkus: missingSkus.size,
    }
  }, [organised])

  const outputLabel = state.prefs.splitBy.length
    ? t.rv_outputSep(state.prefs.splitBy.map((f) => t[`f_${f}` as const]).join(' + '))
    : t.rv_outputOne

  const generate = async () => {
    setBusy(true)
    setError('')
    urlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    urlsRef.current = []

    try {
      const files = await generateSortedPdfs({
        job: organised,
        prefs: state.prefs,
        shopName: shop?.name ?? 'labels',
        labels: { size: t.lbl_size, qty: t.lbl_qty, set: t.lbl_set },
        onProgress: (done, total, saving) => setProgress({ done, total, saving }),
      })
      urlsRef.current = files.map((f) => f.url)
      setResults(files)
    } catch (err) {
      console.error(err)
      setError(t.e_readFail)
    } finally {
      setBusy(false)
    }
  }

  const downloadAll = async () => {
    for (const file of results) {
      const link = document.createElement('a')
      link.href = file.url
      link.download = file.name
      link.click()
      await new Promise((r) => setTimeout(r, 700))
    }
  }

  return (
    <div className="grid gap-4">
      <Panel>
        <h1 className="text-[20px] font-bold tracking-[-0.02em]">{t.rv_title}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{t.rv_pages(stats.pages)}</Badge>
          <Badge>{t.rv_products(stats.products)}</Badge>
          <Badge>{t.rv_couriers(stats.couriers)}</Badge>
          {stats.missingSkus > 0 && <Badge tone="warn">{t.rv_unmapped(stats.missingSkus)}</Badge>}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-bg-sunk/60 px-4 py-3">
          <p className="text-[14.5px]">
            <span className="font-semibold">{t.rv_output}:</span> {outputLabel}
          </p>
          <button
            type="button"
            onClick={onSettings}
            className="text-[14px] font-semibold text-accent hover:underline"
          >
            {t.change}
          </button>
        </div>
      </Panel>

      {stats.missingSkus > 0 ? (
        <Panel>
          <Notice tone="warn" icon="⚠️" title={t.rv_missingTitle}>
            {t.rv_missingBody(stats.missingSkus, stats.missingPages)}
          </Notice>
          <Button variant="secondary" className="mt-4" onClick={onFixNames}>
            {t.rv_fixNow}
          </Button>
        </Panel>
      ) : (
        state.prefs.mappingEnabled && (
          <Notice tone="ok" icon="✅">
            {t.rv_allMapped}
          </Notice>
        )
      )}

      {organised.files.map((file, i) => {
        const rows = summarise(file)
        return (
          <Panel key={file.key || i} padded={false}>
            {organised.files.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
                <p className="text-[14.5px] font-semibold">
                  {t.rv_file(i + 1)} {file.key && <span className="text-muted">· {file.key}</span>}
                </p>
                <Badge>{t.rv_pages(file.pages.length)}</Badge>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-line text-left text-[12.5px] uppercase tracking-[0.05em] text-faint">
                    <th className="px-4 py-3 font-bold">{t.th_set}</th>
                    <th className="px-4 py-3 font-bold">{t.th_product}</th>
                    <th className="px-4 py-3 font-bold">{t.th_size}</th>
                    <th className="px-4 py-3 font-bold">{t.th_qty}</th>
                    <th className="px-4 py-3 font-bold">{t.th_courier}</th>
                    <th className="px-4 py-3 text-right font-bold">{t.th_pages}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={`${row.group}-${row.product}`} className="border-b border-line-soft last:border-0">
                      <td className="px-4 py-3 tabular-nums text-muted">{row.group}</td>
                      <td className="px-4 py-3 font-medium">
                        {!row.mapped && <span aria-hidden>⚠️ </span>}
                        {row.product}
                      </td>
                      <td className="px-4 py-3">{row.size}</td>
                      <td className="px-4 py-3 tabular-nums">{row.qty}</td>
                      <td className="px-4 py-3">{row.courier}</td>
                      <td className="px-4 py-3 text-right font-semibold tabular-nums">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        )
      })}

      <Panel>
        {error && (
          <div className="mb-4">
            <Notice tone="warn" icon="⚠️">
              {error}
            </Notice>
          </div>
        )}

        {results.length === 0 ? (
          <>
            <Button size="lg" className="w-full sm:w-auto" onClick={generate} disabled={busy}>
              {t.rv_generate}
            </Button>
            {busy && (
              <div className="mt-4">
                <ProgressBar
                  value={progress.total ? (progress.done / progress.total) * 100 : 0}
                  label={
                    progress.saving
                      ? t.rv_saving
                      : t.rv_generating(progress.done, progress.total)
                  }
                />
              </div>
            )}
          </>
        ) : (
          <div>
            <Notice tone="ok" icon="✅">
              {results.length > 1
                ? t.rv_doneMany(stats.pages, results.length)
                : t.rv_done(stats.pages)}
            </Notice>

            <div className="mt-4 grid gap-2">
              {results.map((file) => (
                <a
                  key={file.url}
                  href={file.url}
                  download={file.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3.5 text-[15px] font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="min-w-0 truncate">
                    ⬇ {file.key ? file.key : file.name}
                  </span>
                  <span className="flex-none text-[13px] font-medium text-muted">
                    {t.rv_pages(file.pages)}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              {results.length > 1 && (
                <Button onClick={downloadAll}>{t.rv_downloadAll}</Button>
              )}
              <Button variant="secondary" onClick={onAgain}>
                {t.rv_again}
              </Button>
            </div>
          </div>
        )}
      </Panel>
    </div>
  )
}
