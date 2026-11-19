import { AfterViewInit, ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import * as BLUIColors from '@brightlayer-ui/colors';
import { InfoListItemModule, ListItemTagModule } from '@bldc/angular-components';

import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-template-alarms',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDividerModule,
    InfoListItemModule,
    ListItemTagModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-template-alarms',
  },
})
export class AlarmsComponent implements AfterViewInit {
  private readonly _ref = inject(ChangeDetectorRef);
  private readonly _themeService = inject(ThemeService);

  colors = BLUIColors;

  ngAfterViewInit(): void {
    this._ref.detectChanges();
  }

  isDark(): boolean {
    return this._themeService.isDarkMode;
  }
}
