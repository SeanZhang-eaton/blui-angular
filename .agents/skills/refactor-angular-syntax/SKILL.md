---
name: refactor-angular-syntax
description: 'Refactor Angular components to modern v18+ syntax. Converts @Input/@Output to signal inputs/outputs, constructor injection to inject(), *ngIf/*ngFor to @if/@for control flow, adds OnPush, applies $ prefix convention, converts to external templates/styles, host bindings. Replaces RxJS state (BehaviorSubject/Subject) with signals. Replaces component inheritance with InjectionToken + inject() composition. Supports parent-child state sharing via StateRef pattern. Triggers on: refactor component, modernize component, update syntax, convert to signals, angular new syntax, refactor to new angular, replace rxjs with signals, remove inheritance, convert to DI or composition.'
argument-hint: 'Component path to refactor (e.g., libs/@bldc/angular-components/src/lib/core/hero)'
---

# Refactor to Modern Angular Syntax

Refactor existing Angular components (Including unit test files) to modern v18+ syntax and project conventions.

## When to Use

- Converting `@Input()`/`@Output()` decorators to signal inputs/outputs
- Converting `@ViewChild()`/`@ViewChildren()`/`@ContentChild()`/`@ContentChildren()` decorators to signal viewChild/viewChildren/contentChild/contentChildren
- Replacing `*ngIf`/`*ngFor`/`*ngSwitch` with `@if`/`@for`/`@switch`
- External templates and styles always `templateUrl` + `styleUrl` (not `styleUrls`), never inline. Styles use `.scss`.
- Converting constructor injection to `inject()`
- Adding `ChangeDetectionStrategy.OnPush`
- Applying signal `$` prefix naming convention
- Converting `@HostBinding`/`@HostListener` to `host: {}` metadata
- Replacing RxJS state management (`BehaviorSubject`/`Subject`) with signals
- Replacing component inheritance (`extends BaseComponent`) with DI or composition
- Implementing parent-child shared state via `InjectionToken` + `StateRef` pattern
- Refactoring unit tests (`.spec.ts` files) to modern Angular testing syntax

## Procedure

### 1. Analyze Component

Read the target component and its template to inventory what needs refactoring:

- [ ] `@Input()` decorators → signal inputs
- [ ] `@Output()` decorators → signal outputs
- [ ] `@ViewChild()` decorators → signal viewChild
- [ ] `@ViewChildren()` decorators → signal viewChildren
- [ ] `@ContentChild()` decorators → signal contentChild
- [ ] `@ContentChildren()` decorators → signal contentChildren
- [ ] Constructor injection → `inject()`
- [ ] `*ngIf` / `*ngFor` / `*ngSwitch` → `@if` / `@for` / `@switch`
- [ ] Inline templates/styles → external `templateUrl` + `styleUrl`
- [ ] Missing `ChangeDetectionStrategy.OnPush`
- [ ] `@HostBinding`/`@HostListener` → `host: {}` metadata
- [ ] Missing `$` prefix on signal variables
- [ ] Missing access modifiers (`readonly`, `private`, `protected`) on class fields
- [ ] `ngOnChanges` logic → `effect()` or `computed()`
- [ ] `ngAfterViewInit` / `ngAfterContentInit` one-time DOM work → `afterNextRender()`
- [ ] `ngAfterViewChecked` / `ngAfterContentChecked` repeated DOM work → `afterRender()`
- [ ] RxJS `BehaviorSubject`/`Subject` state → `signal()` / `computed()`
- [ ] `subscribe()` listeners → `effect()` or `computed()`
- [ ] Component inheritance (`extends`) → `InjectionToken` + `inject()` composition
- [ ] Global service map / singleton state → component-level `providers`
- [ ] Template function calls wrapping signals (e.g., `fn($signal())`) → `computed()` in class
- [ ] Unit tests (`.spec.ts`): `declarations` → `imports` for standalone components
- [ ] Unit tests: direct property writes (`component.prop = x`) → `fixture.componentRef.setInput()`
- [ ] Unit tests: test harness components missing `imports` (do not add `standalone: true`; it is the default)
- [ ] Unit tests: `*ngIf` / `*ngFor` in test harness inline templates → `@if` / `@for`
- [ ] Unit tests: self-closing tags for components with no projected content

