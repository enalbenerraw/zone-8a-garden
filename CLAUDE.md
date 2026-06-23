# Project: Zone 8a Garden

A public static site (Astro) documenting one full high-rotation raised-bed sequence for USDA Zone 8a: spring spinach, then summer nitrogen-fixing bush beans, then fall and winter brassicas. Intended to become a public GitHub repo and a public site.

## Structure

- `src/content/guides/*.md` are the guides. Frontmatter: `title`, `description`, `order` (controls sort), `category` (`Plan` | `Plant` | `Protect`), `updated` (quoted string), and an optional `hero` (`{ src, alt, caption? }`) for one optimized lead photo. Filenames are the URL slugs; ordering comes from `order`, not the filename.
- `src/content/journal/*.md` are the garden journal entries, a dated photo log of the whole garden (not just the rotation bed). Frontmatter: `title`, `phase` (free-text season or stage), `date` (a real date, rendered in UTC to avoid an off-by-one), and `photos` (a non-empty array of `{ src, alt, caption? }`). Each entry's body is the narrative; the gallery renders from `photos`.
- Photos live in `src/content/**/_photos/` (referenced relatively, e.g. `./_photos/foo.png`), **never** in `public/`. The `src` fields use Astro's content-collection `image()` helper so images are optimized at build into responsive WebP. Putting an image in `public/` skips that pipeline and ships the full-size original.
- `src/content.config.ts` defines both the `guides` and `journal` collections via the glob loader, with the schema as a function of `({ image })` so `image()` is available for the photo fields.
- `src/layouts/Base.astro` is the shell and global styles. Pages read `import.meta.env.BASE_URL` so internal links follow the configured `base`. The nav links to Guides and the Garden journal.
- `src/pages/guides/[...slug].astro` renders each guide (and its `hero` via `astro:assets` `<Image>`); `src/pages/index.astro` lists guides by category. `src/pages/journal/index.astro` lists journal entries newest-first; `src/pages/journal/[...slug].astro` renders an entry with its captioned `<Image>` gallery.
- Cross-links inside markdown are **relative** (`../planting-calendar/`, `../../journal/`) so they inherit the base path. Do not switch them to root-absolute `/guides/...` links; those break on a project-page deploy.

## Content rules

- **No em dashes.** Use commas, colons, "to" for ranges, or sentence breaks.
- Source provenance: the planting calendar and bed layout are ported from a verified Google Doc. The succession, soil, and pest-management SOPs were reconstructed from a planning conversation plus standard Zone 8a horticulture, and carry a review caveat. Keep claims checkable; do not present reconstructed SOPs as authoritative without a source.
- **No personal data.** This repo is public. No home address, household names, personal phone, email, or calendar specifics. Operational and personal detail lives in the private Notion Claude Context Hub, not here.

## Build and deploy

- Scripts: `npm run dev` (`astro dev`), `npm run build` (`astro build`), `npm run preview` (builds, then `wrangler dev` on the local Workers runtime at `http://localhost:8787`, so preview needs a successful build first and is not `astro preview`), `npm run deploy` (builds, then `wrangler deploy`), `npm run generate-types` (`wrangler types`).
- Deployed on Cloudflare via the `@astrojs/cloudflare` adapter and `wrangler.jsonc` at zone8a.com. Pushes to `main` trigger a Cloudflare build. `wrangler.jsonc` sets the Worker name `zone-8a-garden`, serves static assets from `./dist` (binding `ASSETS`), pins `compatibility_date`, and enables `observability`. `public/.assetsignore` keeps `_worker.js` and `_routes.json` out of the asset manifest.
- The site is still fully prerendered: every route uses `getStaticPaths`, so `astro build` reports `output: "static"` and the adapter emits static files under `dist/client` plus a server entry under `dist/server`. There is no SSR or on-demand route today; the adapter is the deploy target, not a sign of dynamic rendering. If you add a server route, revisit the image-service note below.
- `astro.config.mjs` sets `site: 'https://zone8a.com'` (update if the domain changes), no `base` (pages serve from the domain root), and `adapter: cloudflare({ imageService: 'compile' })`. The `compile` image service is required, not optional: it runs sharp at build time to pre-optimize images into responsive WebP. Without it the adapter defaults to an on-demand `/_image` endpoint that needs sharp in the Workers runtime, where it is unavailable, so the full-size originals would ship unoptimized.
