import { Component } from "@angular/core";
import { routes } from "./app.routing";

@Component({
  selector: "app-root",
  template: `
    <h2>Report Components Project</h2>
    <ul>
      <li *ngFor="let linkItem of linkItems">
        <a [routerLink]="[linkItem.path]">
          {{ linkItem.path }}
        </a>
      </li>
    </ul>
    <div style="height: 80vh; position: relative;">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  linkItems = routes.slice(0, -1);
}
