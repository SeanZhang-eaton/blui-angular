import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { BLUIColors } from '@brightlayer-ui/colors';
import {
  ChannelValueComponent,
  EmptyStateComponent,
  HeroBannerComponent,
  HeroComponent,
  InfoListItemComponent,
  ListItemTagComponent,
  SpacerComponent,
  ThreeLinerComponent,
  UserMenuComponent,
} from '@bldc/angular-components';

import { RtlService } from '../../../services/rtl.service';

@Component({
  selector: 'app-blui-display',
  imports: [
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatNavList,
    MatDivider,
    MatIcon,
    MatButton,
    MatToolbar,
    MatButton,
    ChannelValueComponent,
    EmptyStateComponent,
    HeroComponent,
    InfoListItemComponent,
    ListItemTagComponent,
    ThreeLinerComponent,
    UserMenuComponent,
    SpacerComponent,
    HeroBannerComponent,
  ],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BluiDisplayComponent {
  rtl = inject(RtlService);

  colors = BLUIColors;
  userMenuOpen1 = false;
  userMenuOpen2 = false;
  userMenuOpen3 = false;
  userMenuOpen4 = false;
  userMenuOpen5 = false;

  userMenuItems = [
    {
      title: 'Settings',
      icon: 'settings',
    },
    {
      title: 'Contact Us',
      icon: 'mail',
    },
    {
      title: 'Log Out',
      icon: 'logout',
    },
  ];

  handleInfoListItemClick(): void {
    console.info('InfoListItem clicked');
  }
}
