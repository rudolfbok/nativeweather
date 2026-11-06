import { getSmartSummary, useStorageString, useWeather } from '@/core';
import { useTranslate } from '@tolgee/react';
import { CardHeader } from '../common/CardHeader';
import { RoundView } from '../common/RoundView';
import { Text } from '../common/Text';
import { SmartSummaryIcon } from '../icons/main/SmartSummaryIcon';

export const SmartSummary = ({ dayIndex = 0 }: { dayIndex?: number }) => {
	const { t } = useTranslate('summary');
	const weatherData = useWeather((state) => state.weatherData);
	const airQuality = useWeather((state) => state.airQualityData?.current);
	const [currentTemp] = useStorageString('currentTemp');
	const [currentUnits] = useStorageString('currentUnits');
	const [currentAQI] = useStorageString('currentAQI');
	const day = weatherData?.forecast.forecastday[dayIndex];

	if (!day) return null;

	const summary = getSmartSummary({
		day,
		// Air quality is only known for right now, so it only informs today's summary.
		airQuality: dayIndex === 0 ? airQuality : null,
		currentTemp,
		currentUnits,
		currentAQI,
	});

	return (
		<RoundView className="w-full gap-2 p-4">
			<CardHeader icon={<SmartSummaryIcon />} header={t('title')} />
			<Text type="body">{summary.map(({ key, params }) => t(key, params)).join(' ')}</Text>
		</RoundView>
	);
};