### 2. Apply Conversions

Apply conversions in this order:

#### A. Constructor → inject()

```typescript
// Before
constructor(
  private userService: UserService,
  private route: ActivatedRoute,
  @Inject(MY_TOKEN) private config: AppConfig,
) {}

// After
private readonly userService = inject(UserService);
private readonly route = inject(ActivatedRoute);
private readonly config = inject<AppConfig>(MY_TOKEN);
```

#### B. Inputs → Signal Inputs

All `@Input()` decorators become signal inputs with `$` prefix and `alias`:

```typescript
// Before
@Input() name: string;
@Input() disabled = false;
@Input({ transform: booleanAttribute }) isActive: boolean;

// After
readonly $name = input.required<string>({ alias: 'name' });
readonly $disabled = input(false, { alias: 'disabled' });
readonly $isActive = input(false, { alias: 'isActive', transform: booleanAttribute });
```

**Rules:**

- Required inputs (no default value): `input.required<Type>({ alias: 'originalName' })`
- Optional inputs (with default): `input(defaultValue, { alias: 'originalName' })`
- Aliased inputs keep external binding name via `alias`, internal name uses `$` prefix
- `@Input` with `transform` → preserve in signal input options

#### C. Outputs → Signal Outputs

Outputs do NOT get `$` prefix:

```typescript
// Before
@Output() clicked = new EventEmitter<void>();
@Output() selected = new EventEmitter<User>();

// After
readonly clicked = output<void>();
readonly selected = output<User>();
```

#### D. Template Control Flow

```html
<!-- *ngIf -->
<!-- Before -->
<div *ngIf="condition">content</div>
<div *ngIf="condition; else elseBlock">content</div>
<ng-template #elseBlock>fallback</ng-template>

<!-- After -->
@if (condition) {
<div>content</div>
} @if (condition) {
<div>content</div>
} @else { fallback }

<!-- *ngFor -->
<!-- Before -->
<div *ngFor="let item of items; trackBy: trackById">{{ item.name }}</div>

<!-- After -->
@for (item of items; track item.id) {
<div>{{ item.name }}</div>
}

<!-- *ngSwitch -->
<!-- Before -->
<div [ngSwitch]="value">
  <span *ngSwitchCase="'a'">A</span>
  <span *ngSwitchDefault>Default</span>
</div>

<!-- After -->
@switch (value) { @case ('a') { <span>A</span> } @default { <span>Default</span> } }
```

**Control flow rules:**

- `@for` requires `track` — use a unique property (e.g., `track item.id`) or `track $index` if no unique property
- Nested `*ngIf` with `as` variable: refactor to `@let` + `@if`
- `*ngIf="obs$ | async as data"` → use `toSignal()` + `@let` / `@if`

#### E. Template Signal Calls

Update all template bindings to call signals as functions:

```html
<!-- Before (with @Input properties) -->
<h1>{{ name }}</h1>
<div [class.active]="isActive">
  <child [data]="items" />

  <!-- After (with signal inputs) -->
  <h1>{{ $name() }}</h1>
  <div [class.active]="$isActive()">
    <child [data]="$items()" />
  </div>
</div>
```

#### F. Template Function Calls Wrapping Signals → `computed()`

When a template calls a plain function and passes signal values as arguments (e.g., `fn($signal())`), the function re-executes on **every** change detection cycle because Angular cannot know whether the result has changed. Replace with a `computed()` signal in the class so Angular tracks the dependency and only recalculates when the underlying signal changes.

```typescript
// Before — function called in template, re-runs every CD cycle
// Template:
//   [class.no-icon]="isEmpty($iconEl())"
// Class:
protected readonly $iconEl = viewChild<ElementRef>('icon');
protected readonly isEmpty = (el: ElementRef | undefined): boolean => !el || isEmptyView(el);

// After — computed signal, recalculates only when $iconEl changes
// Template:
//   [class.no-icon]="$isIconEmpty()"
// Class:
protected readonly $iconEl = viewChild<ElementRef>('icon');
protected readonly $isIconEmpty = computed(() => {
  const el = this.$iconEl();
  return !el || isEmptyView(el);
});
```

**Rules:**

