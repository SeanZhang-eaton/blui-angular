import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedCompDocsModule } from '../../../shared/shared-comp-docs.module';

import { BasicExampleComponent } from './examples/basic.component';
import { MultipleGroupsComponent } from './examples/multiple-groups.component';
import { PlaygroundComponent } from './examples/playground.component';
import { WithCustomContentComponent } from './examples/with-custom-content.component';
import { WithSpacerComponent } from './examples/with-spacer.component';
import { DrawerNavGroupDocComponent } from './drawer-nav-group-doc.component';

import { DrawerModule, ListItemTagModule } from '@bldc/angular-components/core';

@NgModule({
  declarations: [
    DrawerNavGroupDocComponent,
    BasicExampleComponent,
    WithCustomContentComponent,
    MultipleGroupsComponent,
    WithSpacerComponent,
    PlaygroundComponent,
  ],
  imports: [DrawerModule, ListItemTagModule, SharedCompDocsModule, RouterModule],
  exports: [DrawerNavGroupDocComponent],
})
export class DrawerNavGroupDocModule {}
