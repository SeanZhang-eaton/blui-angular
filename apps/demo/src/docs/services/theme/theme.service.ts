import { DOCUMENT, effect, inject, Injectable, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
export type ThemeDesign = 'm3' | 'm2';
export type ThemePreference = { mode: ThemeMode; design: ThemeDesign };

const STORAGE_KEY = 'blui-docs-theme';
const STYLE_ELEMENT_ID = 'blui-theme';
const BODY_CLASS: Record<ThemeMode, string> = { light: 'blui-blue', dark: 'blui-blue-dark' };

// Each theme is compiled to its own lazily loaded chunk; only the selected one is added to the page.
const THEME_STYLES: Record<ThemeDesign, () => Promise<{ default: string }>> = {
  m3: () => import('../../../themes/theme-m3.scss?inline'),
  m2: () => import('../../../themes/theme-m2.scss?inline'),
};

export function readThemePreference(): ThemePreference {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<ThemePreference>;
    return {
      mode: saved.mode === 'dark' ? 'dark' : 'light',
      design: saved.design === 'm2' ? 'm2' : 'm3',
    };
  } catch {
    return { mode: 'light', design: 'm3' };
  }
}

/** Adds (or replaces) the theme stylesheet. It is inserted first so that application styles win. */
export async function loadThemeStyles(design: ThemeDesign, doc: Document = document): Promise<void> {
  const css = (await THEME_STYLES[design]()).default;
  let style = doc.getElementById(STYLE_ELEMENT_ID) as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement('style');
    style.id = STYLE_ELEMENT_ID;
    doc.head.prepend(style);
  }
  style.textContent = css;
}

/** Switches between the light / dark color schemes and the Material 3 / Material 2 themes. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly initial = readThemePreference();

  readonly $mode = signal<ThemeMode>(this.initial.mode);
  readonly $design = signal<ThemeDesign>(this.initial.design);

  constructor() {
    effect(() => {
      const mode = this.$mode();
      const body = this.document.body;
      body.classList.remove(...Object.values(BODY_CLASS));
      body.classList.add(BODY_CLASS[mode]);
    });
    effect(() => {
      void loadThemeStyles(this.$design(), this.document);
    });
    effect(() => {
      const preference: ThemePreference = { mode: this.$mode(), design: this.$design() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
      } catch {
        // Storage can be unavailable (e.g. privacy mode); the preference is then kept for this session only.
      }
    });
  }

  toggleMode(): void {
    this.$mode.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }

  setDesign(design: ThemeDesign): void {
    this.$design.set(design);
  }
}
