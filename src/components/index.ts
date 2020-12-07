import { Component as NgComponent, NgModule } from "@angular/core";
// import { RouterModule } from "@angular/router";

type AngularModule = any;
type AngularComponent = any;

export interface Type<T> extends Function { new (...args: any[]): T; }

export interface PageComponentProps {
  layout?: Type<AngularComponent>;
  template: string;
  imports?: Type<AngularModule>[];
}

export function Component(input: PageComponentProps) {
  return function (constructorFunction: Function) {
    // const { template, imports } = input;
    // @NgComponent({
    //   template: template,
    // })
    // class PageComponent {}
    // @NgModule({
    //   imports: [
    //     ...imports,
    //     RouterModule.forChild([{ path: "**", component: PageComponent }]),
    //   ],
    //   declarations: [PageComponent],
    // })
    // class RoutingModule {}
    // return RoutingModule;
  };
}
