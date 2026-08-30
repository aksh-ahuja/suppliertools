/**
 * The tool registry.
 *
 * Every tool on the site is described here once. Listing pages, the sitemap,
 * structured data and the footer all read from this array, so adding tool
 * number two is a matter of appending an entry and dropping a module under
 * `src/tools/<slug>/`.
 *
 * `pricing` exists from day one on purpose. Today every tool is free; when a
 * paid tool arrives it becomes a config change and a paywall component rather
 * than a restructure of the site.
 */
export type ToolPricing = 'free' | 'freemium' | 'paid'
export type ToolStatus = 'live' | 'beta' | 'planned'

export interface ToolFaq {
  question: string
  answer: string
}

export interface Tool {
  slug: string
  name: string
  /** Short line under the name in cards and search results. */
  tagline: string
  /** Full sentence used for meta description and structured data. */
  description: string
  emoji: string
  category: 'Shipping & packing' | 'Catalogue' | 'Accounting' | 'Pricing'
  marketplaces: string[]
  pricing: ToolPricing
  status: ToolStatus
  /** Marketing / SEO landing page. */
  href: string
  /** The tool itself. Null while a tool is still `planned`. */
  appHref: string | null
  keywords: string[]
  highlights: string[]
  faqs: ToolFaq[]
  /** ISO date, drives `datePublished` in structured data. */
  published: string
  updated: string
}

