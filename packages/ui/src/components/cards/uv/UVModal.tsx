import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ContentRow } from '@nativeweather/ui/components/common/layout/ContentRow';
import { ValuesList } from '@nativeweather/ui/components/common/modal/ValuesList';
import { WeatherChart } from '@nativeweather/ui/components/weather/WeatherChart';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const UVModal = () => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const nowEpoch = weatherData?.location.localtimeEpoch ?? 0;
	const timeZone = weatherData?.location.tzId ?? 'UTC';

	const uvValues = [
		{
			name: t('description.uv.0'),
			textColor: '!text-[#009900]',
			value: '0 - 2',
			description: t('uv.text.0'),
		},
		{
			name: t('description.uv.1'),
			textColor: '!text-[#FFC100]',
			value: '3 - 5',
			description: t('uv.text.1'),
		},
		{
			name: t('description.uv.2'),
			textColor: '!text-[#FF6F00]',
			value: '6 - 7',
			description: t('uv.text.2'),
		},
		{
			name: t('description.uv.3'),
			textColor: '!text-[#FF0000]',
			value: '8 - 10',
			description: t('uv.text.3'),
		},
		{
			name: t('description.uv.4'),
			textColor: '!text-[#990099]',
			value: '11+',
			description: t('uv.text.4'),
		},
	];

	return (
		<View className={clsx('gap-2')}>
			{weatherData && (
				<WeatherChart
					forecastDays={weatherData.forecast.forecastday}
					currentTimeEpoch={nowEpoch}
					timeZone={timeZone}
					getValue={(hour) => Math.round(hour.uv)}
					seriesLabel={t('uv.index.title')}
					maxValue={12}
					color="#7A007B"
				/>
			)}
			<ContentRow title={t('uv.radiation.title')}>
				<StyledText type="body">{t('uv.radiation.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('uv.index.title')}>
				<StyledText type="body">{t('uv.index.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('uv.index.values')}>
				<ValuesList values={uvValues} />
			</ContentRow>
		</View>
	);
};
