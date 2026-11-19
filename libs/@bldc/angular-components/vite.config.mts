/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';

// Test-only config: the library itself is built with ng-packagr (see ng-package.json).
export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../../node_modules/.vite/libs/@bldc/angular-components',
  plugins: [angular({ tsconfig: 'tsconfig.spec.json' })],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: '../../../coverage/libs/@bldc/angular-components',
    },
  },
});
