import { Component } from '@angular/core';

export const PREFIX = `<blui-channel-value value="12" units="$" [prefix]="true">
   <mat-icon>check_circle</mat-icon>
</blui-channel-value>`;

@Component({
  standalone: false,
  selector: 'app-prefix-channel-value-demo',
  template: PREFIX,
})
export class PrefixComponent {}
