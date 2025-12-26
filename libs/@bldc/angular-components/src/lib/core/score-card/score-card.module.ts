import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { ScoreCardComponent } from './score-card.component';

@NgModule({
    imports: [CommonModule, MatCardModule, MatDividerModule, ScoreCardComponent],
    exports: [ScoreCardComponent],
})
export class ScoreCardModule {}
