import type { Metadata } from 'next'
import { getTool } from '@/config/tools'
import { pageMetadata } from '@/lib/seo'
import { LabelSorterApp } from '@/tools/meesho-label-sorter/components/LabelSorterApp'

const tool = getTool('meesho-label-sorter')!

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
