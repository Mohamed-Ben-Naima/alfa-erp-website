import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'https://alfa-erp-website-0wgx.onrender.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/mentions-legales') && !page.includes('/404'),
      changefreq: 'monthly',
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  // Hash-based Content-Security-Policy for every script and style Astro emits (meta tag per page).
  security: { csp: true },
});
