import { bootstrapApplication } from '@angular/platform-browser';

import './prism';

import { AppComponent } from './docs/app.component';
import { appConfig } from './docs/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
