import { Component } from '@angular/core';
import { DrawerComponent, DrawerHeaderComponent } from '@bldc/angular-components';

export const BASIC = `<blui-drawer style="width: 250px">
    <blui-drawer-header title="Title"></blui-drawer-header>
</blui-drawer>
`;

@Component({
  selector: 'app-basic-drawer-header-demo',
  template: BASIC,
  imports: [DrawerComponent, DrawerHeaderComponent],
})
export class BasicExampleComponent {}
