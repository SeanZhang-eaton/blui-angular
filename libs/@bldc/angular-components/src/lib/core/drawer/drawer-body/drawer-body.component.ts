import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';

import { DRAWER_STATE } from '../drawer-state-ref';

/**
 * The `<blui-drawer-body>` is a wrapper for the main content of the Drawer.
 * The typical use case is to display `<blui-drawer-nav-group>` elements, but custom elements (e.g., for spacing) are accepted as well.
 */
@Component({
  selector: 'blui-drawer-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './drawer-body.component.html',
  styleUrl: './drawer-body.component.scss',
  host: {
    class: 'blui-drawer-body',
  },
})
export class DrawerBodyComponent {
  protected readonly drawerState = inject(DRAWER_STATE);
}
