import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
} from '@bldc/angular-components';

export const WITH_ICONS = `<blui-drawer style="width: 250px">
    <blui-drawer-body>
        <blui-drawer-nav-group>
            <blui-drawer-nav-item title="Dashboard">
                <mat-icon blui-icon>dashboard</mat-icon>  
            </blui-drawer-nav-item>
            <blui-drawer-nav-item title="Locations">
                <mat-icon blui-icon>place</mat-icon>  
            </blui-drawer-nav-item>
        </blui-drawer-nav-group>
    </blui-drawer-body>
</blui-drawer>
`;

@Component({
  selector: 'app-nav-item-with-icons-demo',
  template: WITH_ICONS,
  imports: [MatIcon, DrawerComponent, DrawerBodyComponent, DrawerNavGroupComponent, DrawerNavItemComponent],
})
export class WithIconsExampleComponent {}
