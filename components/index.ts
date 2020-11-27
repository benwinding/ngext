import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyComponent } from '@components/calendar.component';

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
