'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useLabelSorter } from '../state/store'
import { unmappedSkus } from '../lib/mapping'
import { makeId } from '../lib/sku'
import { Notice, Panel, TextField } from './Primitives'
import { SkuMultiSelect } from './SkuMultiSelect'

interface DraftRow {
  key: string
  name: string
  skus: string[]
}

/**
 * The mapping screen.
 *
 * One row per product: the name you use on the left, the Meesho SKU IDs that
 * belong to it on the right. "Add another product" appends an empty row whose
 * dropdown only offers SKU IDs nothing has claimed yet.
 */
export function MappingEditor({ onUpload }: { onUpload: () => void }) {
  const { t, shop, state, addProduct, renameProduct, setProductSkus, deleteProduct, setPrefs } =
    useLabelSorter()

  // Rows the user has started but not named yet live here rather than in
  // storage, so an empty row never becomes an empty product.
  const [drafts, setDrafts] = useState<DraftRow[]>([])

  // An empty screen with only an "add" button reads as broken to a first-time
  // user, so start them on a row that is ready to type into.
  const hasRows = (shop?.products.length ?? 0) > 0 || drafts.length > 0
  const hasSkus = (shop?.seenSkus.length ?? 0) > 0
  useEffect(() => {
    if (!hasRows && hasSkus) setDrafts([{ key: makeId(), name: '', skus: [] }])
  }, [hasRows, hasSkus])

  const free = useMemo(() => unmappedSkus(shop), [shop])
  const claimedByDrafts = useMemo(
    () => new Set(drafts.flatMap((d) => d.skus)),
    [drafts],
  )
  const availableForNew = useMemo(
    () => free.filter((sku) => !claimedByDrafts.has(sku)),
    [free, claimedByDrafts],
  )

  if (!state.prefs.mappingEnabled) {
    return (
      <Panel>
        <Notice tone="info" icon="ℹ️" title={t.map_disabled}>
          {t.map_disabledBody}
        </Notice>
        <div className="mt-4">
          <Button onClick={() => setPrefs({ mappingEnabled: true })}>{t.set_mappingOn}</Button>
        </div>
      </Panel>
    )
  }

  const noSkusYet = !shop || shop.seenSkus.length === 0

  const commitDraft = (draft: DraftRow) => {
    const created = addProduct(draft.name, draft.skus)
    if (!created) return
    setDrafts((prev) => prev.filter((d) => d.key !== draft.key))
  }

  return (
    <div className="grid gap-4">
      <Panel>
        <h2 className="text-[18px] font-bold tracking-[-0.02em]">{t.map_title}</h2>
        <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{t.map_body}</p>
        {free.length > 0 && (
          <p className="mt-3 inline-flex rounded-[var(--radius-pill)] border border-warn/25 bg-warn-soft px-3 py-1.5 text-[13px] font-semibold text-warn">
            {t.map_unmappedCount(free.length)}
          </p>
        )}
      </Panel>

      {noSkusYet ? (
        <Panel>
          <div className="py-6 text-center">
            <p className="text-[16.5px] font-bold">{t.map_empty}</p>
            <p className="mx-auto mt-2 max-w-[44ch] text-[14.5px] leading-relaxed text-muted">
              {t.map_emptyBody}
            </p>
            <Button className="mt-5" onClick={onUpload}>
              {t.map_uploadFirst}
            </Button>
          </div>
        </Panel>
      ) : (
        <>
          <div className="grid gap-3">
            {shop.products.map((product) => (
              <MappingRow
                key={product.id}
                nameLabel={t.f_product}
                skuLabel={t.map_selectSkus}
                namePlaceholder={t.map_productPlaceholder}
                name={product.name}
                skus={product.skus}
                available={availableForNew}
                onName={(value) => renameProduct(product.id, value)}
                onSkus={(value) => setProductSkus(product.id, value)}
                onDelete={() => {
                  if (window.confirm(t.map_deleteProduct(product.name || t.unnamed))) {
                    deleteProduct(product.id)
                  }
                }}
                deleteLabel={t.remove}
              />
            ))}

            {drafts.map((draft) => (
              <MappingRow
                key={draft.key}
                nameLabel={t.f_product}
                skuLabel={t.map_selectSkus}
                namePlaceholder={t.map_productPlaceholder}
                name={draft.name}
                skus={draft.skus}
                available={availableForNew}
                autoFocus
                onName={(value) =>
                  setDrafts((prev) =>
                    prev.map((d) => (d.key === draft.key ? { ...d, name: value } : d)),
                  )
                }
                onSkus={(value) =>
                  setDrafts((prev) =>
                    prev.map((d) => (d.key === draft.key ? { ...d, skus: value } : d)),
                  )
                }
                onBlurName={() => {
                  if (draft.name.trim()) commitDraft({ ...draft, name: draft.name })
                }}
                onDelete={() => setDrafts((prev) => prev.filter((d) => d.key !== draft.key))}
                deleteLabel={t.remove}
              />
            ))}
          </div>

          <div>
            <Button
              variant="secondary"
              onClick={() =>
                setDrafts((prev) => [...prev, { key: makeId(), name: '', skus: [] }])
              }
            >
              + {t.map_addMore}
            </Button>
          </div>

          {free.length === 0 && shop.products.length > 0 && (
            <Notice tone="ok" icon="✅">
              {t.map_noUnmapped}
            </Notice>
          )}
        </>
      )}
    </div>
  )
}

function MappingRow({
  name,
  skus,
  available,
  namePlaceholder,
  nameLabel,
  skuLabel,
  onName,
  onSkus,
  onBlurName,
  onDelete,
  deleteLabel,
  autoFocus,
}: {
  name: string
  skus: string[]
  available: string[]
  namePlaceholder: string
  nameLabel: string
  skuLabel: string
  onName: (value: string) => void
  onSkus: (value: string[]) => void
  onBlurName?: () => void
  onDelete: () => void
  deleteLabel: string
  autoFocus?: boolean
}) {
  const { t } = useLabelSorter()

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-4 shadow-[var(--shadow-card)] sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold uppercase tracking-[0.06em] text-faint">
            {nameLabel}
          </label>
          <div onBlur={onBlurName}>
            <TextField
              value={name}
              onChange={onName}
              placeholder={namePlaceholder}
              autoFocus={autoFocus}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[12.5px] font-bold uppercase tracking-[0.06em] text-faint">
            {skuLabel}
          </label>
          <SkuMultiSelect t={t} selected={skus} available={available} onChange={onSkus} />
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg px-2.5 py-1.5 text-[13.5px] font-medium text-muted transition-colors hover:bg-danger-soft hover:text-danger"
        >
          {deleteLabel}
        </button>
      </div>
    </div>
  )
}
