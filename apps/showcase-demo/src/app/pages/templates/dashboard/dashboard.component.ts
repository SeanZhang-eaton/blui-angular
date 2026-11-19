import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatList, MatNavList } from '@angular/material/list';
import * as BLUIColors from '@brightlayer-ui/colors';
import {
  ChannelValueModule,
  EmptyStateModule,
  HeroModule,
  InfoListItemModule,
  ListItemTagModule,
  ProgressIconsModule,
  ScoreCardModule,
} from '@bldc/angular-components';

@Component({
  selector: 'app-template-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-template-dashboard',
  },
  imports: [
    MatDivider,
    MatList,
    MatNavList,
    ScoreCardModule,
    MatIconModule,
    MatCardModule,
    InfoListItemModule,
    ChannelValueModule,
    HeroModule,
    ListItemTagModule,
    MatExpansionModule,
    EmptyStateModule,
    MatButtonModule,
    ProgressIconsModule,
  ],
})
export class DashboardComponent {
  colors = BLUIColors;
}
