import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { PlaygroundService } from '../../../../../services/playground/playground.service';
import { Knob } from '../../../shared/scaffold/scaffold.component';

export type MobileStepperPlaygroundKnobs = {
  activeStep: Knob;
  steps: Knob;
  variant: Knob;

  // other
  showNext: Knob;
  showBack: Knob;
};

@Component({
  standalone: false,
  selector: 'app-mobile-stepper-playground',
  template: `<div style="background: white; padding: 12px">
    <blui-mobile-stepper
      [steps]="inputs.steps.value"
      [variant]="inputs.variant.value"
      [activeStep]="inputs.activeStep.value"
      variant="progress"
      style="width: 300px"
    >
      @if (inputs.showBack.value) {
        <button blui-back-button mat-stroked-button color="primary">Back</button>
      }
      @if (inputs.showNext.value) {
        <button blui-next-button mat-flat-button color="primary">Next</button>
      }
    </blui-mobile-stepper>
  </div>`,
})
export class PlaygroundComponent implements AfterViewInit, OnDestroy {
  private readonly _playgroundService = inject(PlaygroundService);

  @Input() inputs: MobileStepperPlaygroundKnobs;
  @Output() codeChange = new EventEmitter<string>();

  open = true;
  knobListener: Subscription;

  constructor() {
    this.knobListener = this._playgroundService.knobChange.subscribe((updatedKnobs: MobileStepperPlaygroundKnobs) => {
      this.inputs = updatedKnobs;
      this._emitNewCodeChanges();
    });
  }

  ngAfterViewInit(): void {
    this._emitNewCodeChanges();
  }

  ngOnDestroy(): void {
    if (this.knobListener) {
      this.knobListener.unsubscribe();
    }
  }

  private _emitNewCodeChanges(): void {
    setTimeout(() => {
      this.codeChange.emit(this._createGeneratedCode());
    });
  }

  private _getBackButton(): string {
    if (this.inputs.showBack.value) {
      return `<button blui-next-button mat-flat-button color="primary">Next</button>`;
    }
    return '';
  }

  private _getNextButton(): string {
    if (this.inputs.showNext.value) {
      return `<button blui-nex-button mat-stroked-button color="primary">Back</button>`;
    }
    return '';
  }

  private _createGeneratedCode(): string {
    const code = `<blui-mobile-stepper
    [steps]="${this.inputs.steps.value}"
    [activeStep]="${this.inputs.activeStep.value}"
    variant="${this.inputs.variant.value}"
    style="width: 300px">
    ${this._getBackButton()}
    ${this._getNextButton()}
</blui-mobile-stepper>`;

    return this._playgroundService.removeEmptyLines(code);
  }
}
