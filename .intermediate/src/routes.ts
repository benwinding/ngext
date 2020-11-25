import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "test",
    loadChildren: () => import("./pages/test").then((m) => m.TestPageModule),
  },
  {
    path: "**",
    redirectTo: "test",
  },
];
