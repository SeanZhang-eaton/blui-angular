import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { DRAWER_STATE, DrawerStateRef } from './drawer-state-ref';
import { DrawerState } from './drawerState';

/**
 * [Drawer Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer>` is used to organize content (typically navigation links) within a `<blui-drawer-layout>`.
 * The `<blui-drawer>` includes helper components for `<blui-drawer-header>`, `<blui-drawer-subheader>`, `<blui-drawer-body>`, `<blui-drawer-nav-group>`, `<blui-drawer-footer>`, and `<blui-drawer-layout>` to help organize the content.
 */
@Component({
  selector: 'blui-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  host: {
    class: 'blui-drawer',
  },
  providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
})
export class DrawerComponent {
  /** Enables a condensed view for the `rail` variant which removes NavItem labels and shows tooltips instead
   *
   * @default false
   * */
  readonly $condensed = input(false, { alias: 'condensed' });
  /** Hides tooltips on hover for the `rail` variant
   *
   * @default false
   * */
  readonly $disableRailTooltip = input(false, { alias: 'disableRailTooltip' });
  /** If true, NavItems will not have a bold title when a child NavItem is selected
   *
   * @default false
   * */
  readonly $disableActiveItemParentStyles = input(false, { alias: 'disableActiveItemParentStyles' });
  /** State for the drawer */
  readonly $open = input(true, { alias: 'open' });
  /** Automatically open the drawer on hover when closed (persistent variant only) */
  readonly $openOnHover = input(true, { alias: 'openOnHover' });
  /** Delay in milliseconds before a hover event opens the drawer (persistent variant only)
   *
   * @default 500
   * */
  readonly $openOnHoverDelay = input(500, { alias: 'openOnHoverDelay' });
  /** Toggle a side border instead of shadow
   *
   * @default false
   * */
  readonly $sideBorder = input(false, { alias: 'sideBorder' });

  protected readonly drawerState = inject(DRAWER_STATE);
  private readonly stateRef = inject(DrawerStateRef, { optional: true });

  private hoverDelayTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.hoverDelayTimeout));

    // Register this drawer's state with the parent layout (if present).
    this.stateRef?.register(this.drawerState);

    effect(() => {
      this.drawerState.setSideBorder(this.$sideBorder());
      this.drawerState.setDrawerOpen(this.$open());
      this.drawerState.setIsCondensed(this.$condensed());
      this.drawerState.setDisableRailTooltip(this.$disableRailTooltip());
      this.drawerState.setDisableActiveItemParentStyles(this.$disableActiveItemParentStyles());
      this.drawerState.setOpenOnHover(this.$openOnHover());
    });
  }

  hoverDrawer(): void {
    if (!this.$open() && this.$openOnHover()) {
      clearTimeout(this.hoverDelayTimeout);
      this.hoverDelayTimeout = setTimeout(() => {
        this.drawerState.setDrawerTempOpen(true);
      }, this.$openOnHoverDelay());
    }
  }

  unhoverDrawer(): void {
    if (this.$openOnHover()) {
      clearTimeout(this.hoverDelayTimeout);
      if (this.drawerState.$tempOpen()) {
        this.drawerState.setDrawerTempOpen(false);
      }
    }
  }
}
