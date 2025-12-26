import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { DrawerNavGroupComponent } from './drawer-nav-group.component';

@NgModule({
    imports: [CommonModule, MatDividerModule, MatListModule, DrawerNavGroupComponent],
    exports: [DrawerNavGroupComponent],
})
export class DrawerNavGroupModule {}
