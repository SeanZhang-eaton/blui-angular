import { NgModule } from '@angular/core';

import { SharedCompDocsModule } from '../../../shared/shared-comp-docs.module';

import { BasicExampleComponent } from './examples/basic.component';
import { ComplexExampleComponent } from './examples/complex.component';
import { PlaygroundComponent } from './examples/playground.component';
import { DrawerFooterDocComponent } from './drawer-footer-doc.component';

import { DrawerModule } from '@bldc/angular-components/core';

@NgModule({
  declarations: [DrawerFooterDocComponent, BasicExampleComponent, ComplexExampleComponent, PlaygroundComponent],
  imports: [DrawerModule, SharedCompDocsModule],
  exports: [DrawerFooterDocComponent],
})
export class DrawerFooterDocModule {}
