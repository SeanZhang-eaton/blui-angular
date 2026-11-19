import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _matIconRegistry = inject(MatIconRegistry);
  private readonly _domSanitizer = inject(DomSanitizer);

  constructor() {
    this._matIconRegistry.addSvgIconSetInNamespace(
      'blui-icons',
      /* **Note to Brightlayer UI Users:
                Stackblitz has difficulty reading static assets found within the node_modules folder.
                For this example to work inside Stackblitz, we use a https request to fetch the Brightlayer UI icon set.
                In normal situations, we encourage you to import the iconSet directly from the node_modules folder like below:
                    // const iconSet = require('@brightlayer-ui/icons-svg/icons.svg').default;
                    // this._domSanitizer.bypassSecurityTrustResourceUrl('iconSet')
             */
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'https://raw.githubusercontent.com/etn-ccis/blui-icons/v3.5.0-blui-icons-mui/packages/svg/icons.svg'
      )
    );
  }
}
