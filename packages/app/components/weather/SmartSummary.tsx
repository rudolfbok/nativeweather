'use client';

import { useTranslate } from '@tolgee/react';
import { CardHeader } from 'app/components/common/layout/CardHeader';
import { RoundView } from 'app/components/common/styled/RoundView';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SmartSummaryIcon } from 'app/components/icons/main/SmartSummaryIcon';
import { useStorageString } from 'app/storage/useStorage';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { switchTemp } from 'app/utils/switch/switchTemp';
import React, { useMemo } from 'react';

type Variant = 1 | 2 | 3;
type AQIType = 'eu' | 'us';
type SummaryCategory = 'combo' | 'precip' | 'cloud' | 'wind' | 'uv' | 'range' | 'aqi' | 'range';

interface SummaryCandidate {
	category: SummaryCategory;
	order: number;
	priority: number;
	text: string;
	relatedCategories?: SummaryCategory[];
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
}

const getVariant = (...values: (number | undefined)[]): Variant => {
	const seed = values.reduce<number>((total, value, index) => {
		if (value == null || !Number.isFinite(value)) return total;
		return total + Math.abs(Math.round(value * 10)) * (index + 1);
	}, 0);

	return ((seed % 3) + 1) as Variant;
};

const getTempBucket = (minTempC: number, maxTempC: number) => {
	if (maxTempC <= 0 || minTempC <= -3) return 'freezing';
	if (maxTempC < 10) return 'cold';
	if (maxTempC < 18) return 'cool';
	if (maxTempC < 24) return 'mild';
	if (maxTempC < 30) return 'warm';
	return 'hot';
};

const getTempRangeBucket = (tempRangeC: number) => {
	if (tempRangeC <= 5) return 'steady';
	if (tempRangeC >= 14) return 'wide';
	return 'moderate';
};

const getCloudBucket = (cloudCover?: number) => {
	if (cloudCover == null) return null;
	if (cloudCover <= 12) return 'clear';
	if (cloudCover <= 50) return 'partly';
	if (cloudCover <= 75) return 'mostly';
	return 'overcast';
};

const getAQILevel = (value: number, type: AQIType) => {
	if (type === 'eu') {
		if (value <= 20) return 1;
		if (value <= 40) return 2;
		if (value <= 60) return 3;
		if (value <= 80) return 4;
		if (value <= 100) return 5;
		return 6;
	}

	if (value <= 50) return 1;
	if (value <= 100) return 2;
	if (value <= 150) return 3;
	if (value <= 200) return 4;
	if (value <= 300) return 5;
	return 6;
};

const getAQIPriority = (level: number) => {
	if (level >= 5) return 12;
	if (level === 4) return 18;
	if (level === 3) return 35;
	return 70;
};

