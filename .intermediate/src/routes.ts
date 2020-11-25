import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "test1",
    loadChildren: () => import("./pages/test1").then((m) => m.default),
  },
  {
    path: "test2",
    loadChildren: () => import("./pages/test2").then((m) => m.default),
  },
  {
    path: "**",
    redirectTo: "test",
  },
];
