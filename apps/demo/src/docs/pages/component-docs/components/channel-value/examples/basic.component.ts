import { Component } from '@angular/core';

export const BASIC = `<blui-channel-value value="123" units="hz"></blui-channel-value>`;

@Component({
  standalone: false,
  selector: 'app-basic-channel-value-demo',
  template: BASIC,
})
export class BasicExampleComponent {}
