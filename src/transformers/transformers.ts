import {
  SourceFile,
  ObjectLiteralExpression,
  Decorator,
  ClassDeclaration,
  ImportDeclaration,
} from "ts-morph";
import { stripQuotes } from "../utils";
import { NgextPage } from "../types/ngext-page";

export function ProcessComponentSourceFile(
  inputFile: SourceFile
): NgextPage | undefined {
  const foundImport = FindPageComponentImport(inputFile);
  if (!foundImport) {
    return undefined;
  }
  const foundPage = FindPageComponent(inputFile);
  if (!foundPage) {
    return undefined;
  }
  foundImport.remove();

  const pmDecorator = foundPage.getDecorator("Component");
  const importsVal = getDecoratorPropertyValue(pmDecorator, "imports", true);
  const redirectVal = getDecoratorPropertyValue(pmDecorator, "redirect", true);
  const guardsVal = getDecoratorPropertyValue(pmDecorator, "guards", true);
  const layoutVal = getDecoratorPropertyValue(pmDecorator, "layout", true);
  const layoutImport = inputFile.getImportDeclaration(
    (i) => !!i.getNamedImports().find((s) => s.getName() === layoutVal)
  );
  const pageName = foundPage.getName();
  foundPage.setIsDefaultExport(false);
  foundPage.setIsExported(false);

  let routerProps = `path: "", component: ${pageName}`;
  if (guardsVal) {
    routerProps += `, canActivate: ${guardsVal}`;
  }
  if (redirectVal) {
    routerProps += `, redirectTo: ${redirectVal}`;
  }

  inputFile.addVariableStatement({
    declarations: [
      {
        name: "imports",
        initializer: `[
  CommonModule,
  ...${importsVal || "[]"},
  RouterModule.forChild([{ ${routerProps} }])
];`,
      },
    ],
  });
  inputFile.addVariableStatement({
    declarations: [
      {
        name: "declarations",
        initializer: `[${pageName}];`,
      },
    ],
  });
  inputFile.addClass({
    isExported: true,
    isDefaultExport: true,
    name: pageName + "_Routing",
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

  inputFile.insertImportDeclarations(0, [
    {
      moduleSpecifier: "@angular/core",
      namedImports: ["Component", "NgModule"],
    },
    {
      moduleSpecifier: "@angular/router",
      namedImports: ["RouterModule"],
    },
  ]);

  const isCommonModuleImported = IsCommonModuleImported(inputFile);
  if (!isCommonModuleImported) {
    inputFile.addImportDeclaration({
      moduleSpecifier: "@angular/common",
      namedImports: ["CommonModule"],
    });
  }

  const page: NgextPage = {
    sourceFile: inputFile,
  };
  if (layoutImport) {
    page.layout = {
      componentName: layoutVal,
      importPath: stripQuotes(layoutImport.getModuleSpecifier().getText()),
    };
  }
  console.log("--- > Processed: ", layoutVal);
  return page;
}

export function IsCommonModuleImported(inputFile: SourceFile): boolean {
  const angularCommonImport = inputFile.getImportDeclaration("@angular/common");
  if (!angularCommonImport) {
    return false;
  }
  const isCommonModuleImported = angularCommonImport
  .getNamedImports()
  .some((i) => i.getName() === "CommonModule");
  return isCommonModuleImported;
}

export function FindPageComponentImport(
  inputFile: SourceFile
): ImportDeclaration | undefined {
  const ngextImport = inputFile.getImportDeclaration("ngext");
  if (!ngextImport) {
    return undefined;
  }
  const pageComponentImported = ngextImport
    .getNamedImports()
    .find((a) => a.getText() === "Component");
  if (!pageComponentImported) {
    return undefined;
  }
  return ngextImport;
}
export function FindPageComponent(
  inputFile: SourceFile
): ClassDeclaration | undefined {
  const foundPageComponent = inputFile
    .getClasses()
    .find((a) => !!a.getDecorator("Component"));
  if (!foundPageComponent) {
    return undefined;
  }
  return foundPageComponent;
}

export function getDecoratorPropertyValue(
  ComponentDecorator: Decorator | undefined,
  property: string,
  removeToo?: boolean
): string | undefined {
  const args = ComponentDecorator?.getArguments();
  if (!args || !args.length) {
    return undefined;
  }
  const obj = args[0] as ObjectLiteralExpression;
  if (!obj) {
    return undefined;
  }
  const template = obj.getProperty(property);
  const templateVal = template?.getLastChild()?.getText();
  if (removeToo) {
    template?.remove();
  }
  return templateVal;
}