export const SmartSummary = React.memo(function SmartSummary({
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
}: SmartSummaryProps) {
	const { t } = useTranslate('summary');
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [currentAQI] = useStorageString('currentAQI');

	const displayMin = switchTemp({ celsius: minTempC, fahrenheit: minTempF, currentTemp });
	const displayMax = switchTemp({ celsius: maxTempC, fahrenheit: maxTempF, currentTemp });
	const tempRangeC = Math.max(0, maxTempC - minTempC);
	const tempRangeF = Math.max(0, maxTempF - minTempF);
	const displayTempRange = switchTemp({ celsius: tempRangeC, fahrenheit: tempRangeF, currentTemp });

	const rain = switchMetrics({
		metric: `${Math.round(rainPrecipMm ?? 0)} mm`,
		imperial: `${(rainPrecipIn ?? 0).toFixed(2)} in`,
		currentUnits,
	});
	const snow = switchMetrics({
		metric: `${(snowPrecipCm ?? 0).toFixed(1)} cm`,
		imperial: `${(snowPrecipIn ?? 0).toFixed(2)} in`,
		currentUnits,
	});
	const range = switchMetrics({
		metric: `${Math.round(avgRangeKm ?? 0)} km`,
		imperial: `${Math.round(avgRangeMiles ?? 0)} mi`,
		currentUnits,
	});
	const wind = switchMetrics({
		metric: `${Math.round(maxWindKph ?? 0)} km/h`,
		imperial: `${Math.round((maxWindKph ?? 0) * 0.621371)} mph`,
		currentUnits,
	});

	const combinedSummary = useMemo(() => {
		const variant = getVariant(dateEpoch, maxTempC, minTempC, rainPrecipMm, snowPrecipCm, cloudCover);
		const tempBucket = getTempBucket(minTempC, maxTempC);
		const tempRangeBucket = getTempRangeBucket(tempRangeC);
		const tempText = t(`temp_${tempBucket}_${variant}`, { min: displayMin, max: displayMax });
		const candidates: SummaryCandidate[] = [];
		const rainMm = rainPrecipMm ?? 0;
		const snowCm = snowPrecipCm ?? 0;
		const hasRain = rainMm > 0.1;
		const hasSnow = snowCm > 0.1;
		const cloudBucket = getCloudBucket(cloudCover);
		const windBucket = maxWindKph == null ? null : maxWindKph >= 40 ? 'strong' : maxWindKph >= 20 ? 'breezy' : 'light';
		const uvBucket = uv == null ? null : uv >= 8 ? 'very_high' : uv > 5 ? 'high' : 'low';
		const hasLowRange = avgRangeKm != null && avgRangeKm > 0 && avgRangeKm < 5;
		const isColdDay = tempBucket === 'freezing' || tempBucket === 'cold';
		const isHotDay = tempBucket === 'hot' || tempBucket === 'warm';
		const preferredAQIType: AQIType = currentAQI === 'EU' ? 'eu' : 'us';
		const fallbackAQIType: AQIType = preferredAQIType === 'eu' ? 'us' : 'eu';
		const selectedAQIType =
			preferredAQIType === 'eu'
				? airQualityEU == null
					? fallbackAQIType
					: preferredAQIType
				: airQualityUS == null
					? fallbackAQIType
					: preferredAQIType;
		const selectedAQIValue = selectedAQIType === 'eu' ? airQualityEU : airQualityUS;
		const selectedAQILevel = selectedAQIValue == null ? null : getAQILevel(selectedAQIValue, selectedAQIType);

		const addCandidate = (candidate: SummaryCandidate) => {
			if (candidate.text) {
				candidates.push(candidate);
			}
		};

		const addComboCandidate = (key: string, relatedCategories: SummaryCategory[], priority = 8) => {
			addCandidate({
				category: 'combo',
				order: 0,
				priority,
				text: t(`combo_${key}_${variant}`, {
					rain,
					snow,
					wind,
					range,
					uv: Math.round(uv ?? 0),
					aqi: selectedAQIValue,
				}),
				relatedCategories,
			});
		};

		if (hasRain && hasSnow && isColdDay) {
			addComboCandidate('mixed_freezing', ['precip'], 4);
		} else if (hasSnow && isColdDay) {
			addComboCandidate('snow_cold', ['precip'], 5);
		} else if (hasSnow && (windBucket === 'strong' || windBucket === 'breezy')) {
			addComboCandidate('snow_wind', ['precip', 'wind', 'range'], 6);
		} else if (hasRain && (windBucket === 'strong' || windBucket === 'breezy')) {
			addComboCandidate('rain_wind', ['precip', 'wind'], 6);
		} else if (hasRain && hasLowRange) {
			addComboCandidate('rain_range', ['precip', 'range'], 7);
		} else if (isHotDay && (uvBucket === 'very_high' || uvBucket === 'high')) {
			addComboCandidate('heat_uv', ['uv'], 7);
		} else if (isHotDay && selectedAQILevel != null && selectedAQILevel >= 3) {
			addComboCandidate('heat_aqi', ['aqi'], 8);
		} else if (isColdDay && (windBucket === 'strong' || windBucket === 'breezy')) {
			addComboCandidate('cold_wind', ['wind'], 8);
		} else if (
			(cloudBucket === 'clear' || cloudBucket === 'partly') &&
			(uvBucket === 'very_high' || uvBucket === 'high')
		) {
			addComboCandidate('clear_uv', ['cloud', 'uv'], 9);
		} else if (!hasRain && !hasSnow && cloudBucket === 'overcast') {
			addComboCandidate('dry_overcast', ['cloud'], 25);
		} else if (!hasRain && !hasSnow && tempRangeBucket === 'wide') {
			addComboCandidate('dry_wide', ['range'], 28);
		} else if (
			!hasRain &&
			!hasSnow &&
			windBucket === 'light' &&
			uvBucket === 'low' &&
			selectedAQILevel != null &&
			selectedAQILevel <= 2
		) {
			addComboCandidate('calm', [], 45);
		}

		addCandidate({
			category: 'range',
			order: 7,
			priority: 90,
			text: t(`range_${tempRangeBucket}_${variant}`, { amount: displayTempRange }),
		});

		if (hasRain && hasSnow) {
			addCandidate({
				category: 'precip',
				order: 1,
				priority: 10,
				text: t(`precip_mixed_${variant}`, { rain, snow }),
			});
		} else if (hasSnow) {
			addCandidate({
				category: 'precip',
				order: 1,
				priority: 11,
				text: t(`precip_snow_${variant}`, { amount: snow }),
			});
		} else if (hasRain) {
			addCandidate({
				category: 'precip',
				order: 1,
				priority: rainMm >= 5 ? 12 : 28,
				text: t(`precip_rain_${variant}`, { amount: rain }),
			});
		} else {
			addCandidate({
				category: 'precip',
				order: 1,
				priority: 50,
				text: t(`precip_none_${variant}`),
			});
		}

		if (cloudBucket) {
			addCandidate({
				category: 'cloud',
				order: 2,
				priority: cloudBucket === 'overcast' ? 34 : 55,
				text: t(`cloud_${cloudBucket}_${variant}`),
			});
		}

		if (windBucket) {
			addCandidate({
				category: 'wind',
				order: 3,
				priority: windBucket === 'strong' ? 16 : windBucket === 'breezy' ? 42 : 65,
				text: t(`wind_${windBucket}_${variant}`, { amount: wind }),
			});
		}

		if (uvBucket) {
			addCandidate({
				category: 'uv',
				order: 4,
				priority: uvBucket === 'very_high' ? 14 : uvBucket === 'high' ? 32 : 75,
				text: t(`uv_${uvBucket}_${variant}`, { value: Math.round(uv) }),
			});
		}

		if (avgRangeKm != null && avgRangeKm > 0) {
			addCandidate({
				category: 'range',
				order: 5,
				priority: avgRangeKm < 5 ? (avgRangeKm < 2 ? 13 : 24) : 80,
				text: t(`range_${avgRangeKm < 5 ? 'low' : 'good'}_${variant}`, { amount: range }),
			});
		}

		if (selectedAQIValue != null && selectedAQILevel != null) {
			addCandidate({
				category: 'aqi',
				order: 6,
				priority: getAQIPriority(selectedAQILevel),
				text: t(`aqi_${selectedAQIType}_${selectedAQILevel}_${variant}`, { value: selectedAQIValue }),
			});
		}

		const selectedCandidates: SummaryCandidate[] = [];
		const usedCategories = new Set<SummaryCategory>();
		const mutedCategories = new Set<SummaryCategory>();
		const comboCandidate = candidates.find((candidate) => candidate.category === 'combo');
		const detailTarget = Math.min(comboCandidate ? 2 : 3, candidates.length);

		const addSelectedCandidate = (candidate: SummaryCandidate, allowMuted = false, limit = detailTarget) => {
			if (selectedCandidates.length >= limit || usedCategories.has(candidate.category)) return false;
			if (!allowMuted && mutedCategories.has(candidate.category)) return false;

			selectedCandidates.push(candidate);
			usedCategories.add(candidate.category);
			return true;
		};

		if (comboCandidate) {
			addSelectedCandidate(comboCandidate, true);
			comboCandidate.relatedCategories?.forEach((category) => mutedCategories.add(category));
		}

		[...candidates]
			.filter((candidate) => candidate.category !== 'combo' && candidate.priority <= 18)
			.sort((a, b) => a.priority - b.priority)
			.forEach((candidate) => addSelectedCandidate(candidate));

		const precipCandidate = candidates.find((candidate) => candidate.category === 'precip');
		const rangeCandidate = candidates.find((candidate) => candidate.category === 'range');

		if (precipCandidate && (hasRain || hasSnow || !comboCandidate)) {
			addSelectedCandidate(precipCandidate, !hasRain && !hasSnow);
		}

		if (rangeCandidate) {
			addSelectedCandidate(rangeCandidate);
		}

		[...candidates].sort((a, b) => a.priority - b.priority).forEach((candidate) => addSelectedCandidate(candidate));

		if (selectedCandidates.length < detailTarget) {
			[...candidates].sort((a, b) => a.order - b.order).forEach((candidate) => addSelectedCandidate(candidate, true));
		}

		const selected = selectedCandidates.sort((a, b) => a.order - b.order).map(({ text }) => text);

		return [tempText, ...selected].join(' ');
	}, [
		airQualityEU,
		airQualityUS,
		avgRangeKm,
		cloudCover,
		currentAQI,
		dateEpoch,
		displayMax,
		displayMin,
		displayTempRange,
		maxTempC,
		maxWindKph,
		minTempC,
		rain,
		rainPrecipMm,
		snow,
		snowPrecipCm,
		tempRangeC,
		t,
		uv,
		range,
		wind,
	]);

	return (
		<RoundView className="w-full gap-2 p-4" liquidGlass>
			<CardHeader icon={<SmartSummaryIcon />} header={t('title')} />
			<StyledText type="body">{combinedSummary}</StyledText>
		</RoundView>
	);
});
