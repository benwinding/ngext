import { SourceFile, ObjectLiteralExpression, Decorator, ts } from "ts-morph";
import * as path from "path";

export function getDecoratorPropertyValue(
  ComponentDecorator: Decorator | undefined,
  property: string
): string | undefined {
  const args = ComponentDecorator?.getArguments();
  if (!args || !args.length) {
    return "";
  }
  const obj = args[0] as ObjectLiteralExpression;
  if (!obj) {
    return "";
  }
  const templateVal = obj.getProperty(property)?.getLastChild()?.getText();
  return templateVal;
}

export function processComponentSourceFile(
  tsSourceFile: SourceFile
): SourceFile {
  const foundComponent = tsSourceFile
    .getClasses()
    .find((a) => !!a.getDecorator("Component"));
  if (!foundComponent) {
    return tsSourceFile;
  }
  const dec = tsSourceFile.getImportDeclaration("ngext");
  dec.remove();

  const pmDecorator = foundComponent.getDecorator("Component");
  const templateVal = getDecoratorPropertyValue(pmDecorator, "template");
  const importsVal = getDecoratorPropertyValue(pmDecorator, "imports");
  const pageName = foundComponent.getName();
  foundComponent.remove();
  tsSourceFile.addClass({
    name: "PageComp",
    decorators: [
      {
        name: "Component",
        arguments: [
          (w) =>
            w.write(`{
  template: ${templateVal}
}`),
        ],
      },
    ],
  });

  tsSourceFile.addVariableStatement({
    declarations: [
      {
        name: "imports",
        initializer: `[
  ...${importsVal},
  RouterModule.forChild([{ path: "**", component: PageComp }])
];`,
      },
    ],
  });
  tsSourceFile.addVariableStatement({
    declarations: [
      {
        name: "declarations",
        initializer: "[PageComp];",
      },
    ],
  });
  tsSourceFile.addClass({
    isExported: true,
    isDefaultExport: true,
    name: pageName,
    decorators: [
      {
        name: "NgModule",
        arguments: [
          (w) =>
            w.write(`{
  imports: imports,
  declarations: declarations,
}`),
        ],
      },
    ],
  });

  tsSourceFile.insertImportDeclarations(0, [
    {
      moduleSpecifier: "@angular/core",
      namedImports: ["Component", "NgModule"],
    },
    {
      moduleSpecifier: "@angular/router",
      namedImports: ["RouterModule"],
    },
  ]);

  return tsSourceFile;
}

/* 
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "test1",
    loadChildren: () => import("./pages/test1").then((m) => m.Page),
  },
  {
    path: "nested/test2",
    loadChildren: () => import("./pages/nested/test2").then((m) => m.Page),
  },
  {
    path: "**",
    redirectTo: "test",
  },
];
*/

function createPageRouteItem(route: RouteObjs) {
  return `
  {
    path: "${route.route}",
    loadChildren: () => import("${route.file}").then((m) => m.default),
  }`;
}

function createRouteCatchAllObj(redirectTo: string) {
  return `
  {
    path: "**",
    redirectTo: "${redirectTo}",
  }`;
}

export type RouteObjs = {
  route: string;
  file: string;
}

export function createRoutesFile(
  tsfile: SourceFile,
  routeModulePathsRelative: RouteObjs[]
): SourceFile {
  // initialize
  tsfile.insertImportDeclarations(0, [
    {
      moduleSpecifier: "@angular/router",
      namedImports: ["Routes"],
    },
  ]);
  const routesLiteral = [
    ...routeModulePathsRelative.map(createPageRouteItem), 
    createRouteCatchAllObj('404')
  ];
  const routeArrayLiteral = `[
  ${routesLiteral.join(',')}
]`;
  const statement = tsfile.addVariableStatement({
    declarations: [
      {
        name: "routes",
        initializer: w => w.write(routeArrayLiteral),
        type: 'Routes'
      },
    ],
  });
  statement.setIsExported(true);
  return tsfile;
}
