# SupplierTools

Free, browser-only tools for Indian e-commerce sellers. Live at
**[suppliertools.store](https://suppliertools.store)**.

The first tool is the **Meesho Label Sorter**: drop in the shipping label PDF
from your supplier panel and get it back sorted by delivery partner, product,
size and quantity, with the product name printed in large type on every label.

## Why this repository is public

The tools read shipping labels, which contain customers' names, addresses and
phone numbers. Asking people to trust a privacy claim is not good enough, so
the code is here to be read.

There is no server. The site is a static export served from GitHub Pages, and
every PDF is parsed and rewritten by JavaScript inside the visitor's own
browser using [pdf.js](https://mozilla.github.io/pdf.js/) and
[pdf-lib](https://pdf-lib.js.org/). Nothing is uploaded, because there is
nothing to upload to. Load a tool once and it keeps working with the network
switched off.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 15 App Router, `output: 'export'` | Static HTML for GitHub Pages |
| Styling | Tailwind CSS v4 | Design tokens in `src/app/globals.css` |
| PDF read | `pdfjs-dist` | Text layer extraction, loaded on demand |
| PDF write | `pdf-lib` | Page copy and stamping, loaded on demand |
| Blog | Sanity, fetched at build time | Content edits do not need a code change |
| Storage | `localStorage` | Per-device, per-browser, never synced |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # static export into ./out
npm run typecheck    # tsc --noEmit
npm start            # serve ./out locally
```

Copy `.env.example` to `.env.local` if you want to connect Sanity. Without it
the blog serves the three articles committed under `src/content/posts`.

## Project layout

```
src/
├── app/                     Routes. Marketing pages, blog, tool pages.
├── components/
│   ├── layout/              Header, footer
│   ├── marketing/           Page sections reused across marketing routes
│   └── ui/                  Button, Card, Badge, Container
├── config/
│   ├── site.ts              URLs, WhatsApp number, repo link
│   └── tools.ts             The tool registry (see below)
├── content/                 FAQs, seed blog articles
├── lib/                     SEO helpers, Sanity client, post merging
└── tools/
    └── meesho-label-sorter/ One self-contained tool
        ├── components/      Screens: onboarding, upload, review, mapping, settings
        ├── i18n/            Nine languages
        ├── lib/             Parsing, sorting, PDF generation, storage
        ├── state/           React context store
        └── types.ts
```

### Adding a tool

1. Append an entry to `tools` in `src/config/tools.ts`. Listing pages, the
   sitemap, structured data and the footer all read from that array.
2. Create `src/tools/<slug>/` with the tool's own logic and components. Tools do
   not import from each other.
3. Add `src/app/tools/<slug>/page.tsx` for the SEO landing page and
   `src/app/tools/<slug>/app/page.tsx` for the tool itself.

The registry carries a `pricing` field (`free` / `freemium` / `paid`) from day
one. Everything is free today; the field exists so a paid tool later is a config
change rather than a restructure.

## How the Label Sorter works

1. `lib/pdfjs.ts` opens each selected file and reads the text layer of every page.
2. `lib/parseLabel.ts` anchors on the `SKU` header cell of the Product Details
   table and uses the x positions of `Size`, `Qty` and `Color` as column
   boundaries. That survives label revisions better than fixed coordinates.
3. `lib/mapping.ts` resolves each SKU ID to a product name. Matching ignores case
   and punctuation, but a fuzzy key is only trusted when it is unambiguous, so
   two genuinely different SKUs can never be folded together.
4. `lib/sort.ts` orders the pages, splits them into output files and numbers each
   run of identical items.
5. `lib/generate.ts` copies the original pages into new documents in sorted order
   and draws the information block in the blank area below the label. Pages are
   copied, never re-rendered, so barcodes, addresses and the tax invoice are
   byte-identical to the source.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static
export and publishes it to GitHub Pages. `public/CNAME` points the site at
`suppliertools.store`.

Publishing a blog post in Sanity triggers a `repository_dispatch` webhook that
reruns the same workflow, so content changes go live without a code push.

## Contributing

Bug reports and pull requests are welcome, especially for label layouts this
parser does not handle yet. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

MIT. See [LICENSE](LICENSE).

Meesho, Flipkart and Amazon are trademarks of their respective owners. This
project is independent and not affiliated with any of them.
