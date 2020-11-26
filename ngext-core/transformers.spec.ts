/* 

import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  template: `<h1>Component works!</h1>`,
})
class Comp {}
const imports = [RouterModule.forChild([{ path: "**", component: Comp }])];
const declarations = [Comp];
@NgModule({
  imports: imports,
  declarations: declarations,
})
export class TestPageWorksModule {}

*/

import { SourceFile, Project } from "ts-morph";
import * as t from "./transformers";

function makeTestTsFile(tsContent: string): [SourceFile, Project] {
  const project = new Project({ useInMemoryFileSystem: true });
  const tsFileNameFake = "file.ts";
  const tsSourceFile = project.createSourceFile(tsFileNameFake, tsContent);
  return [tsSourceFile, project];
}

describe("transformers tests", () => {
  test("get page module by decorator", () => {
    const [tsSourceFile] = makeTestTsFile(`@PageModule()
export class TestPageBreaksModule {}`);
    const compClass = t.getPageModule(tsSourceFile);
    expect(compClass).toBeTruthy();
  });

  test("get decorator property value", () => {
    const [tsSourceFile] = makeTestTsFile(`@PageModule({
      template: \`VALUE\`
    })
export class TestPageBreaksModule {}`);
    const compClass = t.getPageModule(tsSourceFile);
    const templateVal = t.getDecoratorPropertyValue(compClass.getDecorator('PageModule'));
    expect(templateVal).toBe('\`VALUE\`');
  });

  test("create @Component PageComp", () => {
    const [tsSourceFile, project] = makeTestTsFile(`@PageModule({
      template: \`VALUE\`
    })
export class TestPageBreaksModule {}`);
    const compClass = t.getPageModule(tsSourceFile);
    const pageComponentClass = t.createNgPageComponent(compClass, project);
    const text = pageComponentClass.getText();
    expect(text).toBe(`@Component({
  template: \`VALUE\`
})
class PageComp {}`);
  });
  test("create @NgModule PageRoutingModule", () => {
    const [tsSourceFile, project] = makeTestTsFile(`@PageModule({
      template: \`VALUE\`
    })
export class TestPageBreaksModule {}`);
    const compClass = t.getPageModule(tsSourceFile);
    const pageModuleClass = t.createNgPageModule(compClass, project);
    const text = pageModuleClass.getText();
    expect(text).toBe(`@NgModule({
  imports: imports,
  declarations: declarations,
})
class TestPageBreaksModule {}`);
  });

  test("create @NgModule PageRoutingModule", () => {
    const [tsSourceFile, project] = makeTestTsFile(``);
    const importStatements = t.createImportStateMents(project);
    const line1 = importStatements[0].getText();
    expect(line1).toBe(`import { Component, NgModule } from "@angular/core";`);
    const line2 = importStatements[1].getText();
    expect(line2).toBe(`import { RouterModule } from "@angular/router";`);
  });
});
