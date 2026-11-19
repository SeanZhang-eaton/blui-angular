import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem, MatListItemIcon, MatListItemTitle } from '@angular/material/list';
import {
  HeroBannerComponent,
  HeroComponent,
  InfoListItemComponent,
  ScoreCardComponent,
} from '@bldc/angular-components';

import { Subscription } from 'rxjs';

import { PlaygroundService } from '../../../../../services/playground/playground.service';
import { Knob } from '../../../shared/scaffold/scaffold.component';

export type ScoreCardPlaygroundKnobs = {
  headerTitle: Knob;

  // Optional
  badgeOffset: Knob;
  headerInfo: Knob;
  headerSubtitle: Knob;

  // Other
  numberOfHeroes: Knob;
};

@Component({
  selector: 'app-score-card-playground',
  template: `<blui-score-card
    style="width: 400px"
    [headerTitle]="inputs.headerTitle.value"
    [headerSubtitle]="inputs.headerSubtitle.value"
    [headerInfo]="inputs.headerInfo.value"
    [badgeOffset]="inputs.badgeOffset.value"
  >
    <ng-container blui-action-items>
      <mat-icon>star</mat-icon>
      <mat-icon>settings</mat-icon>
      <mat-icon>more_vert</mat-icon>
    </ng-container>
    <mat-list blui-body>
      <mat-list-item style="height: 2.5rem">
        <p matListItemTitle style="font-weight: 400">0 Alarms</p>
        <mat-icon matListItemIcon>notifications</mat-icon>
      </mat-list-item>
      <mat-list-item style="height: 2.5rem">
        <p matListItemTitle style="font-weight: 600">1 Event</p>
        <mat-icon matListItemIcon>list_alt</mat-icon>
      </mat-list-item>
      <mat-list-item style="height: 2.5rem; margin-bottom: 4px">
        <p matListItemTitle style="font-weight: 400">Online</p>
        <mat-icon matListItemIcon>cloud</mat-icon>
      </mat-list-item>
    </mat-list>

    <blui-hero-banner blui-badge>
      @if (inputs.numberOfHeroes.value > 0) {
        <blui-hero label="Temperature" value="98" units="°F" [iconSize]="72">
          <i blui-primary class="blui-temp"></i>
        </blui-hero>
      }
      @if (inputs.numberOfHeroes.value > 1) {
        <blui-hero label="Humidity" value="54" units="%" [iconSize]="72">
          <i blui-primary class="blui-moisture"></i>
        </blui-hero>
      }
    </blui-hero-banner>
    <blui-info-list-item blui-action-row [hidePadding]="true" [dense]="true" [chevron]="true">
      <div blui-title>View Location</div>
    </blui-info-list-item>
  </blui-score-card>`,
  imports: [
    ScoreCardComponent,
    MatIcon,
    MatList,
    MatListItem,
    MatListItemTitle,
    MatListItemIcon,
    HeroBannerComponent,
    HeroComponent,
    InfoListItemComponent,
  ],
})
export class PlaygroundComponent implements AfterViewInit, OnDestroy {
  private readonly _playgroundService = inject(PlaygroundService);

  @Input() inputs: ScoreCardPlaygroundKnobs;
  @Output() codeChange = new EventEmitter<string>();

  knobListener: Subscription;
  open = true;

  constructor() {
    this.knobListener = this._playgroundService.knobChange.subscribe((updatedKnobs: ScoreCardPlaygroundKnobs) => {
      this.inputs = updatedKnobs;
      this._emitNewCodeChanges();
    });
  }

  ngAfterViewInit(): void {
    this._emitNewCodeChanges();
  }

  ngOnDestroy(): void {
    if (this.knobListener) {
      this.knobListener.unsubscribe();
    }
  }

  private _emitNewCodeChanges(): void {
    setTimeout(() => {
      this.codeChange.emit(this._createGeneratedCode());
    });
  }

  private _getHeroBadge(): string {
    const numberOfHeroes = Number(this.inputs.numberOfHeroes.value);
    if (numberOfHeroes === 0) {
      return '';
    }
    if (numberOfHeroes === 1) {
      return `
    <blui-hero-banner blui-badge>
        <blui-hero label="Temperature" value="98" units="°F" [iconSize]="72">
            <i blui-primary class="blui-temp"></i>
        </blui-hero>
    </blui-hero-banner>`;
    }
    return `
    <blui-hero-banner blui-badge>
        <blui-hero label="Temperature" value="98" units="°F" [iconSize]="72">
            <i blui-primary class="blui-temp"></i>
        </blui-hero>
        <blui-hero label="Humidity" value="54" units="%" [iconSize]="72">
            <i blui-primary class="blui-moisture"></i>
        </blui-hero>
    </blui-hero-banner>`;
  }

  private _createGeneratedCode(): string {
    const code = `
<blui-score-card
    style="width: 400px"
    ${this._playgroundService.addOptionalProp(this.inputs, 'headerSubtitle')}
    ${this._playgroundService.addOptionalProp(this.inputs, 'headerInfo')}
    ${this._playgroundService.addOptionalProp(this.inputs, 'badgeOffset')}
    [headerTitle]="${this.inputs.headerTitle.value}">
    <ng-container blui-action-items>
        <mat-icon>star</mat-icon>
        <mat-icon>settings</mat-icon>
        <mat-icon>more_vert</mat-icon>
    </ng-container>
    <mat-list blui-body>
        <mat-list-item style="height: 2.5rem">
            <p matListItemTitle>0 Alarms</p>
            <mat-icon matListItemIcon>notifications</mat-icon>
        </mat-list-item>
        <mat-list-item style="height: 2.5rem">
            <p matListItemTitle style="font-weight: 600">1 Event</p>
            <mat-icon matListItemIcon>list_alt</mat-icon>
        </mat-list-item>
        <mat-list-item style="height: 2.5rem; margin-bottom: 4px">
            <p matListItemTitle>Online</p>
            <mat-icon matListItemIcon>cloud</mat-icon>
        </mat-list-item>
    </mat-list>
${this._getHeroBadge()}
    <blui-info-list-item blui-action-row [hidePadding]="true" [dense]="true" [chevron]="true">
        <div blui-title>View Location</div>
    </blui-info-list-item>
</blui-score-card>`;

    return this._playgroundService.removeEmptyLines(code);
  }
}
