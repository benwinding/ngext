import { Component, NgModule } from '@angular/core';

export function PageModule(input: {
  template?: string,
  imports?: any[],
}) {
  return function (constructorFunction: Function) {
    @Component({
      template: 'input.template'
    })
    class Compss {}

    return class extends NgModule {
      imports = input.imports;
      declarations = [Compss];
      exports = [Compss];
    }
  }
}
