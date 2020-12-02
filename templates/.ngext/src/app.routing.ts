import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { routes } from "./routes";
import { DefaultLayoutComponent } from "./default.layout";
export { routes };

@NgModule({
  declarations: [DefaultLayoutComponent],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRouterModule {}
