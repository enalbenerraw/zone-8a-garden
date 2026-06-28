# Zone 8a Garden

A practical year-round gardening guide for USDA Zone 8a, built as a static site with [Astro](https://astro.build). The site documents one full high-rotation raised-bed sequence (spring spinach, summer nitrogen-fixing bush beans, then fall and winter brassicas) across the whole year, with every planting date anchored to two frost dates so the calendar travels to other zones. It also keeps a dated photo journal of the whole garden.

## Content

There are two content collections, both defined in `src/content.config.ts` via the glob loader.

**Guides** live in `src/content/guides/` as Markdown with frontmatter (`title`, `description`, `order`, `category`, `updated`, an optional `timeline` flag, and an optional `hero`). Ordering comes from `order`, not the filename; categories are `Plan`, `Plant`, and `Protect`. Add a guide by dropping a new `.md` file in that folder.

| Guide | Category |
| :-- | :-- |
| Overview: the relay rotation | Plan |
| Year-round master planting calendar | Plan |
| Polyculture bed layout blueprint | Plant |
| The succession sequence and soil method | Plant |
| The organic fertilizing plan | Plant |
| Year-round integrated pest management | Protect |
| Companion planting rules | Protect |

**Journal** entries live in `src/content/journal/` as dated Markdown with frontmatter (`title`, `phase`, `date`, and a non-empty `photos` array). Each entry's body is the narrative; the captioned gallery renders from `photos`. The index lists entries newest-first.

### Photos

Photos live in `src/content/**/_photos/` and are referenced relatively (for example `./_photos/foo.png`), never in `public/`. The `src` fields use Astro's content-collection `image()` helper, so images are optimized at build into responsive WebP. Putting an image in `public/` skips that pipeline and ships the full-size original.

### Provenance

The planting calendar and bed layout are ported from a verified source document. The succession, soil, and pest-management SOPs were reconstructed from a planning conversation plus standard Zone 8a horticulture and are marked for review where appropriate. Confirm spray product labels and timing against local extension guidance before applying anything.

## The prompt kit

The site funnels to a paid product, the **Zone-Smart Garden Prompt Kit**: a set of scaffolded AI prompts that rebuild the year-round calendar for any USDA zone. The store page is `src/pages/kit.astro` (served at `/kit/`). The product files themselves, the prompts and PDFs sold on Gumroad, are kept out of this public repo. They live in a local `kit/` directory that `.gitignore` excludes, so cloning the repo gives you the site, not the saleable artifacts.

## Develop

```sh
npm install
npm run dev             # local dev server at localhost:4321
npm run build           # production build to ./dist/
npm run preview         # builds, then serves on the local Workers runtime at localhost:8787
npm run generate-types  # regenerate Worker types (wrangler types)
npm run deploy          # builds, then wrangler deploy
```

Note that `npm run preview` is not `astro preview`: it runs a production build and then `wrangler dev`, so it needs a successful build first.

## Deploy

The site is deployed on Cloudflare at [zone8a.com](https://zone8a.com) via the `@astrojs/cloudflare` adapter and `wrangler.jsonc`. Pushes to `main` trigger a Cloudflare build.

The site is still fully prerendered. Every route uses `getStaticPaths`, so `astro build` reports `output: "static"` and the adapter is the deploy target, not a sign of dynamic rendering. `astro.config.mjs` sets `site: 'https://zone8a.com'`, no `base` (pages serve from the domain root), and `adapter: cloudflare({ imageService: 'compile' })`. The `compile` image service is required: it runs sharp at build time to pre-optimize images into responsive WebP. Without it the adapter defaults to an on-demand `/_image` endpoint that needs sharp in the Workers runtime, where it is unavailable, so the full-size originals would ship unoptimized.

`wrangler.jsonc` sets the Worker name `zone-8a-garden`, serves static assets from `./dist`, pins `compatibility_date`, and enables `observability`. `public/.assetsignore` keeps `_worker.js` and `_routes.json` out of the asset manifest.

## License

MIT. See [LICENSE](LICENSE).
