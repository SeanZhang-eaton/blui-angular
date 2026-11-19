import { bootstrapApplication } from '@angular/platform-browser';

import './prism';

import { AppComponent } from './docs/app.component';
import { appConfig } from './docs/app.config';
import { loadThemeStyles, readThemePreference } from './docs/services/theme/theme.service';

// Load the selected theme before the first render to avoid a flash of unstyled content.
loadThemeStyles(readThemePreference().design)
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
