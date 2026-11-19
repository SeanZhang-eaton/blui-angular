# Brightlayer UI Angular Components

[![Build](https://github.com/etn-ccis/blui-angular/actions/workflows/blui-ci.yml/badge.svg?branch=dev)](https://github.com/etn-ccis/blui-angular/actions/workflows/blui-ci.yml)
![npm](https://img.shields.io/npm/v/@bldc/angular-components?label=%40bldc%2Fangular-components)

This is a library of custom components for use in Brightlayer UI applications. For the most part, these components are meant to simplify building your application by providing re-usable components that implement common use cases in Brightlayer UI and eliminating the need for multiple teams to build their own components for these.

Refer to the [Component Library](https://brightlayer-ui-components.github.io/angular) API documentation site for a list of available components and the document for each individual component.

This repository is an [Nx](https://nx.dev) monorepo that contains:

| Path                            | Description                                                         |
| ------------------------------- | ------------------------------------------------------------------- |
| `libs/@bldc/angular-components` | `@bldc/angular-components` – the component library (ng-packagr)     |
| `libs/@bldc/angular-themes`     | `@bldc/angular-themes` – Material 3 (default) and Material 2 themes |
| `apps/demo`                     | Component documentation site                                        |
| `apps/showcase-demo`            | Showcase of the components in a realistic interface                 |

## Installation

```
pnpm add @bldc/angular-components @bldc/angular-themes @angular/material @angular/cdk color
```

> **NOTE**: This component library requires that your application have `@bldc/angular-themes` and `@angular/material` installed. See the [themes README](./libs/@bldc/angular-themes/README.md) for how to apply the Material 3 (default) or Material 2 compatibility theme.

## Development

Requirements: Node.js `>= 22.22` (see `.node-version`) and pnpm 12 (settings in `pnpm-workspace.yaml`).

```
git clone https://github.com/etn-ccis/blui-angular
cd blui-angular
pnpm install
```

| Task                  | Command               |
| --------------------- | --------------------- |
| Start the docs site   | `pnpm start`          |
| Start the showcase    | `pnpm start:showcase` |
| Build the libraries   | `pnpm build`          |
| Run all unit tests    | `pnpm test`           |
| Lint                  | `pnpm lint`           |
| Check build artifacts | `pnpm test:artifacts` |

The library build output is written to `dist/libs/@bldc/*`.

## Compatibility

The following table outlines which versions of Angular and Brightlayer UI resources will work together.

| @bldc/angular-components | @bldc/angular-themes | @angular + @angular/material |
| ------------------------ | -------------------- | ---------------------------- |
| `^9.0.0`                 | `^9.0.0`             | `^15.x`                      |
| `^10.0.0`                | `^10.0.0`            | `^18.x`                      |
| `^11.0.0`                | `^11.0.0`            | `^22.x`                      |

## Peer Dependencies

| Package Name         | Version |
| -------------------- | ------- |
| @angular/core        | ^22.0.0 |
| @angular/common      | ^22.0.0 |
| @angular/material    | ^22.0.0 |
| @angular/cdk         | ^22.0.0 |
| color                | ^5.0.0  |
| rxjs                 | ^7.4.0  |
| @bldc/angular-themes | ^11.0.0 |

## Using the Components

See the [documentation](https://brightlayer-ui-components.github.io/angular) for information on using these components.

## Browser Support

Brightlayer UI libraries will work with any modern browser. For details refer to our [Browser Support](https://brightlayer-ui.github.io/development/frameworks-web/angular#browser-support) documentation.
