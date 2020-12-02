import { Component } from "@angular/core";

@Component({
  selector: "default-layout",
  template: `
    <h2>Default Layout</h2>
    <ul>
      <li><a [routerLink]="['/test1']">/test1</a></li>
      <li><a [routerLink]="['/nested-page/test2']">/nested-page/test2</a></li>
    </ul>
    <div style="height: 80vh; position: relative;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class DefaultLayoutComponent {}
