import { defineConfig } from 'astro/config';

// Temporary GitHub project site while hansollim.com DNS is not connected.
// When the custom domain is live, restore site to https://hansollim.com,
// remove `base`, and put hansollim.com back in public/CNAME.
export default defineConfig({
  site: 'https://hansize91-commits.github.io',
  base: '/hansollim/',
  compressHTML: true,
  server: {
    allowedHosts: true,
  },
});
