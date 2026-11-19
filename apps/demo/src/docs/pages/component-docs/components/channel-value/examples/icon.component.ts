import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ChannelValueComponent } from '@bldc/angular-components';

export const WITH_ICON = `<blui-channel-value value="123" units="hz">
   <mat-icon>trending_up</mat-icon>
</blui-channel-value>`;

@Component({
  selector: 'app-icon-channel-value-demo',
  template: WITH_ICON,
  imports: [ChannelValueComponent, MatIcon],
})
export class IconComponent {}
