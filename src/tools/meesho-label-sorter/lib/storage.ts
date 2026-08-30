import type { AppState, Preferences, Shop } from '../types'
import { CROP_MODES } from './crop'
import { DEFAULT_SORT } from './sort'
import { makeId } from './sku'

export const STORAGE_KEY = 'suppliertools.labelSorter.v2'
/** Key used by the original single-file version of the tool. */
const LEGACY_KEY = 'meeshoLabelSorter.v1'

export const DEFAULT_PREFS: Preferences = {
  sortOrder: [...DEFAULT_SORT],
  splitBy: [],
  print: { product: true, size: true, qty: true, courier: true, setNumber: false },
  mappingEnabled: true,
  crop: 'off',
}

export function defaultState(): AppState {
  return {
    version: 2,
    lang: 'en',
    activeShopId: null,
    shops: [],
    prefs: { ...DEFAULT_PREFS, print: { ...DEFAULT_PREFS.print } },
    onboarded: false,
  }
}

export function createShop(name: string): Shop {
  return { id: makeId(), name: name.trim(), products: [], seenSkus: [] }
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Brings a v1 payload forward so returning users keep their mapping. */
function migrateLegacy(raw: any): AppState | null {
  if (!raw || !Array.isArray(raw.accounts)) return null

  const state = defaultState()
  state.lang = typeof raw.lang === 'string' ? raw.lang : 'en'
  state.shops = raw.accounts.map((account: any): Shop => ({
    id: typeof account.id === 'string' ? account.id : makeId(),
    name: String(account.name ?? '').trim(),
    products: Array.isArray(account.products)
      ? account.products.map((p: any) => ({
          id: typeof p.id === 'string' ? p.id : makeId(),
          name: String(p.name ?? ''),
          skus: Array.isArray(p.skus) ? p.skus.map(String) : [],
        }))
      : [],
    seenSkus: Array.isArray(account.seen) ? account.seen.map(String) : [],
  }))
  state.activeShopId =
    typeof raw.active === 'string' && state.shops.some((s) => s.id === raw.active)
      ? raw.active
      : (state.shops[0]?.id ?? null)
  if (Array.isArray(raw.sort)) state.prefs.sortOrder = raw.sort
  if (Array.isArray(raw.split)) state.prefs.splitBy = raw.split
  // Someone with a v1 mapping has already been through setup.
  state.onboarded = state.shops.length > 0
  return state
}

function coerce(raw: any): AppState {
  const base = defaultState()
  if (!raw || typeof raw !== 'object') return base

  return {
    version: 2,
    lang: typeof raw.lang === 'string' ? raw.lang : base.lang,
    activeShopId: typeof raw.activeShopId === 'string' ? raw.activeShopId : null,
    shops: Array.isArray(raw.shops)
      ? raw.shops.map((s: any): Shop => ({
          id: typeof s.id === 'string' ? s.id : makeId(),
          name: String(s.name ?? ''),
          products: Array.isArray(s.products)
            ? s.products.map((p: any) => ({
                id: typeof p.id === 'string' ? p.id : makeId(),
                name: String(p.name ?? ''),
                skus: Array.isArray(p.skus) ? p.skus.map(String) : [],
              }))
            : [],
          seenSkus: Array.isArray(s.seenSkus) ? s.seenSkus.map(String) : [],
        }))
      : [],
    prefs: {
      sortOrder: Array.isArray(raw?.prefs?.sortOrder) ? raw.prefs.sortOrder : base.prefs.sortOrder,
      splitBy: Array.isArray(raw?.prefs?.splitBy) ? raw.prefs.splitBy : base.prefs.splitBy,
      print: { ...base.prefs.print, ...(raw?.prefs?.print ?? {}) },
      mappingEnabled:
        typeof raw?.prefs?.mappingEnabled === 'boolean'
          ? raw.prefs.mappingEnabled
          : base.prefs.mappingEnabled,
      crop: CROP_MODES.includes(raw?.prefs?.crop) ? raw.prefs.crop : base.prefs.crop,
    },
    onboarded: raw.onboarded === true,
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */

export function loadState(): AppState {
  if (typeof window === 'undefined') return defaultState()

  try {
    const current = window.localStorage.getItem(STORAGE_KEY)
    if (current) return coerce(JSON.parse(current))
  } catch {
    // Corrupted payload is not worth crashing the tool over.
  }

  try {
    const legacy = window.localStorage.getItem(LEGACY_KEY)
    if (legacy) {
      const migrated = migrateLegacy(JSON.parse(legacy))
      if (migrated) {
        saveState(migrated)
        return migrated
      }
    }
  } catch {
    // Ignore and start fresh.
  }

  return defaultState()
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Private mode or a full quota. The tool still works for this session.
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(STORAGE_KEY)
  window.localStorage.removeItem(LEGACY_KEY)
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2)
}

export function importState(json: string): AppState {
  return coerce(JSON.parse(json))
}
