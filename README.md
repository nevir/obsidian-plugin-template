# Obsidian Plugin Template

A strict TypeScript template for Obsidian plugins that run on desktop, iOS, and
Android. TypeScript uses the ES2021 baseline from Obsidian's official sample;
Parcel targets Chrome 85 and iOS 14.5 or newer. The plugin requires Obsidian
1.12.7 or newer.

## Set up the toolchain

Install [mise](https://mise.jdx.dev/), then run:

```sh
mise install
mise run install
```

The project uses Node 24 only as a build tool, Yarn 4 to manage packages, and
actionlint to validate GitHub Actions. `mise.lock` pins exact tool versions and
records available checksums for macOS, Linux, and Windows.

## Develop and verify the plugin

Use the mise tasks as the main interface:

- `mise run dev`: rebuild `main.js` when source files change
- `mise run build`: create an optimized production bundle
- `mise run check`: lint, type-check, and build the plugin
- `mise run fix`: apply safe Biome formatting and lint fixes

The matching `yarn dev`, `yarn build`, `yarn test`, and `yarn fix` scripts are
thin aliases for editor and package-manager integrations.

CI expands the lint, typecheck, and build tasks into separate matrix jobs. They
appear as independent pull-request checks while sharing one workflow definition
and the same mise and Yarn cache strategy.

## Preserve mobile support

`isDesktopOnly` is compatibility metadata, not a build mode. It is `false`, so
plugin code and runtime dependencies must load without Node.js or Electron;
those APIs do not exist in Obsidian mobile. Prefer Obsidian's `Vault`,
`Platform`, and `requestUrl` APIs over platform-specific alternatives.

Optional desktop enhancements can still use Node.js or Electron. Guard them
with `Platform.isDesktopApp` and load them dynamically inside that branch. With
Parcel, a direct import or literal `require('node:fs')` can be moved to module
initialization even when it appears inside the guard. Resolve desktop modules
through a runtime-only `require` reference instead. The build rejects direct or
hoisted platform-specific loads while evaluating the production bundle in
simulated iOS and Android environments; it does not replace testing plugin
behavior on real devices.

## Upgrade rules stay explicit

The root `biome.jsonc` and `tsconfig.json` files are thin entry points. Their
reusable policy lives under `.toolchain/`, keeping it ready to extract into a
shared package later.

Every Biome rule has an explicit severity and rationale under
`.toolchain/biome/rules/<language>/<category>.jsonc`. Rules that Biome applies
to more than one language live under `rules/shared/` so each decision still has
one source of truth. Every TypeScript option in the compiler's Type Checking
section is explicit in `.toolchain/typescript/base.jsonc` for the same reason.

The `.toolchain/check-explicit-config.mjs` check reads the installed Biome and
TypeScript metadata. A tool upgrade fails `mise run check` until every new rule
or type-checking option has a documented decision.
