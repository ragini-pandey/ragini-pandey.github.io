import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Allow JSX syntax inside `.js` files (legacy CRA convention used in this repo)
const jsxInJsPlugin = {
  name: 'treat-js-as-jsx',
  async transform(code, id) {
    if (!id.match(/src\/.*\.js$/)) return null;
    const { transformWithEsbuild } = await import('vite');
    return transformWithEsbuild(code, id, {
      loader: 'jsx',
      jsx: 'automatic',
    });
  },
};

export default defineConfig({
  base: './',
  plugins: [jsxInJsPlugin, react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: false,
  },
});
