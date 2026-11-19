import { computed, effect, ElementRef, Signal, signal } from '@angular/core';

export type ContentPair = {
  selector: string;
  ref: ElementRef;
};

/** Whether development-only warnings should be logged (stripped from production builds). */
export function isDevMode(): boolean {
  return typeof ngDevMode === 'undefined' || !!ngDevMode;
}

/** Logs a development-mode warning with the Brightlayer UI prefix. */
export function devWarn(message: string): void {
  if (isDevMode()) {
    console.warn(`Brightlayer UI ${message}`);
  }
}

/** Warns when a component is used through a deprecated (legacy) element selector. */
export function warnDeprecatedSelector(host: ElementRef<HTMLElement>, selector: string): void {
  if (!isDevMode()) {
    return;
  }
  const tagName = host.nativeElement.tagName?.toLowerCase();
  if (tagName && tagName !== selector) {
    devWarn(`<${tagName}> is deprecated and will be removed in the next major version. Use <${selector}> instead.`);
  }
}

export function requireInput<T>(inputs: Array<keyof T>, component: T): void {
  if (!isDevMode()) {
    return;
  }
  inputs.forEach((input) => {
    if (component[input] === undefined || component[input] === null || component[input] === '') {
      const name: string = component.constructor.name;

      devWarn(`${name} error: Property "${<string>input}" is required.`);
    }
  });
}

export function requireContent<T>(contentPairs: ContentPair[], component: T): void {
  if (!isDevMode()) {
    return;
  }
  contentPairs.forEach((contentPair) => {
    if (!contentPair.ref.nativeElement.children || contentPair.ref.nativeElement.children.length === 0) {
      const name: string = component.constructor.name;

      devWarn(`${name} error: Selector "${contentPair.selector}" is required.`);
    }
  });
}

export function hasChildren(el: ElementRef): boolean {
  return el.nativeElement.children && el.nativeElement.children.length > 0;
}

export function isEmptyView(el: ElementRef): boolean {
  if (!el || !el.nativeElement) {
    return true;
  }
  return !hasChildren(el);
}

export function isEmptyContent(el?: HTMLElement | ElementRef | null): boolean {
  if (!el) {
    return true;
  }

  if ('nativeElement' in el) {
    return isEmptyContent(el.nativeElement);
  }
  if (el.children.length > 0) {
    return false;
  }
  return el.textContent.length === 0;
}

/** Default emptiness check for an `<ng-content>` wrapper element. */
export function isEmptyElement(el: HTMLElement): boolean {
  return el.children.length === 0 && !el.textContent?.trim();
}

/**
 * Returns a signal that reports whether the queried element (typically the wrapper of an `<ng-content>` slot) has content.
 *
 * Unlike a `computed` over a `viewChild` alone, the result is updated when the projected content changes after the
 * first render (e.g. content toggled with `@if` by the consumer). Must be called in an injection context.
 */
export function hasProjectedContent(
  $el: Signal<ElementRef<HTMLElement> | undefined>,
  isEmpty: (el: HTMLElement) => boolean = isEmptyElement
): Signal<boolean> {
  const $mutations = signal(0);

  effect((onCleanup) => {
    const el = $el()?.nativeElement;
    if (!el || typeof MutationObserver === 'undefined') {
      return;
    }
    const observer = new MutationObserver(() => $mutations.update((count) => count + 1));
    observer.observe(el, { childList: true, subtree: true, characterData: true });
    onCleanup(() => observer.disconnect());
  });

  return computed(() => {
    $mutations();
    const el = $el()?.nativeElement;
    return !!el && !isEmpty(el);
  });
}
