import { ChangeDetectionStrategy, Component, effect, input, ViewEncapsulation } from '@angular/core';

import { devWarn, isDevMode } from '../../utils/utils';

/**
 * [ListItemTag Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-list-item-tag--readme)
 *
 * The `<blui-list-item-tag>` is a text item with a colored background and rounded corners that is used to tag lists.
 */
@Component({
  selector: 'blui-list-item-tag',
  templateUrl: './list-item-tag.component.html',
  styleUrl: './list-item-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'blui-list-item-tag',
  },
})
export class ListItemTagComponent {
  /** Color of the label background */
  readonly $backgroundColor = input<string | undefined>(undefined, { alias: 'backgroundColor' });
  /** Color of the label text */
  readonly $fontColor = input<string | undefined>(undefined, { alias: 'fontColor' });
  /** The label text */
  readonly $label = input<string | undefined>(undefined, { alias: 'label' });

  constructor() {
    if (isDevMode()) {
      effect(() => {
        const label = this.$label();
        if (label === undefined || label === null || label === '') {
          devWarn('ListItemTagComponent error: Property "label" is required.');
        }
      });
    }
  }
}
