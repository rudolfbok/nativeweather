import { clouds } from './definitions/clouds';
import { humidity } from './definitions/humidity';
import { moon } from './definitions/moon';
import { rain, snow } from './definitions/precipitation';
import { pressure } from './definitions/pressure';
import { range } from './definitions/range';
import { sunrise, sunset } from './definitions/sun';
import { uv } from './definitions/uv';
import { wind } from './definitions/wind';
import type { MetricDefinition } from './types';

/** Every metric with a card and a modal; the key is the `/modals/[metric]` route param. */
export const metricDefinitions = {
	rain,
	snow,
	wind,
	uv,
	range,
	humidity,
	pressure,
	sunrise,
	sunset,
	clouds,
	moon,
} satisfies Record<string, MetricDefinition>;

export type MetricId = keyof typeof metricDefinitions;

export const isMetricId = (value: string): value is MetricId => Object.hasOwn(metricDefinitions, value);
