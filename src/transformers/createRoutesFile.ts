import { SourceFile } from "ts-morph";
import * as path from "path";
import { convertToRelativePath, stripTsExtension } from "../utils";
import { NgextPage } from "../types/ngext-page";

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
  routeObjs: RouteObj[]
): SourceFile {
  // initialize
  addAngularImportDeclarations(tsfile);
  addLayoutImportDeclarations(tsfile, routeObjs);
  const firstRoutePath = routeObjs[0].routePath;
  const routesLiteral = [
    ...routeObjs.map(createPageRouteItem),
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
  routeModuleFiles: NgextPage[]
): RouteObj[] {
  const routes: RouteObj[] = routeModuleFiles.map((pageFile) => {
    const routeObj: RouteObj = MakeRouteObj(ROOT_DIR, pageFile);
    return routeObj;
  });
  return routes;
}

export function MakeRouteObj(
  ROOT_DIR: string,
  pageComponent: NgextPage
): RouteObj {
  const pagesDir = path.join(ROOT_DIR, "pages");
  const modulePathNoTs = stripTsExtension(
    pageComponent.sourceFile.getFilePath()
  );
  const pageFilePath = convertToRelativePath(ROOT_DIR, modulePathNoTs);
  const pageRoute = convertToRelativePath(pagesDir, modulePathNoTs);
  const routeObj: RouteObj = {
    routePath: pageRoute.slice(2),
    filePath: pageFilePath,
    layout: GetLayout(pageComponent),
  };
  return routeObj;
}

export function GetLayout(pageComponent: NgextPage): RouteLayout {
  if (!pageComponent.layout) {
    return undefined;
  }
  return {
    componentName: pageComponent.layout.componentName,
    importPath: pageComponent.layout.importPath,
  };
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

export function addLayoutImportDeclarations(
  tsFile: SourceFile,
  routeObjs: RouteObj[]
): void {
  const layouts = routeObjs.filter((r) => !!r.layout).map((r) => r.layout);
  if (!layouts.length) {
    return;
  }
  tsFile.insertImportDeclarations(
    0,
    layouts.map((layout) => ({
      namedImports: [layout.componentName],
      moduleSpecifier: layout.importPath,
    }))
  );
}

export function createPageRouteItem(route: RouteObj): string {
  const layoutName = route.layout?.componentName || "NgextDefaultLayout";
  return `
  {
    path: "${route.routePath}",
    component: ${layoutName},
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
  layout?: RouteLayout;
};

export type RouteLayout = {
  componentName: string;
  importPath: string;
};
