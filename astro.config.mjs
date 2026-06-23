// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// Deployment target: Cloudflare Pages on the root domain.
// Served at the root, so no `base`. The layouts read import.meta.env.BASE_URL,
// which resolves to '/' here, so internal links sit at the domain root.
export default defineConfig({
  site: 'https://zone8a.com',
  // The site is fully prerendered, so optimize images with sharp at build
  // time. Without 'compile', the Cloudflare adapter defers to an on-demand
  // /_image endpoint that does not run sharp in the Workers runtime, which
  // would ship the full-size originals unoptimized.
  adapter: cloudflare({ imageService: 'compile' }),
});