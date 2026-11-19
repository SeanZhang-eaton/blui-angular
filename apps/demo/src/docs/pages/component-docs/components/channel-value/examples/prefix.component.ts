import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ChannelValueComponent } from '@bldc/angular-components';

export const PREFIX = `<blui-channel-value value="12" units="$" [prefix]="true">
   <mat-icon>check_circle</mat-icon>
</blui-channel-value>`;

@Component({
  selector: 'app-prefix-channel-value-demo',
  template: PREFIX,
  imports: [ChannelValueComponent, MatIcon],
})
export class PrefixComponent {}
