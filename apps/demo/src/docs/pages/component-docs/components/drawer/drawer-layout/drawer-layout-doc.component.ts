import { Component, inject, ViewEncapsulation } from '@angular/core';

import { MarkdownSplitService } from '../../../../../services/markdown-split/markdown-split.service';
import { CopyCodeButtonComponent } from '../../../shared/buttons/copy-code-button/copy-code-button.component';
import { ExampleCodeComponent } from '../../../shared/example-code/example-code.component';
import { Knob, ScaffoldComponent } from '../../../shared/scaffold/scaffold.component';

import { PERMANENT, PermanentVariantExampleComponent } from './examples/permanent.component';
import { PERSISTENT, PersistentVariantExampleComponent } from './examples/persistent.component';
import { DrawerLayoutPlaygroundProps, PlaygroundComponent } from './examples/playground.component';
import { RAIL, RailVariantExampleComponent } from './examples/rail.component';
import { RAIL_CONDENSED, RailCondensedVariantExampleComponent } from './examples/rail-condensed.component';
import { TEMPORARY, TemporaryVariantExampleComponent } from './examples/temporary.component';

@Component({
  selector: 'app-drawer-layout-doc',
  template: `
    <app-component-doc-scaffold [md]="md()" [knobGroups]="knobGroups" class="drawer-layout-examples">
      <div examples class="app-example">
        <div class="example-section">
          <div class="example-heading">Drawer Layout</div>
          <div class="example-description">
            The <code>&lt;blui-drawer-layout&gt;</code> manages the behavior of a navigation drawer and the main
            application content.
          </div>
        </div>
        <div class="example-section">
          <div class="example-heading">Permanent Drawer</div>
          <div class="example-description">The <code>'permanent'</code> drawer is full-sized and always visible.</div>
          <div class="example-demo-wrapper">
            <app-permanent-drawer-layout-demo></app-permanent-drawer-layout-demo>
          </div>
          <app-example-code [snippet]="PERMANENT"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="PERMANENT"></app-copy-code-button>
          </div>
        </div>
        <div class="example-section">
          <div class="example-heading">Persistent Drawer</div>
          <div class="example-description">
            The <code>'persistent'</code> drawer can be opened and closed. When opened, it pushes the main application
            content.
          </div>
          <div class="example-demo-wrapper">
            <app-persistent-drawer-layout-demo></app-persistent-drawer-layout-demo>
          </div>
          <app-example-code [snippet]="PERSISTENT"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="PERSISTENT"></app-copy-code-button>
          </div>
        </div>
        <div class="example-section">
          <div class="example-heading">Temporary Drawer</div>
          <div class="example-description">
            The <code>'temporary'</code> drawer is hidden until it is opened. When open, it appears as an overlay on top
            of the application content. This is typically used on smaller screens and mobile devices.
          </div>
          <div class="example-demo-wrapper">
            <app-temporary-drawer-layout-demo></app-temporary-drawer-layout-demo>
          </div>
          <app-example-code [snippet]="TEMPORARY"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="TEMPORARY"></app-copy-code-button>
          </div>
        </div>
        <div class="example-section">
          <div class="example-heading">Navigation Rail</div>
          <div class="example-description">
            The <code>'rail'</code> variant is always opened but takes up less space than a full-sized drawer.
          </div>
          <div class="example-demo-wrapper">
            <app-rail-drawer-layout-demo></app-rail-drawer-layout-demo>
          </div>
          <app-example-code [snippet]="RAIL"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="RAIL"></app-copy-code-button>
          </div>
        </div>
        <div class="example-section">
          <div class="example-heading">Condensed Navigation Rail</div>
          <div class="example-description">
            You can make the rail even smaller by setting the
            <code>condensed</code> input on the <code>&lt;blui-drawer&gt;</code>. This will hide the navigation item
            titles and show only the icons.
          </div>
          <div class="example-demo-wrapper">
            <app-rail-condensed-drawer-layout-demo></app-rail-condensed-drawer-layout-demo>
          </div>
          <app-example-code [snippet]="RAIL_CONDENSED" dataLine="2"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="RAIL_CONDENSED"></app-copy-code-button>
          </div>
        </div>
      </div>

      <app-layout-playground
        playground
        [inputs]="allKnobs"
        (codeChange)="generatedCode = $event"
      ></app-layout-playground>
      <app-example-code code [snippet]="generatedCode" [copyButtonOnHover]="true"></app-example-code>
    </app-component-doc-scaffold>
  `,
  styleUrls: ['./drawer-layout-doc.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    ScaffoldComponent,
    PermanentVariantExampleComponent,
    ExampleCodeComponent,
    CopyCodeButtonComponent,
    PersistentVariantExampleComponent,
    TemporaryVariantExampleComponent,
    RailVariantExampleComponent,
    RailCondensedVariantExampleComponent,
    PlaygroundComponent,
  ],
})
export class DrawerLayoutDocComponent {
  private readonly _splitService = inject(MarkdownSplitService);

  readonly md = this._splitService.drawerSection('## Drawer Layout', '## Drawer Header');
  PERMANENT = PERMANENT;
  PERSISTENT = PERSISTENT;
  TEMPORARY = TEMPORARY;
  RAIL = RAIL;
  RAIL_CONDENSED = RAIL_CONDENSED;
  generatedCode: string;

  /* Default playground knobs */
  required: Partial<DrawerLayoutPlaygroundProps> = {
    variant: {
      value: 'persistent',
      type: 'select',
      options: ['persistent', 'permanent', 'temporary', 'rail'],
      hint: 'Sets the drawer variant',
    },
  };
  optional: Partial<DrawerLayoutPlaygroundProps> = {
    width: {
      value: 350,
      componentDefault: 350,
      type: 'number',
      hint: 'Sets the drawer width (not applicable to rail variant)',
      range: { min: 50, max: 500, step: 50 },
    },
  };
  drawerOptionalProps: { [key: string]: Knob } = {
    condensed: {
      value: false,
      componentDefault: false,
      type: 'boolean',
      hint: 'Skinny view for rail variant',
    },
    disableRailTooltip: {
      value: false,
      componentDefault: false,
      type: 'boolean',
      hint: 'Hide tooltips on hover for the rail variant',
    },
  };
  allKnobs = Object.assign({}, this.required, this.optional, this.drawerOptionalProps);
  knobGroups = [
    {
      title: 'Required Properties',
      knobs: this.required,
      defaultExpanded: true,
    },
    {
      title: 'Optional Properties',
      knobs: this.optional,
      defaultExpanded: true,
    },
    {
      title: 'Drawer Properties',
      knobs: this.drawerOptionalProps,
      defaultExpanded: false,
    },
  ];
}
