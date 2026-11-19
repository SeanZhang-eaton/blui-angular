import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { NavigationComponent } from './navigation/navigation.component';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  template: '<app-navigation />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationComponent],
})
export class AppComponent {
  constructor() {
    // Instantiated eagerly so the saved light / dark preference is applied on startup.
    inject(ThemeService);

    // Brightlayer UI icons are copied from @brightlayer-ui/icons-svg to ssets/blui-icons (see vite.app.config.mts).
    const sanitizer = inject(DomSanitizer);
    inject(MatIconRegistry).addSvgIconResolver((name, namespace) =>
      namespace === 'blui-icons' ? sanitizer.bypassSecurityTrustResourceUrl(`assets/blui-icons/${name}.svg`) : null
    );
  }
}
