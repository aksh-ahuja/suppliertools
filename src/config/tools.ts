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
    slug: 'meesho-label-sorter',
    name: 'Meesho Label Sorter',
    tagline: 'Sort label pages and print the product name on every label',
    description:
      'Upload the shipping label PDF from your Meesho supplier panel and get it back sorted by delivery partner, product, size and quantity, with the product name printed in large text on every label. Runs entirely in your browser, nothing is uploaded.',
    emoji: '🏷️',
    category: 'Shipping & packing',
    marketplaces: ['Meesho'],
    pricing: 'free',
    status: 'live',
    href: '/tools/meesho-label-sorter',
    appHref: '/tools/meesho-label-sorter/app',
    keywords: [
      'meesho label sorter',
      'meesho label sorting tool',
      'sort meesho shipping labels',
      'print product name on meesho label',
      'meesho label pdf sorter free',
      'meesho packing tool',
      'meesho supplier tools',
      'meesho label size sort',
      'मीशो लेबल सॉर्टर',
    ],
    highlights: [
      'Sorts pages by delivery partner, product, size and quantity',
      'Prints the product name, size and quantity in big letters on each label',
      'Splits the output into separate PDFs per courier or per product',
      'Remembers your SKU to product mapping so you set it up once',
      'Handles several shops, each with its own product mapping',
      'Works offline after the first load',
    ],
    faqs: [
      {
        question: 'Is the Meesho Label Sorter really free?',
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
