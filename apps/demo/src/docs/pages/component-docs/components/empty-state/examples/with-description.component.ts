import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EmptyStateComponent } from '@bldc/angular-components';

export const WITH_DESCRIPTION = `<blui-empty-state 
    title="Location Services Disabled"
    description="Enable Location Services via Settings to receive GPS information">
    <mat-icon blui-empty-icon>location_off</mat-icon>
</blui-empty-state>
`;

@Component({
  selector: 'app-with-description-empty-state-demo',
  template: WITH_DESCRIPTION,
  imports: [EmptyStateComponent, MatIcon],
})
export class WithDescriptionComponent {}
