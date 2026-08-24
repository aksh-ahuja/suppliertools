'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { cx } from '@/lib/utils'
import { LabelSorterProvider, useLabelSorter } from '../state/store'
import { countSkus, unmappedSkus } from '../lib/mapping'
import { dictionaries, locales, type Locale } from '../i18n'
import type { ParsedJob } from '../types'
import { Onboarding } from './Onboarding'
import { UploadStep } from './UploadStep'
import { ReviewStep } from './ReviewStep'
import { MappingEditor } from './MappingEditor'
import { SettingsPanel } from './SettingsPanel'
import { Notice, Panel } from './Primitives'
import { ShopSwitcher } from './ShopSwitcher'

type Screen = 'home' | 'upload' | 'review' | 'mapping' | 'settings'

export function LabelSorterApp() {
  return (
    <LabelSorterProvider>
      <Shell />
    </LabelSorterProvider>
  )
}

function Shell() {
  const { ready, state, t, shop } = useLabelSorter()
  const [screen, setScreen] = useState<Screen>('home')
  const [job, setJob] = useState<ParsedJob | null>(null)

  // Keep the document language in step so screen readers and fonts follow.
  useEffect(() => {
    document.documentElement.lang = state.lang
  }, [state.lang])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [screen])

  if (!ready) {
    return (
      <Container width="narrow">
        <div className="py-24 text-center text-[15px] text-muted">...</div>
      </Container>
    )
  }

  const needsSetup = !state.onboarded || !shop

  return (
    <div className="pb-20">
      <Container width="narrow">
        <div className="py-6">
          <ToolHeader onManageShops={() => setScreen('settings')} />
        </div>

        {needsSetup ? (
          <Onboarding
            onDone={() => {
              setScreen('upload')
            }}
          />
        ) : (
          <>
            <Nav screen={screen} onNavigate={setScreen} hasJob={!!job} />

            <div className="mt-5">
              {screen === 'home' && <HomeScreen onNavigate={setScreen} />}

              {screen === 'upload' && (
                <UploadStep
                  onParsed={(parsed) => {
                    setJob(parsed)
                    setScreen('review')
                  }}
                />
              )}

              {screen === 'review' &&
                (job ? (
                  <ReviewStep
                    job={job}
                    onFixNames={() => setScreen('mapping')}
                    onSettings={() => setScreen('settings')}
                    onAgain={() => {
                      setJob(null)
                      setScreen('upload')
                    }}
                  />
                ) : (
                  <UploadStep
                    onParsed={(parsed) => {
                      setJob(parsed)
                      setScreen('review')
                    }}
                  />
                ))}

              {screen === 'mapping' && (
                <>
                  <MappingEditor onUpload={() => setScreen('upload')} />
                  {job && (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setScreen('review')}
                        className="w-full rounded-[var(--radius-pill)] bg-accent px-5 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-accent-hover"
                      >
                        {t.back} · {t.rv_title}
                      </button>
                    </div>
                  )}
                </>
              )}

              {screen === 'settings' && <SettingsPanel />}
            </div>
          </>
        )}

        <footer className="mt-14 border-t border-line pt-6 text-[13px] leading-relaxed text-muted">
          <p>{t.privacyNote}</p>
          <p className="mt-2">
            <Link href="/tools/meesho-label-sorter/" className="font-medium text-accent hover:underline">
              {t.appName}
            </Link>{' '}
            · <Link href="/" className="hover:text-ink">SupplierTools</Link>
          </p>
        </footer>
      </Container>
    </div>
  )
}

function ToolHeader({ onManageShops }: { onManageShops: () => void }) {
  const { t, state, setLang, shop } = useLabelSorter()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-accent text-[21px] text-white">
          🏷️
        </span>
        <div className="min-w-0">
          <h1 className="text-[19px] font-bold leading-tight tracking-[-0.02em]">{t.appName}</h1>
          {shop ? (
            <ShopSwitcher onManage={onManageShops} />
          ) : (
            <p className="text-[13px] text-muted">{t.appSub}</p>
          )}
        </div>
      </div>

      <label className="relative">
        <span className="sr-only">{t.set_language}</span>
        <select
          value={state.lang}
          onChange={(e) => setLang(e.target.value as Locale)}
          className="appearance-none rounded-[var(--radius-pill)] border border-line bg-card py-2 pl-4 pr-9 text-[14px] font-semibold text-ink outline-none focus:border-accent"
        >
          {locales.map((code) => (
            <option key={code} value={code}>
              {dictionaries[code].langName}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-muted">
          ▾
        </span>
      </label>
    </div>
  )
}

function Nav({
  screen,
  onNavigate,
  hasJob,
}: {
  screen: Screen
  onNavigate: (screen: Screen) => void
  hasJob: boolean
}) {
  const { t, state } = useLabelSorter()

  const items: { key: Screen; label: string; show: boolean }[] = [
    { key: 'home', label: t.home, show: true },
    { key: 'upload', label: t.tile_upload, show: true },
    { key: 'review', label: t.rv_title, show: hasJob },
    { key: 'mapping', label: t.map_title, show: state.prefs.mappingEnabled },
    { key: 'settings', label: t.settings, show: true },
  ]

  return (
    <nav>
      <div className="flex flex-wrap gap-1.5 rounded-[20px] border border-line bg-card p-1.5">
        {items
          .filter((item) => item.show)
          .map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={cx(
                'whitespace-nowrap rounded-[var(--radius-pill)] px-4 py-2 text-[14.5px] font-semibold transition-colors',
                screen === item.key ? 'bg-ink text-white' : 'text-muted hover:text-ink',
              )}
            >
              {item.label}
            </button>
          ))}
      </div>
    </nav>
  )
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const { t, state, shop } = useLabelSorter()
  const missing = unmappedSkus(shop)

  const tiles: { key: Screen; icon: string; title: string; sub: string; show: boolean }[] = [
    {
      key: 'upload',
      icon: '📄',
      title: t.tile_upload,
      sub: t.tile_uploadSub,
      show: true,
    },
    {
      key: 'mapping',
      icon: '🔗',
      title: t.tile_mapping,
      sub: shop && shop.products.length
        ? t.tile_mappingSub(shop.products.length, countSkus(shop))
        : t.tile_mappingNone,
      show: state.prefs.mappingEnabled,
    },
    {
      key: 'settings',
      icon: '⚙️',
      title: t.tile_settings,
      sub: t.tile_settingsSub,
      show: true,
    },
    {
      key: 'settings',
      icon: '🏪',
      title: t.tile_shops,
      sub: t.tile_shopsSub(state.shops.length),
      show: true,
    },
  ]

  return (
    <div className="grid gap-4">
      {state.prefs.mappingEnabled && missing.length > 0 && (
        <Notice tone="warn" icon="⚠️">
          {t.home_unmapped(missing.length)}
        </Notice>
      )}

      <Panel padded={false}>
        <ul className="divide-y divide-line-soft">
          {tiles
            .filter((tile) => tile.show)
            .map((tile) => (
              <li key={tile.title}>
                <button
                  type="button"
                  onClick={() => onNavigate(tile.key)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-bg-sunk/50"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-[13px] bg-accent-soft text-[20px]">
                    {tile.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16.5px] font-bold leading-snug">{tile.title}</span>
                    <span className="mt-0.5 block truncate text-[13.5px] text-muted">{tile.sub}</span>
                  </span>
                  <span aria-hidden className="flex-none text-[18px] text-faint">
                    ›
                  </span>
                </button>
              </li>
            ))}
        </ul>
      </Panel>
    </div>
  )
}
