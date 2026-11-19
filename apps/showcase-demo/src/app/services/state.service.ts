import { inject, Injectable, linkedSignal } from '@angular/core';

import { ViewportService } from './viewport.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly _viewportService = inject(ViewportService);

  /** Open by default on large screens; resets whenever the viewport crosses the small breakpoint. */
  readonly $drawerOpen = linkedSignal(() => !this._viewportService.$isSmall());

  setDrawerOpen(drawerOpen: boolean): void {
    this.$drawerOpen.set(drawerOpen);
  }

  getDrawerOpen(): boolean {
    return this.$drawerOpen();
  }
}
