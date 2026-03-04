import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

export type MobileStepperVariant = 'dots' | 'text' | 'progress';

/**
 * [MobileStepper Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-mobile-stepper--readme)
 *
 * The <MobileStepper> is used to minimally display progress when completing a workflow that requires multiple steps.
 *  There are three types of progress indicators supported, dots (default), text, and progress.
 */
@Component({
  selector: 'blui-mobile-stepper',
  standalone: true,
  templateUrl: './mobile-stepper.component.html',
  styleUrl: './mobile-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'blui-mobile-stepper',
  },
  imports: [MatProgressBar],
})
export class MobileStepperComponent {
  /** The index of the active step */
  readonly $activeStep = input.required<number>({ alias: 'activeStep' });

  /** Total number of steps to display */
  readonly $steps = input.required<number>({ alias: 'steps' });

  /** Which type of indicator to use. Can be 'dots' | 'text' | 'progress'.
   *
   * `dots` - Each step appears as a dot. Visited steps will appear as a different color.
   *
   * `text` -  Text indicator which shows current step and total steps.  Example: "Step 1/5"
   *
   * `progress` - Appears as a progress bar that fills the further along as user is in the workflow.
   *
   * @default dots
   * */
  readonly $variant = input<MobileStepperVariant>('dots', { alias: 'variant' });

  protected readonly $stepsArray = computed(() => Array.from({ length: this.$steps() }, (_, i) => i));

  /** This is only used for progress variant. */
  protected readonly $progressFill = computed(() => {
    const activeStep = this.$activeStep();
    const stepsArrayLength = this.$stepsArray().length - 1;
    return activeStep === 0 ? 0 : (activeStep / stepsArrayLength) * 100;
  });
}
