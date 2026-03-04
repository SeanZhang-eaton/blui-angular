import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemAvatar,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';

import { isEmptyContent, isEmptyView, requireContent } from '../../utils/utils';
import { SpacerComponent } from '../utility/spacer.module';

type IconAlignType = 'left' | 'center' | 'right' | undefined;
type DividerType = 'full' | 'partial' | undefined;

/**
 * [InfoListItem Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-info-list-item--readme)
 *
 * The `<blui-info-list-item>` is intended to be used in List views.
 * It positions a title as well as optional subtitle(s), icon, and status stripe.
 */
@Component({
  selector: 'blui-info-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './info-list-item.component.html',
  styleUrl: './info-list-item.component.scss',
  host: {
    class: 'blui-info-list-item',
    '[class.blui-info-list-item-wrap]': '$wrapSubtitle() || $wrapTitle() || $wrapInfo()',
    '[class.blui-info-list-item-dense]': '$dense()',
    '[class.blui-info-list-item-default]': '!hasIcon() && !$statusColor()',
    '[class.blui-info-list-item-status]': '$statusColor()',
    '[class.blui-info-list-item-icon]': 'hasIcon()',
    '[style.border-left-color]': '$statusColor()',
    '[style.border-right-color]': '$statusColor()',
  },
  imports: [
    MatListItem,
    MatListItemIcon,
    MatListItemAvatar,
    MatListItemTitle,
    MatListItemLine,
    SpacerComponent,
    MatListItemMeta,
    MatIcon,
    MatDivider,
  ],
})
export class InfoListItemComponent implements AfterViewInit {
  /** Show a colored background for the icon
   *
   * @default false
   * */
  readonly $avatar = input(false, { alias: 'avatar' });
  /** Add a chevron icon on the right
   *
   * @default false
   * */
  readonly $chevron = input(false, { alias: 'chevron' });
  /** Smaller height row with less padding
   *
   * @default false
   * */
  readonly $dense = input(false, { alias: 'dense' });
  /** Show a row separator below the row.  Can be `partial` | `full`
   *
   * `partial` - Divider does not expand full width of the ListItem
   *
   * `full`- Divider spans full width of the ListItem
   * */
  readonly $divider = input<DividerType>(undefined, { alias: 'divider' });
  /** Disable the list item
   *
   * @default false
   * */
  readonly $disabled = input(false, { alias: 'disabled' });
  /** Remove left padding if no icon is used */
  readonly $hidePadding = input(false, { alias: 'hidePadding' });
  /** Icon alignment when avatar is set to false. Can be `left` | `right` | `center`
   *
   * `left` - Icon appears at the `flex-start` of the icon container.
   *
   * `right` - Icon appears at the `flex-end` of the icon container.
   *
   * `center` - Icon appears at the center of the icon container.
   *
   * @default left
   * */
  readonly $iconAlign = input<IconAlignType>('left', { alias: 'iconAlign' });
  /** Left border color */
  readonly $statusColor = input<string | undefined>(undefined, { alias: 'statusColor' });
  /** When true, 3rd-line text overflow breaks onto the next line instead of using an ellipsis
   *
   * @default false
   * */
  readonly $wrapInfo = input(false, { alias: 'wrapInfo' });
  /** When true, 2nd-line text overflow breaks onto the next line instead of using an ellipsis
   *
   * @default false
   * */
  readonly $wrapSubtitle = input(false, { alias: 'wrapSubtitle' });
  /** When true, 1st-line text overflow breaks onto the next line instead of using an ellipsis
   *
   * @default false
   * */
  readonly $wrapTitle = input(false, { alias: 'wrapTitle' });

  private readonly titleEl = viewChild<ElementRef>('title');
  private readonly rightEl = viewChild<ElementRef>('right');
  readonly injector = inject(Injector);

  private readonly iconEl = viewChild('icon', { read: ElementRef });
  private readonly subtitleEl = viewChild('subtitle', { read: ElementRef });

  protected readonly hasIcon = computed(() => !isEmptyView(this.iconEl()));
  protected readonly hasSubtitle = computed(
    () => !isEmptyContent(this.subtitleEl()?.nativeElement?.querySelector('[blui-subtitle]'))
  );

  isEmpty = (el: ElementRef): boolean => isEmptyView(el);

  ngAfterViewInit(): void {
    const titleRef = this.titleEl();
    if (titleRef) {
      requireContent([{ selector: 'title', ref: titleRef }], this);
    }
  }
}