- Any expression in a template that calls a function with signal values as arguments is a candidate
- Extract the logic into a `computed()` field with `$` prefix
- Remove the helper function/arrow from the class if it is no longer used elsewhere
- The `computed()` replaces both the function definition and the template call site

#### G. Host Bindings → host metadata

```typescript
// Before
@HostBinding('class.active') get isActive() { return this._active; }
@HostListener('click') onClick() { ... }

// After (in @Component decorator)
host: {
  '[class.active]': '$isActive()',
  '(click)': 'onClick()',
}
```

#### H. Signal Naming & Access Modifiers

All signal-based variables use `$` prefix. Every field must have the appropriate access modifier based on its usage:

**Access Modifier Rules:**

| Declaration                                    | Used in template     | Class-internal only | Public API |
| ---------------------------------------------- | -------------------- | ------------------- | ---------- |
| `input()` / `input.required()`                 | `readonly`           | `readonly`          | `readonly` |
| `output()`                                     | `readonly`           | —                   | `readonly` |
| `model()`                                      | `readonly`           | `readonly`          | `readonly` |
| `viewChild()` / `contentChild()`               | `protected readonly` | `private readonly`  | `readonly` |
| `viewChildren()` / `contentChildren()`         | `protected readonly` | `private readonly`  | `readonly` |
| `signal()`                                     | `protected readonly` | `private readonly`  | `readonly` |
| `computed()` / `toSignal()` / `linkedSignal()` | `protected readonly` | `private readonly`  | `readonly` |
| `inject()`                                     | `protected readonly` | `private readonly`  | `readonly` |
| `effect()`                                     | —                    | `private readonly`  | —          |

**Key principles:**

- Always add `readonly` — signal variable references must never be reassigned
- `private readonly` for class-internal state not accessed from template or external consumers
- `protected readonly` for members used only in the component's own template
- `readonly` (public) for inputs, outputs, models, and any member that is part of the component's public API
- Writable signals exposed publicly: use `$` private signal + readonly `.asReadonly()` getter
- `inject()` defaults to `private readonly`; use `protected readonly` if needed in template

```typescript
// Inputs/outputs — public API, always readonly
readonly $name = input.required<string>({ alias: 'name' });
readonly $disabled = input(false, { alias: 'disabled' });
readonly selected = output<User>();
readonly $items = model<Array<Item>>([]);

// Template-bound signals — protected readonly
protected readonly $count = signal(0);
protected readonly $fullName = computed(() => `${this.$first()} ${this.$last()}`);
protected readonly $container = viewChild<ElementRef>('container');

// Class-internal signals — private readonly
private readonly $internalState = signal<State>({ /* ... */ });
private readonly loadEffect = effect(() => { /* ... */ });

// Writable signal with public read access — $ prefix pattern
private readonly _$users = signal<Array<User>>([]);
readonly $users = this._$users.asReadonly();

// DI — private readonly (default), protected readonly if template-bound
private readonly userService = inject(UserService);
protected readonly route = inject(ActivatedRoute); // used in template

// Outputs do NOT use $ prefix
readonly selected = output<User>();

// Observables use $ SUFFIX (legacy RxJS)
private readonly users$ = this.store.pipe(select(selectUsers));
```

#### I. Lifecycle Adjustments

Prefer Angular signal-era APIs over legacy lifecycle hooks. Choose the right replacement:

| Legacy hook                                       | Signal-era replacement          | When to use                                                                              |
| ------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------- |
| `ngOnChanges`                                     | `effect()` / `computed()`       | React to input changes                                                                   |
| `ngAfterViewInit` (one-time DOM read/write)       | `afterNextRender()`             | One-time DOM measurement, 3rd-party lib init                                             |
| `ngAfterContentInit` (one-time projected content) | `afterNextRender()`             | One-time projected content check                                                         |
| `ngAfterViewChecked` (repeated DOM sync)          | `afterRender()`                 | Sync DOM state every render cycle                                                        |
| `ngAfterContentChecked` (repeated content sync)   | `afterRender()`                 | Sync projected content every render cycle                                                |
| `ngOnInit` (DI + derived state)                   | field initializers / `effect()` | With `inject()`, most init logic moves to field declarations                             |
| `ngOnDestroy` (cleanup)                           | automatic                       | `effect()` and `afterRender()` auto-dispose; `DestroyRef.onDestroy()` for manual cleanup |

