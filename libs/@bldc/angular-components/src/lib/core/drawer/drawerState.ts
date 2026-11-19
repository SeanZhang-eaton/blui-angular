import { computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

import { filter, map, pairwise, startWith, switchMap, timer } from 'rxjs';

export type DrawerLayoutVariantType = 'permanent' | 'persistent' | 'temporary' | 'rail';

type State = {
  drawerOpen: boolean;
  tempOpen: boolean;
  condensed: boolean;
  sideBorder: boolean;
  disableRailTooltip: boolean;
  disableActiveItemParentStyles: boolean;
  openOnHover: boolean;
  variant: DrawerLayoutVariantType;
  activeItemVersion: number;
};

export class DrawerState {
  #navItemCount = 0;

  // Core state signals

  private readonly $state = signal<State>({
    variant: 'temporary',
    drawerOpen: false,
    tempOpen: false,
    condensed: false,
    sideBorder: false,
    disableRailTooltip: false,
    disableActiveItemParentStyles: false,
    openOnHover: false,
    activeItemVersion: 0,
  });

  readonly $drawerOpen = computed(() => this.$state().drawerOpen);
  readonly $tempOpen = computed(() => this.$state().tempOpen);
  readonly $variant = computed(() => this.$state().variant);
  readonly $disableRailTooltip = computed(() => this.$state().disableRailTooltip);
  readonly $disableActiveItemParentStyles = computed(() => this.$state().disableActiveItemParentStyles);
  readonly $openOnHover = computed(() => this.$state().openOnHover);
  readonly $activeItemVersion = computed(() => this.$state().activeItemVersion);
  readonly $isSideBorder = computed(() => this.$state().sideBorder);
  readonly $isCondensed = computed(() => this.$state().condensed);

  readonly $isTemporary = computed(() => this.$variant() === 'temporary');
  readonly $isRail = computed(() => this.$variant() === 'rail');
  readonly $isPersistent = computed(() => this.$variant() === 'persistent');
  readonly $isPermanent = computed(() => this.$variant() === 'permanent');

  // Derived state
  readonly $isOpen = computed(() => this.$drawerOpen() || this.$isPermanent() || this.$tempOpen() || this.$isRail());

  // Whenever a drawer has transitioned from a closed persistent drawer to a temporary variant,
  // this edge case prevents the drawer from being redrawn at an opened size before it dismissed.
  readonly $hasCollapsedTransitionToTemporary = toSignal(
    toObservable(this.$variant).pipe(
      startWith(undefined),
      pairwise(),
      filter(([prev, current]) => {
        const isOpen = this.$isOpen();
        if (prev === undefined) {
          return false;
        }
        if ((current === 'temporary' && prev === 'rail') || (prev === 'persistent' && !isOpen)) {
          return true;
        }
        return false;
      }),
      switchMap(() =>
        timer(500).pipe(
          map(() => false),
          startWith(true)
        )
      )
    ),
    { initialValue: false }
  );

  // --- Setters ---

  setDrawerOpen(drawerOpen: boolean): void {
    this.$state.update((state) => ({ ...state, drawerOpen }));
  }

  setDrawerTempOpen(open: boolean): void {
    this.$state.update((state) => ({ ...state, tempOpen: open }));
  }

  setDrawerVariant(variant: DrawerLayoutVariantType): void {
    this.$state.update((state) => ({ ...state, variant }));
  }

  setIsCondensed(condensed: boolean): void {
    this.$state.update((state) => ({ ...state, condensed }));
  }

  setSideBorder(sideBorder: boolean): void {
    this.$state.update((state) => ({ ...state, sideBorder }));
  }

  setDisableRailTooltip(disableRailTooltip: boolean): void {
    this.$state.update((state) => ({ ...state, disableRailTooltip }));
  }

  setDisableActiveItemParentStyles(disableActiveItemParentStyles: boolean): void {
    this.$state.update((state) => ({ ...state, disableActiveItemParentStyles }));
  }

  setOpenOnHover(openOnHover: boolean): void {
    this.$state.update((state) => ({ ...state, openOnHover }));
  }

  select(hasChildren: boolean): void {
    // Close drawer on selection if drawer is only temporarily opened.
    if (this.$tempOpen() && !hasChildren) {
      this.setDrawerTempOpen(false);
    }
  }

  emitChangeActiveItemEvent(): void {
    this.$state.update((state) => ({ ...state, activeItemVersion: state.activeItemVersion + 1 }));
  }

  /** Each nav item has a unique id which is used to determine which item is selected. */
  createNavItemID(): number {
    return ++this.#navItemCount;
  }
}
