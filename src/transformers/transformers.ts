import {
  SourceFile,
  ObjectLiteralExpression,
  Decorator,
  ClassDeclaration,
  ImportDeclaration,
} from "ts-morph";

export function processComponentSourceFile(inputFile: SourceFile): SourceFile {
  const foundImport = FindPageComponentImport(inputFile);
  if (!foundImport) {
    return inputFile;
  }
  const foundPage = FindPageComponent(inputFile);
  if (!foundPage) {
    return inputFile;
  }
  foundImport.remove();

  const pmDecorator = foundPage.getDecorator("Component");
  const templateVal = getDecoratorPropertyValue(pmDecorator, "template");
  const importsVal = getDecoratorPropertyValue(pmDecorator, "imports");
  const pageName = foundPage.getName();
  foundPage.remove();
  inputFile.addClass({
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

  inputFile.addVariableStatement({
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
  inputFile.addVariableStatement({
    declarations: [
      {
        name: "declarations",
        initializer: "[PageComp];",
      },
    ],
  });
  inputFile.addClass({
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

  return inputFile;
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
  property: string
): string | undefined {
  const args = ComponentDecorator?.getArguments();
  if (!args || !args.length) {
    return undefined;
  }
  const obj = args[0] as ObjectLiteralExpression;
  if (!obj) {
    return undefined;
  }
  const templateVal = obj.getProperty(property)?.getLastChild()?.getText();
  return templateVal;
}
