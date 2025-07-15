import { defineConfig } from 'vite'

export default defineConfig({
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true
  },
  
  // Configuración del build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  
  // Configuración de assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
  
  // Configuración de CSS
  css: {
    devSourcemap: true
  }
}) 