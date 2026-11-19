import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { isEmptyView } from '../../../../utils/utils';
import { InfoListItemComponent } from '../../../info-list-item/info-list-item.component';
import { DRAWER_STATE } from '../../drawer-state-ref';

export type DrawerNavItem = {
  statusColor?: string;
  title: string;
  subtitle?: string;
  chevron?: boolean;
  divider?: boolean;
  items?: Array<Omit<DrawerNavItem, 'icon'>>;
  onSelect?: unknown;
  icon?: string;
  hasChildren?: boolean;
  ripple?: boolean;
  expanded?: boolean;
  hidePadding?: boolean;
  hidden?: boolean;
};

export type ActiveItemBackgroundShape = 'round' | 'square';

/**
 * [DrawerNavItem Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer-nav-item>` is a wrapper to the `<blui-info-list-item>` that is meant to be used within a `<blui-nav-group>`.
 */
@Component({
  selector: 'blui-drawer-nav-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './drawer-nav-item.component.scss',
  templateUrl: './drawer-nav-item.component.html',
  host: {
    class: 'blui-drawer-nav-item',
  },
  imports: [
    MatRipple,
    InfoListItemComponent,
    MatTooltip,
    NgTemplateOutlet,
    MatIcon,
    MatDivider,
    MatAccordion,
    MatExpansionPanel,
  ],
})
export class DrawerNavItemComponent {
  /** Sets the active item background shape
   *
   * `square` - Background shape takes the entire height of width of the NavItem.
   * `round` - Background shape has a rounded corner towards the end of the NavItem.
   *
   * @default square
   * */
  readonly $activeItemBackgroundShape = input<ActiveItemBackgroundShape>('square', {
    alias: 'activeItemBackgroundShape',
  });
  /** Sets whether to show a chevron icon on the left side of a `NavItem`
   *
   * @default false
   * */
  readonly $chevron = input(false, { alias: 'chevron' });
  /** Whether to show a dividing line below each NavItem
   *
   * @default false
   * */
  readonly $divider = input(false, { alias: 'divider' });
  /** Sets whether to show nested nav items
   *
   * @default false
   * */
  readonly $expanded = model(false, { alias: 'expanded' });
  /** Sets whether to show/hide padding whenever a NavItem does not have an icon */
  readonly $hidePadding = model<boolean | undefined>(undefined, { alias: 'hidePadding' });
  /** Sets whether to hide the nav item
   *
   * @default false
   * */
  readonly $hidden = input(false, { alias: 'hidden' });
  /** Sets whether to show/hide Angular ripple animation effect onClick
   *
   * @default true
   * */
  readonly $ripple = input(true, { alias: 'ripple' });
  /** Sets whether an item is selected.  A selected item will have the `activeBackgroundShape` applied to it and appear different from all other NavItems.*/
  readonly $selected = input(false, { alias: 'selected' });
  /** Left border color */
  readonly $statusColor = input<string | undefined>(undefined, { alias: 'statusColor' });
  /** Text to display as a subtitle */
  readonly $subtitle = input<string | undefined>(undefined, { alias: 'subtitle' });
  /** Text to display as a title */
  readonly $title = input<string | undefined>(undefined, { alias: 'title' });

  /** Event triggered on nav item select */
  // Public API name kept for backwards compatibility.
  // eslint-disable-next-line @angular-eslint/no-output-native
  readonly select = output<void>();

  readonly $nestedNavItems = contentChildren(
    forwardRef(() => DrawerNavItemComponent),
    { descendants: false }
  );
  private readonly $expandIconEl = viewChild<ElementRef>('expandIcon');
  private readonly $iconEl = viewChild<ElementRef>('icon');
  private readonly $collapseIconEl = viewChild<ElementRef>('collapseIcon');
  private readonly $navItemEl = viewChild<ElementRef>('navItem');
  private readonly $matExpansionPanel = viewChild<MatExpansionPanel>('matExpansionPanel');

  protected readonly drawerState = inject(DRAWER_STATE);
  protected readonly changeDetectorRef = inject(ChangeDetectorRef);

