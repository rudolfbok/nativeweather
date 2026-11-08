import { getWeatherCondition } from '@nativeweather/api';
import type { NormalizedData, OpenMeteoAQI } from '@nativeweather/types';
import { formatTemperature } from './formatting/formatTemperature';
import { selectUnit } from './formatting/selectUnit';

type ForecastDay = NormalizedData['forecast']['forecastday'][number];
type Variant = 1 | 2 | 3;
type AQIType = 'eu' | 'us';
type SummaryCategory = 'precip' | 'wind' | 'uv' | 'visibility' | 'aqi' | 'tempRange';

/** A `summary` namespace key plus its ICU params; the UI translates and joins the parts. */
export interface SummaryPart {
	key: string;
	params?: Record<string, string | number>;
}

interface SummaryCandidate extends SummaryPart {
	category: SummaryCategory;
	priority: number;
}

interface SmartSummaryInput {
	day: ForecastDay;
	airQuality?: OpenMeteoAQI['current'] | null;
	currentTemp: string;
	currentUnits: string;
	currentAQI: string;
}

// Stable per day, so the wording varies between days but not between renders.
const getVariant = (...values: number[]): Variant => {
	const seed = values.reduce(
		(total, value, index) => (Number.isFinite(value) ? total + Math.abs(Math.round(value * 10)) * (index + 1) : total),
		0
	);
	return ((seed % 3) + 1) as Variant;
};

const getTempBucket = (maxTempC: number) => {
	if (maxTempC <= 0) return 'freezing';
	if (maxTempC < 10) return 'cold';
	if (maxTempC < 18) return 'cool';
	if (maxTempC < 24) return 'mild';
	if (maxTempC < 30) return 'warm';
	return 'hot';
};

const getTempRangeBucket = (range: number) => {
	if (range <= 5) return 'steady';
	if (range >= 14) return 'wide';
	return 'moderate';
};

const getAQILevel = (value: number, type: AQIType) => {
	const limits = type === 'eu' ? [20, 40, 60, 80, 100] : [50, 100, 150, 200, 300];
	const level = limits.findIndex((limit) => value <= limit);
	return level === -1 ? 6 : level + 1;
};

const getAQIPriority = (level: number) => {
	if (level >= 5) return 12;
	if (level === 4) return 18;
	if (level === 3) return 35;
	return 70;
};

const getAQI = (preference: string, airQuality?: OpenMeteoAQI['current'] | null) => {
	if (!airQuality) return null;
	const type: AQIType = preference === 'EU' ? 'eu' : 'us';
	const value = type === 'eu' ? airQuality.european_aqi : airQuality.us_aqi;
	return value == null ? null : { type, value, level: getAQILevel(value, type) };
};

