import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <h1>TEST</h1>
  <my-component></my-component>
  `
})
export class TestComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}