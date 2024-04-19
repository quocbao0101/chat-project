/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5174,
  },
  compilerOptions: {
    // ...
    baseUrl: '.',
    paths: {
      '@/*': [
        './src/*',
      ],
    },
    // ...
  },
});
