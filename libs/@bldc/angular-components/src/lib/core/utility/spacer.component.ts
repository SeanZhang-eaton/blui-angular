import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

/**
 * [Spacer Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-spacer--readme)
 *
 * An invisible utility component that acts as a spacer element in various layouts.
 * It works with flexbox sizing or fixed sizing.
 */
@Component({
  selector: 'blui-spacer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content></ng-content>`,
  host: {
    '[style.height.px]': '$height()',
    '[style.width.px]': '$width()',
    '[style.flex]': '$grow()',
    '[style.display]': '"flex"',
  },
})
export class SpacerComponent {
  /** Flex grow/shrink value for use in flex layouts
   *
   * @default 1
   * */
  readonly $flex = input(1, { alias: 'flex' });
  /** Height (in px) for static layouts */
  readonly $height = input<number>(undefined, { alias: 'height' });
  /** Width (in px) for static layouts */
  readonly $width = input<number>(undefined, { alias: 'width' });

  readonly $grow = computed(() => {
    const height = this.$height();
    const width = this.$width();
    if (!height && !width) {
      const flex = this.$flex();
      return `${flex} ${flex} ${flex === 0 ? 'auto' : '0px'}`;
    }
    return undefined;
  });
}
