import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledPressable } from 'app/components/common/styled/StyledPressable';
import { StyledText } from 'app/components/common/styled/StyledText';
import { CardHeader } from 'app/components/common/ui/CardHeader';
import { RoundView } from 'app/components/common/ui/RoundView';
import { Calendar } from 'app/components/icons/CalendarIcon';
import { useSwitchTemp } from 'app/hooks/switch/useSwitchTemp';
import { useWeather } from 'app/hooks/useWeather';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherData } from 'app/types/weatherData';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { DailyForecastModal } from './DailyForecastModal';
import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { StyledModal } from 'app/components/common/styled/StyledModal';
import { DaysToggle } from './DaysToggle';

export const DailyForecast = () => {
	const { t } = useTranslate('weather');
	const { weatherData } = useWeather();
	const [currentTemp] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');
	const [selectedDay, setSelectedDay] = useState<WeatherData['forecast']['forecastday'][0] | null>(null);
	const scrollRef = useRef<ScrollView>(null);
	const mapConditions = useMapConditions();

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

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);

		return date.toLocaleDateString(tolgee.getLanguage(), {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	const getDayNameSecond = (date: string, short: boolean) => {
		return new Date(date).toLocaleString(tolgee.getLanguage(), {
			weekday: short ? 'short' : 'long',
		});
	};

	return (
		<>
			<RoundView className={clsx('flex w-full')} liquidGlass={true}>
				<CardHeader icon={<Calendar />} header={t('dailyforecast.title')} className={clsx('web:px-4 mb-1 px-4 pt-4')} />
				{weatherData?.forecast.forecastday?.slice(0, 7).map((day, index, items) => (
					<Pressable
						key={index}
						onPress={() => setSelectedDay(day)}
						className={clsx(
							'!cursor-pointer items-center justify-center px-4',
							'ios:bg-transparent bg-systemBackground hover:bg-tertiarySystemBackground active:native:bg-tertiarySystemBackground',
							'ios:dark:bg-transparent dark:bg-secondarySystemBackground_dark dark:hover:bg-tertiarySystemBackground_dark dark:active:native:bg-tertiarySystemBackground_dark',
							index === items.length - 1 && 'rounded-bl-3xl rounded-br-3xl'
						)}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							className={clsx(
								'w-full flex-row items-center justify-between py-2',
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
									{mapConditions(day.day.condition.code, 1, currentSource).toLowerCase()}
								</StyledText>
							</View>
							<View className={clsx('w-fit flex-row items-center justify-between')}>
								<StyledText type="body" className={clsx('w-10 text-center')}>
									{useSwitchTemp({
										celsius: day.day.minTempC,
										fahrenheit: day.day.minTempF,
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
										source={currentSource}
									/>
								</View>
								<StyledText type="body" className={clsx('w-10 text-center font-semibold')}>
									{useSwitchTemp({
										celsius: day.day.maxTempC,
										fahrenheit: day.day.maxTempF,
										currentTemp: currentTemp,
									})}
								</StyledText>
							</View>
						</View>
					</Pressable>
				))}
				{selectedDay && (
					<StyledModal
						visible={Boolean(selectedDay)}
						ref={scrollRef}
						header={getDayNameSecond(selectedDay.date, false)}
						subHeader={formatDate(selectedDay.date)}
						onClose={() => setSelectedDay(null)}
						daysToggle={
							<DaysToggle days={weatherData.forecast.forecastday} onSelectDay={(day) => setSelectedDay(day)} />
						}
					>
						<DailyForecastModal day={selectedDay} />
					</StyledModal>
				)}
			</RoundView>
		</>
	);
};
