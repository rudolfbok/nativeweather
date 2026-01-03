import { useTolgee, useTranslate } from '@tolgee/react';
import { useSwitchTemp } from 'app/hooks/useSwitchTemp';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherData } from 'app/types/weatherData';
import { useWeatherConditions } from 'app/utils/mappings/mapConditions';
import { WeatherIcon } from 'app/utils/mappings/mapIcons';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CardHeader } from 'app/components/common/CardHeader';
import { RoundView } from 'app/components/common/RoundView';
import { StyledPressable } from 'app/components/common/StyledPressable';
import { StyledText } from 'app/components/common/StyledText';
import { Calendar } from 'app/components/icons/CalendarIcon';
import { DailyForecastModal } from './DailyForecastModal';

export const DailyForecast = () => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const [currentTemp] = useStorageString('currentTemp');
	const getWeatherByCode = useWeatherConditions();
	const [selectedDay, setSelectedDay] = useState<WeatherData['forecast']['forecastday'][0] | null>(null);
	const scrollRef = useRef<ScrollView>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({ y: 0, animated: false });
		}
	}, [selectedDay]);

	const tolgee = useTolgee();

	const getDayName = (dateString: string, length: 'long' | 'short' | 'narrow') => {
		const date = new Date(dateString);
		return date.toLocaleString(tolgee.getLanguage(), { weekday: length });
	};

	return (
		<>
			<RoundView className={clsx('flex w-full pt-4')}>
				<CardHeader icon={<Calendar />} header={t('dailyforecast.title')} className={clsx('mb-1 px-4')} />
				{weatherData?.forecast.forecastday?.slice(0, 7).map((day, index, items) => (
					<StyledPressable
						key={index}
						onPress={() => setSelectedDay(day)}
						className={clsx(
							'!cursor-pointer items-center justify-center px-4 pt-2',
							index === items.length - 1 && 'rounded-bl-3xl rounded-br-3xl'
						)}
					>
						<View
							className={clsx(
								'w-full flex-row items-center justify-between pb-2',
								index !== items.length - 1 && 'border-b border-gray-200 dark:border-zinc-800'
							)}
							style={index !== items.length - 1 ? { borderBottomWidth: StyleSheet.hairlineWidth } : undefined} /// THIS
						>
							<View className={clsx('flex w-14')}>
								<StyledText type="body" className={clsx('font-semibold')}>
									{index === 0 ? t('dailyforecast.today') : getDayName(day.date, 'short')}
								</StyledText>
							</View>
							<View className={clsx('flex flex-1 items-center text-center')}>
								<StyledText type="bodysecondary" className={clsx('text-center')}>
									{getWeatherByCode(day.day.condition.code, 1).toLowerCase()}
								</StyledText>
							</View>
							<View className={clsx('w-fit flex-row items-center justify-between')}>
								<StyledText type="body" className={clsx('w-10 text-center')}>
									{useSwitchTemp({
										celsius: day.day.mintemp_c,
										fahrenheit: day.day.mintemp_f,
										currentTemp: currentTemp,
									})}
								</StyledText>
								<View className={clsx('w-22 items-center justify-center')}>
									<WeatherIcon
										isDay={1}
										code={day.day.condition.code}
										width={35}
										height={35}
										strokeWidth={StyleSheet.hairlineWidth}
									/>
								</View>
								<StyledText type="body" className={clsx('w-10 text-center font-semibold')}>
									{useSwitchTemp({
										celsius: day.day.maxtemp_c,
										fahrenheit: day.day.maxtemp_f,
										currentTemp: currentTemp,
									})}
								</StyledText>
							</View>
						</View>
					</StyledPressable>
				))}
			</RoundView>
			{selectedDay && (
				<DailyForecastModal
					visible={Boolean(selectedDay)}
					day={selectedDay}
					days={weatherData.forecast.forecastday}
					onSelectDay={setSelectedDay}
					onClose={() => setSelectedDay(null)}
				/>
			)}
		</>
	);
};
