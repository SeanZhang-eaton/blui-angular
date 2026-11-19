import { Component, Input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-copy-code-button',
  template: `
    <button blui-inline mat-stroked-button color="primary" style="width: 125px" (click)="copyCode()">
      <mat-icon>
        {{ hasCopiedCode() ? 'check_outline' : 'copy_all' }}
      </mat-icon>
      <span>{{ hasCopiedCode() ? 'Copied' : 'Copy All' }}</span>
    </button>
  `,
  imports: [MatButton, MatIcon],
})
export class CopyCodeButtonComponent {
  @Input() code: string;

  readonly hasCopiedCode = signal(false);

  copyCode(): void {
    navigator.clipboard.writeText(this.code).then(
      () => {
        // console
      },
      (err) => {
        console.error('Async: Could not copy text: ', err);
      }
    );

    this.hasCopiedCode.set(true);
    setTimeout(() => {
      this.hasCopiedCode.set(false);
    }, 750);
  }
}
