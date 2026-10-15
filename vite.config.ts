import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  // Root by default (production on arcinds.com). The GitHub Pages review build sets
  // BASE_PATH to the repository subpath, e.g. /arc-industries-website/.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
});
