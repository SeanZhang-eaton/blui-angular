# Publishing Instructions

Both packages (`@bldc/angular-components` and `@bldc/angular-themes`) are released together with
[`scripts/release.ts`](./scripts/release.ts). See [`scripts/RELEASE_GUIDE.md`](./scripts/RELEASE_GUIDE.md) for all options.

## Automatic Publishing

1. Run `pnpm release` (or `pnpm tsx scripts/release.ts <patch|minor|major>`) to bump the versions, update the lockfile and
   create the `v*` tag.
2. Pushing the `v*` tag triggers [`.github/workflows/release.yml`](./.github/workflows/release.yml), which runs the tests,
   builds both packages (`pnpm build`) and publishes them to NPM (`pnpm release --publishOnly`).

The workflow requires an `NPM_TOKEN` repository secret or `Release` environment secret, with permission to publish
both packages. It passes this secret to npm as `NODE_AUTH_TOKEN`.

Every push to an `etn-ccis/blui-angular` branch also publishes preview packages through `pkg-pr-new`
(see [`.github/workflows/blui-ci.yml`](./.github/workflows/blui-ci.yml)).

## Manually Publishing

```sh
pnpm build
pnpm test:artifacts
pnpm release --publishOnly
```

An NPM token must be available (`NODE_AUTH_TOKEN`) or you must be logged in with `npm login`.

> Publishing manually should only be done for pre-release packages or when the automatic workflow is not working.
