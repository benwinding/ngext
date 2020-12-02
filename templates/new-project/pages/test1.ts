import { ComponentsModule } from "~/components";
import { CommonModule } from "@angular/common";
import { Component } from "ngext";

@Component({
  imports: [CommonModule, ComponentsModule],
  template: `
    <h1>TEST 1 - {{PROJECT_NAME}}</h1>
    <my-component></my-component>
  `,
})
export default class Page {}
