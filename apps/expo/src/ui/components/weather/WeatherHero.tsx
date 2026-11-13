import type { NormalizedData } from '@nativeweather/types';
import { clsx } from 'clsx';
import { router } from 'expo-router';
import { Platform, View } from 'react-native';
import { AirQualityCard } from '../airquality/AirQualityCard';
import { AlertsCard } from '../alerts/AlertsCard';
import { FavoriteStar } from '../home/FavoriteStar';
import { MetricCards, MetricCardsSkeleton } from '../metrics/MetricCards';
import type { MetricId } from '../metrics/registry';
import { Skeleton } from '../common/Skeleton';
import { useThreeColumns } from '../layout/useThreeColumns';
import { desktopWidth } from '../../utils/desktopWidth';
import { DailyForecast } from './daily/DailyForecast';
import { HourlyForecast } from './hourly/HourlyForecast';
import { MapsView } from '../maps/MapsView';
import { MainWeather } from './MainWeather';
import { SmartSummary } from './SmartSummary';

const openMetric = (metric: MetricId, day?: number) =>
	router.push({
		pathname: '/metric/[metric]',
		params: day === undefined ? { metric } : { metric, day: String(day) },
	});

// One column on phones; from md the forecast moves beside the summary and the metric cards span the full width.
// From xl a browser window gets a third column with the air quality and metric cards, as the web app always had.
// The columns stretch to the same height so the map card fills what the forecast leaves in the middle one.
export const WeatherHero = ({ weather }: { weather: NormalizedData }) => {
	const threeColumns = useThreeColumns();
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
					<DailyForecast onSelectDay={(day) => router.push({ pathname: '/forecast', params: { day: String(day) } })} />
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

// Mirrors WeatherHero's layout, so the page does not jump when the data arrives.
export const HeroSkeleton = () => {
	const threeColumns = useThreeColumns();

	return (
		<View className={clsx('gap-4', desktopWidth)} role="status">
			<View className="gap-4 md:flex-row">
				<View className="gap-4 md:flex-1">
					<Skeleton className="h-72" />
					<Skeleton className="h-20" />
					<Skeleton className="h-28" />
					<Skeleton className="h-52" />
					{!threeColumns && <Skeleton className="h-32" />}
				</View>
				<View className="gap-4 md:flex-1">
					<Skeleton className="h-96" />
					<Skeleton fill className="min-h-80" />
				</View>
				{threeColumns && (
					<View className="flex-1 gap-4">
						<Skeleton className="h-32" />
						<MetricCardsSkeleton column />
					</View>
				)}
			</View>
			{!threeColumns && <MetricCardsSkeleton />}
		</View>
	);
};
