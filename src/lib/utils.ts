export type ClassValue = string | false | null | undefined

/** Tiny classnames helper. No dependency needed for what it does. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}

export function formatDate(iso: string, locale = 'en-IN'): string {
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
