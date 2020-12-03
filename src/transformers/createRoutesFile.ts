import { SourceFile } from "ts-morph";
import * as path from "path";
import { convertToRelativePath, stripTsExtension } from "../utils";

/* 
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "test1",
    loadChildren: () => import("./pages/test1").then((m) => m.default),
  },
  {
    path: "nested/test2",
    loadChildren: () => import("./pages/nested/test2").then((m) => m.default),
  },
  {
    path: "**",
    redirectTo: "test",
  },
];
*/

export function CreateRoutesFile(
  tsfile: SourceFile,
  routeModulePathsRelative: RouteObj[]
): SourceFile {
  // initialize
  addAngularImportDeclarations(tsfile);
  const firstRoutePath = routeModulePathsRelative[0].routePath;
  const routesLiteral = [
    ...routeModulePathsRelative.map(createPageRouteItem),
    createRouteCatchAllObj(firstRoutePath),
  ];
  const routeArrayLiteral = `[
  ${routesLiteral.join(",")}
]`;
  const statement = tsfile.addVariableStatement({
    declarations: [
      {
        name: "routes",
        initializer: (w) => w.write(routeArrayLiteral),
        type: "Routes",
      },
    ],
  });
  statement.setIsExported(true);
  return tsfile;
}

export function MakeRouteObjs(
  ROOT_DIR: string,
  pagePaths: string[]
): RouteObj[] {
  const routes: RouteObj[] = pagePaths.map((pagePage) => {
    const routeObj: RouteObj = MakeRouteObj(ROOT_DIR, pagePage);
    return routeObj;
  });
  return routes;
}

export function MakeRouteObj(
  ROOT_DIR: string,
  routeModulePath: string
): RouteObj {
  const pagesDir = path.join(ROOT_DIR, "pages");
  const modulePathNoTs = stripTsExtension(routeModulePath);
  const pageFilePath = convertToRelativePath(ROOT_DIR, modulePathNoTs);
  const pageRoute = convertToRelativePath(pagesDir, modulePathNoTs);
  const routeObj: RouteObj = {
    routePath: pageRoute.slice(2),
    filePath: pageFilePath,
    layout: "",
  };
  return routeObj;
}

export function addAngularImportDeclarations(tsFile: SourceFile): void {
  tsFile.insertImportDeclarations(0, [
    {
      moduleSpecifier: "@angular/router",
      namedImports: ["Routes"],
    },
    {
      moduleSpecifier: "./default.layout",
      namedImports: ["NgextDefaultLayout"],
    },
  ]);
}

export function createPageRouteItem(route: RouteObj): string {
  return `
  {
    path: "${route.routePath}",
    component: ${route.layout || "NgextDefaultLayout"},
    loadChildren: () => import("${route.filePath}").then((m) => m.default),
  }`;
}

export function createRouteCatchAllObj(redirectTo: string): string {
  return `
  {
    path: "**",
    redirectTo: "${redirectTo}",
  }`;
}

export type RouteObj = {
  routePath: string;
  filePath: string;
  layout?: string;
};
