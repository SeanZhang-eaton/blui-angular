import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { ScoreCardComponent } from '@bldc/angular-components';

export const MULTI_LINE = `<blui-score-card style="width: 350px"
    headerTitle="Station 3"
    headerSubtitle="High Humidity Alarm"
    headerInfo="4 Devices">
    <mat-list blui-body>
        <mat-list-item>Body Content</mat-list-item>
    </mat-list>
</blui-score-card> 
`;

@Component({
  selector: 'app-multi-line-score-card-demo',
  template: MULTI_LINE,
  imports: [ScoreCardComponent, MatList, MatListItem],
})
export class MultiLineComponent {}
