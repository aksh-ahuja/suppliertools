'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cx } from '@/lib/utils'
import { useLabelSorter } from '../state/store'
import { Notice, Panel, TextField } from './Primitives'
import {
  MappingToggle,
  PrintControl,
  SortOrderControl,
  SplitControl,
  StampPreview,
} from './PreferenceControls'

const TOTAL_STEPS = 5

/**
 * First-run setup. Everything asked here is also editable later in Settings,
 * so nothing is a one-way door, and the whole flow can be skipped.
 */
export function Onboarding({ onDone }: { onDone: () => void }) {
  const { t, state, shop, addShop, finishOnboarding } = useLabelSorter()
  const [step, setStep] = useState(0)
  const [shopName, setShopName] = useState('')
  const [error, setError] = useState('')

  const finish = () => {
    finishOnboarding()
    onDone()
  }

  const submitShop = () => {
    if (shop) {
      setStep(2)
      return
    }
    const clean = shopName.trim()
    if (!clean) {
      setError(t.e_needName)
      return
    }
    if (!addShop(clean)) {
      setError(t.e_dupeShop)
      return
    }
    setError('')
    setStep(2)
  }

  return (
    <div className="mx-auto max-w-[620px]">
      {step > 0 && (
        <div className="mb-5">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-muted">{t.ob_step(step, TOTAL_STEPS)}</p>
            <button
              type="button"
              onClick={finish}
              className="text-[13.5px] font-semibold text-muted hover:text-accent"
            >
              {t.skip}
            </button>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <span
                key={i}
                className={cx(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  i < step ? 'bg-accent' : 'bg-line',
                )}
              />
            ))}
          </div>
        </div>
      )}

      {step === 0 && (
        <Panel className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-[26px]">
            🏷️
          </span>
          <h1 className="mt-4 text-[25px] font-bold tracking-[-0.025em]">{t.ob_welcomeTitle}</h1>
          <p className="mx-auto mt-3 max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            {t.ob_welcomeBody}
          </p>
          <Button size="lg" className="mt-6 w-full sm:w-auto" onClick={() => setStep(1)}>
            {t.ob_start}
          </Button>
          <p className="mx-auto mt-5 max-w-[44ch] text-[13px] leading-relaxed text-muted">
            {t.privacyNote}
          </p>
        </Panel>
      )}

      {step === 1 && (
        <Panel>
          <StepHead title={t.ob_shopTitle} body={t.ob_shopBody} />
          {shop ? (
            <Notice tone="ok" icon="✅">
              {t.home_hi(shop.name)}
            </Notice>
          ) : (
            <>
              <TextField
                value={shopName}
                onChange={(v) => {
                  setShopName(v)
                  setError('')
                }}
                onEnter={submitShop}
                placeholder={t.ob_shopPlaceholder}
                autoFocus
              />
              {error && <p className="mt-2 text-[13.5px] font-medium text-danger">{error}</p>}
            </>
          )}
          <StepNav onBack={() => setStep(0)} onNext={submitShop} t={t} />
        </Panel>
      )}

      {step === 2 && (
        <Panel>
          <StepHead title={t.ob_sortTitle} body={t.ob_sortBody} />
          <SortOrderControl />
          <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} t={t} />
        </Panel>
      )}

      {step === 3 && (
        <Panel>
          <StepHead title={t.ob_splitTitle} body={t.ob_splitBody} />
          <SplitControl />
          <div className="mt-4 rounded-xl bg-bg-sunk/60 px-4 py-3 text-[14px] text-ink-soft">
            {state.prefs.splitBy.length === 0
              ? t.rv_outputOne
              : t.rv_outputSep(
                  state.prefs.splitBy.map((f) => t[`f_${f}` as const]).join(' + '),
                )}
          </div>
          <StepNav onBack={() => setStep(2)} onNext={() => setStep(4)} t={t} />
        </Panel>
      )}

      {step === 4 && (
        <Panel>
          <StepHead title={t.ob_printTitle} body={t.ob_printBody} />
          <PrintControl />
          <div className="mt-4">
            <StampPreview />
          </div>
          <StepNav onBack={() => setStep(3)} onNext={() => setStep(5)} t={t} />
        </Panel>
      )}

      {step === 5 && (
        <Panel>
          <StepHead title={t.ob_mapTitle} body={t.ob_mapBody} />
          <div className="rounded-xl border border-line bg-bg-sunk/40 p-4">
            <MappingToggle />
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
            {state.prefs.mappingEnabled ? t.ob_mapOnHint : t.ob_mapOffHint}
          </p>
          <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-between">
            <Button variant="ghost" onClick={() => setStep(4)}>
              {t.back}
            </Button>
            <Button size="lg" onClick={finish}>
              {t.ob_finish}
            </Button>
          </div>
        </Panel>
      )}
    </div>
  )
}

function StepHead({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-5">
      <h1 className="text-[21px] font-bold leading-snug tracking-[-0.025em]">{title}</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{body}</p>
    </div>
  )
}

function StepNav({
  onBack,
  onNext,
  t,
}: {
  onBack: () => void
  onNext: () => void
  t: { back: string; next: string }
}) {
  return (
    <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-between">
      <Button variant="ghost" onClick={onBack}>
        {t.back}
      </Button>
      <Button size="lg" onClick={onNext}>
        {t.next}
      </Button>
    </div>
  )
}
