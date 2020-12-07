import { Component as NgComponent, NgModule } from "@angular/core";
// import { RouterModule } from "@angular/router";

type AngularModule<T> = new () => T;
type AngularComponent<T> = new () => T;

export interface PageComponentProps<T> {
  layout?: AngularComponent<T>;
  template: string;
  imports?: AngularModule<T>[];
}

export function Component(input: PageComponentProps<any>) {
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
