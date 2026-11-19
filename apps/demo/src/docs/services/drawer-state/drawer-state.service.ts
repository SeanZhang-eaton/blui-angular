import { inject, Injectable, linkedSignal, signal } from '@angular/core';

import { ViewportService } from '../viewport/viewport.service';

@Injectable({
  providedIn: 'root',
})
export class DrawerStateService {
  private readonly _viewportService = inject(ViewportService);

  /** Open by default on large screens; resets whenever the viewport crosses the medium breakpoint. */
  readonly $drawerOpen = linkedSignal(() => !this._viewportService.$isMedium());
  readonly $selectedItem = signal<string | undefined>(undefined);

  setDrawerOpen(drawerOpen: boolean): void {
    this.$drawerOpen.set(drawerOpen);
  }

  getDrawerOpen(): boolean {
    return this.$drawerOpen();
  }

  setSelectedItem(item: string): void {
    this.$selectedItem.set(item);
  }

  getSelectedItem(): string | undefined {
    return this.$selectedItem();
  }
}
