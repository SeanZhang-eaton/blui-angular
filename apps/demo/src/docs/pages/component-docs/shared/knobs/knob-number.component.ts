import { OverlayModule } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  standalone: true,
  selector: 'app-number-knob',
  imports: [OverlayModule, MatSliderModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  template: `
    <mat-form-field appearance="fill" style="margin-bottom: 1rem" #input (click)="isOpen = true" [class]="label">
      <mat-label>{{ label }}: number</mat-label>
      @if (isRequired && value) {
        <mat-hint>{{ hint }}</mat-hint>
      }
      @if (isRequired && !value) {
        <mat-hint>{{ label }} is required</mat-hint>
      }
      @if (!isRequired) {
        <mat-hint>{{ hint }}</mat-hint>
      }
      <input
        type="number"
        [max]="max"
        [min]="min"
        cdkOverlayOrigin
        #trigger="cdkOverlayOrigin"
        [class.hiddenArrows]="true"
        [formControl]="control"
        matInput
        (ngModelChange)="valueChange.emit($event)"
      />
    </mat-form-field>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen"
      cdkConnectedOverlayBackdropClass="number-knob-backdrop"
      [cdkConnectedOverlayHasBackdrop]="true"
      (backdropClick)="clickedBackdrop()"
    >
      <div style="padding-top: 12px">
        <div style="margin-left: -16px; padding: 0 8px" class="slider-knob-overlay divider-border">
          <mat-slider style="width: 332px" [min]="min" [max]="max" [step]="step" #ngSlider>
            <input
              matSliderThumb
              [(ngModel)]="value"
              (input)="updateValue(ngSliderThumb.value)"
              #ngSliderThumb="matSliderThumb"
            />
          </mat-slider>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      /* Chrome, Safari, Edge, Opera */
      .hiddenArrows::-webkit-outer-spin-button,
      .hiddenArrows::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      .hiddenArrows[type='number'] {
        -moz-appearance: textfield;
      }
    `,
  ],
})
export class KnobNumberComponent implements OnInit {
  @Input() max: number;
  @Input() min: number;
  @Input() step: number;
  @Input() value;
  @Input() hint;
  @Input() label;
  @Input() isRequired: boolean;
  @Output() valueChange = new EventEmitter<number>();
  control: FormControl;

  isOpen: boolean;

  ngOnInit(): void {
    this.control = new FormControl<number | null>(this.value, this.isRequired ? [Validators.required] : []);
    this.control.markAsTouched();
  }

  updateValue(value: number): void {
    this.control.setValue(value);
    this.valueChange.emit(value);
  }

  clickedBackdrop(): void {
    this.isOpen = false;
  }
}
