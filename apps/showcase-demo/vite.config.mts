import { defineConfig } from 'vite';

import { createAppConfig } from '../../vite.app.config.mts';

export default defineConfig(({ mode }) => createAppConfig({ app: 'showcase-demo', mode }));