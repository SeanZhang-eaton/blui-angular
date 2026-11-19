import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectionPositionPair } from '@angular/cdk/overlay';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCard } from '@angular/material/card';

import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { UserMenuHeaderComponent } from './user-menu-header/user-menu-header.component';
import { UserMenuAvatarComponent } from './user-menu-avatar.component';

/**
 * [UserMenu Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-user-menu--readme)
 *
 * The `<blui-user-menu>` is an Avatar that opens a Menu when clicked.
 * It is typically used in the top-right corner of an application and indicates who is logged in.
 */
@Component({
  selector: 'blui-user-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
  host: {
    class: 'blui-user-menu',
  },
  imports: [
    UserMenuAvatarComponent,
    UserMenuHeaderComponent,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    MatCard,
    NgTemplateOutlet,
  ],
})
export class UserMenuComponent {
  /** Image source for avatar */
  readonly $avatarImage = input<string>(undefined, { alias: 'avatarImage' });

  /** Text value for avatar */
  readonly $avatarValue = input<string>(undefined, { alias: 'avatarValue' });

  /** Subtitle shown when menu is open */
  readonly $menuSubtitle = input<string>(undefined, { alias: 'menuSubtitle' });

  /** Title shown when menu is open */
  readonly $menuTitle = input<string>(undefined, { alias: 'menuTitle' });

  /** Where to render the menu relative to the avatar */
  readonly $positions = input(
    [new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'top' })],
    { alias: 'positions' }
  );

  /** Whether the menu overlay appears on screen. */
  readonly $open = model<boolean>(false, { alias: 'open' });

  /** Window pixel width at which the responsive bottom sheet menu is triggered (set to 0 to disable responsive behavior)
   *
   * @default 600
   * */
  readonly $useBottomSheetAt = input(600, { alias: 'useBottomSheetAt' });

  /** Emits event when backdrop is clicked */
  readonly backdropClick = output<void>();

  protected readonly $menu = viewChild<TemplateRef<unknown>>('menu');

  private readonly bottomSheet = inject(MatBottomSheet);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  readonly $isMenuOpen = signal(false);
  readonly $useBottomSheet = signal(false);
  private readonly $isBottomSheetDismissing = signal(false);

  constructor() {
    // Subscribe to resize events and transition from menu to bottomsheet (or vise versa) when open & resizing
    const subscription = fromEvent(this.document.defaultView, 'resize')
      .pipe(
        map(() => this.checkScreenSize()),
        startWith(this.checkScreenSize())
      )
      .subscribe((isMobile: boolean) => {
        // Transition from Desktop to Mobile
        if (this.$open() && isMobile && !this.$useBottomSheet()) {
          this.$isMenuOpen.set(false);
          this.openBottomSheet();
        }
        // Transition from Mobile to Desktop
        else if (this.$open() && !isMobile && this.$useBottomSheet()) {
          this.bottomSheet.dismiss(true);
        }
        this.$useBottomSheet.set(isMobile);
      });

    effect(() => {
      const isOpen = this.$open();
      untracked(() => {
        if (isOpen) {
          if (this.$useBottomSheet()) {
            this.openBottomSheet();
          } else {
            this.$isMenuOpen.set(true);
          }
        } else {
          this.$isMenuOpen.set(false);
          this.bottomSheet.dismiss(false);
        }
      });
    });

    effect(() => {
      this.$useBottomSheetAt(); // track
      untracked(() => {
        this.$useBottomSheet.set(this.checkScreenSize());
      });
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  checkScreenSize(): boolean {
    return this.document.body.offsetWidth < this.$useBottomSheetAt();
  }

  onClickMenuBackdrop(): void {
    this.$open.set(false);
    this.backdropClick.emit();
  }

  openOverlay(): void {
    // If the bottom sheet is being dismissed, ignore subsequent open calls.
    if (this.$isBottomSheetDismissing()) {
      return;
    }
    this.$open.set(true);
  }

  openBottomSheet(): void {
    const menu = this.$menu();
    if (!menu) return;

    const bottomSheetRef = this.bottomSheet.open(menu, {
      backdropClass: 'blui-user-menu-bottomsheet-backdrop',
      panelClass: 'blui-user-menu-bottomsheet',
      hasBackdrop: true,
    });

    bottomSheetRef.afterDismissed().subscribe((openMenu: boolean | undefined) => {
      this.$isBottomSheetDismissing.set(false);
      this.$isMenuOpen.set(Boolean(openMenu));
    });

    bottomSheetRef.keydownEvents().subscribe((key: KeyboardEvent) => {
      this.dismissViaEscape(key);
    });

    bottomSheetRef.backdropClick().subscribe(() => {
      this.$isBottomSheetDismissing.set(true);
      this.$open.set(false);
      this.backdropClick.emit();
    });
  }

  dismissViaEscape(e: KeyboardEvent): void {
    if (e && e.key && e.key.toLowerCase() === 'escape') {
      this.$open.set(false);
    }
  }
}
