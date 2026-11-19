import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { MarkdownService } from 'ngx-markdown';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarkdownSplitService {
  private readonly _markdownService = inject(MarkdownService);

  splitWithTail(str: string, delim: string, count: number): string[] {
    const parts = str.split(delim);
    const tail = parts.slice(count).join(delim);
    const result = parts.slice(0, count);
    result.push(tail);
    return result;
  }

  subsection(str: string, topDelim: string, bottomDelim?: string): string {
    const parts = str.split(topDelim);
    let tail = parts.slice(1).join(topDelim);
    tail = topDelim + tail;
    if (bottomDelim) {
      return tail.split(bottomDelim)[0];
    }
    return tail;
  }

  /** Loads a section of `Drawer.md` as a signal. Must be called in an injection context. */
  drawerSection(topDelim: string, bottomDelim?: string): Signal<string> {
    return toSignal(
      this._markdownService
        .getSource('assets/md/Drawer.md')
        .pipe(map((data) => this.subsection(data, topDelim, bottomDelim).replace('images/', 'assets/md/images/'))),
      { initialValue: '' }
    );
  }
}
