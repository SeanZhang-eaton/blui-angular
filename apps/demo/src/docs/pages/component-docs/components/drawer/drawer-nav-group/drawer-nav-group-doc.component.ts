import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { COMPONENT_NAV_ITEMS } from '../../../../../navigation/nav-items';
import { MarkdownSplitService } from '../../../../../services/markdown-split/markdown-split.service';
import { CopyCodeButtonComponent } from '../../../shared/buttons/copy-code-button/copy-code-button.component';
import { ExampleCodeComponent } from '../../../shared/example-code/example-code.component';
import { ScaffoldComponent, Tab } from '../../../shared/scaffold/scaffold.component';

import { BASIC } from './examples/basic.component';
import { MULTIPLE_GROUPS, MultipleGroupsComponent } from './examples/multiple-groups.component';
import { NavGroupPlaygroundKnobs, PlaygroundComponent } from './examples/playground.component';
import { CUSTOM_CONTENT, WithCustomContentComponent } from './examples/with-custom-content.component';
import { SPACER, WithSpacerComponent } from './examples/with-spacer.component';

@Component({
  selector: 'app-drawer-nav-group-doc',
  template: `
    <app-component-doc-scaffold [md]="md()" [knobGroups]="knobGroups">
      <div examples class="app-example">
        <div class="example-section">
          <div class="example-heading">Drawer Nav Group</div>
          <div class="example-description">
            A <code>&lt;blui-drawer-nav-group&gt;</code> organizes related navigation items together. You can have as
            many groups as needed.
          </div>
          <div class="example-demo-wrapper">
            <app-multiple-groups-nav-group-demo></app-multiple-groups-nav-group-demo>
          </div>
          <app-example-code [snippet]="MULTIPLE_GROUPS" dataLine="3-10"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="MULTIPLE_GROUPS"></app-copy-code-button>
          </div>
        </div>

        <div class="example-section">
          <div class="example-heading">Spacing the Groups</div>
          <div class="example-description">
            If you want to add an extra space between your groups, you can use a
            <a [routerLink]="createRouterLink(routes.spacer.route)"> Spacer</a>
            component.
          </div>
          <div class="example-demo-wrapper">
            <app-spacer-between-nav-group-demo></app-spacer-between-nav-group-demo>
          </div>
          <app-example-code [snippet]="SPACER" dataLine="7"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="SPACER"></app-copy-code-button>
          </div>
        </div>

        <div class="example-section">
          <div class="example-heading">Customizing the Title</div>
          <div class="example-description">
            By default, each nav group has a simple string as the title. You can customize this and pass in your own
            content via <code>blui-title-content</code>.
          </div>
          <div class="example-demo-wrapper">
            <app-custom-content-nav-group-demo></app-custom-content-nav-group-demo>
          </div>
          <app-example-code [snippet]="CUSTOM_CONTENT" dataLine="4-11"></app-example-code>
          <div class="example-actions">
            <app-copy-code-button [code]="CUSTOM_CONTENT"></app-copy-code-button>
          </div>
        </div>
      </div>

      <app-nav-group-playground
        playground
        [inputs]="knobs"
        (codeChange)="generatedCode = $event"
      ></app-nav-group-playground>
      <app-example-code code [snippet]="generatedCode" [copyButtonOnHover]="true"></app-example-code>
    </app-component-doc-scaffold>
  `,
  styleUrls: ['./drawer-nav-group-doc.component.scss'],
  imports: [
    ScaffoldComponent,
    MultipleGroupsComponent,
    ExampleCodeComponent,
    CopyCodeButtonComponent,
    RouterLink,
    WithSpacerComponent,
    WithCustomContentComponent,
    PlaygroundComponent,
  ],
})
export class DrawerNavGroupDocComponent {
  private readonly _splitService = inject(MarkdownSplitService);

  routes = COMPONENT_NAV_ITEMS;

  readonly md = this._splitService.drawerSection('## Drawer Nav Group', '## Drawer Nav Item');
  BASIC = BASIC;
  MULTIPLE_GROUPS = MULTIPLE_GROUPS;
  SPACER = SPACER;
  CUSTOM_CONTENT = CUSTOM_CONTENT;
  generatedCode: string;

  /* Default playground knobs */
  knobs: NavGroupPlaygroundKnobs = {
    title: {
      value: 'Title',
      type: 'string',
      componentDefault: '',
      hint: 'Nav group section title',
    },
    divider: {
      value: true,
      componentDefault: false,
      type: 'boolean',
      hint: 'Divider that appears under the title',
    },
  };
  knobGroups = [
    {
      title: 'Optional Properties',
      knobs: this.knobs,
      defaultExpanded: true,
    },
  ];

  createRouterLink(route: string): string {
    const tab: Tab = 'examples';
    return `/${route}/${tab}`;
  }
}
