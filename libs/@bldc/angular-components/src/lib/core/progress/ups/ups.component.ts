import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core';

import { warnDeprecatedSelector } from '../../../utils/utils';
import { ProgressIconComponent } from '../pxb-progress-icon.component';
import { rangeValue } from '../utilities';

/** The `<ups-progress>` selector is deprecated and will be removed in the next major version; use `<blui-ups-progress>`. */
@Component({
  selector: 'blui-ups-progress,ups-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ups.component.html',
  imports: [ProgressIconComponent],
})
export class UpsComponent {
  constructor() {
    warnDeprecatedSelector(inject(ElementRef), 'blui-ups-progress');
  }

  readonly $size = input(24, { alias: 'size' });
  readonly $percent = input(100, { alias: 'percent' });
  readonly $showPercentLabel = input(false, { alias: 'showPercentLabel' });
  readonly $labelPosition = input<'top' | 'bottom' | 'left' | 'right' | 'center'>('center', { alias: 'labelPosition' });
  readonly $color = input<string | undefined>(undefined, { alias: 'color' });
  readonly $labelColor = input<string | undefined>(undefined, { alias: 'labelColor' });
  readonly $labelSize = input<number | undefined>(undefined, { alias: 'labelSize' });
  readonly $backgroundColor = input<string | undefined>(undefined, { alias: 'backgroundColor' });
  readonly $outlined = input(false, { alias: 'outlined' });

  protected readonly basePath =
    'M2 4C2 2.89543 2.89543 2 4 2H20C21.1046 2 22 2.89543 22 4V6H19V8H22V11H19V13H22V16H19V18H22V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V18H5V16H2V13H5V11H2V8H5V6H2V4Z';

  protected readonly $rangedPercent = computed(() => rangeValue(this.$percent(), 0, 100));
  protected readonly $startY = computed(() =>
    this.$outlined()
      ? ((100 - this.$rangedPercent()) / 100) * 16 + 4
      : ((100 - this.$rangedPercent()) / 100) * 20 + 2,
  );
  protected readonly $fillHeight = computed(() =>
    this.$outlined() ? (this.$rangedPercent() / 100) * 16 : (this.$rangedPercent() / 100) * 20,
  );
}
