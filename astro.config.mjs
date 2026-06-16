// @ts-check
import { defineConfig } from 'astro/config';

// Deployment target: Cloudflare Pages on the root domain.
// Served at the root, so no `base`. The layouts read import.meta.env.BASE_URL,
// which resolves to '/' here, so internal links sit at the domain root.
export default defineConfig({
  site: 'https://zone8a.com',
});
