import { getWeatherCondition } from '@nativeweather/api';
import type { ForecastHour } from '@nativeweather/core';
import { formatTemperature, useStorageString } from '@nativeweather/core';
import { useTranslate } from '@tolgee/react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../../common/Text';
import { WeatherIcon } from '../../../utils/mappings/weatherIcons';

const roundTo5 = (value: number) => Math.round(value / 5) * 5;

export const HourlyItem = ({ hour, label }: { hour: ForecastHour; label: string }) => {
	const { t } = useTranslate('weather');
	const [currentTemp] = useStorageString('currentTemp');
	const kind = getWeatherCondition(hour.condition.code)?.precipitation;
	// Liquid kinds show the rain chance, frozen ones the snow chance; an unknown condition may show both.
	const showRain = !kind || ['rain', 'thunder_rain', 'thunder', 'freezing'].includes(kind);
	const showSnow = !kind || ['snow', 'thunder_snow', 'sleet', 'ice'].includes(kind);
	const isSleet = kind === 'sleet' || kind === 'ice';

	return (
		<View className="min-h-32.5 w-14 items-center justify-center gap-2 select-none">
			<Text type="body" className="w-full text-center font-medium" numberOfLines={1}>
				{label}
			</Text>
			<View className="flex-1 items-center justify-center gap-1">
				<WeatherIcon code={hour.condition.code} isDay={hour.isDay} size={40} strokeWidth={StyleSheet.hairlineWidth} />
				{showRain && hour.chanceOfRain > 10 && (
					<Text type="caption" className="font-semibold text-primary-blue">
						{roundTo5(hour.chanceOfRain)}%
					</Text>
				)}
				{showSnow && hour.chanceOfSnow > 10 && (
					<Text type="caption" className="font-semibold text-primary-blue">
						{isSleet && `${t('snow.title')} `}
						{roundTo5(hour.chanceOfSnow)}%
					</Text>
				)}
			</View>
			<Text type="body" className="font-semibold">
				{formatTemperature({ celsius: hour.tempC, fahrenheit: hour.tempF, currentTemp })}
			</Text>
		</View>
	);
};
