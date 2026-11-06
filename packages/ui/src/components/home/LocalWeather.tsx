import { extractCity, useLocalWeather } from '@nativeweather/core';
import type { LocalWeatherErrorKind } from '@nativeweather/core';
import type { City } from '@nativeweather/types';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';
import { CardSkeleton } from '../common/CardSkeleton';
import { RoundView } from '../common/RoundView';
import { Text } from '../common/Text';
import { CityWeatherCard, cityCardGrid } from './CityWeatherCard';

interface LocalWeatherProps {
	error: LocalWeatherErrorKind | null;
	onOpen: (city: City) => void;
}

export const LocalWeather = ({ error, onOpen }: LocalWeatherProps) => {
	const { t } = useTranslate('weather');
	const weather = useLocalWeather((state) => state.weatherData);
	const city = weather && extractCity(weather);

	return (
		<View className={cityCardGrid}>
			{error ? (
				<RoundView className="min-h-[134px] justify-center gap-2 p-4">
					<Text type="body" className="text-center font-semibold text-system-red">
						{t(`localweather.error.${error}.title`)}
					</Text>
					<Text type="body" className="text-center">
						{t(`localweather.error.${error}.message`)}
					</Text>
				</RoundView>
			) : weather && city ? (
				<CityWeatherCard name={city.name} region={city.region} weather={weather} onPress={() => onOpen(city)} />
			) : (
				<CardSkeleton />
			)}
		</View>
	);
};
