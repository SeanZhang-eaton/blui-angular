import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { PxbLogoComponent } from './pxb-logo/pxb-logo.component';

import { EmptyStateModule } from '@bldc/angular-components/core';

@NgModule({
  declarations: [PxbLogoComponent, ComingSoonComponent],
  imports: [CommonModule, EmptyStateModule, MatIconModule],
  exports: [PxbLogoComponent, ComingSoonComponent],
})
export class AppCommonComponentsModule {}
