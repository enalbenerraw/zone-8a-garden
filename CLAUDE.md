# Project: Zone 8a Garden

A public static site (Astro) documenting one full high-rotation raised-bed sequence for USDA Zone 8a: spring spinach, then summer nitrogen-fixing bush beans, then fall and winter brassicas. Intended to become a public GitHub repo and a public site.

## Structure

- `src/content/guides/*.md` are the guides. Frontmatter: `title`, `description`, `order` (controls sort), `category` (`Plan` | `Plant` | `Protect`), `updated` (quoted string). Filenames are the URL slugs; ordering comes from `order`, not the filename.
- `src/content.config.ts` defines the `guides` collection via the glob loader.
- `src/layouts/Base.astro` is the shell and global styles. Pages read `import.meta.env.BASE_URL` so internal links follow the configured `base`.
- `src/pages/guides/[...slug].astro` renders each guide; `src/pages/index.astro` lists them by category.
- Cross-links inside guide markdown are **relative** (`../planting-calendar/`) so they inherit the base path. Do not switch them to root-absolute `/guides/...` links; those break on a project-page deploy.

## Content rules

- **No em dashes.** Use commas, colons, "to" for ranges, or sentence breaks.
- Source provenance: the planting calendar and bed layout are ported from a verified Google Doc. The succession, soil, and pest-management SOPs were reconstructed from a planning conversation plus standard Zone 8a horticulture, and carry a review caveat. Keep claims checkable; do not present reconstructed SOPs as authoritative without a source.
- **No personal data.** This repo is public. No home address, household names, personal phone, email, or calendar specifics. Operational and personal detail lives in the private Notion Claude Context Hub, not here.

## Build and deploy

- `npm run dev` / `npm run build` / `npm run preview`.
- Served by Cloudflare Pages at zone8a.com, connected via Cloudflare's Git integration (build `npm run build`, output `dist`). Pushes to `main` trigger a Cloudflare build. The site is static, so there is no adapter or `wrangler` config.
- `astro.config.mjs` sets `site: 'https://zone8a.com'` and no `base`; pages serve from the domain root. If the domain ever changes, update `site` there.