export const getSmartSummary = ({
	day: { date_epoch, day, hour },
	airQuality,
	currentTemp,
	currentUnits,
	currentAQI,
}: SmartSummaryInput): SummaryPart[] => {
	const snowPrecipIn = day.totalSnowCm * 0.393701;
	const variant = getVariant(date_epoch, day.maxTempC, day.minTempC, day.totalPrecipMm, day.totalSnowCm);
	const tempBucket = getTempBucket(day.maxTempC);
	const tempRangeC = Math.max(0, day.maxTempC - day.minTempC);
	const conditions = hour.map(({ condition }) => getWeatherCondition(condition.code));
	const kinds = conditions.map((condition) => condition?.precipitation);
	const hasUnknownCondition = conditions.some((condition) => !condition);
	const hasPossibleCondition = conditions.some((condition) => condition?.possible);
	const hasThunderCondition = conditions.some((condition) => condition?.thunder);
	const hasRain = kinds.some((kind) => kind === 'rain' || kind === 'thunder_rain');
	const hasSnow = day.totalSnowCm > 0.1 || kinds.some((kind) => kind === 'snow' || kind === 'thunder_snow');
	const hasOtherPrecip = kinds.some((kind) => kind === 'sleet' || kind === 'freezing' || kind === 'ice');
	const hasAnyPrecip = hasRain || hasSnow || hasOtherPrecip || hasUnknownCondition || hasPossibleCondition;
	const windBucket = day.maxWindKph >= 40 ? 'strong' : day.maxWindKph >= 20 ? 'breezy' : 'light';
	const uvBucket = day.uv >= 8 ? 'very_high' : day.uv > 5 ? 'high' : 'low';
	const isWindy = windBucket !== 'light';
	const isHighUV = uvBucket !== 'low';
	const hasLowVisibility = day.avgVisKm > 0 && day.avgVisKm < 5;
	const isCold = tempBucket === 'freezing' || tempBucket === 'cold';
	const isHot = tempBucket === 'warm' || tempBucket === 'hot';
	const aqi = getAQI(currentAQI, airQuality);

	const temperature = (celsius: number, fahrenheit: number) => formatTemperature({ celsius, fahrenheit, currentTemp });
	const tempRange = temperature(tempRangeC, Math.max(0, day.maxTempF - day.minTempF));
	const unit = (metric: string, imperial: string) => selectUnit({ metric, imperial, currentUnits });
	const rain = unit(`${Math.round(day.totalPrecipMm)} mm`, `${day.totalPrecipIn.toFixed(2)} in`);
	const snow = unit(`${day.totalSnowCm.toFixed(1)} cm`, `${snowPrecipIn.toFixed(2)} in`);
	const visibility = unit(`${Math.round(day.avgVisKm)} km`, `${Math.round(day.avgVisMiles)} mi`);
	const wind = unit(`${Math.round(day.maxWindKph)} km/h`, `${Math.round(day.maxWindMph)} mph`);
	const uv = Math.round(day.uv);

	const combos: { matches: boolean; key: string; excludes: SummaryCategory[] }[] = [
		{ matches: hasSnow && isCold, key: 'snow_cold', excludes: ['precip'] },
		{ matches: hasSnow && isWindy, key: 'snow_wind', excludes: ['precip', 'wind', 'visibility'] },
		{ matches: hasRain && isWindy, key: 'rain_wind', excludes: ['precip', 'wind'] },
		{ matches: hasRain && hasLowVisibility, key: 'rain_visibility', excludes: ['precip', 'visibility'] },
		{ matches: isHot && isHighUV, key: 'heat_uv', excludes: ['uv'] },
		{ matches: isHot && aqi != null && aqi.level >= 3, key: 'heat_aqi', excludes: ['aqi'] },
		{ matches: isCold && isWindy, key: 'cold_wind', excludes: ['wind'] },
		{ matches: !hasAnyPrecip && getTempRangeBucket(tempRangeC) === 'wide', key: 'dry_wide', excludes: ['tempRange'] },
		{
			matches: !hasAnyPrecip && windBucket === 'light' && uvBucket === 'low' && aqi != null && aqi.level <= 2,
			key: 'calm',
			excludes: [],
		},
	];
	const combo = combos.find(({ matches }) => matches);

	const candidates: SummaryCandidate[] = [];
	const add = (category: SummaryCategory, priority: number, key: string, params?: SummaryPart['params']) =>
		candidates.push({ category, priority, key, params });

	if (hasThunderCondition) add('precip', 8, 'precip_thunder');
	else if (hasPossibleCondition) add('precip', 12, 'precip_possible');
	else if (hasRain && hasSnow) add('precip', 10, `precip_both_${variant}`);
	else if (hasSnow) add('precip', 11, `precip_snow_${variant}`, { amount: snow });
	else if (hasRain) add('precip', day.totalPrecipMm >= 5 ? 12 : 28, `precip_rain_${variant}`, { amount: rain });
	else if (hasOtherPrecip) add('precip', 11, `precip_other_${variant}`);
	else if (hasUnknownCondition && day.totalPrecipMm <= 0.1) add('precip', 20, 'precip_unknown');
	else if (day.totalPrecipMm > 0.1) add('precip', 30, `precip_total_${variant}`, { amount: rain });
	else add('precip', 50, `precip_none_${variant}`);

	add('wind', windBucket === 'strong' ? 16 : windBucket === 'breezy' ? 42 : 65, `wind_${windBucket}_${variant}`, {
		amount: wind,
	});
	add('uv', uvBucket === 'very_high' ? 14 : uvBucket === 'high' ? 32 : 75, `uv_${uvBucket}_${variant}`, { value: uv });

	if (day.avgVisKm > 0) {
		const priority = day.avgVisKm < 5 ? (day.avgVisKm < 2 ? 13 : 24) : 80;
		add('visibility', priority, `visibility_${day.avgVisKm < 5 ? 'low' : 'good'}_${variant}`, { amount: visibility });
	}

	if (aqi) add('aqi', getAQIPriority(aqi.level), `aqi_${aqi.type}_${aqi.level}_${variant}`, { value: aqi.value });

	add('tempRange', 90, `range_${getTempRangeBucket(tempRangeC)}_${variant}`, { amount: tempRange });

	// Pick at most three details (one with a combo): urgent ones first, then precipitation and range, then the rest.
	const available = candidates.filter(({ category }) => !combo?.excludes.includes(category));
	// oxlint-disable-next-line unicorn/no-array-sort -- Hermes does not support Array#toSorted on all targets.
	const byPriority = [...available].sort((a, b) => a.priority - b.priority);
	const preferred = [
		...byPriority.filter(({ priority }) => priority <= 18),
		...(hasRain || hasSnow || !combo ? available.filter(({ category }) => category === 'precip') : []),
		...available.filter(({ category }) => category === 'tempRange'),
		...byPriority,
	];
	const usedCategories = new Set<SummaryCategory>();
	const selected = preferred
		.filter(({ category }) => {
			if (usedCategories.has(category)) return false;
			usedCategories.add(category);
			return true;
		})
		.slice(0, combo ? 1 : 3);

	return [
		{
			key: `temp_${tempBucket}_${variant}`,
			params: { min: temperature(day.minTempC, day.minTempF), max: temperature(day.maxTempC, day.maxTempF) },
		},
		...(combo
			? [
					{
						key: `combo_${combo.key}_${variant}`,
						params: { rain, snow, wind, visibility, tempRange, uv, aqi: aqi?.value ?? '' },
					},
				]
			: []),
		// Details keep the order they were added in, not the selection order.
		...candidates.filter((candidate) => selected.includes(candidate)).map(({ key, params }) => ({ key, params })),
	];
};
