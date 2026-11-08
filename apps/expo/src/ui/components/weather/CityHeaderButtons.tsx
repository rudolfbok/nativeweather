import type { NormalizedData } from '@nativeweather/types';

// iOS only (see CityHeaderButtons.ios.tsx); keeps expo-symbols and its font out of the web and Android bundles.
export const CityHeaderButtons = (_props: { weather: NormalizedData }) => null;
