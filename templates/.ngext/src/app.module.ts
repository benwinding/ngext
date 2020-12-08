import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRouterModule } from "./app.routing";
{{GLOBAL_MODULE_IMPORT}}

@NgModule({
  declarations: [AppComponent],
  imports: [
    ...[{{GLOBAL_MODULE_NAME}}],
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
