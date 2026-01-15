import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';

import { isEmptyView } from '../../../utils/utils';
import { DrawerStateManagerService, StateListener } from '../state-listener.component';

/**
 * [DrawerHeader Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-drawer--readme)
 *
 * The `<blui-drawer-header>` contains the content found at the top of the `<blui-drawer>`.
 */
@Component({
  selector: 'blui-drawer-header',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `
    <mat-toolbar
      class="blui-drawer-header-content"
      [class.rail]="isRail()"
      [color]="color"
      [class.blui-drawer-header-no-icon]="isEmpty(iconEl)"
    >
      <div class="blui-drawer-header-background"></div>
      <div class="blui-drawer-header-text">
        <div #icon class="blui-drawer-header-icon-wrapper">
          <ng-content select="[blui-icon]"></ng-content>
        </div>
        @if (title) {
          <div class="blui-drawer-header-title-wrapper">
            <div class="blui-drawer-header-title">{{ title }}</div>
            @if (subtitle) {
              <div class="blui-drawer-header-subtitle mat-subtitle-1">{{ subtitle }}</div>
            }
          </div>
        }
        <ng-content select="[blui-title-content]"></ng-content>
      </div>
    </mat-toolbar>
    @if (divider) {
      <mat-divider></mat-divider>
    }
  `,
  styleUrls: ['./drawer-header.component.scss'],
  host: {
    class: 'blui-drawer-header',
  },
  imports: [MatToolbar, MatDivider],
})
export class DrawerHeaderComponent extends StateListener {
  /** Mat toolbar color variant
   *
   * @default primary
   * */
  @Input() color: 'primary' | 'accent' | 'warn' | undefined = 'primary';
  /** Show a divider below footer
   *
   * @default false
   * */
  @Input() divider = false;
  /** The text to show on the second line */
  @Input() subtitle: string;
  /** The text to show on the first line */
  @Input() title: string;
  @ViewChild('icon', { static: true }) iconEl: ElementRef;

  isEmpty = (el: ElementRef): boolean => isEmptyView(el);

  constructor(stateManagerService: DrawerStateManagerService, changeDetectorRef: ChangeDetectorRef) {
    super(stateManagerService, changeDetectorRef);
  }

  isRail(): boolean {
    return this.drawerState.getDrawerVariant() === 'rail';
  }
}
