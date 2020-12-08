import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div style="height: 100vh; width: 100vw; position: relative;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
