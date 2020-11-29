import { Component } from "@angular/core";
import { routes } from "./app.routing";

@Component({
  selector: "app-root",
  template: `
    <h2>Report Components Project</h2>
    <div>
      <a *ngFor="let linkItem of linkItems" [routerLink]="[linkItem.path]">
        {{ linkItem.path }}
      </a>
    </div>
    <div style="height: 80vh; position: relative;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  linkItems = routes;
}
