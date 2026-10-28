import { useChartDay } from '../../../hooks/weather/useChartDay';
import { useTranslate } from '@tolgee/react';
import { StyledText } from '../../common/styled/StyledText';
import { ContentRow } from '../../common/layout/ContentRow';
import { ValuesList } from '../../common/modal/ValuesList';
import { WeatherChart } from '../../weather/WeatherChart';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { selectUnit } from '@nativeweather/core/utils/formatting/selectUnit';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { useState } from 'react';
import { View } from 'react-native';

export const RainModal = ({ initialDate }: { initialDate?: string }) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const { weatherData } = useWeather();
	const { date, selectDay } = useChartDay(weatherData, initialDate);
	const [showRainfall, setShowRainfall] = useState(false);
	const rainfallUnit = currentUnits === 'metric' ? 'mm' : 'in';
	const selectedDay = weatherData?.forecast.forecastday.find((day) => day.date === date);
	const dailySummary = selectedDay
		? {
				label: t(showRainfall ? 'chart.dailyTotal' : 'chart.dailyChance'),
				value: showRainfall
					? `${(currentUnits === 'metric' ? selectedDay.day.totalPrecipMm : selectedDay.day.totalPrecipIn).toFixed(currentUnits === 'metric' ? 1 : 2)}${rainfallUnit}`
					: `${Math.round(selectedDay.day.dailyRainChance)}%`,
			}
		: undefined;
	const nowEpoch = weatherData?.location.localtimeEpoch ?? 0;
	const timeZone = weatherData?.location.tzId ?? 'UTC';

	const rainChanceValues = [
		{ name: t('precipitation.chance.0'), value: '0 - 10%', description: t('rain.chance.text.0') },
		{ name: t('precipitation.chance.1'), value: '10 - 30%', description: t('rain.chance.text.1') },
		{ name: t('precipitation.chance.2'), value: '30 - 50%', description: t('rain.chance.text.2') },
		{ name: t('precipitation.chance.3'), value: '50 - 70%', description: t('rain.chance.text.3') },
		{ name: t('precipitation.chance.4'), value: '70 - 90%', description: t('rain.chance.text.4') },
		{ name: t('precipitation.chance.5'), value: '90 - 100%', description: t('rain.chance.text.5') },
	];

	const rainPrecipValues = [
		{
			name: t('precipitation.rainfall.0'),
			value: selectUnit({ metric: '0,1 - 2mm', imperial: '0.01 - 0.08in', currentUnits }),
		},
		{
			name: t('precipitation.rainfall.1'),
			value: selectUnit({ metric: '2 - 10mm', imperial: '0.08 - 0.40in', currentUnits }),
		},
		{
			name: t('precipitation.rainfall.2'),
			value: selectUnit({ metric: '10 - 30mm', imperial: '0.40 - 1.20in', currentUnits }),
		},
		{
			name: t('precipitation.rainfall.3'),
			value: selectUnit({ metric: '30 - 50mm', imperial: '1.20 - 2.00in', currentUnits }),
		},
		{
			name: t('precipitation.rainfall.4'),
			value: selectUnit({ metric: '> 50mm', imperial: '> 2.00in', currentUnits }),
		},
	];

	return (
		<View className={clsx('gap-2')}>
			{weatherData && (
				<WeatherChart
					dailySummary={dailySummary}
					selectedDate={date}
					onSelectDay={selectDay}
					forecastDays={weatherData.forecast.forecastday}
					currentTimeEpoch={nowEpoch}
					timeZone={timeZone}
					getValue={(hour) =>
						showRainfall
							? currentUnits === 'metric'
								? hour.precipMm
								: hour.precipMm * 0.0393701
							: Math.round(hour.chanceOfRain / 5) * 5
					}
					seriesLabel={showRainfall ? t('rain.rainfall.title') : t('rain.title')}
					maxValue={showRainfall ? undefined : 100}
					domainStep={showRainfall ? (currentUnits === 'metric' ? 1 : 0.1) : 1}
					formatValue={
						showRainfall ? (value) => (currentUnits === 'metric' ? value.toFixed(1) : value.toFixed(2)) : undefined
					}
					valueSuffix={showRainfall ? rainfallUnit : '%'}
					toggleLabel={rainfallUnit}
					selectedMetric={showRainfall ? rainfallUnit : '%'}
					onToggle={(metric) => setShowRainfall(metric === rainfallUnit)}
				/>
			)}
			<ContentRow title={t('rain.chance.title')}>
				<StyledText type="body">{t('rain.chance.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('rain.chance.values')}>
				<ValuesList values={rainChanceValues} valueColor="!text-[#2793FF]" showIndex={false} />
			</ContentRow>
			<ContentRow title={t('rain.rainfall.title')}>
				<StyledText type="body">{t('rain.rainfall.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('rain.rainfall.values')}>
				<ValuesList values={rainPrecipValues} valueColor="!text-[#2793FF]" showIndex={false} />
			</ContentRow>
		</View>
	);
};
