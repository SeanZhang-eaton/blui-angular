import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode, MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';

import { DrawerStateRef } from '../drawer-state-ref';
import { DrawerLayoutVariantType } from '../drawerState';

export { DrawerLayoutVariantType } from '../drawerState';

/**
 * [DrawerLayout Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer-layout>` component is a wrapper around the [Angular Material Sidenav](https://material.angular.io/components/sidenav/overview) that adds specific Brightlayer UI functionality and styling.
 * The `<blui-drawer-layout>` component is used to provide the appropriate resizing behavior for your main application content when used in conjunction with a Brightlayer UI `<blui-drawer>`.
 * It accepts a drawer and content as child elements;
 */
@Component({
  selector: 'blui-drawer-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './drawer-layout.component.scss',
  templateUrl: './drawer-layout.component.html',
  host: {
    class: 'blui-drawer-layout',
  },
  imports: [MatSidenavContainer, MatSidenav],
  providers: [DrawerStateRef],
})
export class DrawerLayoutComponent {
  /** Controls how the Drawer behaves and appears on the screen.  Can be `permanent` | `peristent` | `temporary` | `rail`.
   *
   * `permanent` - `Drawer` appears on the side of the screen and cannot be dismissed.
   *
   * `persistent` - `Drawer` appears on the side of the screen and responds to the `open` @Input. When closed, only shows each `NavItem` icon.
   *
   * `temporary` - `Drawer` slides in from the side of the screen and appears as an overlay.
   *
   * `rail` - `Drawer` appears on the side of the screen as a slim element, supporting icons and text.
   *
   * @default temporary
   * */
  readonly $variant = input<DrawerLayoutVariantType>('temporary', { alias: 'variant' });
  /** Drawer pixel width
   *
   * @default 350
   * */
  readonly $width = input(350, { alias: 'width' });
  /** Event triggered on 'temporary' variant backdrop click */
  readonly backdropClick = output<void>();
  private readonly $remElement = viewChild<ElementRef>('remElement');

  private readonly stateRef = inject(DrawerStateRef);
  private readonly dir = inject(Directionality);

  /** Reactive reference to the current DrawerState held by the DrawerStateRef. */
  readonly $drawerState = computed(() => this.stateRef.$state());

  /** Track directionality reactively via toSignal. */
  private readonly $direction = toSignal(this.dir.change, { initialValue: this.dir.value });
  readonly $isRtl = computed(() => this.$direction() === 'rtl');

  protected readonly $isTemporary = computed(() => this.$variant() === 'temporary');
  protected readonly $isRail = computed(() => this.$variant() === 'rail');
  protected readonly $isPersistent = computed(() => this.$variant() === 'persistent');

  protected readonly $mode = computed<MatDrawerMode>(() => (this.$isTemporary() ? 'over' : 'side'));

  // Is the drawer seen on the screen and expanded.

  protected readonly $isDrawerVisible = computed(() => {
    if (this.$isTemporary()) {
      return this.$drawerState().$isOpen();
    }
    return true;
  });

  protected readonly $collapsedWidth = computed(() => {
    return this.$isRail() && !this.$drawerState().$isCondensed()
      ? 3.5 + this.toRem(16) // Rail (default)
      : 1.5 + this.toRem(32); //  Rail (condensed) || closed persistent
  });

  protected readonly $contentMargin = computed(() => {
    if (this.$isTemporary()) {
      return 0;
    }
    return this.$isCollapsed() ? this.$collapsedWidth() : this.toRem(this.$width());
  });

  protected readonly $sidenavWidth = computed(() =>
    this.$isCollapsed() ? this.$collapsedWidth() : this.toRem(this.$width())
  );

  protected readonly $marginRight = computed(() => (this.$isRtl() ? this.$contentMargin() : 0));
  protected readonly $marginLeft = computed(() => (this.$isRtl() ? 0 : this.$contentMargin()));

  /** This is true whenever the drawer is in a collapsed state & its variant has been transitioned to temporary. */
  readonly $hasCollapsedTransitionToTemporary = computed(() =>
    this.$drawerState().$hasCollapsedTransitionToTemporary()
  );

  // Is the drawer condensed.
  protected readonly $isCollapsed = computed(() => {
    // Rail is always collapsed.
    if (this.$isRail()) {
      return true;
    }

    if (this.$isPersistent()) {
      return !this.$drawerState().$isOpen();
    }
    if (this.$hasCollapsedTransitionToTemporary()) {
      return true;
    }
    return false;
  });

  private remSizePx: number;

  toRem(px: number): number {
    const remEl = this.$remElement();
    if (remEl && remEl.nativeElement) {
      const style = getComputedStyle(remEl.nativeElement);
      this.remSizePx = Number(style.fontSize.split('px')[0]);
    }
    return px / (this.remSizePx || 16);
  }

  closeDrawer(): void {
    this.$drawerState().setDrawerOpen(false);
    this.backdropClick.emit();
  }

  constructor() {
    effect(() => {
      const variant = this.$variant();
      const state = this.$drawerState();
      state.setDrawerVariant(variant);
    });
  }
}
