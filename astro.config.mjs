import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

// Static output: every page's React tree is rendered to HTML at build time,
// then hydrated in the browser. `format: 'file'` keeps the existing URLs
// (/about.html, /products.html, ...).
export default defineConfig({
  output: 'static',
  site: 'https://x402jp.com',
  integrations: [react()],
  build: { format: 'file' },
  outDir: './dist',
})
