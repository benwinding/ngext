var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@ngtools/webpack", "typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var webpack_1 = require("@ngtools/webpack");
    var typescript_1 = require("typescript");
    exports.dummyTransformer = function (context) {
        return function (rootNode) {
            console.log('Transforming file: ' + rootNode.fileName);
            function visit(node) {
                return typescript_1["default"].visitEachChild(node, visit, context);
            }
            return typescript_1["default"].visitNode(rootNode, visit);
        };
    };
    function findAngularCompilerPlugin(webpackCfg) {
        return webpackCfg.plugins.find(function (plugin) { return plugin instanceof webpack_1.AngularCompilerPlugin; });
    }
    // The AngularCompilerPlugin has nog public API to add transformations, user private API _transformers instead.
    function addTransformerToAngularCompilerPlugin(acp, transformer) {
        acp._transformers = __spreadArrays([transformer], acp._transformers);
    }
    exports["default"] = {
        pre: function () {
            // This hook is not used in our example
        },
        // This hook is used to manipulate the webpack configuration
        config: function (cfg) {
            // Find the AngularCompilerPlugin in the webpack configuration
            var angularCompilerPlugin = findAngularCompilerPlugin(cfg);
            if (!angularCompilerPlugin) {
                console.error('Could not inject the typescript transformer: Webpack AngularCompilerPlugin not found');
                return;
            }
            addTransformerToAngularCompilerPlugin(angularCompilerPlugin, exports.dummyTransformer);
            return cfg;
        },
        post: function () {
            // This hook is not used in our example
        }
    };
});
