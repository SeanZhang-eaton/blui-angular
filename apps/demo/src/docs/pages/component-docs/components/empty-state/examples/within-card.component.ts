import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { EmptyStateComponent } from '@bldc/angular-components';

export const WITHIN_CARD = `<mat-accordion class="accordion-panel">
    <mat-expansion-panel [expanded]="true" [style.width.px]="392">
        <mat-expansion-panel-header style="border-bottom: 1px solid var(--blui-divider); border-radius: 0;">
            <mat-panel-title>
                Device Usage
            </mat-panel-title>
        </mat-expansion-panel-header>
        <blui-empty-state 
            title="No Devices Found"
            description="Enable Location Services via Settings to receive GPS information">
            <mat-icon blui-empty-icon>location_off</mat-icon>
            <button blui-actions blui-inline mat-flat-button color="primary">
                <mat-icon>add</mat-icon>
                <span>Learn More</span>
            </button>
        </blui-empty-state>
    </mat-expansion-panel>
</mat-accordion>
`;

@Component({
  selector: 'app-within-card-empty-state-demo',
  template: WITHIN_CARD,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    EmptyStateComponent,
    MatIcon,
    MatButton,
  ],
})
export class WithinCardComponent {}
