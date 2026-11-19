import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import Color from 'color';

import { warnDeprecatedSelector } from '../../utils/utils';

/**
 * Base progress icon used by the battery, heart, pie and ups progress icons.
 *
 * The `<pxb-progress-icon>` selector is deprecated and will be removed in the next major version; use `<blui-progress-icon>`.
 */
@Component({
  selector: 'blui-progress-icon,pxb-progress-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pxb-progress-icon.component.html',
  styleUrl: './pxb-progress-icon.scss',
})
export class ProgressIconComponent {
  readonly $size = input(24, { alias: 'size' });
  readonly $percent = input(100, { alias: 'percent' });
  readonly $showPercentLabel = input(false, { alias: 'showPercentLabel' });
  readonly $labelPosition = input<'top' | 'bottom' | 'left' | 'right' | 'center'>('center', {
    alias: 'labelPosition',
  });
  readonly $color = input<string | undefined>(undefined, { alias: 'color' });
  readonly $labelColor = input<string | undefined>(undefined, { alias: 'labelColor' });
  readonly $labelSize = input<number | undefined>(undefined, { alias: 'labelSize' });
  readonly $backgroundColor = input<string | undefined>(undefined, { alias: 'backgroundColor' });

  constructor() {
    warnDeprecatedSelector(inject(ElementRef), 'blui-progress-icon');
  }

  protected readonly $inverted = computed(() => {
    const color = this.$color();
    if (color) {
      return this.$labelPosition() === 'center' && Color(color).isDark();
    }
    return false;
  });

  protected readonly $strokeColor = computed(() => {
    const labelColor = this.$labelColor();
    if (this.$labelPosition() === 'center' && labelColor && this.$color()) {
      return Color(labelColor).isDark() ? 'white' : 'black';
    }
    return '';
  });

  protected readonly $flexDirection = computed(() => {
    switch (this.$labelPosition()) {
      case 'left':
        return 'row';
      case 'right':
        return 'row-reverse';
      case 'top':
        return 'column';
      case 'bottom':
        return 'column-reverse';
      default:
        return '';
    }
  });
}

/** @deprecated Use `ProgressIconComponent`. Will be removed in the next major version. */
export const PxbProgressIconComponent = ProgressIconComponent;
/** @deprecated Use `ProgressIconComponent`. Will be removed in the next major version. */
export type PxbProgressIconComponent = ProgressIconComponent;
