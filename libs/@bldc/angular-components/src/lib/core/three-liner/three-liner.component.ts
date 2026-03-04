import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { isEmptyView } from '../../utils/utils';

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

  protected readonly $isTitleEmpty = computed(() => {
    const el = this.$titleEl();
    return !el || isEmptyView(el);
  });

  protected readonly $isSubtitleEmpty = computed(() => {
    const el = this.$subtitleEl();
    return !el || isEmptyView(el);
  });

  protected readonly $isInfoEmpty = computed(() => {
    const el = this.$infoEl();
    return !el || isEmptyView(el);
  });
}
