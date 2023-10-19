import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export type Role = 'husbands' | 'wives';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient()
  ],
};
