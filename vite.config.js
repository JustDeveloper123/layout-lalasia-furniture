import { resolve } from 'path'; // project paths
import { defineConfig } from 'vite'; // config for custom vite properties
import injectHTML from 'vite-plugin-html-inject'; // insert separate parts of HTML
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: '/layout-lalasia-furniture/', // name of the github repo for deployment

  //# Plugins
  plugins: [
    // Insert html parts
    injectHTML({
      debug: {
        logPath: true, // Debugging
      },
    }), // this plugin can have arguments

    // Image optimizer
    ViteImageOptimizer({
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
      jpg: {
        quality: 70,
      },
    }),
  ],

  //# Production
  build: {
    rollupOptions: {
      input: {
        // Production paths
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'src/pages/product/index.html'),
        productItem: resolve(__dirname, 'src/pages/product-item/index.html'),
      },
    },
  },

  //# Developer server
  server: {
    port: 3000,
    strictPort: false,
  },
  //# Production server
  preview: {
    port: 8080,
    strictPort: false,
  },
});
