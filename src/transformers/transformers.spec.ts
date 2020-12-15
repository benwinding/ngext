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

describe("getDecoratorPropertyValue tests", () => {
  test("check handles null", () => {
    const [testFile] = makeTestTsFile("class A {}");
    const decorator = testFile.getClass("A").getDecorator("DECORATOR");
    const result = t.getDecoratorPropertyValue(decorator, "ssss");
    expect(result).toBeUndefined();
  });
  test("check gets value", () => {
    const [testFile] = makeTestTsFile('@Component({value: "test"}) class A {}');
    const decorator = testFile.getClass("A").getDecorator("Component");
    const result = t.getDecoratorPropertyValue(decorator, "value");
    expect(result).toBe('"test"');
  });
});

describe("FindPageComponentImport tests", () => {
  test("check gets value", () => {
    const [testFile] = makeTestTsFile(`import { Component } from "ngext";`);
    const found = t.FindPageComponentImport(testFile);
    expect(found).toBeTruthy();
  });
  test("check doesn't find different import", () => {
    const [testFile] = makeTestTsFile(
      `import { Component } from "another/module";`
    );
    const found = t.FindPageComponentImport(testFile);
    expect(found).toBeUndefined();
  });
  test("check fails with bad data", () => {
    const [testFile] = makeTestTsFile(`csacaasc as as  A {}`);
    const found = t.FindPageComponentImport(testFile);
    expect(found).toBeUndefined();
  });
});
describe("FindPageComponent tests", () => {
  test("check gets @Component", () => {
    const [testFile] = makeTestTsFile(`@Component({value: "test"}) class A {}`);
    const found = t.FindPageComponent(testFile);
    expect(found).toBeTruthy();
  });
  test("check doesn't find different decorator", () => {
    const [testFile] = makeTestTsFile(
      `@MMMMComponent({value: "test"}) class A {}`
    );
    const found = t.FindPageComponent(testFile);
    expect(found).toBeUndefined();
  });
});
describe("ProcessComponentSourceFile tests", () => {
  test("check gets @Component", () => {
    const [testFile] = makeTestTsFile(`
    import { Component } from "ngext"; 
    import { MyLayout } from "some/import/path"; 
    @Component({template: "test", layout: MyLayout}) 
    class A { thisIsATest = 99;}`);
    const found = t.ProcessComponentSourceFile(testFile, {});
    expect(found).toBeTruthy();
  });
});
