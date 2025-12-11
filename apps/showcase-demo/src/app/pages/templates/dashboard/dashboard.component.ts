import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
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
  standalone: true,
  imports: [
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
