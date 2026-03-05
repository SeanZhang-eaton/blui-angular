import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { hasChildren, requireContent } from '../../utils/utils';

/**
 * [EmptyState Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-empty-state--readme)
 *
 * The `<blui-empty-state>` component can display a particular icon, text, and actions.
 * Icon components are passed as a child element with the `emptyIcon` attribute - these will typically be a Material icon, Brightlayer UI icon, or Progress Icon.
 */
@Component({
  selector: 'blui-empty-state',
  standalone: true,
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'blui-empty-state',
  },
  imports: [],
})
export class EmptyStateComponent {
  /** The secondary text to display (second line) */
  $description = input<string | undefined>(undefined, { alias: 'description' });
  /** The primary text to display (first line) */
  $title = input<string | undefined>(undefined, { alias: 'title' });

  /** Used to check if an icon has been provided */
  private readonly $emptyIcon = viewChild<ElementRef>('emptyIcon');
  private readonly $actionsRef = viewChild<ElementRef>('actionsRef');
  protected readonly $hasAction = signal(false);

  constructor() {
    afterNextRender(() => {
      const emptyIcon = this.$emptyIcon();
      if (emptyIcon) {
        requireContent([{ selector: 'emptyIcon', ref: emptyIcon }], this);
      }
      this.$hasAction.set(hasChildren(this.$actionsRef()));
    });
  }
}
