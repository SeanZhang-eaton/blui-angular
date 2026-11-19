import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { InfoListItemComponent, UserMenuComponent } from '@bldc/angular-components';

import { USER_MENU_ITEMS, userMenuTemplate } from './menu-items';

export const FROM_LIST = userMenuTemplate('avatarValue="AV"');

@Component({
  selector: 'app-from-list-user-menu-demo',
  template: FROM_LIST,
  imports: [UserMenuComponent, MatNavList, InfoListItemComponent, MatIcon],
})
export class FromListComponent {
  open = false;
  readonly items = USER_MENU_ITEMS;
}
