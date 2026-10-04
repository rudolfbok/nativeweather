import { useTolgee, useTranslate } from '@tolgee/react';
import { CardHeader } from '@nativeweather/ui/components/common/layout/CardHeader';
import { StyledModal } from '@nativeweather/ui/components/common/modal/StyledModal';
import { RoundView } from '@nativeweather/ui/components/common/styled/RoundView';
import { StyledPressable } from '@nativeweather/ui/components/common/styled/StyledPressable';
import { StyledText } from '@nativeweather/ui/components/common/styled/StyledText';
import { CalendarIcon } from '@nativeweather/ui/components/icons/main/CalendarIcon';
import { WeatherIcon } from '@nativeweather/ui/components/icons/weather/WeatherIcon';
import { useStorageString } from '@nativeweather/core/database/useStorage';
import { useMapConditions } from '@nativeweather/ui/hooks/conditions/useMapConditions';
import { useModalNavigation } from '@nativeweather/ui/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from '@nativeweather/ui/hooks/navigation/useNavigation.macos';
import { useRouter } from '@nativeweather/ui/hooks/navigation/useRouter';
import { useSelectedDay } from '@nativeweather/ui/hooks/weather/useSelectedDay';
import { useWeather } from '@nativeweather/ui/hooks/weather/useWeather';
import { formatTemperature } from '@nativeweather/core/utils/formatting/formatTemperature';
import { clsx } from 'clsx';
import { useRef } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { DailyForecastMain } from './DailyForecastMain';
import { DaysToggle } from './DaysToggle';

export const DailyForecast = () => {
	const { t } = useTranslate('weather');
	const weatherData = useWeather((state) => state.weatherData);
	const { selectedDay, setSelectedDay } = useSelectedDay();
	const [currentTemp] = useStorageString('currentTemp');
	const scrollRef = useRef<ScrollView>(null);
	const mapConditions = useMapConditions();
	const { setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToForecast = useModalNavigation({
		mobile: () => router.push('/modals/forecast'),
		macos: () => setModalScreen('forecast'),
		web: () => undefined,
	});

	const handleSelectDay = (day: NonNullable<typeof selectedDay>) => {
		scrollRef.current?.scrollTo({ y: 0, animated: false });
		setSelectedDay(day);
	};
	const handleCloseForecast = () => {
		scrollRef.current?.scrollTo({ y: 0, animated: false });
		setSelectedDay(null);
	};

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
		<RoundView className={clsx('flex w-full')}>
			<CardHeader
				icon={<CalendarIcon />}
				header={t('dailyforecast.title')}
				className={clsx('mb-1 px-4 pt-4 web:px-4')}
			/>
			{weatherData?.forecast.forecastday?.slice(0, 7).map((day, index, items) => (
				<StyledPressable
					key={index}
					onPress={() => {
						handleSelectDay(day);
						navigateToForecast();
					}}
					className={clsx(
						'items-center justify-center px-4',
						'ios:bg-transparent ios:dark:bg-transparent android:bg-transparent android:dark:bg-transparent'
					)}
				>
					<View
						className={clsx(
							'w-full flex-row items-center justify-between py-2',
							index !== items.length - 1 && 'border-b border-gray-200 dark:border-zinc-800'
						)}
						style={index !== items.length - 1 ? { borderBottomWidth: StyleSheet.hairlineWidth } : undefined} /// THIS
					>
						<View className={clsx('flex w-14')}>
							<StyledText type="body" className={clsx('w-full font-semibold')} numberOfLines={1}>
								{index === 0 ? t('dailyforecast.today') : getDayName(day.date, 'short')}
							</StyledText>
						</View>
						<View className={clsx('flex flex-1 items-center text-center')}>
							<StyledText type="caption" className={clsx('text-center')}>
								{mapConditions(day.day.condition.code, 1).toLowerCase()}
							</StyledText>
						</View>
						<View className={clsx('w-fit flex-row items-center justify-between')}>
							<StyledText type="body" className={clsx('w-10 text-center')}>
								{formatTemperature({
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
								/>
							</View>
							<StyledText type="body" className={clsx('w-10 text-center font-semibold')}>
								{formatTemperature({
									celsius: day.day.maxTempC,
									fahrenheit: day.day.maxTempF,
									currentTemp: currentTemp,
								})}
							</StyledText>
						</View>
					</View>
				</StyledPressable>
			))}
			{Platform.OS === 'web' && weatherData && selectedDay && (
				<StyledModal
					visible={Boolean(selectedDay)}
					ref={scrollRef}
					header={getDayNameSecond(selectedDay.date, false)}
					subHeader={formatDate(selectedDay.date)}
					onClose={handleCloseForecast}
					daysToggle={<DaysToggle days={weatherData.forecast.forecastday} onSelectDay={handleSelectDay} />}
				>
					<DailyForecastMain day={selectedDay} onCloseParent={handleCloseForecast} />
				</StyledModal>
			)}
		</RoundView>
	);
};
