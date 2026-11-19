import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

/** Prism itself is loaded globally in `src/prism.ts`. */
@Injectable({ providedIn: 'root' })
export class HighlightService {
  private readonly platformId = inject(PLATFORM_ID);

  highlightAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.Prism.highlightAll();
    }
  }
}
