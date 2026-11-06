import { fetchWeather } from '@nativeweather/api';
import { useCitySearch } from '@nativeweather/core';
import type { City } from '@nativeweather/types';
import { CityList, ScreenWrapper, SearchField, showToast } from '@nativeweather/ui';
import { useTranslate } from '@tolgee/react';
import { View } from 'react-native';
import { openCity } from '@/navigation';

export default function SearchScreen() {
	const { t } = useTranslate('common');
	const { query, setQuery, suggestions, recents, addRecent } = useCitySearch();

	const selectCity = (city: City) => {
		addRecent(city);
		setQuery('');
		openCity(city);
	};

	// Free text and coordinates have no name yet, so the weather is fetched to learn it.
	const submit = async () => {
		const text = query.trim();
		if (!text) return;
		const weather = await fetchWeather(text);
		if (!weather) {
			showToast({ message: t('search.input.error'), type: 'error' });
			return;
		}
		setQuery('');
		openCity(weather.location);
	};

	return (
		<ScreenWrapper dismissKeyboard>
			<View className="gap-4">
				<SearchField value={query} onChangeText={setQuery} onSubmit={() => void submit()} />
				<CityList cities={query.trim() ? suggestions : recents} onSelect={selectCity} />
			</View>
		</ScreenWrapper>
	);
}
