# @bldc/angular-components

Angular components for Brightlayer UI applications, built on [Angular Material](https://material.angular.dev).

## Installation

```bash
pnpm add @bldc/angular-components @bldc/angular-themes @angular/material @angular/cdk color
```

## Usage

All components are standalone. Import the ones you need directly:

```ts
import { Component } from '@angular/core';
import { EmptyStateComponent, InfoListItemComponent } from '@bldc/angular-components';

@Component({
  selector: 'app-example',
  imports: [EmptyStateComponent, InfoListItemComponent],
  templateUrl: './example.component.html',
})
export class ExampleComponent {}
```

NgModule wrappers (for example `EmptyStateModule`) are still exported for applications that have not migrated to standalone components.

Apply a Brightlayer UI theme from `@bldc/angular-themes` in your global styles:

```scss
@use '@bldc/angular-themes/theme'; // Material 3 (default)
// @use '@bldc/angular-themes/theme-m2'; // Material 2 compatibility theme
```

and add `class="blui-blue"` (light) or `class="blui-blue-dark"` (dark) to your `<body>`.

## Compatibility

| @bldc/angular-components | @angular/core + @angular/material |
| ------------------------ | --------------------------------- |
| `^10.0.0`                | `^18.0.0`                         |
| `^11.0.0`                | `^22.0.0`                         |

## Documentation

See the [component documentation](https://brightlayer-ui-components.github.io/angular) and the [repository](https://github.com/etn-ccis/blui-angular).