**`ngOnChanges` → `effect()` or `computed()`:**

```typescript
// Before
ngOnChanges(changes: SimpleChanges) {
  if (changes['userId']) {
    this.loadUser(this.userId);
  }
}

// After
readonly $userId = input.required<string>({ alias: 'userId' });

private readonly userEffect = effect(() => {
  this.loadUser(this.$userId());
});
```

**Derived state → `computed()`:**

```typescript
// Before
get fullName(): string { return `${this.first} ${this.last}`; }

// After
readonly $first = input.required<string>({ alias: 'first' });
readonly $last = input.required<string>({ alias: 'last' });
protected readonly $fullName = computed(() => `${this.$first()} ${this.$last()}`);
```

**`ngAfterViewInit` (one-time DOM work) → `afterNextRender()`:**

```typescript
// Before
@ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement>;
ngAfterViewInit(): void {
  const ctx = this.canvasEl.nativeElement.getContext('2d');
  this.chart = new Chart(ctx, this.chartConfig);
}

// After
private readonly canvasEl = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

constructor() {
  afterNextRender(() => {
    const ctx = this.canvasEl().nativeElement.getContext('2d');
    this.chart = new Chart(ctx, this.chartConfig);
  });
}
```

**`ngAfterViewChecked` / `ngAfterContentChecked` (repeated DOM sync) → `afterRender()`:**

```typescript
// Before
ngAfterContentChecked(): void {
  this.syncScrollPosition();
}

// After
constructor() {
  afterRender(() => {
    this.syncScrollPosition();
  });
}
```

**`afterRender` phases — use phases to separate DOM reads from DOM writes:**

```typescript
// Read DOM measurements, then write — avoids layout thrashing
constructor() {
  afterRender({
    read: () => {
      this.height = this.elementRef.nativeElement.offsetHeight;
    },
    write: () => {
      this.overlay.style.height = `${this.height}px`;
    },
  });
}
```

**`ngOnInit` with derived state → field initializer + `effect()`:**

```typescript
// Before
private dataService: DataService;
ngOnInit(): void {
  this.dataService = inject(DataService);
  this.dataService.load(this.id);
}

// After — inject() at field level, effect() for side effects
private readonly dataService = inject(DataService);
readonly $id = input.required<string>({ alias: 'id' });

private readonly loadEffect = effect(() => {
  this.dataService.load(this.$id());
});
```

**`ngOnDestroy` → `DestroyRef` (when manual cleanup is needed):**

```typescript
// Before
private resizeObserver: ResizeObserver;
ngOnDestroy(): void {
  this.resizeObserver.disconnect();
}

// After — DestroyRef replaces OnDestroy interface
private readonly destroyRef = inject(DestroyRef);

constructor() {
  afterNextRender(() => {
    this.resizeObserver = new ResizeObserver(/* ... */);
    this.destroyRef.onDestroy(() => this.resizeObserver.disconnect());
  });
}
```

**Rules:**

- Prefer `afterNextRender()` over `ngAfterViewInit` for any one-time DOM interaction (measuring, 3rd-party lib init, focus management)
- Prefer `afterRender()` over `ngAfterViewChecked` / `ngAfterContentChecked` for repeated DOM synchronization
- `afterNextRender()` and `afterRender()` only run in the browser — they are SSR-safe (no need for `isPlatformBrowser` checks)
- Both must be called in an injection context (constructor or field initializer)
- Use `afterRender` phases (`read` / `write`) to batch DOM reads and writes separately, preventing layout thrashing
- `effect()`, `afterRender()`, and `afterNextRender()` auto-dispose when the component is destroyed — no manual `ngOnDestroy` cleanup needed
- For non-signal manual cleanup (event listeners, observers), use `DestroyRef.onDestroy()` instead of implementing `OnDestroy`
- Keep `ngAfterViewInit` only when `requireContent()` validation is needed (existing library pattern) and no DOM read/write is involved

#### J. OnPush Change Detection

```typescript
// Add if missing
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
```

#### K. Self-Closing Tags

Components with no projected content must use self-closing syntax:

