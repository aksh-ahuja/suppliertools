'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cx } from '@/lib/utils'
import { useLabelSorter } from '../state/store'
import { dictionaries, locales, type Locale } from '../i18n'
import { countSkus } from '../lib/mapping'
import { DEFAULT_PREFS } from '../lib/storage'
import { Notice, Panel, PanelHead, TextField } from './Primitives'
import {
  MappingToggle,
  PrintControl,
  SortOrderControl,
  SplitControl,
  StampPreview,
} from './PreferenceControls'

export function SettingsPanel() {
  const {
    t,
    state,
    shop,
    setLang,
    setPrefs,
    addShop,
    useShop,
    deleteShop,
    exportBackup,
    importBackup,
    resetEverything,
  } = useLabelSorter()

  const [newShop, setNewShop] = useState('')
  const [shopError, setShopError] = useState('')
  const [importError, setImportError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const submitShop = () => {
    const clean = newShop.trim()
    if (!clean) {
      setShopError(t.e_needName)
      return
    }
    if (!addShop(clean)) {
      setShopError(t.e_dupeShop)
      return
    }
    setNewShop('')
    setShopError('')
  }

  const restore = async (file: File | undefined) => {
    if (!file) return
    const text = await file.text()
    setImportError(importBackup(text) ? '' : t.e_importFail)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="grid gap-4">
      <Panel>
        <PanelHead title={t.set_language} />
        <div className="flex flex-wrap gap-2">
          {locales.map((code: Locale) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={cx(
                'rounded-[var(--radius-pill)] border px-3.5 py-2 text-[14.5px] font-semibold transition-colors',
                state.lang === code
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-card text-ink-soft hover:border-faint',
              )}
            >
              {dictionaries[code].langName}
            </button>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHead title={t.set_sorting} hint={t.set_sortingHint} />
        <SortOrderControl />
      </Panel>

      <Panel>
        <PanelHead title={t.set_split} hint={t.set_splitHint} />
        <SplitControl />
      </Panel>

      <Panel>
        <PanelHead title={t.set_print} hint={t.set_printHint} />
        <PrintControl />
        <div className="mt-4">
          <StampPreview />
        </div>
      </Panel>

      <Panel>
        <PanelHead title={t.set_mapping} />
        <MappingToggle />
      </Panel>

      <Panel>
        <PanelHead title={t.set_shops} hint={t.set_shopsHint} />
        <ul className="grid gap-2">
          {state.shops.map((entry) => {
            const active = entry.id === state.activeShopId
            return (
              <li
                key={entry.id}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-bg-sunk/40 px-3.5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15.5px] font-semibold">{entry.name}</p>
                  <p className="text-[13px] text-muted">
                    {t.tile_mappingSub(entry.products.length, countSkus(entry))}
                  </p>
                </div>
                {active ? (
                  <Badge tone="ok">{t.set_active}</Badge>
                ) : (
                  <button
                    type="button"
                    onClick={() => useShop(entry.id)}
                    className="rounded-[var(--radius-pill)] border border-line bg-card px-3 py-1.5 text-[13.5px] font-semibold hover:border-faint"
                  >
                    {t.set_use}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t.set_deleteShop(entry.name))) deleteShop(entry.id)
                  }}
                  className="rounded-lg px-2 py-1.5 text-[13.5px] font-medium text-muted hover:text-danger"
                >
                  {t.remove}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <TextField
            value={newShop}
            onChange={(v) => {
              setNewShop(v)
              setShopError('')
            }}
            onEnter={submitShop}
            placeholder={t.set_shopPlaceholder}
          />
          <Button variant="secondary" className="flex-none" onClick={submitShop}>
            {t.set_addShop}
          </Button>
        </div>
        {shopError && <p className="mt-2 text-[13.5px] font-medium text-danger">{shopError}</p>}
      </Panel>

      <Panel>
        <PanelHead title={t.set_data} hint={t.set_dataHint} />
        {importError && (
          <div className="mb-4">
            <Notice tone="warn" icon="⚠️">
              {importError}
            </Notice>
          </div>
        )}
        <div className="flex flex-wrap gap-2.5">
          <Button variant="secondary" onClick={exportBackup}>
            {t.set_export}
          </Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>
            {t.set_import}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setPrefs({ ...DEFAULT_PREFS, print: { ...DEFAULT_PREFS.print } })}
          >
            {t.reset}
          </Button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(e) => void restore(e.target.files?.[0])}
        />

        <div className="mt-6 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => {
              if (window.confirm(t.set_clearConfirm)) resetEverything()
            }}
            className="rounded-[var(--radius-pill)] border border-danger/30 bg-danger-soft px-4 py-2.5 text-[14.5px] font-semibold text-danger transition-colors hover:bg-danger hover:text-white"
          >
            {t.set_clear}
          </button>
        </div>
      </Panel>

      {shop && (
        <p className="px-1 pb-2 text-[13px] text-muted">{t.privacyNote}</p>
      )}
    </div>
  )
}
