import { useTolgee } from '@tolgee/react';
import { RainCard, SnowCard, UVIndexCard, VisibilityCard, WindCard } from 'app/components/cards';
import { useMapConditions } from 'app/hooks/conditions/useMapConditions';
import { useSwitchColors } from 'app/hooks/switch/useSwitchColors';
import { useStorageString } from 'app/storage/useStorageString';
import { WeatherData } from 'app/types/weatherData';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { HourlyCarousel } from '../hourly/HourlyCarousel';
import { HourlyItem } from '../hourly/HourlyItem';
import { MainWeather } from '../main/MainWeather';
import { SmartSummary } from '../SmartSummary';

interface DailyForecastModalProps {
	day: WeatherData['forecast']['forecastday'][0] | null;
}

export const DailyForecastModal = ({ day }: DailyForecastModalProps) => {
	const scrollRef = useRef<ScrollView>(null);
	const [currentSource] = useStorageString('currentSource');
	const tolgee = useTolgee();
	const arrowColor = useSwitchColors('black', 'white');
	const mapConditions = useMapConditions();

	useEffect(() => {
		if (day && scrollRef.current) {
			scrollRef.current.scrollTo({ y: 0, animated: false });
		}
	}, [day]);

	if (!day) return null;

	const getDisplayHourFromIndex = (hourIndex: number) => {
		if (tolgee.getLanguage() === 'en-US') {
			const hour12 = hourIndex % 12 || 12;
			const period = hourIndex < 12 ? 'AM' : 'PM';

			return `${hour12} ${period}`;
		}

		return hourIndex.toString();
	};

	return (
		<View className={clsx('w-full gap-4')}>
			<MainWeather
				currentTempC={day.day.maxTempC}
				currentTempF={day.day.maxTempF}
				minTempC={day.day.minTempC}
				minTempF={day.day.minTempF}
				maxTempC={day.day.maxTempC}
				maxTempF={day.day.maxTempF}
				isDay={1}
				code={day.day.condition.code}
				condition={mapConditions(day.day.condition.code, 1, currentSource)}
				arrowcolor={arrowColor}
				textColor="red"
				strokeWidth={StyleSheet.hairlineWidth}
				displayTime={false}
				feelslike={false}
			/>
			<SmartSummary
				minTempC={day.day.minTempC}
				maxTempC={day.day.maxTempC}
				minTempF={day.day.minTempF}
				maxTempF={day.day.maxTempF}
				rainPrecipMm={day.day.totalPrecipMm}
				rainPrecipIn={day.day.totalPrecipIn}
				snowPrecipCm={day.day.totalSnowCm}
				snowPrecipIn={Number((day.day.totalSnowCm * 0.393701).toFixed(2))}
				maxWindKph={day.day.maxWindKph}
				uvIndex={day.day.uv}
				avgVisibilityKm={day.day.avgVisKm}
			/>
			{!day.hour || day.hour.length === 0 ? null : (
				<HourlyCarousel
					data={day.hour}
					renderItem={(hour, index) => (
						<HourlyItem
							key={index}
							hour={getDisplayHourFromIndex(index)}
							rainChance={hour.chanceOfRain}
							isDay={hour.isDay}
							code={hour.condition.code}
							tempC={hour.tempC}
							tempF={hour.tempF}
						/>
					)}
				/>
			)}
			<View
				className={clsx(
					'web:grid web:h-fit web:grid-cols-2 web:md:grid-cols-4 flex w-full flex-row flex-wrap justify-between gap-4'
				)}
			>
				{day.day.dailySnowChance > day.day.dailyRainChance ? (
					<SnowCard
						snowChance={day.day.dailySnowChance}
						snowPrecipCm={day.day.totalSnowCm}
						snowPrecipIn={Number((day.day.totalSnowCm * 0.393701).toFixed(2))}
					/>
				) : (
					<RainCard
						rainChance={day.day.dailyRainChance}
						rainPrecipMm={day.day.totalPrecipMm}
						rainPrecipIn={day.day.totalPrecipIn}
					/>
				)}

				<UVIndexCard data={day.day.uv} />
				<VisibilityCard visKm={day.day.avgVisKm} visMiles={day.day.avgVisMiles} />
				<WindCard
					windKm={Math.round(day.day.maxWindKph)}
					windMil={Math.round(day.day.maxWindMph)}
					details={false}
					currentWind={false}
				/>
			</View>
		</View>
	);
};
