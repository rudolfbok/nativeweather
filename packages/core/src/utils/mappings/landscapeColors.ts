import { getWeatherCondition } from '@nativeweather/api';
import type { WeatherCondition } from '@nativeweather/api';

export type LandscapeKey = NonNullable<WeatherCondition['landscape']>;

export const getLandscapeKey = (code: number): LandscapeKey | null => getWeatherCondition(code)?.landscape ?? null;
