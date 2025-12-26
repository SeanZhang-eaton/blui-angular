import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { DrawerLayoutComponent } from './drawer-layout.component';

@NgModule({
    imports: [CommonModule, MatSidenavModule, DrawerLayoutComponent],
    exports: [DrawerLayoutComponent],
})
export class DrawerLayoutModule {}
