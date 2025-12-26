import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThreeLinerComponent } from './three-liner.component';

@NgModule({
    imports: [CommonModule, ThreeLinerComponent],
    exports: [ThreeLinerComponent],
})
export class ThreeLinerModule {}
