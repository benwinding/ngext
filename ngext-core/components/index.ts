import { Component as NgComponent, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

type AngularModule = any;

export function Component(input: { template: string; imports: AngularModule[] }) {
  return function (constructorFunction: Function) {
    const { template, imports } = input;

    @NgComponent({
      template: template,
    })
    class PageComponent {}

    @NgModule({
      imports: [
        ...imports,
        RouterModule.forChild([{ path: "**", component: PageComponent }]),
      ],
      declarations: [PageComponent],
    })
    class RoutingModule {}

    return RoutingModule;
  };
}
