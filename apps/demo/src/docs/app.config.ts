import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection, SecurityContext } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { MARKED_OPTIONS, provideMarkdown, SANITIZE } from 'ngx-markdown';

import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';

import { provideGoogleAnalytics } from '@hakimio/ngx-google-analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(),
    provideMarkdown({
      sanitize: { provide: SANITIZE, useValue: SecurityContext.NONE },
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: { gfm: true, breaks: false, pedantic: false },
      },
    }),
    provideGoogleAnalytics(environment.ga),
  ],
};
