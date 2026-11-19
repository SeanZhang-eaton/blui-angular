# Project Guidelines

Nx 24 monorepo — **Angular 22.3**, **Angular Material 22.3**, **TypeScript 6.0**, **Vite 8 / Vitest 5** (via Analog, `happy-dom`), **pnpm 12**, Node **>= 22.22**.

This is the **Brightlayer UI Angular Component Library** (`@bldc/angular-components`) — a set of reusable UI components for Angular applications.

- **2 apps** under `apps/`: `demo` (component docs), `showcase-demo` (showcase playground)
- **2 libraries** under `libs/@bldc/`: `angular-components`, `angular-themes`
- **UI framework**: Angular Material 22.3 (Material 3 theme by default, Material 2 compatibility theme available)

## Build and Test

| Task             | Command                  |
| ---------------- | ------------------------ |
| Install          | `pnpm i`                 |
| Start demo       | `pnpm start`             |
| Start showcase   | `pnpm start:showcase`    |
| Build libs       | `pnpm build`             |
| Check artifacts  | `pnpm test:artifacts`    |
| Run all tests    | `pnpm test`              |
| Test one project | `nx test <PROJECT_NAME>` |
| Lint             | `pnpm lint`              |

Always use **`nx`** (not `ng`) for project-level commands. Use **`pnpm`** (not `npm`) for package management.

## Code Style

### Component Rules

- **Standalone** — components are standalone by default (Angular 19+); both apps are fully standalone (no NgModules). Existing explicit `standalone: true` is harmless. Library components also provide NgModule wrappers for backward compatibility.
- **Zoneless** — both apps use `provideZonelessChangeDetection()`. State that changes asynchronously (HTTP, timers, router events, breakpoints) must live in signals (`toSignal`, `signal`, `linkedSignal`), otherwise the view is not refreshed.
- **Import only what you need** — never import barrel modules. Import only the specific dependencies each component uses (e.g., `CommonModule`, `MatIconModule`). Keeps the dependency graph explicit.
- **External templates and styles** — always `templateUrl` + `styleUrl` (not `styleUrls`), never inline. Styles use `.scss`.
- **OnPush** — mandatory for all new components: `changeDetection: ChangeDetectionStrategy.OnPush`
- **Host bindings** — use `host: {}` metadata, never `@HostBinding`/`@HostListener`
- **DI** — use `inject()` function, not constructor injection
- **Self-closing tags** — components with no projected content must use self-closing syntax: `<blui-hero ... />`. Only use open/close tags when the component projects inner content via `<ng-content>`.

### Naming

| Type      | Class                | File                     | Selector          |
| --------- | -------------------- | ------------------------ | ----------------- |
| Component | `AppBarComponent`    | `app-bar.component.ts`   | `blui-app-bar`    |
| Module    | `AppBarModule`       | `app-bar.module.ts`      | —                 |
| Service   | `UserService`        | `user.service.ts`        | —                 |
| Directive | `HighlightDirective` | `highlight.directive.ts` | `[bluiHighlight]` |
| Pipe      | `TruncatePipe`       | `truncate.pipe.ts`       | `truncate`        |

### Input Alias Pattern

```typescript
$name = input.required<string>({ alias: 'name' });
$disabled = input(false, { alias: 'disabled', transform: booleanAttribute });
```

### Import Rules

- **Workspace libs**: import from `@bldc/angular-components` barrel only, never deep-import
- **Within apps**: relative imports for local feature files

### Path Alias Reference (`tsconfig.base.json`)

| Alias                      | Resolves to                                       |
| -------------------------- | ------------------------------------------------- |
| `@bldc/angular-components` | `libs/@bldc/angular-components/src/public-api.ts` |

## Architecture

```
apps/
  demo/              # Component documentation app (standalone, lazy routes aligned with the React docs)
  showcase-demo/     # Showcase playground (standalone)
libs/
  @bldc/
    angular-components/  # Brightlayer UI Angular components library
    angular-themes/      # Brightlayer UI Angular themes library
scripts/               # Build/deploy/release scripts
```

### Library Structure

Components live under `libs/@bldc/angular-components/src/lib/core/`. Each component folder typically contains:

- `<name>.component.ts` — standalone component with `standalone: true`
- `<name>.component.html` — template
- `<name>.component.scss` — styles
- `<name>.component.spec.ts` — tests
- `<name>.module.ts` — NgModule wrapper for backward compatibility

