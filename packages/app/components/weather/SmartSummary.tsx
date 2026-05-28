'use client';

import { useTranslate } from '@tolgee/react';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { RoundView } from 'app/components/common/ui/RoundView';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SmartSummaryIcon } from 'app/components/icons/SmartSummaryIcon';
import { useStorageString } from 'app/storage/useStorageString';
import { switchMetrics } from 'app/utils/switch/switchMetrics';
import { switchTemp } from 'app/utils/switch/switchTemp';
import React, { useMemo } from 'react';

const CARD_STYLE = { gap: 8, padding: 16 };
const SUMMARY_ICON = <SmartSummaryIcon />;

type Variant = 1 | 2 | 3;
type AQIType = 'eu' | 'us';

interface SummaryCandidate {
	order: number;
	priority: number;
	text: string;
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
	uvIndex?: number;
	maxWindKph?: number;
	avgVisibilityKm?: number;
	avgVisibilityMiles?: number;
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
	uvIndex,
	maxWindKph,
	avgVisibilityKm,
	avgVisibilityMiles,
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
	const visibility = switchMetrics({
		metric: `${Math.round(avgVisibilityKm ?? 0)} km`,
		imperial: `${Math.round(avgVisibilityMiles ?? 0)} mi`,
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

		candidates.push({
			order: 7,
			priority: 90,
			text: t(`range_${tempRangeBucket}_${variant}`, { amount: displayTempRange }),
		});

		if (rainMm > 0.1 && snowCm > 0.1) {
			candidates.push({
				order: 1,
				priority: 10,
				text: t(`precip_mixed_${variant}`, { rain, snow }),
			});
		} else if (snowCm > 0.1) {
			candidates.push({
				order: 1,
				priority: 11,
				text: t(`precip_snow_${variant}`, { amount: snow }),
			});
		} else if (rainMm > 0.1) {
			candidates.push({
				order: 1,
				priority: rainMm >= 5 ? 12 : 28,
				text: t(`precip_rain_${variant}`, { amount: rain }),
			});
		} else {
			candidates.push({
				order: 1,
				priority: 50,
				text: t(`precip_none_${variant}`),
			});
		}

		const cloudBucket = getCloudBucket(cloudCover);
		if (cloudBucket) {
			candidates.push({
				order: 2,
				priority: cloudBucket === 'overcast' ? 34 : 55,
				text: t(`cloud_${cloudBucket}_${variant}`),
			});
		}

		if (maxWindKph != null) {
			const windBucket = maxWindKph >= 40 ? 'strong' : maxWindKph >= 20 ? 'breezy' : 'light';
			candidates.push({
				order: 3,
				priority: windBucket === 'strong' ? 16 : windBucket === 'breezy' ? 42 : 65,
				text: t(`wind_${windBucket}_${variant}`, { amount: wind }),
			});
		}

		if (uvIndex != null) {
			const uvBucket = uvIndex >= 8 ? 'very_high' : uvIndex > 5 ? 'high' : 'low';
			candidates.push({
				order: 4,
				priority: uvBucket === 'very_high' ? 14 : uvBucket === 'high' ? 32 : 75,
				text: t(`uv_${uvBucket}_${variant}`, { value: Math.round(uvIndex) }),
			});
		}

		if (avgVisibilityKm != null && avgVisibilityKm > 0) {
			candidates.push({
				order: 5,
				priority: avgVisibilityKm < 5 ? (avgVisibilityKm < 2 ? 13 : 24) : 80,
				text: t(`visibility_${avgVisibilityKm < 5 ? 'low' : 'good'}_${variant}`, { amount: visibility }),
			});
		}

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

		if (selectedAQIValue != null) {
			const level = getAQILevel(selectedAQIValue, selectedAQIType);
			candidates.push({
				order: 6,
				priority: getAQIPriority(level),
				text: t(`aqi_${selectedAQIType}_${level}_${variant}`, { value: selectedAQIValue }),
			});
		}

		const selected = candidates
			.sort((a, b) => a.priority - b.priority)
			.slice(0, 2)
			.sort((a, b) => a.order - b.order)
			.map(({ text }) => text);

		return [tempText, ...selected].join(' ');
	}, [
		airQualityEU,
		airQualityUS,
		avgVisibilityKm,
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
		uvIndex,
		visibility,
		wind,
	]);

	return (
		<RoundView className="w-full gap-2 p-4" style={CARD_STYLE} liquidGlass>
			<CardHeader icon={SUMMARY_ICON} header={t('title')} />
			<StyledText type="body">{combinedSummary}</StyledText>
		</RoundView>
	);
});
