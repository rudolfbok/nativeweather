import { useChartDay } from '../../../hooks/weather/useChartDay';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { useWeather } from '@nativeweather/core/hooks/weather/useWeather';
import { selectUnit } from '@nativeweather/core/utils/formatting/selectUnit';
import { getDirection } from '@nativeweather/core/utils/mappings/windDirection';
import { useTranslate } from '@tolgee/react';
import { clsx } from 'clsx';
import { Gauge, Wind } from 'lucide-react-native';
import { View } from 'react-native';
import { ContentRow } from '../../common/layout/ContentRow';
import { ValuesList } from '../../common/modal/ValuesList';
import { Separator } from '../../common/styled/Separator';
import { StyledText } from '../../common/styled/StyledText';
import { WindDirectionIcon } from '../../icons/ui/WindDirectionIcon';
import { WeatherChart } from '../../weather/WeatherChart';

export const WindModal = ({ initialDate }: { initialDate?: string }) => {
	const { t } = useTranslate('weather');
	const [currentUnits] = useStorageString('currentUnits');
	const { weatherData } = useWeather();
	const { date, isToday, selectDay } = useChartDay(weatherData, initialDate);

	const beaufortScaleValues = [
		{
			name: t('description.windspeed.0'),
			textColor: '',
			value: selectUnit({ metric: '< 1km/h', imperial: '< 1mph', currentUnits }),
		},
		{
			name: t('description.windspeed.1'),
			textColor: '!text-[#0891B2]',
			value: selectUnit({ metric: '1 - 5km/h', imperial: '0 - 2mph', currentUnits }),
		},
		{
			name: t('description.windspeed.2'),
			textColor: '!text-[#059669]',
			value: selectUnit({ metric: '6 - 11km/h', imperial: '4 - 7mph', currentUnits }),
		},
		{
			name: t('description.windspeed.3'),
			textColor: '!text-[#16A34A]',
			value: selectUnit({ metric: '12 - 19km/h', imperial: '8 - 12mph', currentUnits }),
		},
		{
			name: t('description.windspeed.4'),
			textColor: '!text-[#22C55E]',
			value: selectUnit({ metric: '20 - 28km/h', imperial: '13 - 18mph', currentUnits }),
		},
		{
			name: t('description.windspeed.5'),
			textColor: '!text-[#65A30D]',
			value: selectUnit({ metric: '29 - 38km/h', imperial: '19 - 24mph', currentUnits }),
		},
		{
			name: t('description.windspeed.6'),
			textColor: '!text-[#84CC16]',
			value: selectUnit({ metric: '39 - 49km/h', imperial: '25 - 31mph', currentUnits }),
		},
		{
			name: t('description.windspeed.7'),
			textColor: '!text-[#A3A300]',
			value: selectUnit({ metric: '50 - 61km/h', imperial: '32 - 38mph', currentUnits }),
		},
		{
			name: t('description.windspeed.8'),
			textColor: '!text-[#CA8A04]',
			value: selectUnit({ metric: '62 - 74km/h', imperial: '39 - 46mph', currentUnits }),
		},
		{
			name: t('description.windspeed.9'),
			textColor: '!text-[#EA580C]',
			value: selectUnit({ metric: '75 - 88km/h', imperial: '47 - 54mph', currentUnits }),
		},
		{
			name: t('description.windspeed.10'),
			textColor: '!text-[#DC2626]',
			value: selectUnit({ metric: '89 - 102km/h', imperial: '55 - 63mph', currentUnits }),
		},
		{
			name: t('description.windspeed.11'),
			textColor: '!text-[#B91C1C]',
			value: selectUnit({ metric: '103 - 117km/h', imperial: '64 - 72mph', currentUnits }),
		},
		{
			name: t('description.windspeed.12'),
			textColor: '!text-[#991B1B]',
			value: selectUnit({ metric: '> 118km/h', imperial: '> 73mph', currentUnits }),
		},
	];

	const windData = [
		{
			icon: <Gauge color="white" />,
			label: t('wind.current.speed'),
			value: currentUnits === 'metric' ? weatherData?.current.windKph + 'km/h' : weatherData?.current.windMph + 'mph',
		},
		{
			icon: <Wind color="white" />,
			label: t('wind.current.gust'),
			value: currentUnits === 'metric' ? weatherData?.current.gustKph + 'km/h' : weatherData?.current.gustMph + 'mph',
		},
		{
			icon: <WindDirectionIcon />,
			label: t('wind.current.direction'),
			value: `${getDirection(weatherData?.current.windDegree, 'long', t)} / ${weatherData?.current.windDegree}°`,
		},
	];

	return (
		<View className={clsx('gap-2')}>
			{weatherData && (
				<WeatherChart
					selectedDate={date}
					onSelectDay={selectDay}
					forecastDays={weatherData.forecast.forecastday}
					currentTimeEpoch={weatherData.location.localtimeEpoch}
					timeZone={weatherData.location.tzId}
					getValue={(hour) => (currentUnits === 'metric' ? hour.windKph : hour.windMph)}
					seriesLabel={t('wind.title')}
					valueSuffix={currentUnits === 'metric' ? 'km/h' : 'mph'}
					domainStep={5}
					color="#737373"
				/>
			)}

			{isToday && (
				<ContentRow title={t('wind.current.title')}>
					<View className={clsx('w-full justify-between gap-4')}>
						{windData.map((item, index) => (
							<View key={index} className={clsx('gap-4')}>
								<View className={clsx('flex-row items-center')}>
									<View className={clsx('mr-4 items-center justify-center rounded-lg bg-gray-500 p-1')}>
										{item.icon}
									</View>
									<View className={clsx('flex-1 flex-row justify-between')}>
										<StyledText type="sectiontitle">{item.label}</StyledText>
										<StyledText type="body">{item.value}</StyledText>
									</View>
								</View>
								{index < windData.length - 1 && <Separator />}
							</View>
						))}
					</View>
				</ContentRow>
			)}

			<ContentRow title={t('wind.beaufortscale')}>
				<StyledText type="body">{t('wind.description')}</StyledText>
			</ContentRow>
			<ContentRow title={t('wind.values')}>
				<ValuesList values={beaufortScaleValues} showIndex={true} />
			</ContentRow>
		</View>
	);
};
