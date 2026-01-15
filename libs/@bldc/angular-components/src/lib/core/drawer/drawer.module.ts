import { NgModule } from '@angular/core';

import { DrawerBodyModule } from './drawer-body/drawer-body.module';
import { DrawerFooterComponent } from './drawer-footer/drawer-footer.component';
import { DrawerHeaderComponent } from './drawer-header/drawer-header.component';
import { DrawerLayoutComponent } from './drawer-layout/drawer-layout.component';
import { DrawerSubheaderComponent } from './drawer-subheader/drawer-subheader.component';
import { DrawerComponent } from './drawer.component';

@NgModule({
  imports: [
    DrawerHeaderComponent,
    DrawerSubheaderComponent,
    DrawerBodyModule,
    DrawerFooterComponent,
    DrawerLayoutComponent,
    DrawerComponent,
  ],
  exports: [
    DrawerBodyModule,
    DrawerComponent,
    DrawerHeaderComponent,
    DrawerSubheaderComponent,
    DrawerFooterComponent,
    DrawerLayoutComponent,
  ],
})
export class DrawerModule {}
