type AngularModule = any;
type AngularComponent = any;
type AngularService = any;

export interface Type<T> extends Function { new (...args: any[]): T; }

export interface PageComponentProps {
  layout?: Type<AngularComponent>;
  template: string;
  redirect?: string;
  styles?: string[];
  imports?: Type<AngularModule>[];
  guards?: Type<AngularService>[];
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
