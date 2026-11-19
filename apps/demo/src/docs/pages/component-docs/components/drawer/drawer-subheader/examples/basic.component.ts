import { Component } from '@angular/core';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerHeaderComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
  DrawerSubheaderComponent,
} from '@bldc/angular-components';

export const BASIC = `<blui-drawer style="width: 250px">
    <blui-drawer-header title="Title"></blui-drawer-header>
    <blui-drawer-subheader [hideContentOnCollapse]="false">
        <div style="padding: 16px">Custom Content Goes here</div>
    </blui-drawer-subheader>
    <blui-drawer-body>
        <blui-drawer-nav-group>
            <blui-drawer-nav-item title="Dashboard"></blui-drawer-nav-item>
            <blui-drawer-nav-item title="Locations"></blui-drawer-nav-item>
        </blui-drawer-nav-group>
    </blui-drawer-body>
</blui-drawer>
`;

@Component({
  selector: 'app-basic-drawer-subheader-demo',
  template: BASIC,
  imports: [
    DrawerComponent,
    DrawerHeaderComponent,
    DrawerSubheaderComponent,
    DrawerBodyComponent,
    DrawerNavGroupComponent,
    DrawerNavItemComponent,
  ],
})
export class BasicExampleComponent {}
