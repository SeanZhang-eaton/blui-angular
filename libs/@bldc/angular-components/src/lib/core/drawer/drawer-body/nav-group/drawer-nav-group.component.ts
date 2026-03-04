import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatNavList } from '@angular/material/list';

import { DRAWER_STATE } from '../../drawer-state-ref';
import { DrawerNavItem, DrawerNavItemComponent } from '../nav-item/drawer-nav-item.component';

export type DrawerNavGroup = {
  divider?: boolean;
  title?: string;
  items: DrawerNavItem[];
};

/**
 * [DrawerNavGroup Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * A `<blui-drawer-nav-group>` is used inside of the `<blui-drawer-body>` to organize links and content.
 * Each group consists of an (optional) group title and a series of NavItems.
 */
@Component({
  selector: 'blui-drawer-nav-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .blui-drawer-nav-group-content .mat-mdc-list-base {
        font-weight: 600;
        padding: unset;
      }
      .blui-drawer-nav-group-content .blui-drawer-nav-group-title {
        font-weight: 600;
        height: 3rem;
        line-height: 3rem;
        padding: 0 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
      }
      .blui-drawer-nav-group-content .blui-drawer-nav-group-title-closed {
        visibility: hidden;
      }
    `,
  ],
  template: `
    <div class="blui-drawer-nav-group-content">
      @if ($title()) {
        <div
          class="blui-drawer-nav-group-title mat-overline"
          [class.blui-drawer-nav-group-title-closed]="!drawerState.$isOpen()"
        >
          {{ $title() }}
        </div>
      }
      <ng-content select="[blui-title-content]" />
      @if ($divider()) {
        <mat-divider />
      }
      <mat-nav-list>
        <ng-content select="blui-drawer-nav-item" />
      </mat-nav-list>
    </div>
  `,
  host: {
    class: 'blui-drawer-nav-group',
  },
  imports: [MatDivider, MatNavList],
})
export class DrawerNavGroupComponent {
  /** Whether to show a dividing line below the title */
  $divider = input(false, { alias: 'divider' });
  /** Component to render a group title */
  $title = input<string | undefined>(undefined, { alias: 'title' });
  $navItems = contentChildren(forwardRef(() => DrawerNavItemComponent));

  readonly drawerState = inject(DRAWER_STATE);

  private _initializeNavItemDefaults(depth: number, navItems: readonly DrawerNavItemComponent[]): void {
    for (const item of navItems) {
      if (item && !item.changeDetectorRef['destroyed']) {
        item.incrementDepth(depth);
        this._initializeNavItemDefaults(depth + 1, item.$nestedNavItems());
      }
    }
  }

  constructor() {
    /** Re-initialize nav item defaults whenever the content children change (items added/removed). */
    effect(() => {
      const navItems = this.$navItems();
      untracked(() => {
        setTimeout(() => {
          this._initializeNavItemDefaults(0, navItems);
        });
      });
    });
  }
}
