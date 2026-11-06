import { CityList, ScreenWrapper, SearchField } from '@/ui';
import { View } from 'react-native';
import { useCitySelection } from '@/hooks/useCitySelection';

export default function SearchScreen() {
	const { query, setQuery, cities, selectCity, submit } = useCitySelection();

	return (
		<ScreenWrapper dismissKeyboard>
			<View className="gap-4">
				<SearchField value={query} onChangeText={setQuery} onSubmit={() => void submit()} />
				<CityList cities={cities} onSelect={selectCity} />
			</View>
		</ScreenWrapper>
	);
}
