(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../pages/test.component.ts":
/*!**********************************!*\
  !*** ../pages/test.component.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var TestComponent = /** @class */ (function () {
    function TestComponent() {
    }
    TestComponent.prototype.ngOnInit = function () { };
    TestComponent = __decorate([
        core_1.Component({
            template: "\n  <h1>TEST</h1>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;


/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app.component.ts":
/*!******************************!*\
  !*** ./src/app.component.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var app_routing_1 = __webpack_require__(/*! ./app.routing */ "./src/app.routing.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.linkItems = app_routing_1.routes;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "app-root",
            template: "\n    <h2>Report Components Project</h2>\n    <nav mat-tab-nav-bar>\n      <a *ngFor=\"let linkItem of linkItems\">\n        {{ linkItem.path }}\n      </a>\n    </nav>\n    <div style=\"height: 80vh; position: relative;\">\n      <router-outlet></router-outlet>\n    </div>\n  ",
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = __webpack_require__(/*! @angular/platform-browser/animations */ "../node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/animations.js");
var common_1 = __webpack_require__(/*! @angular/common */ "../node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
var platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var app_component_1 = __webpack_require__(/*! ./app.component */ "./src/app.component.ts");
var app_routing_1 = __webpack_require__(/*! ./app.routing */ "./src/app.routing.ts");
var test_component_1 = __webpack_require__(/*! @pages/test.component */ "../pages/test.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                test_component_1.TestComponent
            ],
            imports: [
                common_1.CommonModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_1.AppRouterModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app.routing.ts":
/*!****************************!*\
  !*** ./src/app.routing.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/__ivy_ngcc__/fesm5/router.js");
var core_1 = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
var routes_1 = __webpack_require__(/*! ./routes */ "./src/routes.ts");
exports.routes = routes_1.routes;
var AppRouterModule = /** @class */ (function () {
    function AppRouterModule() {
    }
    AppRouterModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes_1.routes)],
            exports: [router_1.RouterModule],
            providers: [],
        })
    ], AppRouterModule);
    return AppRouterModule;
}());
exports.AppRouterModule = AppRouterModule;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
platform_browser_dynamic_1.platformBrowserDynamic()
    .bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "./src/routes.ts":
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var test_component_1 = __webpack_require__(/*! @pages/test.component */ "../pages/test.component.ts");
exports.routes = [
    {
        path: 'test',
        component: test_component_1.TestComponent,
    },
];


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/ben/projects/nguxt/_build/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map