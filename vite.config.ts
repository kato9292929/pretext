import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        products: 'products.html',
        research: 'research.html',
        privacy: 'privacy.html',
        disclaimer: 'disclaimer.html',
        security: 'security.html',
      },
    },
  },
})
