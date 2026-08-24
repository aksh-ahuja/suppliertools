import type { Product, Shop } from '../types'
import { looseSku, normaliseName, normaliseSku } from './sku'

export interface SkuIndex {
  exact: Map<string, string>
  loose: Map<string, string>
}

/**
 * Builds the SKU to product-name lookup for a shop.
 *
 * A loose key is only kept when every SKU that reduces to it belongs to the
 * same product, so a fuzzy match can never send a page to the wrong product.
 */
export function buildIndex(shop: Shop | null): SkuIndex {
  const exact = new Map<string, string>()
  const loose = new Map<string, string>()
  if (!shop) return { exact, loose }

  const clashes = new Set<string>()
  for (const product of shop.products) {
    for (const sku of product.skus) {
      const name = product.name.trim() || sku
      exact.set(normaliseSku(sku), name)
      const key = looseSku(sku)
      if (!key) continue
      if (loose.has(key) && normaliseName(loose.get(key)) !== normaliseName(name)) {
        clashes.add(key)
      } else {
        loose.set(key, name)
      }
    }
  }
  clashes.forEach((k) => loose.delete(k))
  return { exact, loose }
}

export function findProductName(index: SkuIndex, sku: string): string | null {
  return index.exact.get(normaliseSku(sku)) ?? index.loose.get(looseSku(sku)) ?? null
}

export function ownerOf(shop: Shop | null, sku: string): Product | null {
  if (!shop) return null
  const exact = normaliseSku(sku)
  const loose = looseSku(sku)
  return (
    shop.products.find((p) => p.skus.some((s) => normaliseSku(s) === exact)) ??
    shop.products.find((p) => p.skus.some((s) => looseSku(s) === loose)) ??
    null
  )
}

export function productByName(shop: Shop | null, name: string): Product | null {
  if (!shop) return null
  const key = normaliseName(name)
  return shop.products.find((p) => normaliseName(p.name) === key) ?? null
}

/** Two products typed with the same name in different case are one product. */
export function mergeDuplicateProducts(shop: Shop): void {
  const seen = new Map<string, Product>()
  const keep: Product[] = []

  for (const product of shop.products) {
    const key = normaliseName(product.name)
    const existing = key ? seen.get(key) : undefined
    if (existing) {
      for (const sku of product.skus) {
        if (!existing.skus.some((s) => normaliseSku(s) === normaliseSku(sku))) {
          existing.skus.push(sku)
        }
      }
    } else {
      if (key) seen.set(key, product)
      keep.push(product)
    }
  }
  shop.products = keep
}

export function rememberSku(shop: Shop, sku: string): boolean {
  if (!sku) return false
  if (shop.seenSkus.some((s) => normaliseSku(s) === normaliseSku(sku))) return false
  shop.seenSkus.push(sku)
  shop.seenSkus.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  return true
}

/** SKUs this shop has seen that no product claims yet. */
export function unmappedSkus(shop: Shop | null): string[] {
  if (!shop) return []
  return shop.seenSkus.filter((s) => !ownerOf(shop, s))
}

export function countSkus(shop: Shop): number {
  return shop.products.reduce((n, p) => n + p.skus.length, 0)
}
