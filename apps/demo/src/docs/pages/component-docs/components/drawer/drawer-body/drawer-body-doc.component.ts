import { Component, inject } from '@angular/core';

import { ComingSoonComponent } from '../../../../../components/coming-soon/coming-soon.component';
import { MarkdownSplitService } from '../../../../../services/markdown-split/markdown-split.service';
import { ScaffoldComponent } from '../../../shared/scaffold/scaffold.component';

@Component({
  selector: 'app-drawer-body-doc',
  template: `
    <app-component-doc-scaffold [md]="md()" [hasExamples]="false" [hasPlayground]="false">
      <div examples>
        <app-coming-soon></app-coming-soon>
      </div>
      <div playground>
        <app-coming-soon></app-coming-soon>
      </div>
      <div knobs>
        <app-coming-soon></app-coming-soon>
      </div>
    </app-component-doc-scaffold>
  `,
  styleUrls: ['./drawer-body-doc.component.scss'],
  imports: [ScaffoldComponent, ComingSoonComponent],
})
export class DrawerBodyDocComponent {
  private readonly _splitService = inject(MarkdownSplitService);

  readonly md = this._splitService.drawerSection('## Drawer Body', '## Drawer Nav Group');
}
