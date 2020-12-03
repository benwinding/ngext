import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { routes } from "./routes";
import { NgextDefaultLayout } from "./default.layout";
export { routes };

@NgModule({
  declarations: [NgextDefaultLayout],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRouterModule {}
