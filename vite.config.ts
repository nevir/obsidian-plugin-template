import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '.',
    target: 'node18',
    sourcemap: 'inline',
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
      fileName: () => `main.js`,
    },
    rollupOptions: {
      external: ['obsidian'],
    },
  },
});
