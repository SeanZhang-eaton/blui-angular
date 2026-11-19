import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-select-knob',
  template: `
    <mat-form-field appearance="fill" style="margin-bottom: 1rem">
      <mat-label>{{ label }}: string</mat-label>
      <mat-hint>{{ hint }}</mat-hint>
      <mat-select (valueChange)="valueChange.emit($event)" [(value)]="value" [formControl]="control">
        @for (option of options; track option) {
          <mat-option [value]="option" [class.emptySelectOption]="!option">
            @if (!option) {
              <i>(Empty)</i>
            }
            @if (option) {
              {{ option }}
            }
          </mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  imports: [MatFormField, MatLabel, MatHint, MatSelect, FormsModule, ReactiveFormsModule, MatOption],
})
export class KnobSelectComponent implements OnInit {
  @Input() options: string[];
  @Input() isRequired: boolean;
  @Input() value;
  @Input() hint;
  @Input() label;
  @Output() valueChange = new EventEmitter<string>();
  control: FormControl;

  ngOnInit(): void {
    this.control = new FormControl<string>(this.value, this.isRequired ? [Validators.required] : []);
    this.control.markAsTouched();
  }
}
