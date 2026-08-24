'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { AppState, Preferences, Product, Shop } from '../types'
import { getDictionary, type Dict, type Locale } from '../i18n'
import {
  clearState,
  createShop,
  defaultState,
  DEFAULT_PREFS,
  importState,
  loadState,
  saveState,
} from '../lib/storage'
import { mergeDuplicateProducts, rememberSku } from '../lib/mapping'
import { makeId, normaliseName, normaliseSku } from '../lib/sku'

interface StoreValue {
  ready: boolean
  state: AppState
  t: Dict
  shop: Shop | null

  setLang: (lang: Locale) => void
  setPrefs: (patch: Partial<Preferences>) => void
  finishOnboarding: () => void

  addShop: (name: string) => Shop | null
  useShop: (id: string) => void
  deleteShop: (id: string) => void

  addProduct: (name: string, skus?: string[]) => Product | null
  renameProduct: (id: string, name: string) => void
  setProductSkus: (id: string, skus: string[]) => void
  deleteProduct: (id: string) => void

  rememberSkus: (skus: string[]) => void

  exportBackup: () => void
  importBackup: (json: string) => boolean
  resetEverything: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function LabelSorterProvider({ children }: { children: React.ReactNode }) {
  // Start from the default so the server and the first client render agree.
  // The saved state is read in an effect, which avoids a hydration mismatch.
  const [state, setState] = useState<AppState>(defaultState)
  const [ready, setReady] = useState(false)
  const firstRun = useRef(true)

  useEffect(() => {
    setState(loadState())
    setReady(true)
  }, [])

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (ready) saveState(state)
  }, [state, ready])

  const shop = useMemo(
    () => state.shops.find((s) => s.id === state.activeShopId) ?? null,
    [state.shops, state.activeShopId],
  )

  const t = useMemo(() => getDictionary(state.lang), [state.lang])

  /** Applies a change to the active shop. */
  const patchShop = useCallback((fn: (shop: Shop) => void) => {
    setState((prev) => {
      const next = structuredClone(prev)
      const target = next.shops.find((s) => s.id === next.activeShopId)
      if (!target) return prev
      fn(target)
      mergeDuplicateProducts(target)
      return next
    })
  }, [])

  const value: StoreValue = useMemo(
    () => ({
      ready,
      state,
      t,
      shop,

      setLang: (lang) => setState((prev) => ({ ...prev, lang })),

      setPrefs: (patch) =>
        setState((prev) => ({
          ...prev,
          prefs: { ...prev.prefs, ...patch, print: { ...prev.prefs.print, ...(patch.print ?? {}) } },
        })),

      finishOnboarding: () => setState((prev) => ({ ...prev, onboarded: true })),

      addShop: (name) => {
        const clean = name.trim()
        if (!clean) return null
        if (state.shops.some((s) => s.name.toLowerCase() === clean.toLowerCase())) return null
        const shopToAdd = createShop(clean)
        setState((prev) => ({
          ...prev,
          shops: [...prev.shops, shopToAdd],
          activeShopId: shopToAdd.id,
        }))
        return shopToAdd
      },

      useShop: (id) => setState((prev) => ({ ...prev, activeShopId: id })),

      deleteShop: (id) =>
        setState((prev) => {
          const shops = prev.shops.filter((s) => s.id !== id)
          return {
            ...prev,
            shops,
            activeShopId: prev.activeShopId === id ? (shops[0]?.id ?? null) : prev.activeShopId,
          }
        }),

      addProduct: (name, skus = []) => {
        const clean = name.trim()
        if (!clean) return null
        const target = state.shops.find((s) => s.id === state.activeShopId)
        if (!target) return null
        if (target.products.some((p) => normaliseName(p.name) === normaliseName(clean))) return null
        const product: Product = { id: makeId(), name: clean, skus: [...skus] }
        patchShop((s) => {
          s.products.push(product)
        })
        return product
      },

      renameProduct: (id, name) =>
        patchShop((s) => {
          const product = s.products.find((p) => p.id === id)
          if (product) product.name = name
        }),

      setProductSkus: (id, skus) =>
        patchShop((s) => {
          // A SKU belongs to exactly one product, so take it off any other.
          const keys = new Set(skus.map(normaliseSku))
          for (const other of s.products) {
            if (other.id === id) continue
            other.skus = other.skus.filter((sku) => !keys.has(normaliseSku(sku)))
          }
          const product = s.products.find((p) => p.id === id)
          if (product) product.skus = [...skus]
        }),

      deleteProduct: (id) =>
        patchShop((s) => {
          s.products = s.products.filter((p) => p.id !== id)
        }),

      rememberSkus: (skus) =>
        patchShop((s) => {
          for (const sku of skus) rememberSku(s, sku)
        }),

      exportBackup: () => {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `label-sorter-backup-${new Date().toISOString().slice(0, 10)}.json`
        link.click()
        URL.revokeObjectURL(url)
      },

      importBackup: (json) => {
        try {
          setState(importState(json))
          return true
        } catch {
          return false
        }
      },

      resetEverything: () => {
        clearState()
        setState({ ...defaultState(), prefs: { ...DEFAULT_PREFS, print: { ...DEFAULT_PREFS.print } } })
      },
    }),
    [ready, state, t, shop, patchShop],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useLabelSorter(): StoreValue {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useLabelSorter must be used inside LabelSorterProvider')
  return value
}
