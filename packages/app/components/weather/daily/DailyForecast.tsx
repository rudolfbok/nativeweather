import { useTolgee, useTranslate } from '@tolgee/react';
import { StyledModal } from 'app/components/common/modal/StyledModal';
import { StyledText } from 'app/components/common/styled/StyledText';
import { CardHeader } from 'app/components/common/layout/CardHeader';
import { RoundView } from 'app/components/common/styled/RoundView';
import { CalendarIcon } from 'app/components/icons/main/CalendarIcon';
import { WeatherIcon } from 'app/components/weather/WeatherIcon';
import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { useModalNavigation } from 'app/hooks/navigation/useModalNavigation';
import { useNavigationScreen } from 'app/hooks/navigation/useNavigation.macos';
import { useSelectedDay } from 'app/hooks/weather/useSelectedDay';
import { useWeather } from 'app/hooks/weather/useWeather';
import { useStorageString } from 'app/database/useStorage';
import { switchTemp } from 'app/utils/formatting/formatTemperature';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'app/hooks/navigation/useRouter';
import { DailyForecastMain } from './DailyForecastMain';
import { DaysToggle } from './DaysToggle';
import { variants } from 'app/constants/pressableVariants';

export const DailyForecast = () => {
	const { t } = useTranslate('weather');
	const weatherData = useWeather((state) => state.weatherData);
	const { selectedDay, setSelectedDay } = useSelectedDay();
	const [currentTemp] = useStorageString('currentTemp');
	const [currentSource] = useStorageString('currentSource');
	const scrollRef = useRef<ScrollView>(null);
	const mapConditions = useMapConditions();
	const { modalScreen, setModalScreen } = useNavigationScreen();
	const router = useRouter();
	const navigateToForecast = useModalNavigation({
		mobile: () => router.push('/modals/forecast'),
		macos: () => setModalScreen('forecast'),
		web: () => undefined,
	});

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
				<CardHeader
					icon={<CalendarIcon />}
					header={t('dailyforecast.title')}
					className={clsx('web:px-4 mb-1 px-4 pt-4')}
				/>
				{weatherData?.forecast.forecastday?.slice(0, 7).map((day, index, items) => (
					<Pressable
						key={index}
						onPress={() => {
							setSelectedDay(day);
							navigateToForecast();
						}}
						className={clsx('items-center justify-center px-4', 'ios:bg-transparent ios:dark:bg-transparent', variants)}
						style={{ cursor: 'pointer' }}
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
									{switchTemp({
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
									{switchTemp({
										celsius: day.day.maxTempC,
										fahrenheit: day.day.maxTempF,
										currentTemp: currentTemp,
									})}
								</StyledText>
							</View>
						</View>
					</Pressable>
				))}
				{Platform.OS === 'web' && selectedDay && (
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
						<DailyForecastMain day={selectedDay} />
					</StyledModal>
				)}
			</RoundView>
		</>
	);
};
