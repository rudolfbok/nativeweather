import { useTranslate } from '@tolgee/react';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { ContentRow } from '@nativeweather/ui/components/common/layout/ContentRow';
import { ValuesList } from '@nativeweather/ui/components/common/modal/ValuesList';
import { WeatherChart } from '@nativeweather/ui/components/weather/WeatherChart';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { selectUnit } from '@nativeweather/core/utils/formatting/selectUnit';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { clsx } from 'clsx';
import { useState } from 'react';
import { View } from 'react-native';

export const SnowModal = () => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const { weatherData } = useWeather();
	const [showSnowfall, setShowSnowfall] = useState(false);
	const snowfallUnit = currentUnits === 'metric' ? 'cm' : 'in';

	const snowChanceValues = [
		{ name: t('precipitation.chance.0'), value: '0 - 10%', description: t('snow.chance.text.0') },
		{ name: t('precipitation.chance.1'), value: '10 - 30%', description: t('snow.chance.text.1') },
		{ name: t('precipitation.snow.chance.2'), value: '30 - 50%', description: t('snow.chance.text.2') },
		{ name: t('precipitation.chance.3'), value: '50 - 70%', description: t('snow.chance.text.3') },
		{ name: t('precipitation.chance.4'), value: '70 - 90%', description: t('snow.chance.text.4') },
		{ name: t('precipitation.chance.5'), value: '90 - 100%', description: t('snow.chance.text.5') },
	];

	const snowPrecipValues = [
		{ name: t('precipitation.snowfall.0'), value: selectUnit({ metric: '1 - 2cm', imperial: '0.4 - 0.8in', currentUnits }) },
		{ name: t('precipitation.snowfall.1'), value: selectUnit({ metric: '2 - 10cm', imperial: '0.8 - 4.0in', currentUnits }) },
		{ name: t('precipitation.snowfall.2'), value: selectUnit({ metric: '10 - 30cm', imperial: '4.0 - 12.0in', currentUnits }) },
		{ name: t('precipitation.snowfall.3'), value: selectUnit({ metric: '30 - 50cm', imperial: '12.0 - 20.0in', currentUnits }) },
		{ name: t('precipitation.snowfall.4'), value: selectUnit({ metric: '> 50cm', imperial: '> 20.0in', currentUnits }) },
	];

	return (
		<View className={clsx('gap-2')}>
			{weatherData && (
				<WeatherChart
					forecastDays={weatherData.forecast.forecastday}
					currentTimeEpoch={weatherData.location.localtimeEpoch}
					timeZone={weatherData.location.tzId}
					getValue={(hour) =>
						showSnowfall
							? currentUnits === 'metric'
								? hour.snowCm
								: hour.snowCm * 0.393701
							: Math.round(hour.chanceOfSnow / 5) * 5
					}
					seriesLabel={showSnowfall ? t('snow.snowfall.title') : t('snow.title')}
					maxValue={showSnowfall ? undefined : 100}
					domainStep={showSnowfall ? (currentUnits === 'metric' ? 1 : 0.1) : 1}
					formatValue={
						showSnowfall ? (value) => (currentUnits === 'metric' ? value.toFixed(1) : value.toFixed(2)) : undefined
					}
					valueSuffix={showSnowfall ? snowfallUnit : '%'}
					toggleLabel={snowfallUnit}
					selectedMetric={showSnowfall ? snowfallUnit : '%'}
					onToggle={(metric) => setShowSnowfall(metric === snowfallUnit)}
					color="#3796B8"
				/>
			)}
			<ContentRow title={t('snow.chance.title')}>
				<StyledText type="body">{t('snow.chance.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('snow.chance.values')}>
				<ValuesList values={snowChanceValues} valueColor="!text-[#3796B8]" showIndex={false} />
			</ContentRow>
			<ContentRow title={t('snow.snowfall.title')}>
				<StyledText type="body">{t('snow.snowfall.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('snow.snowfall.values')}>
				<ValuesList values={snowPrecipValues} valueColor="!text-[#3796B8]" showIndex={false} />
			</ContentRow>
		</View>
	);
};
