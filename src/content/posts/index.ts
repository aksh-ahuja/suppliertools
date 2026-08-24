import type { Article } from './types'
import { sortMeeshoLabels } from './sort-meesho-labels'
import { meeshoSkuId } from './meesho-sku-id'
import { packOrdersFaster } from './pack-orders-faster'
import { supplierPanelWorkflow } from './supplier-panel-workflow'
import { printingLabels } from './printing-labels'

/** Add a new post by importing it here. Order does not matter, dates sort. */
export const articles: Article[] = [
  sortMeeshoLabels,
  meeshoSkuId,
  packOrdersFaster,
  supplierPanelWorkflow,
  printingLabels,
]

export type { Article }
