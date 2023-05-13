import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import postcssNesting from 'postcss-nesting';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  //@ts-ignore
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [
          tailwindcss,
          postcssNesting
        ],
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
