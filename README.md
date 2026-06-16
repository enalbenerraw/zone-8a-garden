# Zone 8a Garden

A practical fall and winter gardening guide for USDA Zone 8a, built as a static site with [Astro](https://astro.build). The site documents one full high-rotation raised-bed sequence: spring spinach, summer nitrogen-fixing bush beans, then fall and winter brassicas.

## Content

Guides live in `src/content/guides/` as Markdown with frontmatter (`title`, `description`, `order`, `category`, `updated`). Categories are `Plan`, `Plant`, and `Protect`. Add a guide by dropping a new `.md` file in that folder.

| Guide | Category |
| :-- | :-- |
| Overview: the relay rotation | Plan |
| Fall and winter master planting calendar | Plan |
| Polyculture bed layout blueprint | Plant |
| The succession sequence and soil method | Plant |
| Integrated pest management for the brassica window | Protect |
| Companion planting rules | Protect |

### Provenance

The planting calendar and bed layout are ported from a verified source document. The succession, soil, and pest-management SOPs were reconstructed from a planning conversation plus standard Zone 8a horticulture and are marked for review where appropriate. Confirm spray product labels and timing against local extension guidance before applying anything.

## Develop

```sh
npm install
npm run dev      # local dev server at localhost:4321
npm run build    # production build to ./dist/
npm run preview  # preview the production build
```

## Deploy

The site is served by **Cloudflare Pages** at [zone8a.com](https://zone8a.com), connected to this repository through Cloudflare's Git integration. Every push to `main` triggers a Cloudflare build.

Cloudflare project settings:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Custom domain:** `zone8a.com`

The site is static (no adapter, no `wrangler`). `astro.config.mjs` sets `site: 'https://zone8a.com'` and no `base`, so pages serve from the domain root.
