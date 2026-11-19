/* eslint-disable simple-import-sort/imports -- the JIT compiler must be loaded before Angular Material */
import '@angular/compiler';

import { MATERIAL_ANIMATIONS } from '@angular/material/core';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed({
  providers: [{ provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } }],
});
