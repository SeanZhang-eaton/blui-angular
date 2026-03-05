import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import Color from 'color';

@Component({
  selector: 'blui-progress-icon,pxb-progress-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pxb-progress-icon.component.html',
  styleUrl: './pxb-progress-icon.scss',
  imports: [NgStyle],
})
export class PxbProgressIconComponent {
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
