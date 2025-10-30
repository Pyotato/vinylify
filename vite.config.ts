// import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import type { UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import type { InlineConfig } from 'vitest';

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    visualizer({
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      open: true, // automatically open report
    }),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    // sentryVitePlugin({
    //   authToken: process.env.SENTRY_AUTH_TOKEN,
    //   org: 'pyotato',
    //   project: 'javascript-react',
    //   disable: true, //disable
    // }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    proxy: {
      '/genius/api': {
        target: 'https://api.genius.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/genius\/api/, ''),
      },
      '/api/reccobeats': {
        target: 'https://api.reccobeats.com/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/reccobeats/, ''),
      },
      '/api/lyrics': {
        target: 'https://api.lyrics.ovh/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/lyrics/, ''),
      },
    },
  },
  build: {
    sourcemap: true, // Source map generation must be turned on
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@sentry')) {
            return 'vendor';
          }
        },
      },
    },
  },
};
export default defineConfig(config);
