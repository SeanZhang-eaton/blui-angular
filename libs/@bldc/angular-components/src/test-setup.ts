/* eslint-disable simple-import-sort/imports -- side-effect imports must run before Angular Material is loaded */
import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import { provideZoneChangeDetection } from '@angular/core';
import { MATERIAL_ANIMATIONS } from '@angular/material/core';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed({
  zoneless: false,
  providers: [provideZoneChangeDetection(), { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } }],
});
