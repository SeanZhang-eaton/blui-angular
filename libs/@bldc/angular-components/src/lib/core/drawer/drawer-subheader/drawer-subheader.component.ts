import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

import { DRAWER_STATE } from '../drawer-state-ref';

/**
 * [DrawerSubheader Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer-subheader>` is an optional section that renders below the header and above the body of the `<blui-drawer>`.
 * It can be used to support custom content (passed as children), such as filtering options or to display additional information.
 */
@Component({
  selector: 'blui-drawer-subheader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './drawer-subheader.component.html',
  styleUrl: './drawer-subheader.component.scss',
  host: {
    class: 'blui-drawer-subheader',
  },
  imports: [MatDivider],
})
export class DrawerSubheaderComponent {
  /** Whether to show a dividing line below the SubHeader
   *
   * @default true
   * */
  readonly $divider = input(true, { alias: 'divider' });
  /** Hide subheader content when drawer is collapsed
   *
   * @default true
   * */
  readonly $hideContentOnCollapse = input(true, { alias: 'hideContentOnCollapse' });

  protected readonly drawerState = inject(DRAWER_STATE);
}
