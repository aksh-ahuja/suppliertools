/** The four things a label page can be grouped by. */
export const SORT_FIELDS = ['courier', 'product', 'size', 'qty'] as const
export type SortField = (typeof SORT_FIELDS)[number]

/** What can be stamped onto each page. */
export const PRINT_FIELDS = ['product', 'size', 'qty', 'courier', 'setNumber'] as const
export type PrintField = (typeof PRINT_FIELDS)[number]

export interface Product {
  id: string
  name: string
  skus: string[]
}

export interface Shop {
  id: string
  name: string
  products: Product[]
  /** Every SKU ID ever seen in a PDF for this shop, so mapping can offer a list. */
  seenSkus: string[]
}

export interface Preferences {
  /** Priority order. The first field makes the biggest piles. */
  sortOrder: SortField[]
  /** Subset of sortOrder. Each combination becomes its own output PDF. */
  splitBy: SortField[]
  /** Which lines get stamped on each label. */
  print: Record<PrintField, boolean>
  /**
   * When off, the tool skips product mapping entirely and prints the raw SKU ID.
   * Sellers with one SKU per product often prefer this.
   */
  mappingEnabled: boolean
}

export interface AppState {
  version: 2
  lang: string
  activeShopId: string | null
  shops: Shop[]
  prefs: Preferences
  onboarded: boolean
}

/** One page of a source PDF, after parsing. */
export interface LabelPage {
  /** Index of the source document in the upload batch. */
  src: number
  /** Zero-based page index inside that document. */
  idx: number
  sku: string
  size: string
  qty: string
  courier: string
  /** Y coordinate of the lowest text on the page, in view space. */
  bottom: number | null
  /* Filled in during sorting. */
  product?: string
  mapped?: boolean
  group?: number
  fileIdx?: number
}

export interface OutputFile {
  /** Human readable split key, empty when the output is a single file. */
  key: string
  index: number
  pages: LabelPage[]
  groups?: number
}

export interface ParsedJob {
  sourceBytes: ArrayBuffer[]
  sourceNames: string[]
  pages: LabelPage[]
  files: OutputFile[]
}

export interface GeneratedFile {
  url: string
  name: string
  pages: number
  key: string
}
