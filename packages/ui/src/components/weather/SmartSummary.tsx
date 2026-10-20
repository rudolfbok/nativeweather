'use client';

import { useTranslate } from '@tolgee/react';
import { CardHeader } from '../common/layout/CardHeader';
import { RoundView } from '../common/styled/RoundView';
import { StyledText } from '../common/styled/StyledText';
import { SmartSummaryIcon } from '../icons/main/SmartSummaryIcon';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { formatTemperature } from '@nativeweather/core/utils/formatting/formatTemperature';
import { selectUnit } from '@nativeweather/core/utils/formatting/selectUnit';
import { getWeatherCondition } from '@nativeweather/api/constants/weatherConditions';

type Variant = 1 | 2 | 3;
type AQIType = 'eu' | 'us';
type SummaryCategory = 'precip' | 'cloud' | 'wind' | 'uv' | 'visibility' | 'aqi' | 'tempRange';

interface SummaryCandidate {
	category: SummaryCategory;
	priority: number;
	text: string;
}

interface SummaryCombo {
	matches: boolean;
	key: string;
	excludes: SummaryCategory[];
}

interface SmartSummaryProps {
	maxTempC: number;
	minTempC: number;
	maxTempF: number;
	minTempF: number;
	rainPrecipMm: number;
	rainPrecipIn: number;
	snowPrecipCm: number;
	snowPrecipIn: number;
	cloudCover?: number;
	airQualityEU?: number;
	airQualityUS?: number;
	uv?: number;
	maxWindKph?: number;
	avgRangeKm?: number;
	avgRangeMiles?: number;
	dateEpoch?: number;
	conditionCodes: (number | null)[];
}

