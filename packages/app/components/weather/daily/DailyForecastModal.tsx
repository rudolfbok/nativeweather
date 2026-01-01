import { useTolgee } from '@tolgee/react';
import { useSwitchColors } from 'app/hooks/useSwitchColors';
import { WeatherData } from 'app/types/weatherData';
import { useWeatherConditions } from 'app/utils/mappings/mapConditions';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { RainCard, SnowCard, UVIndexCard, VisibilityCard, WindCard } from '../../cards';
import { StyledModal } from '../../common/StyledModal';
import { DaysToggle } from './DaysToggle';
import { HourlyCarousel } from '../hourly/HourlyCarousel';
import { HourlyItem } from '../hourly/HourlyItem';
import { MainWeather } from '../MainWeather';
import { SmartSummary } from '../SmartSummary';

interface DailyForecastModalProps {
	visible: boolean;
	day: WeatherData['forecast']['forecastday'][0] | null;
	days: WeatherData['forecast']['forecastday'];
	onSelectDay: (day: WeatherData['forecast']['forecastday'][0]) => void;
	onClose: () => void;
}

export const DailyForecastModal = ({ visible, day, days, onClose, onSelectDay }: DailyForecastModalProps) => {
	const scrollRef = useRef<ScrollView>(null);
	const tolgee = useTolgee();
	const getWeatherByCode = useWeatherConditions();
	const arrowColor = useSwitchColors('black', 'white');

	useEffect(() => {
		if (day && scrollRef.current) {
			scrollRef.current.scrollTo({ y: 0, animated: false });
		}
	}, [day]);

	if (!day) return null;

	const formatDate = (date: string) =>
		new Date(date).toLocaleDateString(tolgee.getLanguage(), {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});

	const getDayName = (date: string, short: boolean) =>
		new Date(date).toLocaleString(tolgee.getLanguage(), {
			weekday: short ? 'short' : 'long',
		});

	const getDisplayHourFromIndex = (hourIndex: number) => {
		if (tolgee.getLanguage() === 'en') {
			const hour12 = hourIndex % 12 || 12;
			const period = hourIndex < 12 ? 'AM' : 'PM';

			return `${hour12} ${period}`;
		}

		return hourIndex.toString();
	};

	return (
		<StyledModal
			visible={visible}
			ref={scrollRef}
			header={getDayName(day.date, false)}
			subHeader={formatDate(day.date)}
			onClose={onClose}
			dailyModal
			daysToggle={<DaysToggle days={days} onSelectDay={onSelectDay} />}
		>
			<View className={clsx('w-full gap-4')}>
				<MainWeather
					currentTempC={day.day.maxtemp_c}
					currentTempF={day.day.maxtemp_f}
					minTempC={day.day.mintemp_c}
					minTempF={day.day.mintemp_f}
					maxTempC={day.day.maxtemp_c}
					maxTempF={day.day.maxtemp_f}
					isDay={1}
					code={day.day.condition.code}
					condition={getWeatherByCode(day.day.condition.code, 1)}
					arrowcolor={arrowColor}
					textcolor="red"
					strokeWidth={StyleSheet.hairlineWidth}
					displayTime={false}
					feelslike={false}
				/>
				<SmartSummary
					minTempC={day.day.mintemp_c}
					maxTempC={day.day.maxtemp_c}
					minTempF={day.day.mintemp_f}
					maxTempF={day.day.maxtemp_f}
					rainPrecipMm={day.day.totalprecip_mm}
					rainPrecipIn={day.day.totalprecip_in}
					snowPrecipCm={day.day.totalsnow_cm}
					snowPrecipIn={Number((day.day.totalsnow_cm * 0.393701).toFixed(2))}
				/>
				<HourlyCarousel
					data={day.hour}
					renderItem={(hour, index) => (
						<HourlyItem
							key={index}
							hour={getDisplayHourFromIndex(index)}
							rainChance={hour.chance_of_rain}
							isDay={hour.is_day}
							code={hour.condition.code}
							tempC={hour.temp_c}
							tempF={hour.temp_f}
						/>
					)}
				/>
				<View
					className={clsx(
						'web:grid web:h-fit web:grid-cols-2 web:md:grid-cols-4 flex w-full flex-row flex-wrap justify-between gap-4'
					)}
				>
					{day.day.daily_chance_of_snow > day.day.daily_chance_of_rain ? (
						<SnowCard
							snowChance={day.day.daily_chance_of_snow}
							snowPrecipCm={day.day.totalsnow_cm}
							snowPrecipIn={Number((day.day.totalsnow_cm * 0.393701).toFixed(2))}
						/>
					) : (
						<RainCard
							rainChance={day.day.daily_chance_of_rain}
							rainPrecipMm={day.day.totalprecip_mm}
							rainPrecipIn={day.day.totalprecip_in}
						/>
					)}

					<UVIndexCard data={day.day.uv} />
					<VisibilityCard visKm={day.day.avgvis_km} visMiles={day.day.avgvis_miles} />
					<WindCard
						windKm={Math.round(day.day.maxwind_kph)}
						windMil={Math.round(day.day.maxwind_mph)}
						details={false}
						currentWind={false}
					/>
				</View>
			</View>
		</StyledModal>
	);
};
