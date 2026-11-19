import { Component } from '@angular/core';

export const BASIC = `<blui-drawer style="width: 250px">
    <blui-drawer-header title="Title"></blui-drawer-header>
</blui-drawer>
`;

@Component({
  standalone: false,
  selector: 'app-basic-drawer-header-demo',
  template: BASIC,
})
export class BasicExampleComponent {}
