import { MyComponent } from './../../components/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './app.routing';
import { TestComponent } from '@pages/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MyComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
