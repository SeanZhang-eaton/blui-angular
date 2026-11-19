import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
} from '@bldc/angular-components';

export const BASIC = `<blui-drawer style="width: 250px">
    <blui-drawer-body>
        <blui-drawer-nav-group>
            <blui-drawer-nav-item title="Dashboard">
                <mat-icon blui-icon>dashboard</mat-icon>  
            </blui-drawer-nav-item>
            <blui-drawer-nav-item title="Legal" subtitle="5 offices">
                <mat-icon blui-icon>gavel</mat-icon>  
            </blui-drawer-nav-item>
            <blui-drawer-nav-item title="Locations">
                <mat-icon blui-icon>place</mat-icon>  
            </blui-drawer-nav-item>
        </blui-drawer-nav-group>
    </blui-drawer-body>
</blui-drawer>
`;

@Component({
  selector: 'app-basic-drawer-nav-item-demo',
  template: BASIC,
  imports: [MatIcon, DrawerComponent, DrawerBodyComponent, DrawerNavGroupComponent, DrawerNavItemComponent],
})
export class BasicExampleComponent {}
