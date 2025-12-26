import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChannelValueComponent } from './channel-value.component';

@NgModule({
    imports: [CommonModule, ChannelValueComponent],
    exports: [ChannelValueComponent],
})
export class ChannelValueModule {}
