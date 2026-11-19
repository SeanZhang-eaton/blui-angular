import { defineConfig } from 'vite';

import { createAppConfig } from '../../vite.app.config.mts';

export default defineConfig(({ mode }) =>
  createAppConfig({
    app: 'demo',
    mode,
    copyTargets: [
      { src: './src/docs/md/', dest: './assets/', rename: { stripBase: 2 } },
      // Redirects deep links on GitHub Pages back to the app (https://github.com/rafgraph/spa-github-pages).
      { src: './src/404.html', dest: '.', rename: { stripBase: true } },
    ],
  })
);