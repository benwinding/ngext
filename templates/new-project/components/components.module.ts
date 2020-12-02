import { NgModule } from '@angular/core';
import { MyComponent } from './my.component';

@NgModule({
  declarations: [
    MyComponent
  ],
  exports: [
    MyComponent
  ]
})
export class ComponentsModule {}