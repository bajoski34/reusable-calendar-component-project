import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index-B8IM7gcy.js'
      }
    }
  },
  plugins: [react()],
})
