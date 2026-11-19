# @bldc/angular-themes

Angular Material themes for Brightlayer UI applications. The themes follow the same design tokens as
[`@brightlayer-ui/react-themes`](https://github.com/etn-ccis/blui-react/tree/dev/packages/themes) so Angular and React
applications look alike.

## Installation

```bash
pnpm add @bldc/angular-themes @angular/material @brightlayer-ui/colors @fontsource/open-sans
```

## Usage

Include one theme in your global stylesheet and add `class="blui-blue"` (light) or `class="blui-blue-dark"` (dark) to
`<body>`.

```scss
// Material 3 theme (default)
@use '@bldc/angular-themes/open-sans';
@use '@bldc/angular-themes/theme';
```

```scss
// Material 2 compatibility theme (the pre-Angular 22 look)
@use '@bldc/angular-themes/open-sans';
@use '@bldc/angular-themes/theme-m2';
```

Or include the mixins yourself:

```scss
@use '@bldc/angular-themes' as blui;

@include blui.blui-theme(); // Material 3
// @include blui.blui-theme-m2(); // Material 2 compatibility
```

## Design tokens

Both themes emit the same CSS custom properties on `.blui-blue` / `.blui-blue-dark`, for example:

| Token                                                     | Description                              |
| --------------------------------------------------------- | ---------------------------------------- |
| `--blui-primary`, `--blui-on-primary`                     | Primary color and its contrast color     |
| `--blui-secondary`, `--blui-error`, `--blui-success`, ... | Status colors                            |
| `--blui-background`, `--blui-paper`                       | App background and surface (card) colors |
| `--blui-text-primary`, `--blui-text-secondary`            | Text colors                              |
| `--blui-divider`                                          | Divider color                            |
| `--blui-action-hover`, `--blui-action-disabled`, ...      | Interaction state colors                 |
| `--blui-shadow-level1` … `--blui-shadow-level3`           | Brightlayer UI shadows                   |
| `--blui-primary-surface`, `--blui-on-primary-surface`     | Primary App Bar / Score Card header      |
| `--blui-nav-item-active-*`, `--blui-avatar-*`             | Drawer active item and avatar colors     |

The Sass values are available via `blui.tokens-get(light | dark)`. The legacy `--blui-primary-color`,
`--blui-accent-color`, `--blui-warn-color` and `--blui-background-color` variables are still emitted but are
**deprecated** and will be removed in the next major version; use the tokens above instead.

### Typography

Both themes use the type scale of the React themes. The `.blui-*` and `.mat-*` typography classes follow the
Material / MUI names: `.mat-subtitle-1` / `.blui-subtitle-1` = MUI `subtitle1` (1rem, 600), `.mat-body-1` /
`.blui-body-1` = MUI `body1` (1rem, 400), and so on. Before 11.0 the `.mat-subtitle-*` / `.mat-body-*` classes were
shifted by one level.

## Material 3 notes

- Palettes are generated from the Brightlayer UI brand colors (`_theme-colors.scss`) and the key system colors
  (`primary`, `surface`, `background`, `on-surface`, `outline-variant`, `error`, …) are pinned to the Brightlayer UI
  tokens.
- The `color="primary" | "accent" | "warn"` input of Material components (including toolbars) keeps working.
