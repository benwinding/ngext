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
  const layoutVal = getDecoratorPropertyValue(pmDecorator, "layout", true);
  const layoutImport = inputFile.getImportDeclaration(
    (i) => !!i.getNamedImports().find((s) => s.getName() === layoutVal)
  );
  const importsVal = getDecoratorPropertyValue(pmDecorator, "imports", true);
  const pageName = foundPage.getName();
  foundPage.setIsDefaultExport(false);
  foundPage.setIsExported(false);

  inputFile.addVariableStatement({
    declarations: [
      {
        name: "imports",
        initializer: `[
  ...${importsVal},
  RouterModule.forChild([{ path: "**", component: ${pageName} }])
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

  const page: NgextPage = {
    sourceFile: inputFile,
  };
  if (layoutImport) {
    page.layout = {
      componentName: layoutVal,
      importPath: stripQuotes(layoutImport.getModuleSpecifier().getText()),
    };
  }
  console.log('--- > Processed: ', layoutVal);
  return page;
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
