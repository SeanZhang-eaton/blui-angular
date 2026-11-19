import { Component } from '@angular/core';
import { HeroBannerComponent, HeroComponent } from '@bldc/angular-components';

export const VALUE_AND_UNITS = `<blui-hero-banner>
    <blui-hero label='Efficiency' value="98" units="%">
        <i blui-primary class="blui-grade_a"></i>
    </blui-hero>
</blui-hero-banner>
`;

@Component({
  selector: 'app-value-units-hero-demo',
  template: VALUE_AND_UNITS,
  imports: [HeroBannerComponent, HeroComponent],
})
export class ValueUnitsComponent {}
