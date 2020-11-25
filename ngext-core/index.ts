import { Component as NgComponent, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

export function Component(input: { template: string; imports: any[] }) {
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
