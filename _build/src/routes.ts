import { Routes } from '@angular/router';
import { TestComponent } from '@pages/test.component';
import { AnotherComponent } from '@pages/another.component';

export const routes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'another',
    component: AnotherComponent,
  },
];
