import { SourceFile, Project } from "ts-morph";
import * as R from "./createRoutesFile";

function makeTestTsFile(tsContent: string): [SourceFile, Project] {
  const project = new Project({ useInMemoryFileSystem: true });
  const tsFileNameFake = "file.ts";
  const tsSourceFile = project.createSourceFile(tsFileNameFake, tsContent);
  return [tsSourceFile, project];
}

describe("createRouteCatchAllObj tests", () => {
  test("check catchAll route", () => {
    const result = R.createRouteCatchAllObj("TEST");
    expect(result).toContain('redirectTo: "TEST"');
  });
  test("check catchAll route", () => {
    const result = R.createRouteCatchAllObj("TEST");
    expect(result).toContain('path: "**",');
  });
});
describe("createPageRouteItem tests", () => {
  const testRoute: R.RouteObj = {
    routePath: "my-route",
    filePath: "~/pages/my-route",
  };
  test("Check path is correct", () => {
    const result = R.createPageRouteItem(testRoute);
    expect(result).toContain('path: "my-route",');
  });
  test("Check loadchildren", () => {
    const result = R.createPageRouteItem(testRoute);
    expect(result).toContain(
      'loadChildren: () => import("~/pages/my-route").then((m) => m.default),'
    );
  });
  test("Check layout", () => {
    const result = R.createPageRouteItem(testRoute);
    expect(result).toContain("component: NgextDefaultLayout,");
  });
  test("Check layout override", () => {
    const testRoute: R.RouteObj = {
      routePath: "my-route",
      filePath: "~/pages/my-route",
      layout: "MyLayout",
    };
    const result = R.createPageRouteItem(testRoute);
    expect(result).toContain("component: MyLayout,");
  });
});
describe("addAngularImportDeclarations tests", () => {
  test("Check has default route", () => {
    const [sourceFile] = makeTestTsFile("");
    R.addAngularImportDeclarations(sourceFile);
    expect(sourceFile.getText()).toContain(
      'import { Routes } from "@angular/router";'
    );
  });
});
describe("MakeRouteObj test", () => {
  const rootDir = "/home/ben/project";
  const pagePath = "/home/ben/project/pages/test.ts";
  const result = R.MakeRouteObj(rootDir, pagePath);
  test("Check route path matches", () => {
    expect(result.routePath).toBe("test");
  });
  test("Check file path matches", () => {
    expect(result.filePath).toBe("./pages/test");
  });
});
