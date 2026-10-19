# NativeWeather for macOS

The NativeWeather macOS app, built with React Native macOS, Nativewind, Reanimated and Phosphor Icons.

**Not intended for iOS or Android.**

## Requirements

- macOS
- Xcode
- CocoaPods
- Node.js 20.19.4 or newer
- pnpm 12.6.0
- Xcode 16.1 or newer
- Ruby and Bundler versions in `Gemfile.lock`

## How to get started

Install the monorepo dependencies from the repository root:

```bash
pnpm install
```

Install the locked CocoaPods dependencies:

```bash
cd apps/desktop/macos
bundle install
bundle exec pod install
cd ../../..
```

Start Metro in one terminal:

```bash
pnpm --filter nativeweather-macos dev
```

Then, in another terminal, build and start the macOS app:

```bash
pnpm --filter nativeweather-macos macos
```

The desktop target requires Fabric and Hermes. Keep `Podfile.lock` and `Pods/Manifest.lock` in sync; after dependency changes, reinstall pods once with the locked Bundler environment and resolve the first reported error before retrying.
