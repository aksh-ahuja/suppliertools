# Contributing

Thanks for taking a look. The most useful contributions are usually small.

## Reporting a label that does not parse

This is the highest value bug report. Marketplaces change label layouts and the
parser only knows about the ones it has seen.

Please include:

- which marketplace and roughly when the label was generated
- what went wrong (wrong SKU, missing size, wrong courier, no pages found)
- **a redacted sample**: replace the customer name, address and phone number
  before attaching anything. Never post a real customer's details in a public
  issue.

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Ground rules for code

- **No network calls with user data.** The privacy promise is the product. A
  change that sends a PDF, a SKU or an address anywhere will not be merged.
- **No analytics that identify a visitor.** Aggregate, cookieless page counts
  are the maximum, and the privacy page must be updated in the same PR.
- **Keep tools self-contained.** Everything for a tool lives under
  `src/tools/<slug>/`. Tools do not import from one another.
- **Write for the reader.** Sellers using this are not developers. Copy should be
  plain, short, and honest about what a thing does.
- **Add every string to all nine locales.** `src/tools/<slug>/i18n/en.ts` is the
  source of truth and TypeScript will fail the build if a translation is missing
  a key. If you cannot translate one, open the PR anyway and say so.

## Adding a language

1. Copy `src/tools/meesho-label-sorter/i18n/en.ts` to `<code>.ts`.
2. Translate the values, keeping the `${...}` placeholders intact.
3. Register it in `i18n/index.ts` and add its script to `localeScript`.

## Commit messages

Plain sentences are fine. Describe what changed and why.
