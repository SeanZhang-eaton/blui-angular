import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';

import { DRAWER_STATE } from '../drawer-state-ref';

/**
 * The `<blui-drawer-body>` is a wrapper for the main content of the Drawer.
 * The typical use case is to display `<blui-drawer-nav-group>` elements, but custom elements (e.g., for spacing) are accepted as well.
 */
@Component({
  selector: 'blui-drawer-body',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="blui-drawer-body-content" [class.blui-drawer-body-closed]="!drawerState.$isOpen()">
      <ng-content />
    </div>
  `,
  styles: [
    `
      .blui-drawer-body-content {
        max-height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
      }
      .blui-drawer-body-closed {
        overflow-x: hidden;
      }
    `,
  ],
  host: {
    class: 'blui-drawer-body',
  },
})
export class DrawerBodyComponent {
  readonly drawerState = inject(DRAWER_STATE);
}