const getVariant = (...values: (number | undefined)[]): Variant => {
	const seed = values.reduce<number>(
		(total, value, index) =>
			value == null || !Number.isFinite(value) ? total : total + Math.abs(Math.round(value * 10)) * (index + 1),
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

const getCloudBucket = (cover?: number) => {
	if (cover == null) return null;
	if (cover <= 12) return 'clear';
	if (cover <= 50) return 'partly';
	if (cover <= 75) return 'mostly';
	return 'overcast';
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

const getAQI = (preference: string | null, eu?: number, us?: number) => {
	const preferredType: AQIType = preference === 'EU' ? 'eu' : 'us';
	const fallbackType: AQIType = preferredType === 'eu' ? 'us' : 'eu';
	const preferredValue = preferredType === 'eu' ? eu : us;
	const type = preferredValue == null ? fallbackType : preferredType;
	const value = type === 'eu' ? eu : us;

	return value == null ? null : { type, value, level: getAQILevel(value, type) };
};

export const SmartSummary = ({
	maxTempC,
	minTempC,
	maxTempF,
	minTempF,
	rainPrecipMm,
	rainPrecipIn,
	snowPrecipCm,
	snowPrecipIn,
	cloudCover,
	airQualityEU,
	airQualityUS,
	uv,
	maxWindKph,
	avgRangeKm,
	avgRangeMiles,
	dateEpoch,
	conditionCodes,
}: SmartSummaryProps) => {
	const { t } = useTranslate('summary');
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [currentAQI] = useStorageString('currentAQI');

	const variant = getVariant(dateEpoch, maxTempC, minTempC, rainPrecipMm, snowPrecipCm, cloudCover);
	const tempBucket = getTempBucket(maxTempC);
	const tempRangeC = Math.max(0, maxTempC - minTempC);
	const conditionKinds = conditionCodes.map((code) => getWeatherCondition(code)?.precipitation);
	const hasUnknownCondition = conditionCodes.some((code) => code == null || !getWeatherCondition(code));
	const hasPossibleCondition = conditionCodes.some((code) => getWeatherCondition(code)?.possible);
	const hasThunderCondition = conditionCodes.some((code) => getWeatherCondition(code)?.thunder);
	const hasRain = conditionKinds.some((kind) => kind === 'rain' || kind === 'thunder_rain');
	const hasSnow = snowPrecipCm > 0.1 || conditionKinds.some((kind) => kind === 'snow' || kind === 'thunder_snow');
	const hasOtherPrecip = conditionKinds.some((kind) => kind === 'sleet' || kind === 'freezing' || kind === 'ice');
	const hasAnyPrecip = hasRain || hasSnow || hasOtherPrecip || hasUnknownCondition || hasPossibleCondition;
	const cloudBucket = getCloudBucket(cloudCover);
	const windBucket = maxWindKph == null ? null : maxWindKph >= 40 ? 'strong' : maxWindKph >= 20 ? 'breezy' : 'light';
	const uvBucket = uv == null ? null : uv >= 8 ? 'very_high' : uv > 5 ? 'high' : 'low';
	const hasLowVisibility = avgRangeKm != null && avgRangeKm > 0 && avgRangeKm < 5;
	const isCold = tempBucket === 'freezing' || tempBucket === 'cold';
	const isHot = tempBucket === 'warm' || tempBucket === 'hot';
	const aqi = getAQI(currentAQI, airQualityEU, airQualityUS);

	const displayMin = formatTemperature({ celsius: minTempC, fahrenheit: minTempF, currentTemp });
	const displayMax = formatTemperature({ celsius: maxTempC, fahrenheit: maxTempF, currentTemp });
	const displayTempRange = formatTemperature({
		celsius: tempRangeC,
		fahrenheit: Math.max(0, maxTempF - minTempF),
		currentTemp,
	});
	const rain = selectUnit({
		metric: `${Math.round(rainPrecipMm)} mm`,
		imperial: `${rainPrecipIn.toFixed(2)} in`,
		currentUnits,
	});
	const snow = selectUnit({
		metric: `${snowPrecipCm.toFixed(1)} cm`,
		imperial: `${snowPrecipIn.toFixed(2)} in`,
		currentUnits,
	});
	const visibility = selectUnit({
		metric: `${Math.round(avgRangeKm ?? 0)} km`,
		imperial: `${Math.round(avgRangeMiles ?? 0)} mi`,
		currentUnits,
	});
	const wind = selectUnit({
		metric: `${Math.round(maxWindKph ?? 0)} km/h`,
		imperial: `${Math.round((maxWindKph ?? 0) * 0.621371)} mph`,
		currentUnits,
	});

	const combos: SummaryCombo[] = [
		{ matches: hasSnow && isCold, key: 'snow_cold', excludes: ['precip'] },
		{
			matches: hasSnow && (windBucket === 'strong' || windBucket === 'breezy'),
			key: 'snow_wind',
			excludes: ['precip', 'wind', 'visibility'],
		},
		{
			matches: hasRain && (windBucket === 'strong' || windBucket === 'breezy'),
			key: 'rain_wind',
			excludes: ['precip', 'wind'],
		},
		{ matches: hasRain && hasLowVisibility, key: 'rain_visibility', excludes: ['precip', 'visibility'] },
		{ matches: isHot && (uvBucket === 'very_high' || uvBucket === 'high'), key: 'heat_uv', excludes: ['uv'] },
		{ matches: isHot && aqi != null && aqi.level >= 3, key: 'heat_aqi', excludes: ['aqi'] },
		{
			matches: isCold && (windBucket === 'strong' || windBucket === 'breezy'),
			key: 'cold_wind',
			excludes: ['wind'],
		},
		{
			matches:
				(cloudBucket === 'clear' || cloudBucket === 'partly') && (uvBucket === 'very_high' || uvBucket === 'high'),
			key: 'clear_uv',
			excludes: ['cloud', 'uv'],
		},
		{ matches: !hasAnyPrecip && cloudBucket === 'overcast', key: 'dry_overcast', excludes: ['cloud'] },
		{
			matches: !hasAnyPrecip && getTempRangeBucket(tempRangeC) === 'wide',
			key: 'dry_wide',
			excludes: ['tempRange'],
		},
		{
			matches: !hasAnyPrecip && windBucket === 'light' && uvBucket === 'low' && aqi != null && aqi.level <= 2,
			key: 'calm',
			excludes: [],
		},
	];
	const combo = combos.find(({ matches }) => matches);
	const comboText = combo
		? t(`combo_${combo.key}_${variant}`, {
				rain,
				snow,
				wind,
				visibility,
				tempRange: displayTempRange,
				uv: Math.round(uv ?? 0),
				aqi: aqi?.value,
			})
		: null;

	const candidates: SummaryCandidate[] = [];
	const addCandidate = (category: SummaryCategory, priority: number, text: string) =>
		candidates.push({ category, priority, text });

	if (hasThunderCondition) {
		addCandidate('precip', 8, t('precip_thunder'));
	} else if (hasPossibleCondition) {
		addCandidate('precip', 12, t('precip_possible'));
	} else if (hasRain && hasSnow) {
		addCandidate('precip', 10, t(`precip_both_${variant}`));
	} else if (hasSnow) {
		addCandidate('precip', 11, t(`precip_snow_${variant}`, { amount: snow }));
	} else if (hasRain) {
		addCandidate('precip', rainPrecipMm >= 5 ? 12 : 28, t(`precip_rain_total_${variant}`, { amount: rain }));
	} else if (hasOtherPrecip) {
		addCandidate('precip', 11, t(`precip_other_${variant}`));
	} else if (hasUnknownCondition && rainPrecipMm <= 0.1) {
		addCandidate('precip', 20, t('precip_unknown'));
	} else if (rainPrecipMm > 0.1) {
		addCandidate('precip', 30, t(`precip_total_${variant}`, { amount: rain }));
	} else {
		addCandidate('precip', 50, t(`precip_none_${variant}`));
	}

	if (cloudBucket) {
		addCandidate('cloud', cloudBucket === 'overcast' ? 34 : 55, t(`cloud_${cloudBucket}_${variant}`));
	}

	if (windBucket) {
		const priority = windBucket === 'strong' ? 16 : windBucket === 'breezy' ? 42 : 65;
		addCandidate('wind', priority, t(`wind_${windBucket}_${variant}`, { amount: wind }));
	}

	if (uvBucket) {
		const priority = uvBucket === 'very_high' ? 14 : uvBucket === 'high' ? 32 : 75;
		addCandidate('uv', priority, t(`uv_${uvBucket}_${variant}`, { value: Math.round(uv ?? 0) }));
	}

	if (avgRangeKm != null && avgRangeKm > 0) {
		const priority = avgRangeKm < 5 ? (avgRangeKm < 2 ? 13 : 24) : 80;
		addCandidate(
			'visibility',
			priority,
			t(`visibility_${avgRangeKm < 5 ? 'low' : 'good'}_${variant}`, { amount: visibility })
		);
	}

	if (aqi) {
		addCandidate('aqi', getAQIPriority(aqi.level), t(`aqi_${aqi.type}_${aqi.level}_${variant}`, { value: aqi.value }));
	}

	addCandidate('tempRange', 90, t(`range_${getTempRangeBucket(tempRangeC)}_${variant}`, { amount: displayTempRange }));

	const available = candidates.filter(({ category }) => !combo?.excludes.includes(category));
	// oxlint-disable-next-line unicorn/no-array-sort -- Hermes does not support Array#toSorted on all targets.
	const byPriority = [...available].sort((a, b) => a.priority - b.priority);
	const preferred = [
		...byPriority.filter(({ priority }) => priority <= 18),
		...(hasRain || hasSnow || !combo ? available.filter(({ category }) => category === 'precip') : []),
		...available.filter(({ category }) => category === 'tempRange'),
		...byPriority,
		...available,
	];
	const usedCategories = new Set<SummaryCategory>();
	const selected = preferred
		.filter(({ category }) => {
			if (usedCategories.has(category)) return false;
			usedCategories.add(category);
			return true;
		})
		.slice(0, combo ? 1 : 3);
	const details = candidates.filter((candidate) => selected.includes(candidate)).map(({ text }) => text);
	const tempText = t(`temp_${tempBucket}_${variant}`, { min: displayMin, max: displayMax });
	const summary = [tempText, comboText, ...details].filter(Boolean).join(' ');

	return (
		<RoundView className="w-full gap-2 p-4">
			<CardHeader icon={<SmartSummaryIcon />} header={t('title')} />
			<StyledText type="body">{summary}</StyledText>
		</RoundView>
	);
};
