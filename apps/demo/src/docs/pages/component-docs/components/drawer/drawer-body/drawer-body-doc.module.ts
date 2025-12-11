import { NgModule } from '@angular/core';

import { SharedCompDocsModule } from '../../../shared/shared-comp-docs.module';

import { DrawerBodyDocComponent } from './drawer-body-doc.component';

import { DrawerModule } from '@bldc/angular-components/core';

@NgModule({
  declarations: [DrawerBodyDocComponent],
  imports: [DrawerModule, SharedCompDocsModule],
  exports: [DrawerBodyDocComponent],
})
export class DrawerBodyDocModule {}
