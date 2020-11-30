import { NgModule } from '@angular/core';
import { MyComponent } from './calendar.component';

@NgModule({
  declarations: [
    MyComponent
  ],
  exports: [
    MyComponent
  ]
})
export class ComponentsModule {}