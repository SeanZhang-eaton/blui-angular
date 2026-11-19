import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { hasProjectedContent } from '../../utils/utils';

/**
 * [ThreeLiner Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-three-liner--readme)
 *
 * The `<blui-three-liner>` can display up to three lines of stylized text or other ng-content.
 * It is most commonly used within the context of a `<blui-md-bar>` component where the text can grow / shrink as the App Bar is expanded and collapsed.
 */
@Component({
  selector: 'blui-three-liner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './three-liner.component.html',
  styleUrl: 'three-liner.component.scss',
  host: {
    class: 'blui-three-liner',
  },
})
export class ThreeLinerComponent {
  /** First line content */
  readonly $title = input<string>(undefined, { alias: 'title' });
  /** Second line content */
  readonly $subtitle = input<string>(undefined, { alias: 'subtitle' });
  /** Third line content */
  readonly $info = input<string>(undefined, { alias: 'info' });

  protected readonly $titleEl = viewChild<ElementRef>('titleVc');
  protected readonly $subtitleEl = viewChild<ElementRef>('subtitleVc');
  protected readonly $infoEl = viewChild<ElementRef>('infoVc');

  private readonly $hasTitleContent = hasProjectedContent(this.$titleEl);
  private readonly $hasSubtitleContent = hasProjectedContent(this.$subtitleEl);
  private readonly $hasInfoContent = hasProjectedContent(this.$infoEl);

  protected readonly $isTitleEmpty = computed(() => !this.$hasTitleContent());
  protected readonly $isSubtitleEmpty = computed(() => !this.$hasSubtitleContent());
  protected readonly $isInfoEmpty = computed(() => !this.$hasInfoContent());
}
