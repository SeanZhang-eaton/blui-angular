import { Component } from '@angular/core';
import {
  DrawerBodyComponent,
  DrawerComponent,
  DrawerNavGroupComponent,
  DrawerNavItemComponent,
  ListItemTagComponent,
} from '@bldc/angular-components';

export const CUSTOM_CONTENT = `<blui-drawer style="width: 250px">
    <blui-drawer-body>
        <blui-drawer-nav-group [divider]="true">
            <div blui-title-content 
                style="display: flex; 
                       justify-content: space-between; 
                       align-items: center; 
                       padding: 8px 16px">
                <div class="mat-subtitle-2">Nav Group Title Content</div>
                <blui-list-item-tag label="v1.0.3"></blui-list-item-tag>
            </div>
            <blui-drawer-nav-item title="Item 1"></blui-drawer-nav-item>
            <blui-drawer-nav-item title="Item 2"></blui-drawer-nav-item>
        </blui-drawer-nav-group>
    </blui-drawer-body>
</blui-drawer>
`;

@Component({
  selector: 'app-custom-content-nav-group-demo',
  template: CUSTOM_CONTENT,
  imports: [
    DrawerComponent,
    DrawerBodyComponent,
    DrawerNavGroupComponent,
    ListItemTagComponent,
    DrawerNavItemComponent,
  ],
})
export class WithCustomContentComponent {}
