import type { NormalizedData } from '@nativeweather/types';
import {
	AirQualityCard,
	AlertsCard,
	DailyForecast,
	HourlyForecast,
	MainWeather,
	MetricCards,
	Skeleton,
	SmartSummary,
} from '@nativeweather/ui';
import { router } from 'expo-router';
import { View } from 'react-native';

// One column on phones; from md the forecast moves beside the summary and the metric cards span the full width.
export const WeatherHero = ({ weather }: { weather: NormalizedData }) => (
	<View className="gap-4 pb-8">
		<View className="gap-4 md:flex-row md:items-start">
			<View className="gap-4 md:flex-1">
				{/* On phones the landscape runs edge to edge up to the native header, cancelling ScreenWrapper's padding. */}
				<MainWeather
					weather={weather}
					className="-mx-4 -mt-2 rounded-none md:mx-0 md:rounded-3xl web:mx-0 web:mt-0 web:rounded-3xl"
				/>
				<AlertsCard onPress={() => router.push('/modals/alerts')} />
				<SmartSummary />
				<HourlyForecast />
				<AirQualityCard onPress={() => router.push('/modals/airquality')} />
			</View>
			<View className="md:flex-1">
				<DailyForecast
					onSelectDay={(day) => router.push({ pathname: '/modals/forecast', params: { day: String(day) } })}
				/>
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
	<View className="gap-4 pb-8 md:flex-row md:items-start" role="status">
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