export const tools: Tool[] = [
  {
    slug: 'meesho-label-crop-sort',
    name: 'Meesho Label Crop & Sort',
    tagline: 'Cut the tax invoice off, print 4x6 thermal, and group identical products',
    description:
      'Upload the shipping label PDF from your Meesho supplier panel and get back clean labels with the tax invoice cut away, sized for a 4x6 thermal roll or four to an A4 sheet, sorted by delivery partner, product, size and quantity, with the product name printed on every label. Runs entirely in your browser, nothing is uploaded.',
    emoji: '🏷️',
    category: 'Shipping & packing',
    marketplaces: ['Meesho'],
    pricing: 'free',
    status: 'live',
    href: '/tools/meesho-label-crop-sort',
    appHref: '/tools/meesho-label-crop-sort/app',
    keywords: [
      'meesho label crop',
      'meesho label crop tool',
      'meesho shipping label crop',
      'meesho label cropper',
      'crop meesho label pdf',
      'meesho label 4x6 thermal',
      'meesho label a4 4 per page',
      'meesho label sorter',
      'sort meesho shipping labels',
      'print product name on meesho label',
      'meesho packing tool',
      'meesho supplier tools',
      'मीशो लेबल क्रॉप',
    ],
    highlights: [
      'Cuts the tax invoice off and keeps only the shipping label',
      'Finds the invoice band on each page instead of cutting at a fixed offset, so no black TAX INVOICE strip is left behind',
      'Removes the invoice from the file rather than hiding it under a smaller page box',
      'Prints a true 4x6 inch thermal label, a 6x4 landscape one, or four labels on one A4 sheet',
      'Sorts pages by delivery partner, product, size and quantity',
      'Prints the product name, size and quantity in big letters on each label',
      'Splits the output into separate PDFs per courier or per product',
      'Remembers your SKU to product mapping so you set it up once',
      'Handles several shops, each with its own product mapping',
      'Works offline after the first load',
    ],
    faqs: [
      {
        question: 'How do I crop the tax invoice off a Meesho label?',
        answer:
          'Upload the label PDF from your supplier panel, open Settings and pick a crop mode: label only, thermal 4x6, thermal 6x4, or four labels on one A4 page. The tool finds the TAX INVOICE band on every page and cuts just above it, then gives you the file back. Nothing is uploaded and there is no sign-up.',
      },
      {
        question: 'Why do other label croppers leave a black TAX INVOICE strip on my labels?',
        answer:
          'Because they cut at a fixed distance down the page. The invoice band does not sit at the same place on every label: across one real 152 page export it started at five different positions depending on the delivery partner, a spread of about 33 points. A fixed cut is therefore wrong for some couriers, and the leftover is the black TAX INVOICE bar. This tool reads each page and finds the band instead, so the cut lands in the right place whichever courier the label is for.',
      },
      {
        question: 'Is the invoice really removed, or just hidden?',
        answer:
          'Really removed. Some tools only shrink the page box, which hides the invoice on screen while leaving the text inside the file, so your GSTIN, the buyer\u2019s billing address and your taxable value can still be pulled out of the PDF you hand to a packer or a courier. This tool re-draws each label into a new page through a clipped form, so the invoice is not in the output at all. You can check: open the cropped file and search it for GSTIN.',
      },
      {
        question: 'Is the 4x6 output a real 4x6?',
        answer:
          'Yes, exactly 288 by 432 points, which is 4 by 6 inches. It is worth checking whatever tool you use, because a common shortcut is to keep the full A4 width and only trim the height, which gives a page around 8.3 by 5.1 inches. That is not a 4x6 and it will not fill a thermal roll properly.',
      },
      {
        question: 'Can I crop and sort in the same run?',
        answer:
          'Yes, and that is the point of doing both here. The labels come back cropped to the size you picked and already grouped by delivery partner, product, size and quantity, with the product name printed under each one. You can also split the output into one file per courier.',
      },
      {
        question: 'What happens if a page has no tax invoice on it?',
        answer:
          'It is passed through whole rather than cut at a guess. If a page carries invoice content but the tool cannot find the band to anchor on, it cuts at an estimated position and tells you how many pages that happened to, so you can check those before printing.',
      },
      {
        question: 'Is the Meesho Label Crop & Sort tool really free?',
        answer:
          'Yes. It is free to use with no sign-up, no page limit and no watermark. There is no paid tier for this tool and no card is ever asked for.',
      },
      {
        question: 'Do my shipping labels get uploaded anywhere?',
        answer:
          'No. The PDF is opened and rewritten inside your browser using JavaScript. It never leaves your phone or computer, and the site has no server that could receive it. You can disconnect from the internet after the page loads and the tool still works.',
      },
      {
        question: 'Which file do I upload?',
        answer:
          'The shipping label PDF you download from the Meesho supplier panel, usually named something like Sub_Order_Labels_xxxx.pdf. You can select more than one file at a time.',
      },
      {
        question: 'How does it know the product name?',
        answer:
          'Meesho labels carry the SKU ID, not your internal product name. The first time you upload a file the tool collects every SKU ID it finds and asks you to give each one a product name. That mapping is saved on your device, so from the second file onwards it is automatic.',
      },
      {
        question: 'Can several SKU IDs share one product name?',
        answer:
          'Yes. That is exactly what the mapping screen is for. Pick a product name on the left, tick all the SKU IDs that belong to it on the right, and every one of those labels will print the same name. You can turn this whole feature off in Settings if you would rather print the raw SKU ID.',
      },
      {
        question: 'Can I get a separate PDF for each courier?',
        answer:
          'Yes. In Settings, tick Delivery partner under "Make separate files" and you will get one PDF per courier, ready to hand over to each pickup.',
      },
      {
        question: 'I run more than one Meesho shop. Can I use it for all of them?',
        answer:
          'Yes. Add as many shops as you like and switch between them from the shop name in the header. Each shop keeps its own product names and SKU mapping, so a SKU ID you named under one shop never leaks into another. Sorting and printing preferences are shared across shops.',
      },
      {
        question: 'Does it work on a phone?',
        answer:
          'Yes. It works in Chrome or Safari on Android and iPhone as well as on a laptop. Large files are slower on an older phone, but they do finish.',
      },
      {
        question: 'Will it work with Flipkart or Amazon labels?',
        answer:
          'Not yet. It is built around the Meesho label layout. Flipkart and Amazon versions are on the list, message me on WhatsApp if you want one sooner.',
      },
    ],
    published: '2026-08-24',
    updated: '2026-08-24',
  },
]

export const liveTools = tools.filter((t) => t.status !== 'planned')

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
