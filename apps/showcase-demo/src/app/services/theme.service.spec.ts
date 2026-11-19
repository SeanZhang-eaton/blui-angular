import { TestBed } from '@angular/core/testing';

import { readThemeMode, ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => localStorage.clear());

  it('applies and persists the selected mode', () => {
    const service = TestBed.inject(ThemeService);
    service.toggleMode();
    TestBed.tick();
    void expect(document.body.classList).toContain('blui-blue-dark');
    void expect(readThemeMode()).toBe('dark');
    void expect(service.isDarkMode).toBe(true);
  });

  it('falls back to the light theme for unknown values', () => {
    localStorage.setItem('blui-showcase-theme', 'sepia');
    void expect(readThemeMode()).toBe('light');
  });
});
