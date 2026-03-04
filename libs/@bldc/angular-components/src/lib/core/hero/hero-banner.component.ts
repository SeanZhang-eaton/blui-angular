import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

/**
 * [HeroBanner Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-hero--readme)
 *
 * The `<blui-hero-banner>` component is a simple wrapper component that is used to contain `<blui-hero>`s.
 */
@Component({
  selector: 'blui-hero-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss',
  host: {
    class: 'blui-hero-banner',
  },
  imports: [MatDivider],
})
export class HeroBannerComponent {
  /** Whether to show the line separator
   *
   * @default false
   * */
  readonly $divider = input(false, { alias: 'divider' });
}
