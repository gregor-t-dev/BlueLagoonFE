import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.Dashboard),
  },

  {
    path: 'iam',
    loadChildren: () => import('./features/iam/iam.routes').then((r) => r.iam_routes),
  },
];
