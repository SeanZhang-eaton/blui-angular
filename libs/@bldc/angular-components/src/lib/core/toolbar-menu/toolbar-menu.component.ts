import { ChangeDetectionStrategy, Component, input, viewChild, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

/**
 * [ToolbarMenu Component]()
 *
 * The `<blui-toolbar-menu>` component is used to display a menu within a toolbar.
 */
@Component({
  selector: 'blui-toolbar-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './toolbar-menu.component.html',
  styleUrl: './toolbar-menu.component.scss',
  host: {
    class: 'blui-toolbar-menu',
  },
  imports: [MatMenuTrigger, MatIcon, MatMenu],
})
export class ToolbarMenuComponent {
  /** The text to display for label */
  readonly $label = input<string>(undefined, { alias: 'label' });
  protected readonly $menuTrigger = viewChild<MatMenuTrigger>('menuTrigger');
}
