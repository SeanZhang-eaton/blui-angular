import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { devWarn, isDevMode, requireContent } from '../../utils/utils';
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
export class HeroComponent {
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
  readonly $value = input<string | number | undefined>(undefined, { alias: 'value' });
  /** Show a space between the value and units for the channel, default is `auto` */
  readonly $unitSpace = input<UnitSpaceType>('auto', { alias: 'unitSpace' });

  private readonly $primaryContainer = viewChild.required<ElementRef<HTMLElement>>('primaryContainer');

  protected readonly $iSize = computed(() => this.$iconSize());
  protected readonly $hasMatSvgIcon = signal(false);

  constructor() {
    if (isDevMode()) {
      effect(() => {
        const label = this.$label();
        if (label === undefined || label === null || label === '') {
          devWarn('HeroComponent error: Property "label" is required.');
        }
      });
    }

    // Re-scale when the icon size / scaling inputs change.
    afterRenderEffect(() => {
      this.$iSize();
      this.$scaleSvgIcon();
      this.updateSvgIcon();
    });

    // SVG icon content may be projected or loaded (e.g. fetched over http) after the first render.
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const container = this.$primaryContainer();
      requireContent([{ selector: 'primaryContainer', ref: container }], this);
      if (typeof MutationObserver === 'undefined') {
        return;
      }
      const observer = new MutationObserver(() => this.updateSvgIcon());
      observer.observe(container.nativeElement, { childList: true, subtree: true });
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private updateSvgIcon(): void {
    const matIcon = this.$primaryContainer().nativeElement.querySelector<HTMLElement>('mat-icon[svgicon]');
    this.$hasMatSvgIcon.set(Boolean(matIcon));
    if (!matIcon || !this.$scaleSvgIcon()) {
      return;
    }
    matIcon.querySelector('svg')?.style.setProperty('transform', `scale(${this.$iSize() / 24})`);
  }
}
