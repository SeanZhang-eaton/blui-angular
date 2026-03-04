import { NgModule } from '@angular/core';

import { UserMenuHeaderComponent } from './user-menu-header/user-menu-header.component';
import { UserMenuComponent } from './user-menu.component';

@NgModule({
  imports: [UserMenuHeaderComponent, UserMenuComponent],
  exports: [UserMenuHeaderComponent, UserMenuComponent],
})
export class UserMenuModule {}
