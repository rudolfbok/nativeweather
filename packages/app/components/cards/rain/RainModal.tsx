import { useTranslate } from '@tolgee/react';
import { StyledText } from 'app/components/common/styled/StyledText';
import { ContentRow } from 'app/components/common/layout/ContentRow';
import { ValuesList } from 'app/components/common/modal/ValuesList';
import { WeatherChart } from 'app/components/weather/WeatherChart';
import { useStorageString } from 'app/database/useStorage';
import { useWeather } from 'app/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const RainModal = () => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const { weatherData } = useWeather();
	const switchUnits = (mm: string, inches: string) => (currentUnits === 'metric' ? mm + 'mm' : inches + 'in');
	const nowEpoch = weatherData?.location.localtimeEpoch ?? 0;
	const timeZone = weatherData?.location.tzId ?? 'UTC';

	const rainChanceValues = [
		{
			name: t('precipitation.chance.0'),
			value: '0 - 10%',
			description: t('rain.chance.text.0'),
		},
		{
			name: t('precipitation.chance.1'),
			value: '10 - 30%',
			description: t('rain.chance.text.1'),
		},
		{
			name: t('precipitation.chance.2'),
			value: '30 - 50%',
			description: t('rain.chance.text.2'),
		},
		{
			name: t('precipitation.chance.3'),
			value: '50 - 70%',
			description: t('rain.chance.text.3'),
		},
		{
			name: t('precipitation.chance.4'),
			value: '70 - 90%',
			description: t('rain.chance.text.4'),
		},
		{
			name: t('precipitation.chance.5'),
			value: '90 - 100%',
			description: t('rain.chance.text.5'),
		},
	];

	const rainPrecipValues = [
		{
			name: t('precipitation.rainfall.0'),
			value: switchUnits('0,1 - 2', '0.01 - 0.08'),
		},
		{
			name: t('precipitation.rainfall.1'),
			value: switchUnits('2 - 10', '0.08 - 0.40'),
		},
		{
			name: t('precipitation.rainfall.2'),
			value: switchUnits('10 - 30', '0.40 - 1.20'),
		},
		{
			name: t('precipitation.rainfall.3'),
			value: switchUnits('30 - 50', '1.20 - 2.00'),
		},
		{
			name: t('precipitation.rainfall.4'),
			value: switchUnits('> 50', '> 2.00'),
		},
	];

	return (
		<View className={clsx('gap-2')}>
			{weatherData && (
				<WeatherChart
					forecastDays={weatherData.forecast.forecastday}
					currentTimeEpoch={nowEpoch}
					timeZone={timeZone}
					getValue={(hour) => Math.round(hour.chanceOfRain / 5) * 5}
					seriesLabel={t('rain.title')}
					maxValue={100}
					valueSuffix="%"
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
