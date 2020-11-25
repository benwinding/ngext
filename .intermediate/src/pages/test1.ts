import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  template: `<div>
    <h1>TEST 0</h1>
    <h1>TEST 1</h1>
    <h1>TEST 2</h1>
    <h1>TEST 3</h1>
  </div>`,
})
class PageComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: "**",
        component: PageComponent,
      },
    ]),
  ],
  declarations: [PageComponent],
})
export default class PageModule {}
