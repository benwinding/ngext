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
class TestPageComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: "**",
        component: TestPageComponent,
      },
    ]),
  ],
  declarations: [TestPageComponent],
})
export class TestPageModule {}
