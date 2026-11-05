// STUB(phase-6): sample charts for slice 6.3; slice 6.4 moves the chart into the metric modals and deletes this file.
import { useStorageString, useWeather } from '@nativeweather/core';
import { Text, WeatherChart } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { useState } from 'react';
import { View } from 'react-native';

export const SampleCharts = () => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const days = useWeather((state) => state.weatherData?.forecast.forecastday);
	const [dayIndex, setDayIndex] = useState(0);
	const [rainUnit, setRainUnit] = useState('%');
	const isMetric = currentUnits === 'metric';
	const amountUnit = isMetric ? 'mm' : 'in';
	const showAmount = rainUnit === amountUnit;
	const day = days?.[dayIndex]?.day;

	if (!day) return null;

	return (
		<View className="gap-4">
			<Text type="sectiontitle">Chart samples (6.3)</Text>
			<WeatherChart
				dayIndex={dayIndex}
				onSelectDay={setDayIndex}
				getValue={(hour) => hour.humidity}
				seriesLabel={t('humidity.title')}
				color="metric-humidity"
				scale={{ max: 100 }}
				valueSuffix="%"
			/>
			<WeatherChart
				dayIndex={dayIndex}
				onSelectDay={setDayIndex}
				getValue={(hour) =>
					showAmount ? (isMetric ? hour.precipMm : hour.precipMm * 0.0393701) : Math.round(hour.chanceOfRain / 5) * 5
				}
				seriesLabel={t(showAmount ? 'rain.rainfall.title' : 'rain.title')}
				scale={showAmount ? { step: isMetric ? 1 : 0.1 } : { max: 100 }}
				formatValue={showAmount ? (value) => value.toFixed(isMetric ? 1 : 2) : undefined}
				valueSuffix={showAmount ? amountUnit : '%'}
				toggle={{
					options: ['%', amountUnit],
					selected: showAmount ? amountUnit : '%',
					onChange: setRainUnit,
					dailySummary: {
						label: t(showAmount ? 'chart.dailyTotal' : 'chart.dailyChance'),
						value: showAmount
							? `${(isMetric ? day.totalPrecipMm : day.totalPrecipIn).toFixed(isMetric ? 1 : 2)}${amountUnit}`
							: `${Math.round(day.dailyRainChance)}%`,
					},
				}}
			/>
		</View>
	);
};