Public API is exported from `libs/@bldc/angular-components/src/public-api.ts`.

## Testing

- **Vitest** with `@analogjs/vitest-angular` and `happy-dom` (zoneless TestBed, see `src/test-setup.ts`; `@angular/compiler` must be imported first). Use `await fixture.whenStable()` instead of `fakeAsync`/`waitForAsync`; required signal inputs must be set before the first change detection.
- Pattern: `*.spec.ts` co-located with source
- Run: `nx test <project>` or `pnpm test`. Targets (`build`/`serve`/`test`/`lint`) are inferred by the Nx plugins in `nx.json` — Nx 24 no longer ships `@nx/vite`/`@nx/vitest`/`@nx/eslint` executors.

## Conventions

### Commit Messages

Angular format: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `deps`

Breaking changes: `BREAKING CHANGE:` in footer.

### Selector Prefixes

| Scope                          | Prefix  |
| ------------------------------ | ------- |
| Library components (`@bldc/*`) | `blui-` |
| Demo / showcase apps           | `app-`  |

## Custom Agents & Skills

### Agent: `code-simplifier`

All code writing, modification, and refactoring tasks MUST be delegated to the `code-simplifier` agent (`.agents/agents/code-simplifier.agent.md`). It enforces all project conventions automatically.

### Skills (slash commands)

| Skill                     | Command                    | Purpose                                           |
| ------------------------- | -------------------------- | ------------------------------------------------- |
| `refactor-angular-syntax` | `/refactor-angular-syntax` | Refactor components to modern Angular v18+ syntax |

All skills delegate code changes to the `code-simplifier` agent.

### Self-Improvement

During task execution, if an agent or skill is found to be **incomplete, inaccurate, or missing** for the current workflow, you MUST:

1. **Summarize** the gap — what convention, rule, or pattern is missing or wrong.
2. **Update** the relevant `.agent.md`, `SKILL.md`, or `AGENTS.md` file immediately to fix the gap.
3. **Create** a new skill file if a recurring workflow pattern is identified but no skill exists for it.

The goal is to keep agents and skills as a **living, self-correcting knowledge base** that improves with every use. Efficiency comes from eliminating repeated mistakes and codifying discovered patterns.

## Pitfalls

- **Angular Material 22.x** — must stay compatible with `@angular/core` 22.x. Do not upgrade independently.
- **Library build** — `@bldc/angular-components` is built with ng-packagr (`@nx/angular:package`, `ng-package.json`); `vite.config.mts` in the lib is test-only. `@bldc/angular-themes` is SCSS-only and copied by `scripts/build-themes.mjs`.
- **Themes** — `theme.scss`/`blui-theme()` = Material 3 (default), `theme-m2.scss`/`blui-theme-m2()` = Material 2 compatibility. Brightlayer UI component colors must use the `--blui-*` tokens from `_tokens.scss` so they work with both.
- **Angular migration schematics** (`nx g @angular/core:<migration>`) find tsconfigs through target `options.tsConfig`. Targets are inferred here, so temporarily add `build`/`test` targets with `options.tsConfig` to the app `project.json` while running them, then revert.
- **No `@angular/animations`** — use `animate.enter` / `animate.leave` with CSS keyframes.
- **pnpm settings** (`allowBuilds`, `minimumReleaseAgeExclude`, ...) live in `pnpm-workspace.yaml`; pnpm 11+ ignores the `pnpm` field of `package.json`. pnpm delays versions published in the last 24 h (`minimumReleaseAge`); add trusted toolchain packages to `minimumReleaseAgeExclude` when needed.
- **Nx affected** — `defaultBase` is `dev` (development branch); `main` is the stable branch.
- **Demo apps share** `vite.app.config.mts` (`createAppConfig`). Themes are loaded at runtime (`themes/theme-m3.scss?inline` / `theme-m2.scss?inline`) by each app's `ThemeService`; Brightlayer UI SVG icons are copied to `assets/blui-icons` and registered with `MatIconRegistry.addSvgIconResolver`.
- **Typography classes** — `.mat-*` and `.blui-*` typography classes follow the Material / MUI names (`.mat-subtitle-1` = MUI `subtitle1`). Library templates use the `.blui-*` classes.
- **NgModule wrappers** — library components are `standalone: true` but also export NgModule wrappers for backward compatibility. Don't remove NgModules without a migration plan.
- New code must use `inject()` — some legacy code still uses constructor injection.
