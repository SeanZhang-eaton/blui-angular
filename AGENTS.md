# Project Guidelines

Nx monorepo — **Angular 18.2**, **TypeScript 5.5**, **pnpm 10**.

This is the **Brightlayer UI Angular Component Library** (`@bldc/angular-components`) — a set of reusable UI components for Angular applications.

- **2 apps** under `apps/`: `demo` (component docs), `showcase-demo` (showcase playground)
- **2 libraries** under `libs/@bldc/`: `angular-components`, `angular-themes`
- **UI framework**: Angular Material 18.2

## Build and Test

| Task             | Command                  |
| ---------------- | ------------------------ |
| Install          | `pnpm i`                 |
| Start demo       | `pnpm start`             |
| Start showcase   | `pnpm start:showcase`    |
| Build libs       | `pnpm build`             |
| Run all tests    | `pnpm test`              |
| Test one project | `nx test <PROJECT_NAME>` |
| Lint             | `pnpm lint`              |

Always use **`nx`** (not `ng`) for project-level commands. Use **`pnpm`** (not `npm`) for package management.

## Code Style

### Component Rules

- **Standalone with explicit `standalone: true`** — Angular 18 requires explicit annotation. Library components also provide NgModule wrappers for backward compatibility.
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

| Alias                        | Resolves to                                       |
| ---------------------------- | ------------------------------------------------- |
| `@bldc/angular-components`   | `libs/@bldc/angular-components/src/public-api.ts` |
| `@bldc/angular-components/*` | `libs/@bldc/angular-components/src/lib/*`         |
| `@bldc/angular-themes/*`     | `libs/@bldc/angular-themes/src/lib/*`             |
| `@blui-apps/demo/*`          | `apps/demo/src/*`                                 |

## Architecture

```
apps/
  demo/              # Component documentation app (NgModule-based)
  showcase-demo/     # Showcase playground (standalone components)
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

- **Vitest** with `@analogjs/vitest-angular`
- Pattern: `*.spec.ts` co-located with source
- Run: `nx test <project>` or `pnpm test`

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

- **Angular Material 18.2** — must stay compatible with `@angular/core` 18.x. Do not upgrade independently.
- **NgModule wrappers** — library components are `standalone: true` but also export NgModule wrappers for backward compatibility. Don't remove NgModules without a migration plan.
- **Explicit `standalone: true`** — Angular 18 requires this annotation; do not remove it from existing components.
- New code must use `inject()` — some legacy code still uses constructor injection.
