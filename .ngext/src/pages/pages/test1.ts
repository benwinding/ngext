import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ComponentsModule } from "@components";
import { CommonModule } from "@angular/common";

@Component({
    template: `
    <h1>TEST 1</h1>
    <my-component></my-component>
  `
})
class PageComp {
}

let imports = [
    ...[CommonModule, ComponentsModule],
    RouterModule.forChild([{ path: "**", component: PageComp }])
];;

let declarations = [PageComp];;

@NgModule({
    imports: imports,
    declarations: declarations,
})
export default class Page {
}
