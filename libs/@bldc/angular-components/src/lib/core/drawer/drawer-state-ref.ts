import { Injectable, InjectionToken, signal } from '@angular/core';

import { DrawerState } from './drawerState';

/** Injection token provided by DrawerComponent for sub-components to access the shared DrawerState. */
export const DRAWER_STATE = new InjectionToken<DrawerState>('DRAWER_STATE');

/** Signal-based holder for a DrawerState instance. Provided by DrawerLayoutComponent so that
 *  it can reactively track whichever DrawerState its child Drawer registers. */
@Injectable()
export class DrawerStateRef {
  private readonly _$state = signal(new DrawerState());
  readonly $state = this._$state.asReadonly();

  register(state: DrawerState): void {
    this._$state.set(state);
  }
}
