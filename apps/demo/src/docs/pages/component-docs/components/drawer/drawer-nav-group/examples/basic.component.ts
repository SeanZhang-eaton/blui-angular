import { Component } from '@angular/core';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
} from '@bldc/angular-components';

export const BASIC = `<blui-drawer style="width: 250px">
    <blui-drawer-body>
        <blui-drawer-nav-group title="Group 1">
            <blui-drawer-nav-item title="Item 1"></blui-drawer-nav-item>
            <blui-drawer-nav-item title="Item 2"></blui-drawer-nav-item>
        </blui-drawer-nav-group>
    </blui-drawer-body>
</blui-drawer>
`;

@Component({
  selector: 'app-basic-drawer-nav-group-demo',
  template: BASIC,
  imports: [DrawerComponent, DrawerBodyComponent, DrawerNavGroupComponent, DrawerNavItemComponent],
})
export class BasicExampleComponent {}
