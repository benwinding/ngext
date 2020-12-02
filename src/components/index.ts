import { Component as NgComponent, NgModule } from "@angular/core";
// import { RouterModule } from "@angular/router";

type AngularModule = any;
type AngularComponent = any;

export interface PageComponentProps {
  layout?: AngularComponent;
  template: string;
  imports?: AngularModule[];
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
