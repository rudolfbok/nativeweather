# Nativeweather

A pnpm monorepo with Expo mobile and Tauri desktop apps and shared packages.

## Linting

[Oxlint](https://oxc.rs/docs/guide/usage/linter.html) lints JavaScript and TypeScript across all apps and packages using the shared root `.oxlintrc.json`. The configuration enables correctness checks, TypeScript rules, and React/Hooks rules, and excludes generated files and build output. Errors and warnings fail the lint commands.

```sh
pnpm install
pnpm lint      # Check the entire monorepo
pnpm lint:fix  # Apply safe automatic fixes, then report remaining issues
```

Each workspace also provides `lint` and `lint:fix` scripts. For example:

```sh
pnpm --filter nativeweather-mobile lint
pnpm --filter nativeweather-desktop lint:fix
pnpm --filter @nativeweather/ui lint
pnpm -r lint  # Run each workspace's lint script
```

Oxlint does not replace TypeScript type checking or Rust linting. Continue running type checks separately; use Clippy for the Tauri Rust code.
