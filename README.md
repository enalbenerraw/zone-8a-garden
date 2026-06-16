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

A GitHub Actions workflow at `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.

Before the first deploy, confirm the target in `astro.config.mjs`:

- **Project page** (`https://<account>.github.io/zone-8a-garden`): keep `base: '/zone-8a-garden'` and set `site` to your `https://<account>.github.io` origin.
- **Custom domain or user/org root**: set `site` to that origin and remove `base`.

Then in the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
