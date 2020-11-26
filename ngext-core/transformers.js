"use strict";
exports.__esModule = true;
exports.createImportStateMents = exports.createNgPageModule = exports.createNgPageComponent = exports.getDecoratorPropertyValue = exports.getPageModule = exports.processPageModuleTsFileOld = exports.processPageModuleTsFile = exports.reportNodes = exports.processPageModule = exports.processPageModuleSourceFile = void 0;
var ts_morph_1 = require("ts-morph");
var CJSON = require('circular-json');
function processPageModuleSourceFile(tsSourceFile) {
    var foundPageModule = tsSourceFile
        .getClasses()
        .find(function (a) { return !!a.getDecorator("PageModule"); });
    if (!foundPageModule) {
        return tsSourceFile;
    }
    var pmDecorator = foundPageModule.getDecorator("PageModule");
    var templateVal = getDecoratorPropertyValue(pmDecorator);
    var pageName = foundPageModule.getName();
    foundPageModule.remove();
    tsSourceFile.addClass({
        name: "PageComp",
        decorators: [
            {
                name: "Component",
                arguments: [
                    function (w) {
                        return w.write("{\n  template: " + templateVal + "\n}");
                    },
                ]
            },
        ]
    });
    tsSourceFile.addVariableStatement({
        declarations: [
            {
                name: "imports",
                initializer: '[RouterModule.forChild([{ path: "**", component: PageComp }])];'
            },
        ]
    });
    tsSourceFile.addVariableStatement({
        declarations: [
            {
                name: "declarations",
                initializer: "[PageComp];"
            },
        ]
    });
    tsSourceFile.addClass({
        isExported: true,
        name: pageName,
        decorators: [
            {
                name: "NgModule",
                arguments: [
                    function (w) {
                        return w.write("{\n  imports: imports,\n  declarations: declarations,\n}");
                    },
                ]
            },
        ]
    });
    tsSourceFile.insertImportDeclarations(0, [
        {
            moduleSpecifier: "@angular/core",
            namedImports: ["Component", "NgModule"]
        },
        {
            moduleSpecifier: "@angular/router",
            namedImports: ["RouterModule"]
        },
    ]);
    return tsSourceFile;
}
exports.processPageModuleSourceFile = processPageModuleSourceFile;
function processPageModule(contentOriginal) {
    // initialize
    var project = new ts_morph_1.Project({ useInMemoryFileSystem: true });
    var tsFileNameFake = "file.ts";
    var tsSourceFile = project.createSourceFile(tsFileNameFake, contentOriginal);
    var tsSourceFileConverted = processPageModuleSourceFile(tsSourceFile);
    var text = tsSourceFileConverted.getText();
    return text;
}
exports.processPageModule = processPageModule;
var fs = require("fs");
var path = require("path");
function reportNodes(source, newSource) {
    console.log('--------------');
    function saveSourceFile(n, fileName) {
        var nObj = JSON.parse(CJSON.stringify(n, null, 2));
        var nStr = JSON.stringify(nObj, null, 2);
        var fname = path.join('/home/ben/projects/ng-ts-transformations/dist', fileName);
        fs.writeFileSync(fname, nStr);
    }
    saveSourceFile(source, 'source.json');
    saveSourceFile(newSource, 'newSource.json');
    // const result = diff(sourceObj, newSourceObj);
    // console.log('DIFF = ', JSON.stringify(result, null, 2));
}
exports.reportNodes = reportNodes;
function processPageModuleTsFile(source) {
    console.log('---- > processing: ' + source.fileName);
    // initialize
    var project = new ts_morph_1.Project({ useInMemoryFileSystem: true });
    var tsSourceFile = project.createSourceFile(source.fileName, source.getText());
    var foundPageModule = tsSourceFile
        .getClasses()
        .find(function (a) { return !!a.getDecorator("PageModule"); });
    if (!foundPageModule) {
        return source;
    }
    // reportNodes(source, tsSourceFile.compilerNode);
    var pmDecorator = foundPageModule === null || foundPageModule === void 0 ? void 0 : foundPageModule.getDecorator("PageModule");
    var templateVal = getDecoratorPropertyValue(pmDecorator);
    var pageName = foundPageModule === null || foundPageModule === void 0 ? void 0 : foundPageModule.getName();
    foundPageModule === null || foundPageModule === void 0 ? void 0 : foundPageModule.remove();
    tsSourceFile.addClass({
        name: "PageComp",
        decorators: [
            {
                name: "Component",
                arguments: [
                    function (w) {
                        return w.write("{\n  template: " + templateVal + "\n}");
                    },
                ]
            },
        ]
    });
    tsSourceFile.addVariableStatement({
        declarations: [
            {
                name: "imports",
                initializer: '[RouterModule.forChild([{ path: "**", component: PageComp }])];'
            },
        ]
    });
    tsSourceFile.addVariableStatement({
        declarations: [
            {
                name: "declarations",
                initializer: "[PageComp];"
            },
        ]
    });
    tsSourceFile.addClass({
        isExported: true,
        name: pageName,
        decorators: [
            {
                name: "NgModule",
                arguments: [
                    function (w) {
                        return w.write("{\n  imports: imports,\n  declarations: declarations,\n}");
                    },
                ]
            },
        ]
    });
    tsSourceFile.insertImportDeclarations(0, [
        {
            moduleSpecifier: "@angular/core",
            namedImports: ["Component", "NgModule"]
        },
        {
            moduleSpecifier: "@angular/router",
            namedImports: ["RouterModule"]
        },
    ]);
    var returnSource = tsSourceFile.compilerNode;
    return source;
}
exports.processPageModuleTsFile = processPageModuleTsFile;
function processPageModuleTsFileOld(source) {
    console.log('---- > processing: ' + source.fileName);
    // initialize
    var project = new ts_morph_1.Project({ useInMemoryFileSystem: true });
    var tsSourceFile = project.createSourceFile(source.fileName, source.getText());
    var foundPageModule = tsSourceFile
        .getClasses()
        .find(function (a) { return !!a.getDecorator("PageModule"); });
    if (!foundPageModule) {
        return source;
    }
    // reportNodes(source, tsSourceFile.compilerNode);
    var pmDecorator = foundPageModule === null || foundPageModule === void 0 ? void 0 : foundPageModule.getDecorator("PageModule");
    var templateVal = getDecoratorPropertyValue(pmDecorator);
    var pageName = foundPageModule === null || foundPageModule === void 0 ? void 0 : foundPageModule.getName();
    foundPageModule === null || foundPageModule === void 0 ? void 0 : foundPageModule.remove();
    tsSourceFile.addClass({
        name: "PageComp",
        decorators: [
            {
                name: "Component",
                arguments: [
                    function (w) {
                        return w.write("{\n  template: " + templateVal + "\n}");
                    },
                ]
            },
        ]
    });
    tsSourceFile.addVariableStatement({
        declarations: [
            {
                name: "imports",
                initializer: '[RouterModule.forChild([{ path: "**", component: PageComp }])];'
            },
        ]
    });
    tsSourceFile.addVariableStatement({
        declarations: [
            {
                name: "declarations",
                initializer: "[PageComp];"
            },
        ]
    });
    tsSourceFile.addClass({
        isExported: true,
        name: pageName,
        decorators: [
            {
                name: "NgModule",
                arguments: [
                    function (w) {
                        return w.write("{\n  imports: imports,\n  declarations: declarations,\n}");
                    },
                ]
            },
        ]
    });
    tsSourceFile.insertImportDeclarations(0, [
        {
            moduleSpecifier: "@angular/core",
            namedImports: ["Component", "NgModule"]
        },
        {
            moduleSpecifier: "@angular/router",
            namedImports: ["RouterModule"]
        },
    ]);
    return tsSourceFile.compilerNode;
}
exports.processPageModuleTsFileOld = processPageModuleTsFileOld;
function getPageModule(tsSourceFile) {
    var foundPageModule = tsSourceFile
        .getClasses()
        .find(function (a) { return !!a.getDecorator("PageModule"); });
    return foundPageModule;
}
exports.getPageModule = getPageModule;
function getDecoratorPropertyValue(pageModuleDecorator) {
    var _a, _b;
    var args = pageModuleDecorator === null || pageModuleDecorator === void 0 ? void 0 : pageModuleDecorator.getArguments();
    if (!args || !args.length) {
        return "";
    }
    var obj = args[0];
    if (!obj) {
        return "";
    }
    var templateVal = (_b = (_a = obj.getProperty("template")) === null || _a === void 0 ? void 0 : _a.getLastChild()) === null || _b === void 0 ? void 0 : _b.getText();
    return templateVal;
}
exports.getDecoratorPropertyValue = getDecoratorPropertyValue;
function createNgPageComponent(pageModuleNode, p) {
    /*
  @Component({ template: "`<h1> Component Breaks! </h1>`" })
  class PageComp { }
    */
    var pmDecorator = pageModuleNode.getDecorator("PageModule");
    var templateVal = getDecoratorPropertyValue(pmDecorator);
    var newVal = p.createSourceFile("pcom.ts", "@Component({\n  template: " + templateVal + "\n})\nclass PageComp {}");
    var classDec = newVal.getClass("PageComp");
    return classDec;
}
exports.createNgPageComponent = createNgPageComponent;
function createNgPageModule(pageModuleNode, p) {
    var _a;
    /*
  const imports = [RouterModule.forChild([{ path: "**", component: Comp }])];
  const declarations = [Comp];
  @NgModule({
    imports: imports,
    declarations: declarations,
  })
  export class XXXXXXXXXX {}
  */
    var className = (_a = pageModuleNode.getSymbol()) === null || _a === void 0 ? void 0 : _a.getName();
    var newVal = p.createSourceFile("pcommodule.ts", "const imports = [RouterModule.forChild([{ path: \"**\", component: PageComp }])];\nconst declarations = [PageComp];\n@NgModule({\n  imports: imports,\n  declarations: declarations,\n})\nclass " + className + " {}");
    var classDec = newVal.getClass(className);
    return classDec;
}
exports.createNgPageModule = createNgPageModule;
function createImportStateMents(p) {
    var newVal = p.createSourceFile("pc_importstatements.ts", "import { Component, NgModule } from \"@angular/core\";\n    import { RouterModule } from \"@angular/router\";");
    var importDecs = newVal.getImportDeclarations();
    return importDecs;
}
exports.createImportStateMents = createImportStateMents;
//# sourceMappingURL=transformers.js.map