import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'blui-docs-theme';
const BODY_CLASS: Record<ThemeMode, string> = { light: 'blui-blue', dark: 'blui-blue-dark' };

export function readThemeMode(): ThemeMode {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/** Switches between the light and dark Brightlayer UI color schemes (applied as a class on `<body>`). */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly $mode = signal<ThemeMode>(readThemeMode());

  constructor() {
    effect(() => {
      const mode = this.$mode();
      const body = this.document.body;
      body.classList.remove(...Object.values(BODY_CLASS));
      body.classList.add(BODY_CLASS[mode]);
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {
        // Storage can be unavailable (e.g. privacy mode); the preference is then kept for this session only.
      }
    });
  }

  get isDarkMode(): boolean {
    return this.$mode() === 'dark';
  }

  toggleMode(): void {
    this.$mode.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }
}
