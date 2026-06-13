import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// IMPORTANT: set this to your real domain before going live.
// One domain for site + blog (blog lives at /blog) keeps GA4 + GSC to a single property.
const SITE_URL = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
});
