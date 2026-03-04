import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild, ViewEncapsulation } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';

import { isEmptyView } from '../../../utils/utils';
import { DRAWER_STATE } from '../drawer-state-ref';

/**
 * [DrawerHeader Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer-header>` contains the content found at the top of the `<blui-drawer>`.
 */
@Component({
  selector: 'blui-drawer-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-toolbar
      class="blui-drawer-header-content"
      [class.rail]="drawerState.$isRail()"
      [color]="$color()"
      [class.blui-drawer-header-no-icon]="$isNoIcon()"
    >
      <div class="blui-drawer-header-background"></div>
      <div class="blui-drawer-header-text">
        <div #icon class="blui-drawer-header-icon-wrapper">
          <ng-content select="[blui-icon]" />
        </div>
        @if ($title()) {
          <div class="blui-drawer-header-title-wrapper">
            <div class="blui-drawer-header-title">{{ $title() }}</div>
            @if ($subtitle()) {
              <div class="blui-drawer-header-subtitle mat-subtitle-1">{{ $subtitle() }}</div>
            }
          </div>
        }
        <ng-content select="[blui-title-content]" />
      </div>
    </mat-toolbar>
    @if ($divider()) {
      <mat-divider />
    }
  `,
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
  $color = input<'primary' | 'accent' | 'warn' | undefined>('primary', { alias: 'color' });
  /** Show a divider below footer
   *
   * @default false
   * */
  $divider = input(false, { alias: 'divider' });
  /** The text to show on the second line */
  $subtitle = input<string | undefined>(undefined, { alias: 'subtitle' });
  /** The text to show on the first line */
  $title = input<string | undefined>(undefined, { alias: 'title' });
  $iconEl = viewChild<ElementRef>('icon');

  readonly drawerState = inject(DRAWER_STATE);

  protected readonly $isNoIcon = computed(() => isEmptyView(this.$iconEl()));
}
