import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        about:    resolve(__dirname, 'about.html'),
        market:   resolve(__dirname, 'market.html'),
        research: resolve(__dirname, 'research.html'),
      },
    },
  },
})
