import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-component',
  template: `<img src="https://picsum.photos/seed/picsum/100/100" width="100" height="100" />`
})

export class MyComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}