import { defineConfig } from 'vite';

import { createAppConfig } from '../../vite.app.config.mts';

export default defineConfig(({ mode }) =>
  createAppConfig({
    app: 'demo',
    mode,
    copyTargets: [{ src: './src/docs/md/', dest: './assets/', rename: { stripBase: 2 } }],
  })
);