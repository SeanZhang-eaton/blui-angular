import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { loadThemeStyles, readThemePreference } from './app/services/theme.service';

// Load the selected theme before the first render to avoid a flash of unstyled content.
loadThemeStyles(readThemePreference().design)
  .then(() => bootstrapApplication(AppComponent, appConfig))
  .catch((err) => console.error(err));
