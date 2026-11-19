import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';

import { hasProjectedContent } from '../../../utils/utils';
import { DRAWER_STATE } from '../drawer-state-ref';

/**
 * [DrawerHeader Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer-header>` contains the content found at the top of the `<blui-drawer>`.
 */
@Component({
  selector: 'blui-drawer-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './drawer-header.component.html',
  styleUrl: './drawer-header.component.scss',
  host: {
    class: 'blui-drawer-header',
  },
  imports: [MatToolbar, MatDivider],
})
export class DrawerHeaderComponent {
  /** Mat toolbar color variant
   *
   * @default primary
   * */
  readonly $color = input<'primary' | 'accent' | 'warn' | undefined>('primary', { alias: 'color' });
  /** Show a divider below footer
   *
   * @default false
   * */
  readonly $divider = input(false, { alias: 'divider' });
  /** The text to show on the second line */
  readonly $subtitle = input<string | undefined>(undefined, { alias: 'subtitle' });
  /** The text to show on the first line */
  readonly $title = input<string | undefined>(undefined, { alias: 'title' });
  private readonly $iconEl = viewChild<ElementRef>('icon');

  protected readonly drawerState = inject(DRAWER_STATE);

  private readonly $hasIcon = hasProjectedContent(this.$iconEl);
  protected readonly $isNoIcon = computed(() => !this.$hasIcon());
}
