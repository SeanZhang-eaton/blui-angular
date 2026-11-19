import { NgModule } from '@angular/core';

import { BatteryComponent } from './battery/battery.component';
import { HeartComponent } from './heart/heart.component';
import { PieComponent } from './pie/pie.component';
import { UpsComponent } from './ups/ups.component';
import { ProgressIconComponent } from './pxb-progress-icon.component';

@NgModule({
  imports: [ProgressIconComponent, BatteryComponent, HeartComponent, PieComponent, UpsComponent],
  exports: [ProgressIconComponent, BatteryComponent, HeartComponent, PieComponent, UpsComponent],
})
export class ProgressIconsModule {}
