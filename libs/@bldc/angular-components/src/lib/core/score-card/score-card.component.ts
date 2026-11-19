import { ChangeDetectionStrategy, Component, computed, ElementRef, input, viewChild, ViewEncapsulation } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

import { hasProjectedContent } from '../../utils/utils';

/**
 * [ScoreCard Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-score-card--readme)
 *
 `<blui-score-card>` is a card component that calls attention to particular values.
 */
@Component({
  selector: 'blui-score-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.scss',
  host: {
    class: 'blui-score-card',
  },
  imports: [MatCard, MatCardTitle, MatCardSubtitle, MatCardContent, MatDivider],
})
export class ScoreCardComponent {
  /** Vertical offset for the badge content
   *
   * @default 0
   * */
  readonly $badgeOffset = input(0, { alias: 'badgeOffset' });

  /** The third line of text in the header */
  readonly $headerInfo = input<string>(undefined, { alias: 'headerInfo' });

  /** The second line of text in the header */
  readonly $headerSubtitle = input<string>(undefined, { alias: 'headerSubtitle' });

  /** The first line of text in the header */
  readonly $headerTitle = input.required<string>({ alias: 'headerTitle' });

  private readonly $actionRowEl = viewChild<ElementRef<HTMLElement>>('actionRow');
  protected readonly $hasActionRow = hasProjectedContent(this.$actionRowEl);

  protected readonly $badgeOffsetValue = computed(() => {
    const offset = this.$badgeOffset();
    if (Number.isNaN(offset)) {
      return 'inherit';
    }
    return offset;
  });
}
