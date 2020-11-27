import {
  ClassDeclaration,
  Project,
  SourceFile,
  ObjectLiteralExpression,
  Decorator,
  ImportDeclaration,
  ts,
} from "ts-morph";
const CJSON = require("circular-json");

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
  const dec = tsSourceFile.getImportDeclaration('@ngext');
  dec.remove();

  const pmDecorator = foundComponent.getDecorator("Component");
  const templateVal = getDecoratorPropertyValue(pmDecorator, 'template');
  const importsVal = getDecoratorPropertyValue(pmDecorator, 'imports');
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
        initializer:
          `[
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

export function processComponent(contentOriginal: string): string {
  // initialize
  const project = new Project({ useInMemoryFileSystem: true });

  const tsFileNameFake = "file.ts";
  const tsSourceFile = project.createSourceFile(
    tsFileNameFake,
    contentOriginal
  );
  const tsSourceFileConverted = processComponentSourceFile(tsSourceFile);
  const text = tsSourceFileConverted.getText();
  return text;
}
