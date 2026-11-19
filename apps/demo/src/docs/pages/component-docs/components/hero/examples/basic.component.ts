import { Component } from '@angular/core';
import { HeroComponent } from '@bldc/angular-components';

export const BASIC = `<blui-hero label="Efficiency">
    <i blui-primary class="blui-grade_a"></i>
</blui-hero>
`;

@Component({
  selector: 'app-basic-hero-demo',
  template: BASIC,
  imports: [HeroComponent],
})
export class BasicExampleComponent {}
