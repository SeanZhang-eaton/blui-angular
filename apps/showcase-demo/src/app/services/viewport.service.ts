import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

const SMALL = '(max-width: 720px)';

// Use this service to get viewport size.
@Injectable({
  providedIn: 'root',
})
export class ViewportService {
  private readonly $breakpoints = toSignal(inject(BreakpointObserver).observe([SMALL]), {
    initialValue: { matches: false, breakpoints: { [SMALL]: false } },
  });

  readonly $isSmall = computed(() => !!this.$breakpoints().breakpoints[SMALL]);

  isSmall(): boolean {
    return this.$isSmall();
  }
}
