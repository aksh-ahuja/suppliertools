# Sanity Studio

The blog CMS. Deployed separately from the website, because the site itself is a
static export on GitHub Pages and has no server to host an editor.

## Setup

```bash
cd sanity
npm install
npx sanity login
npx sanity init --reconfigure   # pick or create the project
```

Then set the ids:

```bash
export SANITY_STUDIO_PROJECT_ID=xxxxxxxx
export SANITY_STUDIO_DATASET=production
npm run dev        # http://localhost:3333
npm run deploy     # publishes to https://suppliertools.sanity.studio
```

## Connecting it to the site

1. Put the same project id in the site's `.env.local` as
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, and in the repository secrets as
   `SANITY_PROJECT_ID` so CI can read it.
2. In Sanity, go to **API → Webhooks** and add one:
   - URL: `https://api.github.com/repos/<owner>/suppliertools/dispatches`
   - Method: `POST`
   - Headers: `Authorization: Bearer <a GitHub token with repo scope>`,
     `Accept: application/vnd.github+json`
   - Body: `{"event_type": "sanity-publish"}`
   - Trigger on: create, update, delete for the `post` type

Publishing a post then rebuilds and redeploys the site automatically.

## Note on posts in the repo

Three seed articles live in `src/content/posts` on the site side and are merged
with whatever Sanity returns. If you recreate one of them in Sanity with the same
slug, the Sanity version wins and the URL does not change.
