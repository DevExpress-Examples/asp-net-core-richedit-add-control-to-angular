import { Component, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { create, createOptions, RichEdit, Interval, ViewType } from 'devexpress-richedit';
import { RichEditUnit } from 'devexpress-richedit/lib/base-utils/base-utils/unit-converter';

@Component({
  selector: 'app-richedit',
  template: '<div></div>',
  styleUrls: ['./richedit.component.css']
})
export class RicheditComponent implements AfterViewInit, OnDestroy {
  private rich: RichEdit;

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    // the createOptions() method creates an object that contains RichEdit options initialized with default values
    const options = createOptions();

    options.bookmarks.visibility = true;
    options.bookmarks.color = '#ff0000';

    options.confirmOnLosingChanges.enabled = true;
    options.confirmOnLosingChanges.message = 'Are you sure you want to perform the action? All unsaved document data will be lost.';

    options.fields.updateFieldsBeforePrint = true;
    options.fields.updateFieldsOnPaste = true;

    options.mailMerge.activeRecord = 2;
    options.mailMerge.viewMergedData = true;
    options.mailMerge.dataSource = [
        { Name: 'Indy', age: 32 },
        { Name: 'Andy', age: 28 },
    ];

    // events
    options.events.activeSubDocumentChanged = () => { };
    options.events.autoCorrect = () => { };
    options.events.calculateDocumentVariable = () => { };
    options.events.characterPropertiesChanged = () => { };
    options.events.contentInserted = () => { };
    options.events.contentRemoved = () => { };
    options.events.documentChanged = () => { };
    options.events.documentFormatted = () => { };
    options.events.documentLoaded = () => { };
    options.events.gotFocus = () => { };
    options.events.hyperlinkClick = () => { };
    options.events.keyDown = () => { };
    options.events.keyUp = () => { };
    options.events.paragraphPropertiesChanged = () => { };
    options.events.lostFocus = () => { };
    options.events.pointerDown = () => { };
    options.events.pointerUp = () => { };
    options.events.saving = () => { };
    options.events.saved = () => { };
    options.events.selectionChanged = () => { };    
    options.events.customCommandExecuted = (s, e) => {
        switch (e.commandName) {
        case 'insertEmailSignature':
            s.document.insertParagraph(s.document.length);
            s.document.insertText(s.document.length, '_________');
            s.document.insertParagraph(s.document.length);
            s.document.insertText(s.document.length, 'Best regards,');
            s.document.insertParagraph(s.document.length);
            s.document.insertText(s.document.length, 'John Smith');
            s.document.insertParagraph(s.document.length);
            s.document.insertText(s.document.length, 'john@example.com');
            s.document.insertParagraph(s.document.length);
            s.document.insertText(s.document.length, '+1 (818) 844-0000');
            break;
        }
    };

    options.unit = RichEditUnit.Inch;

    options.view.viewType = ViewType.PrintLayout;
    options.view.simpleViewSettings.paddings = {
      left: 15,
      top: 15,
      right: 15,
      bottom: 15,
    };

    options.autoCorrect = {
        correctTwoInitialCapitals: true,
        detectUrls: true,
        enableAutomaticNumbering: true,
        replaceTextAsYouType: true,
        caseSensitiveReplacement: false,
        replaceInfoCollection: [
            { replace: "wnwd", with: "well-nourished, well-developed" },
            { replace: "(c)", with: "©" }
        ],
    };
    // capitalize the first letter at the beginning of a new sentence/line
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

    options.exportUrl = 'https://siteurl.com/api/';

    options.readOnly = false;
    options.width = '1400px';
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
