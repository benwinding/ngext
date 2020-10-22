import { ComponentsModule } from './../components/index';
import { CommonModule } from '@angular/common';
import { OnInit } from "@angular/core";
import { PageModule } from '../ngext-core/index';

@PageModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  template: `
    <h1>TEST 2</h1>
    <my-component></my-component>
  `,
})
export default class TestPage {

}

