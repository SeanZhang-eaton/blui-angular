import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

import { DrawerSubheaderComponent } from './drawer-subheader.component';

@NgModule({
    imports: [CommonModule, MatDividerModule, DrawerSubheaderComponent],
    exports: [DrawerSubheaderComponent],
})
export class DrawerSubheaderModule {}
