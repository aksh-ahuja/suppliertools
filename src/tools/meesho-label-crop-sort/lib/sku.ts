/**
 * SKU matching is deliberately forgiving.
 *
 * `normalise` ignores case and collapses whitespace. `loose` additionally drops
 * every non-alphanumeric character, so `2pc-COMBO_1` and `2PC COMBO 1` are the
 * same code. The loose key is only trusted when it is unambiguous, so two
 * genuinely different SKUs never get folded into one product.
 */
export function normaliseSku(value: string | undefined): string {
  return (value ?? '').trim().toUpperCase().replace(/\s+/g, ' ')
}

export function looseSku(value: string | undefined): string {
  return (value ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function normaliseName(value: string | undefined): string {
  return (value ?? '').trim().toLowerCase().replace(/\s+/g, ' ')
}

export function makeId(): string {
  return Math.random().toString(36).slice(2, 9)
}
