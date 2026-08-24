import type { LocalPost } from './types'
import { sortMeeshoLabels } from './sort-meesho-labels'
import { meeshoSkuId } from './meesho-sku-id'
import { packOrdersFaster } from './pack-orders-faster'

export const localPosts: LocalPost[] = [sortMeeshoLabels, meeshoSkuId, packOrdersFaster]

export function getLocalPost(slug: string): LocalPost | undefined {
  return localPosts.find((p) => p.slug === slug)
}

export type { LocalPost }
