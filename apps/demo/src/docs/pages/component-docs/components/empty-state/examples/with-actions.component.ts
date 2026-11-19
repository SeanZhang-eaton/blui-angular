import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EmptyStateComponent } from '@bldc/angular-components';

export const WITH_ACTIONS = `<blui-empty-state 
    title="No Devices"
    description="Check your network connection or add a new device">
    <mat-icon blui-empty-icon>devices</mat-icon>
    <button blui-actions blui-inline mat-stroked-button color="primary">
        <mat-icon>add</mat-icon>
        <span>Add Device</span>
    </button> 
</blui-empty-state>
`;

@Component({
  selector: 'app-with-actions-empty-state-demo',
  template: WITH_ACTIONS,
  imports: [EmptyStateComponent, MatIcon, MatButton],
})
export class WithActionsComponent {}
