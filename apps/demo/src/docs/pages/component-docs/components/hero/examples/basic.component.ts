import { Component } from '@angular/core';

export const BASIC = `<blui-hero label="Efficiency">
    <i blui-primary class="blui-grade_a"></i>
</blui-hero>
`;

@Component({
  standalone: false,
  selector: 'app-basic-hero-demo',
  template: BASIC,
})
export class BasicExampleComponent {}
