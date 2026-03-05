import {
  afterRender,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { requireContent } from '../../utils/utils';
import { ChannelValueComponent, UnitSpaceType } from '../channel-value/channel-value.component';

/**
 * [Hero Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-hero--readme)
 *
 * The `<blui-hero>` components are used to call attention to particular values that are of the most importance to the user.
 * These are typically displayed in a banner.
 */
@Component({
  selector: 'blui-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  host: {
    class: 'blui-hero',
  },
  imports: [ChannelValueComponent],
})
export class HeroComponent implements AfterViewInit {
  /** If true, shows units before the value
   *
   * @default false
   * */
  readonly $prefix = input(false, { alias: 'prefix' });
  /** Color of the hero icon */
  readonly $color = input<string | undefined>(undefined, { alias: 'color' });
  /** Color of the hero background */
  readonly $iconBackgroundColor = input<string | undefined>(undefined, { alias: 'iconBackgroundColor' });
  /** The size of the primary icon (10-48) */
  readonly $iconSize = input(36, { alias: 'iconSize' });
  /** The text shown below the Channel Value */
  readonly $label = input<string | undefined>(undefined, { alias: 'label' });
  /** Transforms an SVG icon based on the provided `iconSize` */
  readonly $scaleSvgIcon = input(true, { alias: 'scaleSvgIcon' });
  /** Text to show after the value */
  readonly $units = input<string | undefined>(undefined, { alias: 'units' });
  /** The value for the channel */
  readonly $value = input<string | undefined>(undefined, { alias: 'value' });
  /** Show a space between the value and units for the channel, default is `auto` */
  readonly $unitSpace = input<UnitSpaceType>('auto', { alias: 'unitSpace' });

  private readonly $primaryContainer = viewChild.required<ElementRef>('primaryContainer');

  protected readonly $iSize = computed(() => this.$iconSize());
  protected readonly $hasMatSvgIcon = signal(false);

  private iconString: string;

  private readonly labelEffect = effect(() => {
    const label = this.$label();
    if (label === undefined || label === null || label === '') {
      console.warn(`Brightlayer UI HeroComponent error: Property "label" is required.`);
    }
  });

  constructor() {
    afterRender(() => {
      this.scaleSvgIconOnChanges();
    });
  }

  ngAfterViewInit(): void {
    const container = this.$primaryContainer();
    if (container) {
      requireContent([{ selector: 'primaryContainer', ref: container }], this);
      this.$hasMatSvgIcon.set(Boolean(this.getMatSvgIcon()));
    }
  }

  // Used to listen for changes in the primary icon content.
  // SVG icon content might be loaded post-render (fetching icon via http)
  private scaleSvgIconOnChanges(): void {
    const container = this.$primaryContainer();
    if (!this.$hasMatSvgIcon() || !container || !this.$scaleSvgIcon()) {
      return;
    }

    // If the primary ng-content did not change, no action required.
    const iconHtml = container.nativeElement.innerHTML;
    if (iconHtml === this.iconString) {
      return;
    }
    // Update icon data.
    this.iconString = iconHtml;
    const matIcon = this.getMatSvgIcon();
    if (matIcon) {
      this.$hasMatSvgIcon.set(true);
      const svg = matIcon.querySelector('svg');
      if (svg) {
        svg.style.setProperty('transform', `scale(${this.$iSize() / 24})`);
      }
    }
  }

  // Returns projected <mat-icon> with attribute [svgIcon] if it exists
  private getMatSvgIcon(): HTMLElement | null {
    const container = this.$primaryContainer();
    if (!container) return null;
    return container.nativeElement.querySelector('div mat-icon[svgicon]');
  }
}
