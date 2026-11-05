import { initStorageDefaults, isCityInFavorites, useFavoriteCities, useStorageString } from '@nativeweather/core';
import type { City } from '@nativeweather/types';
import { Button } from '@nativeweather/ui';
import { useEffect } from 'react';
import { Platform, Text, View } from 'react-native';

const harnessCity: City = { name: 'Peshawar', region: 'North-West Frontier', country: 'Pakistan' };

export default function HarnessScreen() {
	const [units, setUnits] = useStorageString('currentUnits');
	const { favoriteCount, handleFavoriteToggle } = useFavoriteCities();
	const isFavorite = favoriteCount > 0 && isCityInFavorites(harnessCity);

	useEffect(initStorageDefaults, []);

	return (
		<View className="flex-1 items-center justify-center gap-6 bg-system-background px-6">
			<Text className="text-xl font-semibold text-label">Core storage harness ({Platform.OS})</Text>
			<Text className="text-base text-label">Units: {units}</Text>
			<Button onPress={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}>Toggle units</Button>
			<Text className="text-base text-label">
				Favourites: {favoriteCount} · {harnessCity.name} {isFavorite ? 'saved' : 'not saved'}
			</Text>
			<Button onPress={() => handleFavoriteToggle(harnessCity)}>Toggle {harnessCity.name}</Button>
		</View>
	);
}
