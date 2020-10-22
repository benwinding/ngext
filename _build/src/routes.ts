import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'test',
    loadChildren: () => import('./../../pages/test').then(m => m.default),
  },
  // {
  //   path: 'another',
  //   loadChildren: () => import('./page-modules').then(m => m.M1),
  // },
  {
    path: '**',
    redirectTo: 'test'
  }
];
