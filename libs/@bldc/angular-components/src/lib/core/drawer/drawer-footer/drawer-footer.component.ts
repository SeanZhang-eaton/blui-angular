import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

import { DRAWER_STATE } from '../drawer-state-ref';

/**
 * [DrawerFooter Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer-footer>` is an optional section that renders at the bottom of the `<blui-drawer>`.
 * It can be used to add any custom content (as children).
 */
@Component({
  selector: 'blui-drawer-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if ($divider()) {
      <mat-divider />
    }
    <div
      class="blui-drawer-footer-content"
      [style.visibility]="$hideContentOnCollapse() ? (drawerState.$isOpen() ? 'visible' : 'hidden') : 'visible'"
    >
      <ng-content />
    </div>
  `,
  styleUrl: './drawer-footer.component.scss',
  host: {
    class: 'blui-drawer-footer',
  },
  imports: [MatDivider],
})
export class DrawerFooterComponent {
  /** Whether to show a dividing line above the Footer
   *
   * @default true
   * */
  $divider = input(true, { alias: 'divider' });
  /** Hide footer content when closed
   *
   * @default true
   * */
  $hideContentOnCollapse = input(true, { alias: 'hideContentOnCollapse' });

  readonly drawerState = inject(DRAWER_STATE);
}
