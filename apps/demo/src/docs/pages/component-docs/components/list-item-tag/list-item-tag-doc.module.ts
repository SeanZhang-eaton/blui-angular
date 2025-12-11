import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedCompDocsModule } from '../../shared/shared-comp-docs.module';

import { BasicExampleComponent } from './examples/basic.component';
import { ComplexExampleComponent } from './examples/complex.component';
import { PlaygroundComponent } from './examples/playground.component';
import { ListItemTagDocComponent } from './list-item-tag-doc.component';

import { ChannelValueModule, InfoListItemModule, ListItemTagModule } from '@bldc/angular-components/core';

@NgModule({
  declarations: [ListItemTagDocComponent, BasicExampleComponent, ComplexExampleComponent, PlaygroundComponent],
  imports: [SharedCompDocsModule, ListItemTagModule, ChannelValueModule, InfoListItemModule, RouterModule],
  exports: [ListItemTagDocComponent],
})
export class ListItemTagDocModule {}
