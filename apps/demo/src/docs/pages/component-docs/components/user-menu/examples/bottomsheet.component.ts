import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { InfoListItemComponent, UserMenuComponent } from '@bldc/angular-components';

import { USER_MENU_ITEMS, userMenuTemplate } from './menu-items';

export const BOTTOMSHEET = userMenuTemplate('avatarValue="BS" [useBottomSheetAt]="100_000"');

@Component({
  selector: 'app-bottom-sheet-user-menu-demo',
  template: BOTTOMSHEET,
  imports: [UserMenuComponent, MatNavList, InfoListItemComponent, MatIcon],
})
export class BottomsheetComponent {
  open = false;
  readonly items = USER_MENU_ITEMS;
}
