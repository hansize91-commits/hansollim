import { defineConfig } from 'astro/config';

// Custom domain (hansollim.com) and Cloudflare Pages use the site root.
// A GitHub project site (username.github.io/repo) needs base: '/repo/'.
export default defineConfig({
  site: 'https://hansollim.com',
  compressHTML: true,
});
