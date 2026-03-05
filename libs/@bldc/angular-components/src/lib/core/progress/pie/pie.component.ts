import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { PxbProgressIconComponent } from '../pxb-progress-icon.component';
import { getCoordinates, rangeValue } from '../utilities';

@Component({
  selector: 'blui-pie-progress,pie-progress',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pie.component.html',
  styleUrl: '../pxb-progress-icon.scss',
  imports: [PxbProgressIconComponent],
})
export class PieComponent {
  readonly $size = input(24, { alias: 'size' });
  readonly $percent = input(100, { alias: 'percent' });
  readonly $showPercentLabel = input(false, { alias: 'showPercentLabel' });
  readonly $labelPosition = input<'top' | 'bottom' | 'left' | 'right' | 'center'>('center', { alias: 'labelPosition' });
  readonly $color = input<string | undefined>(undefined, { alias: 'color' });
  readonly $labelColor = input<string | undefined>(undefined, { alias: 'labelColor' });
  readonly $labelSize = input<number | undefined>(undefined, { alias: 'labelSize' });
  readonly $backgroundColor = input<string | undefined>(undefined, { alias: 'backgroundColor' });
  readonly $ring = input(10, { alias: 'ring' });
  readonly $outlined = input(false, { alias: 'outlined' });

  protected readonly rv = rangeValue;

  private readonly iconStroke = 2;
  private readonly centerX = 12;
  private readonly centerY = 12;
  private readonly outerRadiusLarge = 10;
  private readonly innerRadiusLarge = 8; // outerRadiusLarge - iconStroke

  protected readonly $stroke = computed(() => {
    let stroke = Math.max(1, Math.min(10, Math.round(this.$ring())));
    stroke = this.$outlined() ? Math.max(stroke, 2 * this.iconStroke + 1) : stroke;
    return stroke;
  });

  private readonly $innerRadiusSmall = computed(() => this.outerRadiusLarge - this.$stroke());
  private readonly $outerRadiusSmall = computed(() => {
    if (this.$innerRadiusSmall() === 0) return 0;
    return this.outerRadiusLarge - this.$stroke() + this.iconStroke;
  });

  protected readonly $path = computed(() => {
    const rv = rangeValue(this.$percent(), 0, 100);
    return `M 12,12 H 24 A 12,12,0,${rv >= 50 ? 1 : 0},1,${getCoordinates(rv)['x']},${getCoordinates(rv)['y']}Z`;
  });

  protected readonly $outlineBase = computed(() => {
    const cx = this.centerX;
    const cy = this.centerY;
    const orl = this.outerRadiusLarge;
    const irl = this.innerRadiusLarge;
    const ors = this.$outerRadiusSmall();
    const irs = this.$innerRadiusSmall();
    return `
  M ${cx} ${cy - orl}
  A ${orl} ${orl} 0 1 0 ${cx} ${cy + orl}
  A ${orl} ${orl} 0 1 0 ${cx} ${cy - orl}
  Z
  M ${cx} ${cy - irl}
  A ${irl} ${irl} 0 1 1 ${cx} ${cy + irl}
  A ${irl} ${irl} 0 1 1 ${cx} ${cy - irl}
  Z
  M ${cx} ${cy - ors}
  A ${ors} ${ors} 0 1 0 ${cx} ${cy + ors}
  A ${ors} ${ors} 0 1 0 ${cx} ${cy - ors}
  Z
  M ${cx} ${cy - irs}
  A ${irs} ${irs} 0 1 1 ${cx} ${cy + irs}
  A ${irs} ${irs} 0 1 1 ${cx} ${cy - irs}
  Z
`;
  });

  protected readonly $twoToneBase = computed(() => {
    const cx = this.centerX;
    const cy = this.centerY;
    const orl = this.outerRadiusLarge;
    return `
M ${cx} ${cy - orl}
A ${orl} ${orl} 0 1 0 ${cx} ${cy + orl}
A ${orl} ${orl} 0 1 0 ${cx} ${cy - orl}
Z
`;
  });

  protected readonly $clipPath = computed(() => {
    const stroke = this.$stroke();
    return `
M12,2
A10,10,0,1,0,22,12,
10,10,0,0,0,12,2
Z
m0,${20 - stroke} 
A ${10 - stroke},${10 - stroke},0,1,1,${22 - stroke},12,
${10 - stroke},${10 - stroke},0,0,1,12,${22 - stroke}
Z
`;
  });
}
