import { ChangeDetectionStrategy, Component, computed, ElementRef, input, viewChild, ViewEncapsulation } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';

import { hasProjectedContent } from '../../../utils/utils';

/**
 * [UserMenuHeaderComponent Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-user-menu--readme)
 *
 * The `<blui-user-menu-header>` is the menu header of the `<blui-user-menu>`.
 */
@Component({
  selector: 'blui-user-menu-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-menu-header.component.html',
  styleUrl: './user-menu-header.component.scss',
  host: {
    class: 'blui-user-menu-header',
  },
  imports: [MatToolbar, MatDivider],
})
export class UserMenuHeaderComponent {
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
  readonly $subtitle = input<string>(undefined, { alias: 'subtitle' });
  /** The text to show on the first line */
  readonly $title = input<string>(undefined, { alias: 'title' });

  protected readonly $iconEl = viewChild<ElementRef>('icon');

  private readonly $hasIcon = hasProjectedContent(this.$iconEl);
  protected readonly $isIconEmpty = computed(() => !this.$hasIcon());
}
