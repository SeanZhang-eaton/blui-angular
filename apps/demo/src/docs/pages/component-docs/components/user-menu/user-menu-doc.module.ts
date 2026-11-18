import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList  } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { InfoListItemModule, SpacerModule, UserMenuComponent } from '@bldc/angular-components';

import { SharedCompDocsModule } from '../../shared/shared-comp-docs.module';

import { BasicExampleComponent } from './examples/basic.component';
import { BottomsheetComponent } from './examples/bottomsheet.component';
import { CustomHeaderComponent } from './examples/custom-header.component';
import { FromListComponent } from './examples/from-list.component';
import { MenuHeaderComponent } from './examples/menu-header.component';
import { NonTextAvatarComponent } from './examples/non-text-avatar.component';
import { PlacementOptionsComponent } from './examples/placement-options.component';
import { PlaygroundComponent } from './examples/playground.component';
import { WithinToolbarComponent } from './examples/within-toolbar.component';
import { UserMenuDocComponent } from './user-menu-doc.component';

@NgModule({
  declarations: [
    UserMenuDocComponent,
    BasicExampleComponent,
    FromListComponent,
    NonTextAvatarComponent,
    MenuHeaderComponent,
    WithinToolbarComponent,
    CustomHeaderComponent,
    PlacementOptionsComponent,
    BottomsheetComponent,
    PlaygroundComponent,
  ],
  imports: [
    UserMenuComponent,
    SpacerModule,
    InfoListItemModule,
    SharedCompDocsModule,
    MatToolbarModule,
    MatIconModule,
    MatNavList,
    RouterModule,
  ],
  exports: [UserMenuDocComponent],
})
export class UserMenuDocModule {}
