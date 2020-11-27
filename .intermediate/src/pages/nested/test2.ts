import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "@components";
import { CommonModule } from "@angular/common";

@Component({
      template: `
    <h1>TEST 2</h1>
    <my-component></my-component>
  `
    })
class PageComp {
}

let imports = [RouterModule.forChild([{ path: "**", component: PageComp }])];;

let declarations = [PageComp];;

@NgModule({
      imports: imports,
      declarations: declarations,
    })
export class Page {
}
