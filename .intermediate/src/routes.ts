import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "test1",
    loadChildren: () => import("./pages/test1").then((m) => m.Page),
  },
  {
    path: "test2",
    loadChildren: () => import("./pages/nested/test2").then((m) => m.Page),
  },
  {
    path: "**",
    redirectTo: "test",
  },
];
