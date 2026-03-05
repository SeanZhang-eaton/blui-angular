import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';

import { EMPTY, filter, fromEvent, interval, switchMap, throttle } from 'rxjs';

import { SpacerComponent } from '../utility/spacer.module';

/** Default collapsed height in pixels when collapsedHeight input is not provided */
const DEFAULT_COLLAPSED_HEIGHT = 64;
/**
 * [AppBar Component](https://brightlayer-ui-components.github.io/angular/?path=/info/components-app-bar--readme)
 *
 * The `<blui-app-bar>` component is a wrapper around the `<mat-toolbar>` that can be resized as the page is scrolled.
 * It supports three variants: `snap`, `collapsed`, and `expanded`.
 * */
@Component({
  selector: 'blui-app-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './app-bar.component.scss',
  templateUrl: './app-bar.component.html',
  host: {
    class: 'blui-app-bar mat-elevation-z4',
  },
  imports: [MatToolbar, MatToolbarRow, SpacerComponent],
})
export class AppBarComponent {
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  /** Height (pixels) of the AppBar when collapsed */
  readonly $collapsedHeight = input<number | undefined>(undefined, { alias: 'collapsedHeight' });
  /** Color variant which is passed to the `<mat-toolbar>`
   *
   * @default primary
   * */
  readonly $color = input<'primary' | 'accent' | 'warn' | undefined>('primary', { alias: 'color' });
  /** Height (pixels) of the AppBar when expanded
   *
   * @default 200
   * */
  readonly $expandedHeight = input<number>(200, { alias: 'expandedHeight' });
  /** Scrollable element which dynamic app bar responds to. Resolved after the first render. */
  readonly $scrollContainerElement = input<Element>(null, { alias: 'scrollContainerElement' });
  /** Class name and index of the scrollable element. Resolved after the first render. */
  readonly $scrollContainerClassName = input<{ name: string; index: number }>(null, {
    alias: 'scrollContainerClassName',
  });
  /** Id of the scrollable element. Resolved after the first render. */
  readonly $scrollContainerId = input<string>(null, { alias: 'scrollContainerId' });
  /** Distance in pixels to scroll before collapsing toolbar. */
  readonly $scrollThreshold = input<number>(null, { alias: 'scrollThreshold' });
  /** Behavior of the App Bar
   *
   *  `collapsed` - Height set to `collapsedHeight` and does not respond to scroll distance
   *
   *  `expanded` -  Height set to `expandedHeight` and does not respond to scroll distance
   *
   *  `snap` - Variant that responds to scroll distance and switches between the `collapsed` and `expanded` variant.
   *
   *  @default collapsed
   *
   * */
  readonly $variant = input<'collapsed' | 'expanded' | 'snap'>('collapsed', { alias: 'variant' });

  /** Event emitted when the AppBar collapses or expands. Emits `true` when collapsed, `false` when expanded. */
  readonly collapsedChange = output<boolean>();

  /** Whether the component has completed its first render */
  protected readonly $viewInit = signal(false);

  private get window(): Window | null {
    return this.document.defaultView;
  }

  /** Whether the collapse/expand animation is in progress. Used to prevent flickering. */
  private readonly $isAnimating = signal(false);

  /** Resolved scroll container element. Falls back to window if no container is specified. */
  private readonly $scrollEl = computed(() => {
    this.$viewInit();
    const scrollContainerElement = this.$scrollContainerElement();
    const scrollContainerId = this.$scrollContainerId();
    const scrollContainerClassName = this.$scrollContainerClassName();
    if (scrollContainerElement) {
      return scrollContainerElement;
    }
    if (scrollContainerId) {
      return this.document.getElementById(scrollContainerId);
    }
    if (scrollContainerClassName) {
      return this.document.getElementsByClassName(scrollContainerClassName.name)[scrollContainerClassName.index];
    }
    return this.window;
  });

  /** Signal that emits on scroll events from the scroll container (throttled to 10ms) */
  private readonly $scrollEvent = toSignal(
    toObservable(this.$scrollEl, { injector: this.injector }).pipe(
      filter((el) => el != null),
      switchMap((el) => fromEvent(el, 'scroll').pipe(throttle(() => interval(10))))
    ),
    { initialValue: null }
  );

