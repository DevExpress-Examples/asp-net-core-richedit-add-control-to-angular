import { Component, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { create, createOptions, RichEdit } from 'devexpress-richedit';

@Component({
  selector: 'app-richedit',
  template: '<div></div>',
  styleUrls: ['./richedit.component.css']
})
export class RicheditComponent implements AfterViewInit, OnDestroy {
  private rich: RichEdit;

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    const options = createOptions();
    // set options
    options.width = '1700px';
    options.height = '800px';
    this.rich = create(this.element.nativeElement.firstElementChild, options);
  }

  ngOnDestroy() {
    if (this.rich) {
      this.rich.dispose();
this.rich = null;
}
  }
}
