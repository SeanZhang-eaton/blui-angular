import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { HeroComponent, ScoreCardComponent } from '@bldc/angular-components';

export const WITH_SCORE_BADGE = `<blui-score-card style="width: 350px" 
    headerTitle="Substation 3"
    headerSubtitle="High Humidity Alarm"
    headerInfo="4 Devices"
    [badgeOffset]="-54">
    <mat-list blui-body>
        <mat-list-item>Body Content</mat-list-item>
    </mat-list>
    <blui-hero blui-badge label="Grade" value="98" units="/100" [iconSize]="72" unitSpace="hide">
        <i blui-primary class="blui-grade_a"></i>
    </blui-hero>
</blui-score-card> 
`;

@Component({
  selector: 'app-with-score-badge-score-card-demo',
  template: WITH_SCORE_BADGE,
  imports: [ScoreCardComponent, MatList, MatListItem, HeroComponent],
})
export class WithScoreBadgeComponent {}
