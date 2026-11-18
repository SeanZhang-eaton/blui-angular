import { NgModule } from '@angular/core';

import { InfoListItemComponent } from '../../info-list-item/info-list-item.component';

import { DrawerNavGroupComponent } from './nav-group/drawer-nav-group.component';
import { DrawerNavItemComponent } from './nav-item/drawer-nav-item.component';
import { DrawerBodyComponent } from './drawer-body.component';

@NgModule({
  imports: [InfoListItemComponent, DrawerNavGroupComponent, DrawerNavItemComponent, DrawerBodyComponent],
  exports: [DrawerBodyComponent, InfoListItemComponent, DrawerNavGroupComponent, DrawerNavItemComponent],
})
export class DrawerBodyModule {}