```html
<!-- Before -->
<blui-hero [label]="label"></blui-hero>
<app-header></app-header>

<!-- After -->
<blui-hero [label]="label" />
<app-header />
```

Only use open/close tags when the component projects inner content via `<ng-content>`.

#### L. RxJS State → Signals

Replace `BehaviorSubject`/`Subject`-based state with Angular signals. Choose the right replacement based on the RxJS usage pattern:

**BehaviorSubject (holds a value) → `signal()`:**

```typescript
// Before
private _drawerOpen$ = new BehaviorSubject<boolean>(false);
get drawerOpen(): boolean { return this._drawerOpen$.getValue(); }
setDrawerOpen(open: boolean): void { this._drawerOpen$.next(open); }

// After
private readonly $state = signal<State>({ drawerOpen: false, /* ... */ });
readonly $drawerOpen = computed(() => this.$state().drawerOpen);
setDrawerOpen(open: boolean): void {
  this.$state.update((s) => ({ ...s, drawerOpen: open }));
}
```

**Multiple related BehaviorSubjects → single `signal<State>()` + `computed()` selectors:**

When multiple fields belong to the same state context, wrap them in a single signal object. This ensures atomic updates and prevents inconsistent intermediate states.

```typescript
// Before — scattered subjects
private _open$ = new BehaviorSubject(false);
private _variant$ = new BehaviorSubject<Variant>('temporary');
private _condensed$ = new BehaviorSubject(false);

// After — single state signal with computed selectors
type State = { open: boolean; variant: Variant; condensed: boolean };

private readonly $state = signal<State>({
  open: false, variant: 'temporary', condensed: false,
});
readonly $open = computed(() => this.$state().open);
readonly $variant = computed(() => this.$state().variant);
readonly $condensed = computed(() => this.$state().condensed);
// Derived state
readonly $isOpen = computed(() => this.$open() || this.$variant() === 'permanent');
```

**Subject used as event bus / notification → version counter signal:**

When a `Subject` is used only to notify subscribers that something changed (no meaningful payload), replace it with a version counter.

```typescript
// Before
private _activeItemChange$ = new Subject<void>();
get activeItemChange$(): Observable<void> { return this._activeItemChange$; }
emitChange(): void { this._activeItemChange$.next(); }
// subscriber
this._activeItemChange$.subscribe(() => this.refresh());

// After
readonly $activeItemVersion = computed(() => this.$state().activeItemVersion);
emitChange(): void {
  this.$state.update((s) => ({ ...s, activeItemVersion: s.activeItemVersion + 1 }));
}
// subscriber — effect watches the version
private readonly refreshEffect = effect(() => {
  this.state.$activeItemVersion(); // track
  untracked(() => this.refresh());
});
```

**Subject used as callback dispatcher → plain callback function:**

```typescript
// Before
private _select$ = new Subject<boolean>();
select(hasChildren: boolean): void { this._select$.next(hasChildren); }
// subscriber
this._select$.subscribe((hasChildren) => { /* handle */ });

// After — just a method
select(hasChildren: boolean): void {
  if (this.$tempOpen() && !hasChildren) {
    this.setTempOpen(false);
  }
}
```

**Observable with timing operators (debounce/delay/switchMap) → keep RxJS, bridge with `toSignal()`:**

When the observable relies on time-based RxJS operators that have no signal equivalent, keep the RxJS pipe and convert the result to a signal.

```typescript
// Keep RxJS for timing, expose as signal
readonly $collapsed = toSignal(
  toObservable(this.$variant).pipe(
    pairwise(),
    filter(([prev, curr]) => /* edge-case logic */),
    switchMap(() => timer(500).pipe(map(() => false), startWith(true))),
  ),
  { initialValue: false }
);
```

**`subscribe()` in lifecycle hooks → `effect()`:**

```typescript
// Before
ngAfterViewInit(): void {
  this.state.drawerOpen$.subscribe((open) => this.handleOpen(open));
}
ngOnDestroy(): void { this.subscription.unsubscribe(); }

// After — no manual cleanup needed, effect auto-disposes
constructor() {
  effect(() => {
    this.drawerState.$isOpen(); // track
    untracked(() => this.handleOpen());
  });
}
```

**Pitfall — `allowSignalWrites`:**

