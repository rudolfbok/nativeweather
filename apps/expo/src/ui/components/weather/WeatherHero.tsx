import type { NormalizedData } from '@nativeweather/types';
import { router } from 'expo-router';
import { Platform, View } from 'react-native';
import { AirQualityCard } from '../airquality/AirQualityCard';
import { AlertsCard } from '../alerts/AlertsCard';
import { FavoriteStar } from '../home/FavoriteStar';
import { MetricCards } from '../metrics/MetricCards';
import { Skeleton } from '../common/Skeleton';
import { DailyForecast } from './daily/DailyForecast';
import { HourlyForecast } from './hourly/HourlyForecast';
import { MapsView } from '../maps/MapsView';
import { MainWeather } from './MainWeather';
import { SmartSummary } from './SmartSummary';

// One column on phones; from md the forecast moves beside the summary and the metric cards span the full width.
// The columns stretch to the same height so the map card fills what the forecast leaves in the right one.
export const WeatherHero = ({ weather }: { weather: NormalizedData }) => (
	<View className="gap-4">
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
				<AlertsCard onPress={() => router.push('/modals/alerts')} />
				<SmartSummary />
				<HourlyForecast />
				<AirQualityCard onPress={() => router.push('/modals/airquality')} />
			</View>
			<View className="gap-4 md:flex-1">
				<DailyForecast
					onSelectDay={(day) => router.push({ pathname: '/modals/forecast', params: { day: String(day) } })}
				/>
				<MapsView />
			</View>
		</View>
		<MetricCards
			onOpen={(metric, day) =>
				router.push({
					pathname: '/modals/[metric]',
					params: day === undefined ? { metric } : { metric, day: String(day) },
				})
			}
		/>
	</View>
);

export const HeroSkeleton = () => (
	<View className="gap-4 md:flex-row md:items-start" role="status">
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
