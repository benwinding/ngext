import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyComponent } from './my.component';

@NgModule({
  declarations: [
    MyComponent
  ],
  exports: [
    MyComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class ComponentsModule { }
