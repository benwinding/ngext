import { Routes } from "@angular/router";

export let routes: Routes = [

    {
        path: "pages/test1",
        loadChildren: () => import("./pages/pages/test1").then((m) => m.default),
    },
    {
        path: "pages/nested/test2",
        loadChildren: () => import("./pages/pages/nested/test2").then((m) => m.default),
    },
    {
        path: "**",
        redirectTo: "404",
    }
];
