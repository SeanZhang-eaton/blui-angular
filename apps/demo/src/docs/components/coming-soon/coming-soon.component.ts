import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EmptyStateComponent } from '@bldc/angular-components';

@Component({
  selector: 'app-coming-soon',
  template: `
    <blui-empty-state
      title="Coming Soon"
      description="This section is still under development."
      style="margin-top: 112px"
    >
      <mat-icon blui-empty-icon>construction</mat-icon>
    </blui-empty-state>
  `,
  imports: [EmptyStateComponent, MatIcon],
})
export class ComingSoonComponent {}
