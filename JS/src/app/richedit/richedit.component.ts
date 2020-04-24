import { Component, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { create, createOptions, RichEdit, Interval } from 'devexpress-richedit';

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
	  options.autoCorrect = {
        correctTwoInitialCapitals: false,
        detectUrls: false,
        enableAutomaticNumbering: false,
        replaceTextAsYouType: false,
        caseSensitiveReplacement: false,
        replaceInfoCollection: [
            { replace: "wnwd", with: "well-nourished, well-developed" },
            { replace: "(c)", with: "©" }
        ],
    };
    options.events.autoCorrect = function (s, e) {
        if (e.text.length == 1 && /\w/.test(e.text)) {
            var prevText = s.document.getText(new Interval(e.interval.start - 2, 2));
            if (prevText.length == 0 || /^(\. |\? |\! )$/.test(prevText) || prevText.charCodeAt(1) == 13) {
                var newText = e.text.toUpperCase();
                if (newText != e.text) {
                    s.beginUpdate();
                    s.history.beginTransaction();
                    s.document.deleteText(e.interval);
                    s.document.insertText(e.interval.start, newText);
                    s.history.endTransaction();
                    s.endUpdate();
                    e.handled = true;
                }
            }
        }
    };
    this.rich = create(this.element.nativeElement.firstElementChild, options);
  }

  ngOnDestroy() {
    if (this.rich) {
      this.rich.dispose();
this.rich = null;
}
  }
}
