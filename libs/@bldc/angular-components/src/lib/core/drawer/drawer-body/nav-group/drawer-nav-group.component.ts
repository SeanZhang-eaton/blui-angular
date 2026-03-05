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
  styleUrl: './drawer-nav-group.component.scss',
  templateUrl: './drawer-nav-group.component.html',
  host: {
    class: 'blui-drawer-nav-group',
  },
  imports: [MatDivider, MatNavList],
})
export class DrawerNavGroupComponent {
  /** Whether to show a dividing line below the title */
  readonly $divider = input(false, { alias: 'divider' });
  /** Component to render a group title */
  readonly $title = input<string | undefined>(undefined, { alias: 'title' });
  private readonly $navItems = contentChildren(forwardRef(() => DrawerNavItemComponent));

  protected readonly drawerState = inject(DRAWER_STATE);

  private _initializeNavItemDefaults(depth: number, navItems: readonly DrawerNavItemComponent[]): void {
    for (const item of navItems) {
      if (item && !item['changeDetectorRef']?.['destroyed']) {
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
        this._initializeNavItemDefaults(0, navItems);
      });
    });
  }
}
