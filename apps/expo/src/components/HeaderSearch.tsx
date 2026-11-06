import { CityList, SearchField } from '@nativeweather/ui';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useCitySelection } from '@/hooks/useCitySelection';

export const HeaderSearch = () => {
	const { query, setQuery, cities, selectCity, submit } = useCitySelection();
	const [focused, setFocused] = useState(false);
	const blurTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(blurTimeout.current), []);

	// The list stays up briefly after blur so a tap on a result still lands on it.
	const onFocusChange = (isFocused: boolean) => {
		clearTimeout(blurTimeout.current);
		if (isFocused) setFocused(true);
		else blurTimeout.current = setTimeout(() => setFocused(false), 150);
	};

	return (
		<>
			<SearchField value={query} onChangeText={setQuery} onSubmit={() => void submit()} onFocusChange={onFocusChange} />
			{focused && cities.length > 0 && (
				<View className="absolute top-full z-50 mt-2 w-full">
					<CityList cities={cities} onSelect={selectCity} />
				</View>
			)}
		</>
	);
};
