import { ComponentsModule } from '@components/index';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AnotherComponent } from './another.component';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    AnotherComponent,
    TestComponent
  ],
  exports: [
    AnotherComponent,
    TestComponent
  ],
  imports: [
    ComponentsModule,
    CommonModule,
  ],
})
export class PagesModule { }
