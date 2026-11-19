/// <reference types="vitest" />

import { join } from 'node:path';

import angular from '@analogjs/vite-plugin-angular';
import { replaceFiles } from '@nx/vite/plugins/rollup-replace-files.plugin';
import { normalizePath, type UserConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

type StaticCopyTarget = Parameters<typeof viteStaticCopy>[0]['targets'][number];

export type AppConfigOptions = {
  /** Folder name of the app under `apps/`. */
  app: string;
  mode: string;
  /** Extra static-copy targets besides `src/assets/*`. */
  copyTargets?: StaticCopyTarget[];
};

const rootDir = import.meta.dirname;

/** Vite / Vitest configuration shared by the demo applications. */
export function createAppConfig({ app, mode, copyTargets = [] }: AppConfigOptions): UserConfig {
  const isProd = mode === 'production';

  return {
    root: join(rootDir, 'apps', app),
    base: './',
    cacheDir: join(rootDir, 'node_modules/.vite', app),
    plugins: [
      angular({ inlineStylesExtension: 'scss' }),
      isProd &&
        replaceFiles([
          {
            replace: './src/environments/environment.ts',
            with: './src/environments/environment.prod.ts',
          },
        ]),
      viteStaticCopy({
        targets: [
          { src: './src/assets/**/*', dest: './assets/', rename: { stripBase: 2 } },
          // Brightlayer UI SVG icons, registered under the `blui-icons` namespace (see AppComponent).
          {
            src: normalizePath(join(rootDir, 'node_modules/@brightlayer-ui/icons-svg/*.svg')),
            dest: './assets/blui-icons/',
            rename: { stripBase: true },
          },
          ...copyTargets,
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [rootDir, join(rootDir, 'node_modules')],
        },
      },
    },
    resolve: {
      mainFields: ['module'],
      alias: {
        '@bldc/angular-components': join(rootDir, 'libs/@bldc/angular-components/src/public-api.ts'),
      },
    },
    build: {
      target: ['es2022'],
      outDir: join(rootDir, 'dist/apps', app),
      emptyOutDir: true,
      reportCompressedSize: true,
      // Lazy routes produce their own chunks; only the framework is split out so it can be cached across deploys.
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/@angular/material') || id.includes('node_modules/@angular/cdk')) {
              return 'angular-material';
            }
            if (id.includes('node_modules/@angular/') || id.includes('node_modules/rxjs')) {
              return 'angular-core';
            }
            return undefined;
          },
          entryFileNames: isProd ? 'assets/js/[name].[hash].js' : 'assets/js/[name].js',
          chunkFileNames: isProd ? 'assets/js/[name].[hash].js' : 'assets/js/[name].js',
          assetFileNames: isProd ? 'assets/[ext]/[name].[hash].[ext]' : 'assets/[ext]/[name].[ext]',
        },
      },
    },
    server: {
      host: 'localhost',
      fs: {
        allow: [rootDir],
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      // The first test of a file compiles the lazily loaded documentation pages.
      testTimeout: 20000,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'lcov'],
        reportsDirectory: join(rootDir, 'coverage/apps', app),
      },
    },
    define: {
      'import.meta.vitest': !isProd,
    },
    optimizeDeps: {
      include: ['@angular/common', '@angular/core', '@angular/forms', '@angular/router', '@angular/material', 'rxjs'],
    },
  };
}
