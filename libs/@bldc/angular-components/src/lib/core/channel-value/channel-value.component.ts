import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

export type UnitSpaceType = 'show' | 'hide' | 'auto';
/** [ChannelValue Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-channel-value--readme)
 *
 * Displays a value/unit combination.
 * These are used as part of the HeroComponent but can also be used inline.
 * */
@Component({
  selector: 'blui-channel-value',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './channel-value.component.html',
  styleUrl: './channel-value.component.scss',
  host: {
    class: 'blui-channel-value',
  },
  imports: [],
})
export class ChannelValueComponent {
  /** If true, shows units before the value
   *
   * @default false
   * */
  readonly $prefix = input(false, { alias: 'prefix' });
  /** The text to display for the units (light text) */
  readonly $units = input<string | undefined>(undefined, { alias: 'units' });
  /** The text to display for the value (bold text)*/
  readonly $value = input.required<string | number>({ alias: 'value' });
  /** Text color */
  readonly $color = input<string | undefined>(undefined, { alias: 'color' });
  /** Show a space between the value and units. Can be `show` | `hide` | `auto`
   *
   * `show` - Show a space between the value and units.
   *
   * `hide` - Hide a space between the value and units.
   *
   * `auto` - Shows space except for white list items.
   *
   * prefixUnitWhitelist: ['$']
   *
   * suffixUnitWhitelist: ['%', '℉','°F','℃','°C','°']
   *
   * @default auto;
   * */
  readonly $unitSpace = input<UnitSpaceType>('auto', { alias: 'unitSpace' });

  private readonly prefixUnitWhitelist = ['$'];
  private readonly suffixUnitWhitelist = ['%', '℉', '°F', '℃', '°C', '°'];

  protected readonly $isWhiteListedUnit = computed(() => {
    const units = this.$units();
    if (!units) return false;
    return this.$prefix() ? this.prefixUnitWhitelist.includes(units) : this.suffixUnitWhitelist.includes(units);
  });

  protected readonly $valueAsString = computed(() => String(this.$value()));
}
