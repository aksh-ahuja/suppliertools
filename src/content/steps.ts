import type { Step } from '@/components/marketing/Steps'

export const labelSorterSteps: Step[] = [
  {
    name: 'Download your labels',
    text: 'Get the shipping label PDF from the Meesho supplier panel the way you already do. Running several shops is fine, each one keeps its own setup.',
  },
  {
    name: 'Drop it into the tool',
    text: 'Pick the file, or several files at once. Nothing is uploaded, the file is read on your device.',
  },
  {
    name: 'Pick your label size',
    text: 'Choose thermal 4x6, thermal 6x4, four labels on one A4 sheet, or the label on its own. The tax invoice is cut away and removed from the file, not hidden under a smaller page.',
  },
  {
    name: 'Name your products once',
    text: 'The tool finds every SKU ID in the file and asks what you call that product. It remembers your answers.',
  },
  {
    name: 'Download the cropped, sorted PDF',
    text: 'Pages come back cropped to the size you picked and grouped by courier, product, size and quantity, with the name printed large on each label.',
  },
]
