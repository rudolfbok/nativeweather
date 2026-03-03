'use client';

import { useTranslate } from '@tolgee/react';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { RoundView } from 'app/components/common/ui/RoundView';
import { StyledText } from 'app/components/common/styled/StyledText';
import { SmartSummaryIcon } from 'app/components/icons/SmartSummaryIcon';
import { useSwitchMetrics } from 'app/hooks/switch/useSwitchMetrics';
import { useSwitchTemp } from 'app/hooks/switch/useSwitchTemp';
import { useStorageString } from 'app/storage/useStorageString';
import { clsx } from 'clsx';
import React, { useMemo } from 'react';

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
}

export const SmartSummary = React.memo(function SmartSummary({
	maxTempC,
	minTempC,
	maxTempF,
	minTempF,
	rainPrecipMm,
	rainPrecipIn,
	snowPrecipCm,
	snowPrecipIn,
	cloudCover = 0,
	airQualityEU,
	airQualityUS,
	uvIndex,
	maxWindKph,
	avgVisibilityKm,
}: SmartSummaryProps) {
	const { t } = useTranslate('summary');
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [currentAQI] = useStorageString('currentAQI');

	const displayMin = useSwitchTemp({ celsius: minTempC, fahrenheit: minTempF, currentTemp });
	const displayMax = useSwitchTemp({ celsius: maxTempC, fahrenheit: maxTempF, currentTemp });

	const rain = useSwitchMetrics({
		metric: `${Math.round(rainPrecipMm ?? 0)}mm`,
		imperial: `${rainPrecipIn.toFixed(2) ?? 0}in`,
		currentUnits,
	});
	const snow = useSwitchMetrics({
		metric: `${snowPrecipCm.toFixed(1)}cm`,
		imperial: `${snowPrecipIn.toFixed(2)}in`,
		currentUnits,
	});

	const variant = useMemo(() => Math.floor(Math.random() * 3) + 1, [maxTempC, rainPrecipMm]);

	const getTempText = () => {
		const type = maxTempC > 20 ? 'warm' : 'cold';
		return t(`${type}_${variant}`, { min: displayMin, max: displayMax });
	};

	const getCloudText = () => {
		let type = 'clear';
		if (!cloudCover) return null;
		if (cloudCover > 20 && cloudCover <= 70) type = 'partly';
		if (cloudCover > 70) type = 'overcast';
		return t(`cloud_${type}_${variant}`);
	};

	const getPrecipText = () => {
		if (rainPrecipMm > 0.1) return t(`rain_${variant}`, { amount: rain });
		if (snowPrecipCm > 0.1) return t(`snow_${variant}`, { amount: snow });
		return '';
	};

	const getAQIText = () => {
		if (!airQualityEU || !airQualityUS) return null;
		const type = (currentAQI?.toLowerCase() || 'us') as 'eu' | 'us';
		const value = type === 'eu' ? airQualityEU : airQualityUS;

		if (value === undefined) return '';

		let level = 1;
		if (type === 'eu') {
			if (value <= 20) level = 1;
			else if (value <= 40) level = 2;
			else if (value <= 60) level = 3;
			else if (value <= 80) level = 4;
			else if (value <= 100) level = 5;
			else level = 6;
		} else {
			if (value <= 50) level = 1;
			else if (value <= 100) level = 2;
			else if (value <= 150) level = 3;
			else if (value <= 200) level = 4;
			else if (value <= 300) level = 5;
			else level = 6;
		}

		return t(`aqi_${type}_${level}_${variant}`);
	};

	const getWindText = () => {
		if (!maxWindKph || maxWindKph < 15) return '';
		const type = maxWindKph > 40 ? 'strong' : 'moderate';
		return t(`wind_${type}_${variant}`);
	};

	const getExtraText = () => {
		if (uvIndex && uvIndex > 6) return t(`uv_high_${variant}`);
		if (avgVisibilityKm && avgVisibilityKm < 5) return t(`visibility_low_${variant}`);
		return '';
	};

	const sentences = [getTempText(), getCloudText(), getWindText(), getPrecipText(), getExtraText(), getAQIText()];

	const combinedSummary = sentences.filter(Boolean).join(' ');

	return (
		<RoundView className={clsx('w-full gap-2 p-4')} style={{ gap: 8, padding: 16 }}>
			<CardHeader icon={<SmartSummaryIcon />} header={t('title')} />
			<StyledText type="body">{combinedSummary}</StyledText>
		</RoundView>
	);
});
