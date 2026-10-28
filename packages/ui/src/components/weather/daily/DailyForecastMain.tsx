import { NativeInstance } from '@nativeweather/ui/utils/nativeInstance';
import { useTolgee } from '@tolgee/react';
import { RainCard, RangeCard, SnowCard, UVCard, WindCard } from '../../cards';
import { useMapConditions } from '@nativeweather/ui/hooks/conditions/useMapConditions';
import type { NormalizedData } from '@nativeweather/types/normalizedData';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { HourlyCarousel } from '../hourly/HourlyCarousel';
import { HourlyItem } from '../hourly/HourlyItem';
import { MainWeather } from '../main/MainWeather';
import { SmartSummary } from '../SmartSummary';

export const DailyForecastMain = ({
	day,
	onCloseParent,
}: {
	day: NormalizedData['forecast']['forecastday'][0] | null;
	onCloseParent?: () => void;
}) => {
	const scrollRef = useRef<NativeInstance<typeof ScrollView>>(null);
	const tolgee = useTolgee();
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
				condition={mapConditions(day.day.condition.code, 1)}
				feelslike={false}
				displayShadow={false}
				dailyModal={true}
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
				uv={day.day.uv}
				avgRangeKm={day.day.avgVisKm}
				avgRangeMiles={day.day.avgVisMiles}
				dateEpoch={day.date_epoch}
				conditionCodes={day.hour.map((hour) => hour.condition.code)}
			/>
			{!day.hour || day.hour.length === 0 ? null : (
				<HourlyCarousel
					data={day.hour}
					renderItem={(hour, index) => (
						<HourlyItem
							key={index}
							hour={getDisplayHourFromIndex(index)}
							rainChance={hour.chanceOfRain}
							snowChance={hour.chanceOfSnow}
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
					'ios:flex-wrap flex w-full flex-row justify-between gap-4 web:grid web:h-fit web:grid-cols-2 web:md:grid-cols-4'
				)}
			>
				{day.day.dailySnowChance > day.day.dailyRainChance ? (
					<SnowCard
						forecastDate={day.date}
						snowChance={day.day.dailySnowChance}
						snowPrecipCm={day.day.totalSnowCm}
						snowPrecipIn={Number((day.day.totalSnowCm * 0.393701).toFixed(2))}
						showBackdrop={false}
						onCloseParent={onCloseParent}
					/>
				) : (
					<RainCard
						forecastDate={day.date}
						rainChance={day.day.dailyRainChance}
						rainPrecipMm={day.day.totalPrecipMm}
						rainPrecipIn={day.day.totalPrecipIn}
						showBackdrop={false}
						onCloseParent={onCloseParent}
					/>
				)}

				<UVCard forecastDate={day.date} data={day.day.uv} showBackdrop={false} onCloseParent={onCloseParent} />
				<RangeCard
					visKm={day.day.avgVisKm}
					visMiles={day.day.avgVisMiles}
					showBackdrop={false}
					onCloseParent={onCloseParent}
				/>
				<WindCard
					forecastDate={day.date}
					windKm={Math.round(day.day.maxWindKph)}
					windMil={Math.round(day.day.maxWindMph)}
					details={false}
					currentWind={false}
					showBackdrop={false}
					onCloseParent={onCloseParent}
				/>
			</View>
		</View>
	);
};
