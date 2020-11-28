import { Routes } from "@angular/router";

export let routes: Routes = [

    {
        path: "/test1",
        loadChildren: () => import("./pages/test1").then((m) => m.default),
    },
    {
        path: "/nested/test2",
        loadChildren: () => import("./pages/nested/test2").then((m) => m.default),
    },
    {
        path: "**",
        redirectTo: "404",
    }
];
