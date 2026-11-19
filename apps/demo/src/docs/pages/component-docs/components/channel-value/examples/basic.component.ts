import { Component } from '@angular/core';
import { ChannelValueComponent } from '@bldc/angular-components';

export const BASIC = `<blui-channel-value value="123" units="hz"></blui-channel-value>`;

@Component({
  selector: 'app-basic-channel-value-demo',
  template: BASIC,
  imports: [ChannelValueComponent],
})
export class BasicExampleComponent {}
