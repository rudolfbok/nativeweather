# NativeWeather for macOS

The NativeWeather macOS app, built with React Native macOS, Nativewind, Reanimated and Phosphor Icons.

**Not intended for iOS or Android.**

## Requirements

- macOS
- Xcode
- CocoaPods
- Node.js 18+
- pnpm 10+

## How to get started

Install the monorepo dependencies from the repository root:

```bash
pnpm install
```

Install CocoaPods

```bash
cd apps/macos/macos
pod install
cd ../../..
```

From the repository root, start the macOS Metro server:

```bash
pnpm macos
```

Then, in another terminal, build and start the macOS app:

```bash
pnpm --filter nativeweather-macos macos
```

## Known issues

- CocoaPods installation may fail multiple times due to some problems that are disclosed in the log. Try again and repeat till it installs correctly
