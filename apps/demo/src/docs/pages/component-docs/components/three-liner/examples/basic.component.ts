import { Component } from '@angular/core';
import { ThreeLinerComponent } from '@bldc/angular-components';

export const BASIC = `<blui-three-liner
    title="title"
    subtitle="subtitle"
    info="info">
</blui-three-liner>`;

@Component({
  selector: 'app-basic-three-liner',
  template: BASIC,
  imports: [ThreeLinerComponent],
})
export class BasicExampleComponent {}
