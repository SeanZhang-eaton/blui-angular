import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

const SMALL = '(max-width: 600px)';
const MEDIUM = '(max-width: 1280px)';

// Use this service to get viewport size.
@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private readonly _breakpointObserver = inject(BreakpointObserver);
  private readonly $breakpoints = toSignal(this._breakpointObserver.observe([SMALL, MEDIUM]), {
    initialValue: { matches: false, breakpoints: { [SMALL]: false, [MEDIUM]: false } },
  });

  readonly $isSmall = computed(() => !!this.$breakpoints().breakpoints[SMALL]);
  readonly $isMedium = computed(() => !!this.$breakpoints().breakpoints[MEDIUM]);

  isSmall(): boolean {
    return this.$isSmall();
  }

  isMedium(): boolean {
    return this.$isMedium();
  }
}
