import type { Metadata } from 'next'
import { getTool } from '@/config/tools'
import { pageMetadata } from '@/lib/seo'
import { LabelSorterApp } from '@/tools/meesho-label-crop-sort/components/LabelSorterApp'

const tool = getTool('meesho-label-crop-sort')!

export const metadata: Metadata = pageMetadata({
  title: 'Meesho Label Sorter · Open the tool',
  description: tool.description,
  path: tool.appHref!,
  // The landing page is what should rank; this is the working surface.
  noIndex: true,
})

export default function LabelSorterAppPage() {
  return <LabelSorterApp />
}
