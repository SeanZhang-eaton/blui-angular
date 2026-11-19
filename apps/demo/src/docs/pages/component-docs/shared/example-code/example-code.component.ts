import { AsyncPipe } from '@angular/common';
import {
  afterEveryRender,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { LanguagePipe, MarkdownPipe } from 'ngx-markdown';

import { CopyCodeButtonComponent } from '../buttons/copy-code-button/copy-code-button.component';

@Component({
  selector: 'app-example-code',
  host: {
    class: 'app-example-code',
  },
  template: `
    <pre
      style="display: flex"
      [attr.data-line]="dataLine"
      (mouseenter)="isHoverSnippet = true"
      (mouseleave)="isHoverSnippet = false"
    >
      <code [innerHTML]="snippet | language: 'html' | markdown | async"></code>
      @if (copyButtonOnHover && isHoverSnippet) {
        <app-copy-code-button [code]="snippet"
        style="position: absolute; bottom: 16px; right: 420px;"></app-copy-code-button>
      }
    
    </pre>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['example-code.component.scss'],
  imports: [CopyCodeButtonComponent, AsyncPipe, LanguagePipe, MarkdownPipe],
})
export class ExampleCodeComponent implements AfterViewInit {
  @Input() snippet: string;
  @Input() dataLine: string;
  @Input() copyButtonOnHover = false;

  isHoverSnippet: boolean;

  constructor() {
    // The markdown pipe resolves asynchronously; highlight the rendered snippet once it is in the DOM.
    const host: HTMLElement = inject(ElementRef).nativeElement;
    afterEveryRender(() => {
      const code = host.querySelector('code[class*="language-"]');
      if (code && !code.querySelector('.token')) {
        window.Prism?.highlightAllUnder(host);
      }
    });
  }

  ngAfterViewInit(): void {
    /* This triggers a code-highlighting event. */
    window.dispatchEvent(new Event('resize'));
  }
}
