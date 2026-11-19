import { TestBed } from '@angular/core/testing';

import { readThemePreference, ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => localStorage.clear());

  it('persists the selected mode and design', () => {
    const service = TestBed.inject(ThemeService);
    service.toggleMode();
    service.setDesign('m2');
    TestBed.tick();
    void expect(readThemePreference()).toEqual({ mode: 'dark', design: 'm2' });
    void expect(service.isDarkMode).toBe(true);
  });

  it('falls back to the light Material 3 theme for unknown values', () => {
    localStorage.setItem('blui-showcase-theme', '{"mode":"sepia","design":"m4"}');
    void expect(readThemePreference()).toEqual({ mode: 'light', design: 'm3' });
  });
});
