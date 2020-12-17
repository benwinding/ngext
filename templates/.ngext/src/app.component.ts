import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div
      style="left: 0; right: 0; position: absolute; top: 0; bottom: 0; overflow: auto;"
    >
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