When an `effect()` calls a setter that writes to a signal, Angular throws `NG0600`. Add `{ allowSignalWrites: true }`:

```typescript
effect(
  () => {
    // Reading input signals
    const open = this.$open();
    // Writing to state signals — requires allowSignalWrites
    this.state.setDrawerOpen(open);
  },
  { allowSignalWrites: true }
);
```

#### M. Component Inheritance → DI / Composition

Replace `extends BaseComponent` patterns with DI or composition. Use DI (`InjectionToken` + `inject()`) **only when state needs to be shared** across multiple components in a subtree. For non-shared behavior, use plain utility functions or composition — no DI needed.

**Choose the right strategy based on what the base class provides:**

| Base class provides                       | Replacement strategy                                        |
| ----------------------------------------- | ----------------------------------------------------------- |
| Shared state across components            | `InjectionToken` + shared state class + `inject()`          |
| Parent-child shared state (bidirectional) | `InjectionToken` + `StateRef` pattern (signal-based holder) |
| Shared behavior (stateless methods)       | Plain utility functions (no DI)                             |
| Shared template logic (lifecycle hooks)   | `effect()` / `afterRender()` in each component (no DI)      |
| Mixed shared state + behavior             | State class via `InjectionToken` + utility functions        |

**Strategy 1: Shared state → `InjectionToken` + state class**

When a base class holds shared state accessed by multiple components in a subtree (e.g., drawer open/close state, variant), extract it into a plain class with signals and provide it via `InjectionToken`.

```typescript
// Before — base class with shared state
export class DrawerBaseComponent {
  drawerOpen = false;
  variant: 'temporary' | 'persistent' = 'temporary';
  get isOpen(): boolean { return this.drawerOpen || this.variant === 'permanent'; }
}

@Component({ ... })
export class DrawerComponent extends DrawerBaseComponent { ... }

@Component({ ... })
export class DrawerHeaderComponent extends DrawerBaseComponent { ... }

// After — state class + InjectionToken
// drawer-state.ts (plain class, NOT @Injectable)
export class DrawerState {
  private readonly $state = signal<State>({
    drawerOpen: false,
    variant: 'temporary',
  });
  readonly $drawerOpen = computed(() => this.$state().drawerOpen);
  readonly $variant = computed(() => this.$state().variant);
  readonly $isOpen = computed(() => this.$drawerOpen() || this.$variant() === 'permanent');

  setDrawerOpen(open: boolean): void {
    this.$state.update((s) => ({ ...s, drawerOpen: open }));
  }
}

// drawer-state-ref.ts
export const DRAWER_STATE = new InjectionToken<DrawerState>('DRAWER_STATE');

// drawer.component.ts — provides state at component level
@Component({
  providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
})
export class DrawerComponent {
  protected readonly drawerState = inject(DRAWER_STATE);
}

// drawer-header.component.ts — consumes shared state
@Component({ ... })
export class DrawerHeaderComponent {
  protected readonly drawerState = inject(DRAWER_STATE);
}
```

**Strategy 2: Parent-child shared state → `StateRef` pattern**

When a parent component needs to reactively track state from a child component (e.g., `DrawerLayout` needs to read whichever `DrawerState` its child `Drawer` registers), use a signal-based holder (`StateRef`) provided by the parent.

```typescript
// state-ref.ts
@Injectable()
export class DrawerStateRef {
  private readonly _$state = signal(new DrawerState());
  readonly $state = this._$state.asReadonly();

  register(state: DrawerState): void {
    this._$state.set(state);
  }
}

// Parent (DrawerLayout) — provides the StateRef
@Component({
  providers: [DrawerStateRef],
})
export class DrawerLayoutComponent {
  private readonly stateRef = inject(DrawerStateRef);
  readonly $drawerState = computed(() => this.stateRef.$state());
}

// Child (Drawer) — registers its state with the parent's StateRef
@Component({
  providers: [{ provide: DRAWER_STATE, useFactory: () => new DrawerState() }],
})
export class DrawerComponent {
  protected readonly drawerState = inject(DRAWER_STATE);
  private readonly stateRef = inject(DrawerStateRef, { optional: true });

  constructor() {
    this.stateRef?.register(this.drawerState);
  }
}
```

