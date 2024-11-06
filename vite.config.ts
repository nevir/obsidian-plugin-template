import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { macaronVitePlugin } from '@macaron-css/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [macaronVitePlugin(), solidPlugin()],

  // https://vite.dev/config/build-options.html
  build: {
    outDir: '.',
    target: 'node18',
    sourcemap: 'inline',

    // https://vite.dev/guide/build#library-mode
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
      fileName: () => `main.js`,
    },

    // https://rollupjs.org/configuration-options/
    rollupOptions: {
      external: ['obsidian'],
      output: {
        assetFileNames(asset) {
          if (asset.name === 'style.css') return 'styles.css';
          return asset.name!;
        },
      },
    },
  },
});
