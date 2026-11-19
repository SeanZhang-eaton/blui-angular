import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-text-knob',
  template: `
    <mat-form-field appearance="fill" style="margin-bottom: 1rem">
      <mat-label>{{ label }}: string</mat-label>
      @if (isRequired && value) {
        <mat-hint>{{ hint }}</mat-hint>
      }
      @if (isRequired && !value) {
        <mat-hint>{{ label }} is required</mat-hint>
      }
      @if (!isRequired) {
        <mat-hint>{{ hint }}</mat-hint>
      }
      <input matInput (ngModelChange)="valueChange.emit($event)" [formControl]="control" />
    </mat-form-field>
  `,
  imports: [MatFormField, MatLabel, MatHint, MatInput, FormsModule, ReactiveFormsModule],
})
export class KnobTextComponent implements OnInit {
  @Input() label: string;
  @Input() isRequired: boolean;
  @Input() hint: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();
  control: FormControl;

  ngOnInit(): void {
    this.control = new FormControl<string | null>(this.value, this.isRequired ? [Validators.required] : []);
    this.control.markAsTouched();
  }
}
