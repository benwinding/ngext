import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { routes } from "./routes";
import { NgextDefaultLayout } from "./default.layout";
import { NgextDefault404Page } from "./default.404.page";
export { routes };

@NgModule({
  declarations: [NgextDefaultLayout, NgextDefault404Page],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRouterModule {}
