import { Routes } from "@angular/router";

export let routes: Routes = [

    {
        path: "**",
        redirectTo: "404",
    }
];
