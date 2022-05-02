import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import * as path from 'path';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  devOptions: {
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  strategies: 'generateSW',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
});
