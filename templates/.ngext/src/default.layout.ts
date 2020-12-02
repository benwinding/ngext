import { Component } from "@angular/core";

@Component({
  selector: "default-layout",
  template: `
    <h2>Default Layout</h2>
    <div style="height: 80vh; position: relative;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class DefaultLayoutComponent {}
