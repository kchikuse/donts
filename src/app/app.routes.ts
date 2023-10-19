import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { navGuard } from './app.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':role',
    loadComponent: () =>
      import('./quote/quote.component').then((c) => c.QuoteComponent),
      canActivate: [navGuard()]
  },
  {
    path: '**',
    redirectTo: '', 
    pathMatch: 'full'
  },
];
