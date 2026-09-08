import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { publicPages } from './tooling/publicPages';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const publicUrl = (env.VITE_PUBLIC_SITE_URL ?? '').replace(/\/$/, '');

  return {
    base: './',
    plugins: [react(), publicPages(publicUrl)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      css: true,
    },
  };
});
