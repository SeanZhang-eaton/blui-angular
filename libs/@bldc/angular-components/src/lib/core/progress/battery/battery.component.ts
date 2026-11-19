import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input } from '@angular/core';

import { warnDeprecatedSelector } from '../../../utils/utils';
import { ProgressIconComponent } from '../pxb-progress-icon.component';
import { rangeValue } from '../utilities';

/** The `<battery-progress>` selector is deprecated and will be removed in the next major version; use `<blui-battery-progress>`. */
@Component({
  selector: 'blui-battery-progress,battery-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './battery.component.html',
  imports: [ProgressIconComponent],
})
export class BatteryComponent {
  constructor() {
    warnDeprecatedSelector(inject(ElementRef), 'blui-battery-progress');
  }

  readonly $size = input(24, { alias: 'size' });
  readonly $percent = input(100, { alias: 'percent' });
  readonly $showPercentLabel = input(false, { alias: 'showPercentLabel' });
  readonly $labelPosition = input<'top' | 'bottom' | 'left' | 'right' | 'center'>('center', { alias: 'labelPosition' });
  readonly $color = input<string | undefined>(undefined, { alias: 'color' });
  readonly $labelColor = input<string | undefined>(undefined, { alias: 'labelColor' });
  readonly $labelSize = input<number | undefined>(undefined, { alias: 'labelSize' });
  readonly $backgroundColor = input<string | undefined>(undefined, { alias: 'backgroundColor' });
  readonly $charging = input(false, { alias: 'charging' });
  readonly $outlined = input(false, { alias: 'outlined' });

  protected readonly rv = rangeValue;

  protected readonly basePath =
    'M20,10V8.3C20,7.6,19.4,7,18.7,7H3.3C2.6,7,2,7.6,2,8.3v7.3C2,16.4,2.6,17,3.3,17h15.3c0.7,0,1.3-0.6,1.3-1.3V14h2v-4H20z';
  private readonly chargePath =
    'M20,10V8.33a1.319,1.319,0,0,0-1-1.263A1.257,1.257,0,0,0,18.67,7H3.34A1.338,1.338,0,0,0,2,8.33v7.33A1.338,1.338,0,0,0,3.33,17H18.67a1.257,1.257,0,0,0,.33-.067,1.319,1.319,0,0,0,1-1.263V14h2V10Zm-8.5,3v2L4,11H9.5V9L17,13Z';
  private readonly outlinedPath =
    'M18,9v6H4V9H18m.7-2H3.3A1.324,1.324,0,0,0,2,8.3v7.3A1.347,1.347,0,0,0,3.3,17H18.6a1.324,1.324,0,0,0,1.3-1.3V14h2V10H20V8.3A1.324,1.324,0,0,0,18.7,7Z';
  private readonly baseID = 'blui-battery-clip';
  private readonly chargeID = 'blui-battery-clip-charge';

  protected readonly $maskIDleft = computed(() => `maskLeft-${this.$percent()}`);
  protected readonly $maskIDright = computed(() => `maskRight-${this.$percent()}`);
  protected readonly $startX = computed(() => (this.$outlined() ? 3.9 : 2));
  protected readonly $fillWidth = computed(() => (this.$outlined() ? 14.2 : 18));

  protected readonly $resolvedBasePath = computed(() => (this.$outlined() ? this.outlinedPath : this.basePath));
  protected readonly $resolvedClipPath = computed(() => (this.$charging() ? this.chargePath : this.basePath));
  protected readonly $resolvedID = computed(() => (this.$charging() ? this.chargeID : this.baseID));
}