  protected readonly $isNoIcon = computed(() => isEmptyView(this.$iconEl()));
  protected readonly $hideExpandIcon = computed(
    () => isEmptyView(this.$collapseIconEl()) && isEmptyView(this.$expandIconEl())
  );

  protected readonly $showTooltipOnRailHover = computed(() => !this.drawerState.$disableRailTooltip());

  /** Controls the expansion icon. */
  protected readonly $hasChildren = signal(false);

  /** Each navigation item in the drawer is assigned a unique id; this is used later when iterating through potential nav item children. */
  id: number;
  /** The depth of the navigation item when appearing within a nested structure.
   *  Depth is populated by iterating through the Drawer navigation tree.  See DrawerNavGroupComponent for details. */
  protected readonly $depth = signal(0);

  constructor() {
    this.id = this.drawerState.createNavItemID();
    effect(() => {
      this.$selected();
      this.drawerState.emitChangeActiveItemEvent();
    });

    let expandedInitialized = false;
    effect(() => {
      this.$expanded();
      if (!expandedInitialized) {
        expandedInitialized = true;
        return;
      }
      untracked(() => {
        if (this.$matExpansionPanel()) {
          this.handleExpand();
        }
      });
    });

    /** React to drawer open/close changes — re-evaluate expand state. */
    effect(() => {
      this.drawerState.$isOpen();
      untracked(() => this.handleExpand());
    });

    /** React to active item changes — update tree highlighting. */
    effect(() => {
      this.drawerState.$activeItemVersion();
      untracked(() => {
        if (this.$navItemEl()) {
          this.manageActiveItemTreeHighlight();
        }
      });
    });
  }

  handleExpand(): void {
    setTimeout(() => {
      const panel = this.$matExpansionPanel();
      if (!panel) {
        return;
      }
      // Persistent drawers will only expand if they the drawer is opened.
      // Temporary drawers will always have any expansion panels opened.
      if (this.$expanded() && (this.drawerState.$isOpen() || this.drawerState.$isTemporary())) {
        panel.open();
      } else {
        panel.close();
      }
    });
  }

  /** Whenever the selected item in the drawer state changes, we need to check to see we should apply a hierarchical highlight. */
  manageActiveItemTreeHighlight(): void {
    const navItemEl = this.$navItemEl();
    if (!navItemEl) {
      return;
    }

    navItemEl.nativeElement.classList.remove('blui-drawer-nav-item-active-tree');
    if (this.drawerState.$disableActiveItemParentStyles()) {
      return;
    }

    // Add tree highlighting for selected items
    if (this.$selected() && this.$depth() > 1) {
      let parent = navItemEl.nativeElement.parentNode;
      while (parent.parentNode) {
        parent = parent.parentNode;
        const navItem = parent.firstElementChild;
        if (navItem.classList.contains('blui-drawer-nav-item-content')) {
          navItem.classList.add('blui-drawer-nav-item-active-tree');
        }
      }
    }
  }

  /** A top-level navigation item has a depth of 1. */
  incrementDepth(parentDepth: number): void {
    if (parentDepth === 0) {
      this._setNavItemDefaults();
    } else {
      this._setNestedNavItemDefaults();
    }
    this.$depth.set(parentDepth + 1);
    const navItems = this.$nestedNavItems();
    const hasChildren = navItems && navItems.length > 0;
    if (hasChildren && this.$expanded() === true) {
      this.handleExpand();
    }
    this.$hasChildren.set(hasChildren);
  }

  /** Sets default state values for non-nested nav items. Invoked by DrawerNavGroupComponent on content init. */
  private _setNavItemDefaults(): void {
    if (this.$hidePadding() === undefined) this.$hidePadding.set(true);
  }

  /** Sets default state values for nested nav items. */
  private _setNestedNavItemDefaults(): void {
    if (this.$hidePadding() === undefined) this.$hidePadding.set(false);
  }

  selectItem(): void {
    const hasChildren = this.$hasChildren();
    this.drawerState.select(hasChildren);
    this.select.emit();
    if (hasChildren) {
      this.toggleNestedNavItems();
    }
  }

  toggleNestedNavItems(): void {
    this.$expanded.set(!this.$expanded());
    this.handleExpand();
  }
}
