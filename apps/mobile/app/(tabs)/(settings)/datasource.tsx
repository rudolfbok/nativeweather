import { DataSourceInfo } from 'app/components/settings/items/DataSourceInfo';
import { ScrollView } from 'react-native';

export default function DataSourceScreen() {
	return (
		<ScrollView contentContainerClassName="pb-4 px-4">
			<DataSourceInfo />
		</ScrollView>
	);
}
