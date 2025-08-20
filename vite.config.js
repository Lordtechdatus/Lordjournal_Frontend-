import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false, // Combine all CSS into a single file
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'app': ['./src/App.jsx', './src/Header.jsx', './src/Homepage.jsx', './src/Footer.jsx'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: {
    hmr: {
      overlay: false // Disable error overlay that might cause issues
    }
  }
})