**Strategy 3: Non-shared behavior → plain utility functions (no DI)**

When a base class only provides reusable methods with no shared state, extract them into plain utility functions. These do not need DI — just import and call.

```typescript
// Before — base class with shared behavior
export class ResizableComponent {
  protected measureElement(el: ElementRef): { width: number; height: number } {
    const rect = el.nativeElement.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }
}

@Component({ ... })
export class CardComponent extends ResizableComponent { ... }

// After — utility function (stateless, no DI)
// utils/measure.ts
export function measureElement(el: ElementRef): { width: number; height: number } {
  const rect = el.nativeElement.getBoundingClientRect();
  return { width: rect.width, height: rect.height };
}

// card.component.ts — import and call directly
import { measureElement } from '../utils/measure';
```

**Rules:**

- Never use `extends` on `@Component` classes — Angular components should be flat
- **Use DI only when state is shared** across multiple components — non-shared behavior should be plain utility functions
- Prefer `InjectionToken` with `useFactory` for state classes that are NOT `@Injectable` (one instance per provider scope)
- Use `@Injectable()` + `providers: [StateRef]` when the class needs its own injection context
- State classes should use `signal()` + `computed()` internally (not `BehaviorSubject`)
- When multiple components in a subtree need the same state, provide the token at the **highest common ancestor**
- Use `{ optional: true }` on `inject()` when a parent provider may not exist (e.g., child used outside its usual parent)
- Before deleting a base class, verify no external consumers `extend` it

### 3. Verify

```bash
nx test <project-name>
nx lint <project-name>
```

### 4. Refactor Unit Tests (`.spec.ts` files)

Unit test files should be refactored alongside component code to use modern testing patterns. Review and update test files with the following checklist:

#### A. Test Component Setup Patterns

**Before (NgModule-based):**

```typescript
TestBed.configureTestingModule({
  declarations: [MyComponent],
  imports: [NgModule1, NgModule2],
  providers: [SomeService],
}).compileComponents();
```

**After (Standalone components):**

```typescript
TestBed.configureTestingModule({
  imports: [MyComponent, NgModule1, NgModule2],
  providers: [SomeService],
}).compileComponents();
```

**Rule:** When testing standalone components, move the component and all its dependencies into the `imports` array. Only use `declarations` for non-standalone test harness components.

#### B. Component Input/Output Access

**Before (Property access):**

```typescript
it('should update on input change', () => {
  component.name = 'John'; // ❌ Direct property access
  component.selected.emit(value); // ❌ Direct EventEmitter call
  fixture.detectChanges();
});
```

**After (Signal input/output access):**

```typescript
it('should update on input change', () => {
  fixture.componentRef.setInput('name', 'John'); // ✅ Use setInput()
  fixture.detectChanges();
  // Outputs: use a spy or capture emission
  spyOn(component.selected, 'emit').and.callThrough();
});
```

**Rules:**

- Use `fixture.componentRef.setInput('name', value)` to set signal inputs
- Use `fixture.componentRef.setOutput('selected', callback)` for output listeners (Angular 18.1+)
- For older testing patterns, set outputs via `component.$outputName` and use `.subscribe()`

#### C. ViewChild / ContentChild Access

**Before (Direct property):**

```typescript
it('should access child element', () => {
  fixture.detectChanges();
  const child = component.childRef.nativeElement; // ❌ Direct access
});
```

**After (Signal viewChild):**

```typescript
it('should access child element', () => {
  fixture.detectChanges();
  const child = component.$childRef()?.nativeElement; // ✅ Call signal
  expect(child).toBeTruthy();
});
```

**Rule:** Signal viewChild/viewChildren return `undefined` until after `detectChanges()`. Call them as functions: `component.$ref()`.

#### D. Service Injection

**Before (TestBed.inject in tests):**

```typescript
let service: MyService;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [MyService],
  });
  service = TestBed.inject(MyService); // ❌ Old pattern
});
```

**After (Inject via component or direct inject):**

```typescript
let service: MyService;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [MyService],
  });
  service = TestBed.inject(MyService); // ✅ Still valid for test setup
  // OR access via component's injected service:
  // service = component['serviceField']; // if it's protected/private
});
```

