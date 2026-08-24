/** Size tokens that can appear glued to the end of a SKU string on some labels. */
export const SIZE_TOKENS = [
  'XXXXL', 'XXXL', 'XXL', 'XXS', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL',
  'XS', 'XL', 'S', 'M', 'L', 'FREESIZE', 'FREE',
]

/** Print order: smallest first, then numeric sizes, then anything unknown. */
const SIZE_ORDER = [
  'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', 'XXXL', '3XL',
  'XXXXL', '4XL', '5XL', '6XL', '7XL', 'FREE', 'FREESIZE',
]

export function sizeRank(size: string | undefined): number {
  const key = (size ?? '').toUpperCase().replace(/[\s_.-]/g, '')
  const index = SIZE_ORDER.indexOf(key)
  if (index >= 0) return index
  const numeric = Number.parseFloat(key)
  if (!Number.isNaN(numeric)) return 100 + numeric
  return 900
}
