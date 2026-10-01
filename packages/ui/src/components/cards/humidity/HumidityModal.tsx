import { useTranslate } from '@tolgee/react';
import { WeatherChart } from '@nativeweather/ui/components/weather/WeatherChart';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ContentRow } from '@nativeweather/ui/components/common/layout/ContentRow';
import { ValuesList } from '@nativeweather/ui/components/common/modal/ValuesList';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const HumidityModal = () => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();

	const humidityScaleValues = [
		{
			name: t('description.humidity.0'),
			value: '0 - 20%',
		},
		{
			name: t('description.humidity.1'),
			value: '20 - 40%',
		},
		{
			name: t('description.humidity.2'),
			value: '40 - 60%',
		},
		{
			name: t('description.humidity.3'),
			value: '60 - 80%',
		},
		{
			name: t('description.humidity.4'),
			value: '80 - 100%',
		},
	];

	return (
		<View className={clsx('gap-2')}>
			{weatherData && (
				<WeatherChart
					forecastDays={weatherData.forecast.forecastday}
					currentTimeEpoch={weatherData.location.localtimeEpoch}
					timeZone={weatherData.location.tzId}
					getValue={(hour) => hour.humidity}
					seriesLabel={t('humidity.title')}
					maxValue={100}
					valueSuffix="%"
					color="#3DA443"
				/>
			)}
			<ContentRow title={t('humidity.relativehumidity.title')}>
				<StyledText type="body">{t('humidity.relativehumidity.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('humidity.relativehumidity.values')}>
				<ValuesList values={humidityScaleValues} valueColor="!text-[#3DA443]" />
			</ContentRow>
			<ContentRow title={t('humidity.dewpoint.title')}>
				<StyledText type="body">{t('humidity.dewpoint.text')}</StyledText>
			</ContentRow>
		</View>
	);
};
