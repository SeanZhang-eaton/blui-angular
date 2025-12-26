import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToolbarMenuComponent } from './toolbar-menu.component';

@NgModule({
    imports: [CommonModule, MatToolbarModule, MatSelectModule, MatFormFieldModule, MatIconModule, MatMenuModule, ToolbarMenuComponent],
    exports: [ToolbarMenuComponent],
})
export class ToolbarMenuModule {}
