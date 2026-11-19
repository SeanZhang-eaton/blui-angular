// Builds the SCSS-only @bldc/angular-themes package by copying its sources into dist.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projectRoot = join(root, 'libs/@bldc/angular-themes');
const outDir = join(root, 'dist/libs/@bldc/angular-themes');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

cpSync(join(projectRoot, 'src/lib'), outDir, { recursive: true });

const files = [
  [join(projectRoot, 'package.json'), 'package.json'],
  [join(projectRoot, 'README.md'), 'README.md'],
  [join(root, 'LICENSE'), 'LICENSE'],
  [join(root, 'LICENSES.json'), 'LICENSES.json'],
];
for (const [src, dest] of files) {
  if (existsSync(src)) {
    cpSync(src, join(outDir, dest));
  }
}

console.log(`@bldc/angular-themes copied to ${outDir}`);
