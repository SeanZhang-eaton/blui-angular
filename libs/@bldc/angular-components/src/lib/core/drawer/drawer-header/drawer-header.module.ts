import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DrawerHeaderComponent } from './drawer-header.component';
@NgModule({
    imports: [CommonModule, MatToolbarModule, MatDividerModule, DrawerHeaderComponent],
    exports: [DrawerHeaderComponent],
})
export class DrawerHeaderModule {}
