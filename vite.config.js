import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves this repository below /webOctober26/.
  // Keep the development server at / for local work.
  base: process.env.GITHUB_PAGES === 'true' ? '/webOctober26/' : '/',
});
