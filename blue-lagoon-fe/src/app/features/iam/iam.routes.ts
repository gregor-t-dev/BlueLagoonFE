import { Routes } from '@angular/router';
import { IamRoot } from './iam-root/iam-root';
export const iam_routes: Routes = [
  {
    path: '',
    component: IamRoot,
    children: [
      {
        path: 'users',
        loadComponent: () => import('./users/users').then((c) => c.Users),
      },
      {
        path: 'endpoints',
        loadComponent: () =>
          import('./endpoint-configurations/endpoint-configurations').then(
            (c) => c.EndpointConfigurations,
          ),
      },
      {
        path: 'permissions',
        loadComponent: () =>
          import('./permission-definitions/permission-definitions').then(
            (c) => c.PermissionDefinitions,
          ),
      },
    ],
  },
];
