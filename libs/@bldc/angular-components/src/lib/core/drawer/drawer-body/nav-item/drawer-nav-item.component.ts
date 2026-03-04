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
  ViewEncapsulation} from '@angular/core';
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
  template: `
    @if (!$hidden() && $depth()) {
      <ng-template #navIcon><ng-content select="[blui-icon]" /></ng-template>
      <div
        class="blui-drawer-nav-item-content"
        #navItem
        matRipple
        [matRippleDisabled]="!$ripple() ?? true"
        [class.blui-drawer-nav-item-active]="$selected()"
        [class.blui-drawer-nav-item-compact]="false"
      >
        <div
          [class.blui-drawer-nav-item-active-highlight]="$selected()"
          [class.blui-drawer-nav-item-active-round]="
            $activeItemBackgroundShape() === 'round' && drawerState.$isOpen() && !drawerState.$isRail()
          "
          [class.blui-drawer-nav-item-active-square]="
            $activeItemBackgroundShape() === 'square' || !drawerState.$isOpen() || drawerState.$isRail()
          "
        ></div>
        @if (!drawerState.$isRail()) {
          <blui-info-list-item
            (click)="selectItem()"
            [dense]="true"
            [statusColor]="$statusColor()"
            [chevron]="$chevron() && drawerState.$isOpen()"
            [hidePadding]="$hidePadding()"
            [divider]="$divider() ? 'full' : undefined"
            [class.blui-drawer-nav-item-no-icon-closed]="$isNoIcon() && !drawerState.$isOpen()"
            [matTooltip]="$title()"
            [matTooltipDisabled]="drawerState.$isOpen() || drawerState.$openOnHover() || !$showTooltipOnRailHover()"
            matTooltipPosition="right"
          >
            <ng-container blui-icon #icon>
              <ng-container *ngTemplateOutlet="navIcon"></ng-container>
            </ng-container>
            <div
              blui-title
              [class.blui-drawer-nav-item-depth-1]="$depth() === 1"
              [class.blui-drawer-nav-item-depth-2]="$depth() === 2"
              [class.blui-drawer-nav-item-depth-3]="$depth() === 3"
            >
              {{ $title() }}
            </div>
            @if ($subtitle() !== null || $subtitle() !== undefined) {
              <div blui-subtitle>{{ $subtitle() }}</div>
            }
            @if ($hasChildren() && drawerState.$isOpen()) {
              <div blui-right-content>
                @if (!$expanded()) {
                  <div #expandIcon>
                    <ng-content select="[blui-expand-icon]" />
                  </div>
                }
                @if ($expanded()) {
                  <div #collapseIcon>
                    <ng-content select="[blui-collapse-icon]" />
                  </div>
                }
                @if ($hideExpandIcon()) {
                  <mat-icon
                    class="blui-drawer-nav-item-expand-icon"
                    [class.blui-drawer-nav-item-expanded]="$expanded()"
                    >{{ $depth() > 1 ? 'arrow_drop_down' : 'expand_more' }}</mat-icon
                  >
                }
              </div>
            }
          </blui-info-list-item>
        }
        @if (drawerState.$isRail()) {
          <div class="blui-drawer-nav-item-rail-container">
            <div
              (click)="selectItem()"
              (keydown.enter)="selectItem()"
              (keydown.space)="selectItem()"
              [attr.tabindex]="0"
              role="button"
              class="blui-drawer-nav-item-rail"
              [matTooltip]="$showTooltipOnRailHover() ? $title() : ''"
              [matTooltipDisabled]="!drawerState.$isCondensed()"
              matTooltipPosition="right"
            >
              <ng-container *ngTemplateOutlet="navIcon"></ng-container>
              <div class="blui-drawer-nav-item-rail-text">{{ $title() }}</div>
            </div>
            @if ($divider()) {
              <mat-divider />
            }
          </div>
        }
      </div>
      <!-- Nested Nav Items -->
      @if (!drawerState.$isRail()) {
        <mat-accordion displayMode="flat" class="blui-drawer-nested-nav-item">
          <mat-expansion-panel #matExpansionPanel>
            <ng-content select="blui-drawer-nav-item" />
          </mat-expansion-panel>
        </mat-accordion>
      }
    }
  `,
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
  $activeItemBackgroundShape = input<ActiveItemBackgroundShape>('square', { alias: 'activeItemBackgroundShape' });
  /** Sets whether to show a chevron icon on the left side of a `NavItem`
   *
   * @default false
   * */
  $chevron = input(false, { alias: 'chevron' });
  /** Whether to show a dividing line below each NavItem
   *
   * @default false
   * */
  $divider = input(false, { alias: 'divider' });
  /** Sets whether to show nested nav items
   *
   * @default false
   * */
  $expanded = model(false, { alias: 'expanded' });
  /** Sets whether to show/hide padding whenever a NavItem does not have an icon */
  $hidePadding = model<boolean | undefined>(undefined, { alias: 'hidePadding' });
  /** Sets whether to hide the nav item
   *
   * @default false
   * */
  $hidden = input(false, { alias: 'hidden' });
  /** Sets whether to show/hide Angular ripple animation effect onClick
   *
   * @default true
   * */
  $ripple = input(true, { alias: 'ripple' });
  /** Sets whether an item is selected.  A selected item will have the `activeBackgroundShape` applied to it and appear different from all other NavItems.*/
  $selected = input(false, { alias: 'selected' });
  /** Left border color */
  $statusColor = input<string | undefined>(undefined, { alias: 'statusColor' });
  /** Text to display as a subtitle */
  $subtitle = input<string | undefined>(undefined, { alias: 'subtitle' });
  /** Text to display as a title */
  $title = input<string | undefined>(undefined, { alias: 'title' });

  /** Event triggered on nav item select */
  select = output<void>();

  $nestedNavItems = contentChildren(
    forwardRef(() => DrawerNavItemComponent),
    { descendants: false }
  );
  $expandIconEl = viewChild<ElementRef>('expandIcon');
  $iconEl = viewChild<ElementRef>('icon');
  $collapseIconEl = viewChild<ElementRef>('collapseIcon');
  $navItemEl = viewChild<ElementRef>('navItem');
  $matExpansionPanel = viewChild<MatExpansionPanel>('matExpansionPanel');

  readonly drawerState = inject(DRAWER_STATE);
  readonly changeDetectorRef = inject(ChangeDetectorRef);

  protected readonly $isNoIcon = computed(() => isEmptyView(this.$iconEl()));
  protected readonly $hideExpandIcon = computed(
    () => isEmptyView(this.$collapseIconEl()) && isEmptyView(this.$expandIconEl())
  );

   protected readonly $showTooltipOnRailHover = computed(()=> 
     !this.drawerState.$disableRailTooltip()
  )


  /** Controls the expansion icon. */
  protected readonly $hasChildren = signal(false);

  /** Each navigation item in the drawer is assigned a unique id; this is used later when iterating through potential nav item children. */
  id: number;
  /** The depth of the navigation item when appearing within a nested structure.
   *  Depth is populated by iterating through the Drawer navigation tree.  See DrawerNavGroupComponent for details. */
  protected readonly $depth = signal(0);




  constructor() {
    this.id = this.drawerState.createNavItemID();
    effect(
      () => {
        this.$selected();
        this.drawerState.emitChangeActiveItemEvent();
      },
      { allowSignalWrites: true }
    );

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
    this.$hasChildren.set(hasChildren)
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
    const hasChildren = this.$hasChildren()
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
