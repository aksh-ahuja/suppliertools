import { en, type Dict } from './en'
import { hi } from './hi'
import { gu } from './gu'
import { mr } from './mr'
import { ta } from './ta'
import { te } from './te'
import { kn } from './kn'
import { bn } from './bn'
import { pa } from './pa'

/**
 * Ordered by how many Meesho suppliers are likely to want each one:
 * Surat and Ahmedabad (Gujarati), Delhi and Jaipur (Hindi), Mumbai (Marathi),
 * Tiruppur (Tamil), Hyderabad (Telugu), Bengaluru (Kannada), Kolkata (Bengali)
 * and Ludhiana (Punjabi).
 */
export const dictionaries = { en, hi, gu, mr, ta, te, kn, bn, pa } as const

export type Locale = keyof typeof dictionaries

export const locales = Object.keys(dictionaries) as Locale[]

export function isLocale(value: string): value is Locale {
  return value in dictionaries
}

export function getDictionary(locale: string): Dict {
  return isLocale(locale) ? dictionaries[locale] : en
}

/** Script used by each locale, so the right font stack can be applied. */
export const localeScript: Record<Locale, string> = {
  en: 'latin',
  hi: 'devanagari',
  gu: 'gujarati',
  mr: 'devanagari',
  ta: 'tamil',
  te: 'telugu',
  kn: 'kannada',
  bn: 'bengali',
  pa: 'gurmukhi',
}

export type { Dict }
