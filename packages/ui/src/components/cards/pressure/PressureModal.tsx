import { useTranslate } from '@tolgee/react';
import { WeatherChart } from '../../weather/WeatherChart';
import { StyledText } from '../../common/styled/StyledText';
import { ContentRow } from '../../common/layout/ContentRow';
import { ValuesList } from '../../common/modal/ValuesList';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { selectUnit } from '@nativeweather/core/utils/formatting/selectUnit';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { View } from 'react-native';

export const PressureModal = () => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const { weatherData } = useWeather();
	const barometricScaleValues = [
		{
			name: t('description.pressure.0'),
			value: selectUnit({ metric: '< 980hPa', imperial: '< 28,94inHg', currentUnits }),
			textColor: '!text-[#E53935]',
			description: t('pressure.text.0'),
		},
		{
			name: t('description.pressure.1'),
			value: selectUnit({ metric: '980 - 995hPa', imperial: '28,94 - 29,38inHg', currentUnits }),
			textColor: '!text-[#FB8C00]',
			description: t('pressure.text.1'),
		},
		{
			name: t('description.pressure.2'),
			value: selectUnit({ metric: '996 - 1005hPa', imperial: '29,41 - 29,68inHg', currentUnits }),
			textColor: '!text-[#FDD835]',
			description: t('pressure.text.2'),
		},
		{
			name: t('description.pressure.3'),
			value: selectUnit({ metric: '1006 - 1012hPa', imperial: '29,71 - 29,88inHg', currentUnits }),
			textColor: '!text-[#43A047]',
			description: t('pressure.text.3'),
		},
		{
			name: t('description.pressure.4'),
			value: selectUnit({ metric: '1013 - 1020hPa', imperial: '29,91 - 30,12inHg', currentUnits }),
			textColor: '!text-[#1E88E5]',
			description: t('pressure.text.4'),
		},
		{
			name: t('description.pressure.5'),
			value: selectUnit({ metric: '1021 - 1025hPa', imperial: '30,15 - 30,27inHg', currentUnits }),
			textColor: '!text-[#3949AB]',
			description: t('pressure.text.5'),
		},
		{
			name: t('description.pressure.6'),
			value: selectUnit({ metric: '1026 - 1035hPa', imperial: '30,30 - 30,56inHg', currentUnits }),
			textColor: '!text-[#6A1B9A]',
			description: t('pressure.text.6'),
		},
		{
			name: t('description.pressure.7'),
			value: selectUnit({ metric: '1036 - 1045hPa', imperial: '30,59 - 30,86inHg', currentUnits }),
			textColor: '!text-[#8E24AA]',
			description: t('pressure.text.7'),
		},
		{
			name: t('description.pressure.8'),
			value: selectUnit({ metric: '> 1045 hPa', imperial: '> 30,86inHg', currentUnits }),
			textColor: '!text-[#5D4037]',
			description: t('pressure.text.8'),
		},
	];

	return (
		<View className={clsx('gap-2')}>
			{weatherData && (
				<WeatherChart
					forecastDays={weatherData.forecast.forecastday}
					currentTimeEpoch={weatherData.location.localtimeEpoch}
					timeZone={weatherData.location.tzId}
					getValue={(hour) => (currentUnits === 'metric' ? hour.pressureMb : hour.pressureInHg)}
					seriesLabel={t('pressure.title')}
					valueSuffix={currentUnits === 'metric' ? 'hPa' : 'inHg'}
					domainStep={currentUnits === 'metric' ? 5 : 0.1}
					formatValue={(value) => (currentUnits === 'metric' ? `${Math.round(value)}` : value.toFixed(1))}
					color="#0048FF"
				/>
			)}
			<ContentRow title={t('pressure.barometricscale.title')}>
				<StyledText type="body">{t('pressure.barometricscale.text')}</StyledText>
			</ContentRow>
			<ContentRow title={t('pressure.barometricscale.values')}>
				<ValuesList values={barometricScaleValues} showIndex={true} />
			</ContentRow>
		</View>
	);
};
