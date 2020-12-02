import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div style="height: 100vh; width: 100vh; position: relative;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