**Rule:** `TestBed.inject()` is still the standard way to get services in tests. Only refactor if the component exposes the service as `protected` or `public` field.

#### E. Effect and Signal Reactivity in Tests

**Before (Subscription-based):**

```typescript
it('should react to signal change', (done) => {
  component.onItemSelect(item);
  setTimeout(() => {
    expect(component.selectedItem).toBe(item);
    done();
  }, 100);
});
```

**After (Effect-aware or direct change detection):**

```typescript
it('should react to signal change', () => {
  component.onItemSelect(item);
  fixture.detectChanges();
  // Effects run after detectChanges
  fixture.whenStable().then(() => {
    expect(component.$selectedItem()).toBe(item);
  });
});
```

**Rule:** Signals and effects are synchronous by default. Use `fixture.detectChanges()` followed by `fixture.whenStable()` if the effect includes async operations (timers, observables).

#### F. Template Testing

**Before (_ngIf / *ngFor queries):*_

```typescript
it('should render list items', () => {
  component.items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];
  fixture.detectChanges();
  const items = fixture.debugElement.queryAll(By.css('li'));
  expect(items.length).toBe(2);
});
```

**After (@if / @for queries):**

```typescript
it('should render list items', () => {
  fixture.componentRef.setInput('items', [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ]);
  fixture.detectChanges();
  const items = fixture.debugElement.queryAll(By.css('li'));
  expect(items.length).toBe(2);
});
```

**Rule:** Template syntax change doesn't affect testing—query selectors remain the same. Focus on updating how inputs are set via `setInput()`.

#### G. Test Harnesses (Standalone Test Components)

**Before (NgModule declaration):**

```typescript
@Component({
  template: `<app-hero [label]="label" (selected)="onSelect($event)"></app-hero>`,
})
class TestHarness {}

TestBed.configureTestingModule({
  declarations: [TestHarness, HeroComponent], // ❌ Both in declarations
});
```

**After (Standalone with imports):**

```typescript
@Component({
  imports: [HeroComponent],
  template: `<app-hero [label]="label" (selected)="onSelect($event)"></app-hero>`,
})
class TestHarness {}

TestBed.configureTestingModule({
  imports: [TestHarness], // ✅ Only the harness
});
```

**Rule:** Test harness components should be standalone when testing standalone components. Use `imports` instead of `declarations`.

#### H. Checklist for Unit Test Refactoring

- [ ] Update `TestBed.configureTestingModule()` to use `imports` for standalone components
- [ ] Replace direct property access with `fixture.componentRef.setInput()`
- [ ] Update ViewChild/ContentChild access to call signal getters: `component.$ref()`
- [ ] Replace `component.property = value` with `fixture.componentRef.setInput('property', value)`
- [ ] Ensure test harness components are standalone and use `imports`
- [ ] Add `fixture.detectChanges()` before accessing rendered DOM
- [ ] Use `fixture.whenStable()` if testing async effects or observables
- [ ] Update DOM queries to account for new control flow syntax (@if / @for)
- [ ] Verify all tests pass with `nx test <project>`

### 5. Report Changes

List all transformations applied to both component and test files:

- Number of inputs converted to signal inputs
- Number of outputs converted to signal outputs
- DI injections converted from constructor to inject()
- Template directives converted (@if/@for/@switch)
- Host bindings converted to host object
- RxJS subjects/subscriptions replaced with signals/effects
- Inheritance hierarchies replaced with DI composition
- Unit tests refactored to standalone/modern patterns
- Other changes made

## Constraints

- Preserve component behavior — functional equivalence is mandatory
- Do NOT change component API (external binding names must stay the same via `alias`)
- Do NOT refactor surrounding code unless explicitly asked
- Refactor unit test files (`.spec.ts`) alongside component code — apply modern patterns from Section 4
- Do NOT remove existing NgModule wrappers from library components without a migration plan
- When replacing inheritance, verify no external consumers depend on the base class before deleting it
- Keep RxJS for genuinely time-based operations (debounce, throttle, switchMap with timer) — bridge to signals via `toSignal()`
- When using `effect()` that writes to signals, always add `{ allowSignalWrites: true }` to avoid NG0600
- Prefer a single `signal<State>({...})` with `computed()` selectors over many independent signals when fields are logically related
