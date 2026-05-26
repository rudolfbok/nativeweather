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

const getVariant = (...values: Array<number | undefined>): Variant => {
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

	const combinedSummary = useMemo(() => {
		const variant = getVariant(dateEpoch, maxTempC, minTempC, rainPrecipMm, snowPrecipCm, cloudCover);
		const tempBucket = getTempBucket(minTempC, maxTempC);
		const tempText = t(`temp_${tempBucket}_${variant}`, { min: displayMin, max: displayMax });
		const candidates: SummaryCandidate[] = [];
		const rainMm = rainPrecipMm ?? 0;
		const snowCm = snowPrecipCm ?? 0;

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
		}

		const cloudBucket = getCloudBucket(cloudCover);
		if (cloudBucket) {
			candidates.push({
				order: 2,
				priority: cloudBucket === 'overcast' ? 34 : 55,
				text: t(`cloud_${cloudBucket}_${variant}`),
			});
		}

		if (maxWindKph != null && maxWindKph >= 20) {
			const windBucket = maxWindKph >= 40 ? 'strong' : 'breezy';
			candidates.push({
				order: 3,
				priority: windBucket === 'strong' ? 16 : 42,
				text: t(`wind_${windBucket}_${variant}`),
			});
		}

		if (uvIndex != null && uvIndex > 5) {
			const uvBucket = uvIndex >= 8 ? 'very_high' : 'high';
			candidates.push({
				order: 4,
				priority: uvBucket === 'very_high' ? 14 : 32,
				text: t(`uv_${uvBucket}_${variant}`),
			});
		}

		if (avgVisibilityKm != null && avgVisibilityKm > 0 && avgVisibilityKm < 5) {
			candidates.push({
				order: 5,
				priority: avgVisibilityKm < 2 ? 13 : 24,
				text: t(`visibility_low_${variant}`, { amount: visibility }),
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
			.slice(0, 3)
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
		maxTempC,
		maxWindKph,
		minTempC,
		rain,
		rainPrecipMm,
		snow,
		snowPrecipCm,
		t,
		uvIndex,
		visibility,
	]);

	return (
		<RoundView className="w-full gap-2 p-4" style={CARD_STYLE} liquidGlass>
			<CardHeader icon={SUMMARY_ICON} header={t('title')} />
			<StyledText type="body">{combinedSummary}</StyledText>
		</RoundView>
	);
});
