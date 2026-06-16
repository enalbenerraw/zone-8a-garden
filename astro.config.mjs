// @ts-check
import { defineConfig } from 'astro/config';

// Deployment target.
// Default below assumes a GitHub Pages PROJECT site at
//   https://<account>.github.io/zone-8a-garden
// If you deploy to a custom domain or a user/org root page, set `site` to that
// origin and remove `base` (or set it to '/'). The layouts read import.meta.env.BASE_URL,
// so internal links follow whatever you set here.
export default defineConfig({
  site: 'https://enalbenerraw.github.io',
  base: '/zone-8a-garden',
});
