import { ComponentsModule } from "./../components/index";
import { CommonModule } from "@angular/common";
import { Component } from "../ngext-core";

@Component({
  imports: [CommonModule, ComponentsModule],
  template: `
    <h1>TEST 2</h1>
    <my-component></my-component>
  `,
})
export default class Page {}
