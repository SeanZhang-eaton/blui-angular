import { Component, inject } from '@angular/core';

import { MarkdownSplitService } from '../../../../../services/markdown-split/markdown-split.service';
import { CopyCodeButtonComponent } from '../../../shared/buttons/copy-code-button/copy-code-button.component';
import { ViewCodeButtonComponent } from '../../../shared/buttons/view-code-button/view-code-button.component';
import { ExampleCodeComponent } from '../../../shared/example-code/example-code.component';
import { ScaffoldComponent } from '../../../shared/scaffold/scaffold.component';

import { BASIC, BasicExampleComponent } from './examples/basic.component';
import { COMPLEX, ComplexComponent } from './examples/complex.component';
import { PlaygroundComponent, SubheaderPlaygroundKnobs } from './examples/playground.component';

@Component({
  selector: 'app-subheader-body-doc',
  template: `<app-component-doc-scaffold [md]="md()" [knobGroups]="knobGroups">
    <div examples class="app-example">
      <div class="example-section">
        <div class="example-heading">Drawer Subheader</div>
        <div class="example-description">
          The <code>&lt;blui-drawer-subheader&gt;</code> allows you to pass custom content that will appear directly
          below the drawer header.
        </div>
        <div class="example-demo-wrapper">
          <app-basic-drawer-subheader-demo></app-basic-drawer-subheader-demo>
        </div>
        <app-example-code [snippet]="BASIC" dataLine="3-5"></app-example-code>
        <div class="example-actions">
          <app-copy-code-button [code]="BASIC"></app-copy-code-button>
        </div>
      </div>
    </div>

    <div examples class="app-example">
      <div class="example-section">
        <div class="example-heading">Interactive Subheader</div>
        <div class="example-description">
          The subheader will accept any content but is commonly used for dropdowns or content toggles.
        </div>
        <div class="example-demo-wrapper">
          <app-complex-drawer-subheader-demo></app-complex-drawer-subheader-demo>
        </div>
        <app-example-code [snippet]="COMPLEX" dataLine="3-15"></app-example-code>
        <div class="example-actions">
          <app-view-code-button
            examplePath="drawer/subheader/complex"
            style="margin-right: 16px"
          ></app-view-code-button>
          <app-copy-code-button [code]="COMPLEX"></app-copy-code-button>
        </div>
      </div>
    </div>
    <app-subheader-playground
      playground
      [inputs]="knobs"
      (codeChange)="generatedCode = $event"
    ></app-subheader-playground>
    <app-example-code code [snippet]="generatedCode" [copyButtonOnHover]="true"></app-example-code>
  </app-component-doc-scaffold> `,
  styleUrls: ['./drawer-subheader-doc.component.scss'],
  imports: [
    ScaffoldComponent,
    BasicExampleComponent,
    ExampleCodeComponent,
    CopyCodeButtonComponent,
    ComplexComponent,
    ViewCodeButtonComponent,
    PlaygroundComponent,
  ],
})
export class DrawerSubheaderDocComponent {
  private readonly _splitService = inject(MarkdownSplitService);

  readonly md = this._splitService.drawerSection('## Drawer Subheader', '## Drawer Body');
  BASIC = BASIC;
  COMPLEX = COMPLEX;
  generatedCode: string;

  /* Default playground knobs */
  knobs: SubheaderPlaygroundKnobs = {
    divider: {
      value: true,
      componentDefault: true,
      type: 'boolean',
      hint: 'Show divider under subheader',
    },
    hideContentOnCollapse: {
      value: true,
      componentDefault: true,
      type: 'boolean',
      hint: 'Hide content when the drawer is collapsed',
    },
  };
  knobGroups = [
    {
      title: 'Optional Properties',
      knobs: this.knobs,
      defaultExpanded: true,
    },
  ];
}
