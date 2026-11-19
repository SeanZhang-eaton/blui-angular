/* eslint-disable simple-import-sort/imports -- the JIT compiler must be loaded before Angular Material */
import '@angular/compiler';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MATERIAL_ANIMATIONS } from '@angular/material/core';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed({
  providers: [
    { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } },
    // Icons and markdown files are requested over HTTP; keep unit tests offline.
    provideHttpClient(),
    provideHttpClientTesting(),
  ],
});
