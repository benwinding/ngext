import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from './routes';
export { routes }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRouterModule {}
