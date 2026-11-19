import { Component, DestroyRef, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mat-dialog-demo,mat-dialog-demo',
  templateUrl: './feedback-dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose],
})
class FeedbackDialogExampleComponent {}

@Component({
  selector: 'app-mat-bottom-sheet-demo,mat-bottom-sheet-demo',
  templateUrl: './feedback-bottom-sheet.component.html',
  imports: [MatNavList, MatListItem],
})
class FeedbackBottomSheetExampleComponent {
  private readonly _bottomSheetRef = inject<MatBottomSheetRef<FeedbackBottomSheetExampleComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

@Component({
  selector: 'app-mat-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatProgressSpinner, MatProgressBar, MatButton],
})
export class MatFeedackComponent {
  dialog = inject(MatDialog);
  private readonly _bottomSheet = inject(MatBottomSheet);
  private readonly _snackBar = inject(MatSnackBar);

  diameter = 40;
  readonly spinnerValue = signal(0);

  constructor() {
    const interval = setInterval(() => this.spinnerValue.update((value) => (value >= 100 ? 0 : value + 10)), 250);
    inject(DestroyRef).onDestroy(() => clearInterval(interval));
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action);
  }

  openDialog(): void {
    this.dialog.open(FeedbackDialogExampleComponent);
  }

  openBottomSheet(): void {
    this._bottomSheet.open(FeedbackBottomSheetExampleComponent);
  }
}
