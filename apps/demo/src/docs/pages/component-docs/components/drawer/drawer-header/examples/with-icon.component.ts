import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { DrawerComponent, DrawerHeaderComponent } from '@bldc/angular-components';

export const WITH_ICON = `<blui-drawer style="width: 250px">
    <blui-drawer-header title="Title" subtitle="Subtitle">
        <button mat-icon-button blui-icon>
            <mat-icon>menu</mat-icon>
        </button>
    </blui-drawer-header> 
</blui-drawer>
`;

@Component({
  selector: 'app-with-icon-drawer-header-demo',
  template: WITH_ICON,
  imports: [DrawerComponent, DrawerHeaderComponent, MatIconButton],
})
export class WithIconComponent {}
