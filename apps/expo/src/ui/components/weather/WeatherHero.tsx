import type { NormalizedData } from '@nativeweather/types';
import { isTauri } from '@tauri-apps/api/core';
import { clsx } from 'clsx';
import { router } from 'expo-router';
import { Platform, useWindowDimensions, View } from 'react-native';
import { AirQualityCard } from '../airquality/AirQualityCard';
import { AlertsCard } from '../alerts/AlertsCard';
import { FavoriteStar } from '../home/FavoriteStar';
import { MetricCards } from '../metrics/MetricCards';
import type { MetricId } from '../metrics/registry';
import { Skeleton } from '../common/Skeleton';
import { DailyForecast } from './daily/DailyForecast';
import { HourlyForecast } from './hourly/HourlyForecast';
import { MapsView } from '../maps/MapsView';
import { MainWeather } from './MainWeather';
import { SmartSummary } from './SmartSummary';

// Wide enough for the metric cards to move into a third column beside the forecasts.
const threeColumnWidth = 1280;

// The Tauri window keeps two columns and centres them, leaving blank space at the sides when it is maximised.
const desktopWidth = isTauri() ? 'w-full max-w-4xl self-center' : undefined;

const openMetric = (metric: MetricId, day?: number) =>
	router.push({
		pathname: '/metric/[metric]',
		params: day === undefined ? { metric } : { metric, day: String(day) },
	});

// One column on phones; from md the forecast moves beside the summary and the metric cards span the full width.
// A wide browser window gets a third column with the air quality and metric cards, as the web app always had.
// The columns stretch to the same height so the map card fills what the forecast leaves in the middle one.
export const WeatherHero = ({ weather }: { weather: NormalizedData }) => {
	const { width } = useWindowDimensions();
	const threeColumns = Platform.OS === 'web' && !isTauri() && width >= threeColumnWidth;
	const airQuality = <AirQualityCard onPress={() => router.push('/airquality')} />;

	return (
		<View className={clsx('gap-4', desktopWidth)}>
			<View className="gap-4 md:flex-row">
				<View className="gap-4 md:flex-1">
					{/* On phones the landscape runs edge to edge up to the native header, cancelling ScreenWrapper's padding. */}
					<View>
						<MainWeather
							weather={weather}
							className="-mx-4 -mt-2 rounded-none md:mx-0 md:rounded-3xl web:mx-0 web:mt-0 web:rounded-3xl"
						/>
						{/* The other platforms have the star in the navigation header. */}
						{Platform.OS === 'web' && <FavoriteStar weather={weather} className="absolute right-4 bottom-4 z-10 p-2" />}
					</View>
					<AlertsCard onPress={() => router.push('/alerts')} />
					<SmartSummary />
					<HourlyForecast />
					{!threeColumns && airQuality}
				</View>
				<View className="gap-4 md:flex-1">
					<DailyForecast
						onSelectDay={(day) => router.push({ pathname: '/forecast', params: { day: String(day) } })}
					/>
					<MapsView />
				</View>
				{threeColumns && (
					<View className="flex-1 gap-4">
						{airQuality}
						<MetricCards column onOpen={openMetric} />
					</View>
				)}
			</View>
			{!threeColumns && <MetricCards onOpen={openMetric} />}
		</View>
	);
};

export const HeroSkeleton = () => (
	<View className={clsx('gap-4 md:flex-row md:items-start', desktopWidth)} role="status">
		<View className="gap-4 md:flex-1">
			<Skeleton className="h-72" />
			<Skeleton className="h-32" />
			<Skeleton className="h-32" />
		</View>
		<View className="md:flex-1">
			<Skeleton className="h-96" />
		</View>
	</View>
);