  /** Signal that emits on window resize events (throttled to 10ms) */
  private readonly $resizeEvent = toSignal(
    toObservable(this.$scrollEl, { injector: this.injector }).pipe(
      filter((el) => el != null),
      switchMap(() => (this.window ? fromEvent(this.window, 'resize').pipe(throttle(() => interval(10))) : EMPTY))
    ),
    { initialValue: null }
  );

  /** Whether the scroll container is the window object */
  private readonly $isWindow = computed(() => this.$scrollEl() === this.window);

  /** Whether to use the default responsive collapsed height (3.5rem mobile, 4rem desktop) */
  private readonly $useDefaultCollapsedHeight = computed(() => {
    const height = this.$collapsedHeight();
    return !Number.isFinite(height) || height === 0;
  });

  /** Calculated scroll threshold. Uses input value or defaults to expandedHeight - collapsedHeight. */
  private readonly $effectiveScrollThreshold = computed(() => {
    const threshold = this.$scrollThreshold();
    if (Number.isFinite(threshold)) {
      return threshold;
    }
    return this.$expandedHeight() - (this.$collapsedHeight() ?? DEFAULT_COLLAPSED_HEIGHT);
  });

  /** Current collapsed state. Managed by effect for snap mode hysteresis behavior. */
  protected readonly $isCollapsed = signal(true);

  /** Computed toolbar height based on collapsed state and height inputs */
  protected readonly $currentToolbarHeight = computed(() => {
    if (!this.$isCollapsed()) {
      return `${this.$expandedHeight()}px`;
    } else if (!this.$useDefaultCollapsedHeight()) {
      return `${this.$collapsedHeight()}px`;
    }
    return `${this.#calcDefaultCollapsedHeight()}rem`;
  });

  /** Current scroll position of the scroll container. Recomputes on scroll/resize events. */
  private readonly $scrollDistance = computed(() => {
    this.$scrollEvent();
    this.$resizeEvent();
    const el = this.$scrollEl();
    if (this.$isWindow()) {
      return this.document.scrollingElement?.scrollTop ?? 0;
    }
    return (el as HTMLElement)?.scrollTop ?? 0;
  });

  constructor() {
    afterNextRender({
      write: () => {
        this.$viewInit.set(true);
      },
    });

    // Handle variant changes and scroll/resize events
    effect(
      () => {
        const variant = this.$variant();
        const scrollDistance = this.$scrollDistance();
        const isAnimating = this.$isAnimating();
        const isCollapsed = this.$isCollapsed();
        const threshold = this.$effectiveScrollThreshold();

        // Locked modes
        if (variant === 'collapsed') {
          this.#setCollapsed(true);
          return;
        }
        if (variant === 'expanded') {
          this.#setCollapsed(false);
          return;
        }

        // Snap mode - uses hysteresis to prevent flickering
        if (isAnimating) return;

        // Only expand when scrolled back to top
        if (isCollapsed && scrollDistance <= 0) {
          this.#setCollapsed(false);
        }
        // Only collapse when scroll exceeds threshold
        else if (!isCollapsed && scrollDistance > threshold) {
          this.#collapse(scrollDistance);
        }
      },
      { allowSignalWrites: true }
    );

    // Emit collapsed state changes to output
    effect(() => this.collapsedChange.emit(this.$isCollapsed()));
  }

  /**
   * Collapses the AppBar with animation lock.
   * Prevents scroll position from jumping to 0 during collapse by adding 1px offset.
   */
  #collapse(scrollDistance: number): void {
    this.#setCollapsed(true);
    this.$isAnimating.set(true);

    setTimeout(() => {
      if (scrollDistance <= 0) {
        if (this.$isWindow()) {
          this.window?.scrollBy(0, 1);
        } else {
          const el = this.$scrollEl() as HTMLElement;
          if (el) el.scrollTop = 1;
        }
      }
      this.$isAnimating.set(false);
    }, 300);
  }

  /** Updates collapsed state if changed and emits the change event */
  #setCollapsed(collapsed: boolean): void {
    if (this.$isCollapsed() === collapsed) return;
    this.$isCollapsed.set(collapsed);
    this.collapsedChange.emit(collapsed);
  }

  /** Returns responsive default height: 3.5rem for mobile (<=600px), 4rem for desktop */
  #calcDefaultCollapsedHeight(): number {
    return this.document.documentElement.clientWidth <= 600 ? 3.5 : 4;
  }
}
