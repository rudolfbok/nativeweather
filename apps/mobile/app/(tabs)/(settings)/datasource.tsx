import { DataSourceInfo } from 'app/components/settings/items/DataSourceInfo';
import { ScrollView } from 'react-native';

export default function DataSourceScreen() {
	return (
		<ScrollView contentContainerclassName={clsx('px-4 pb-4')}>
			<DataSourceInfo />
		</ScrollView>
	);
}
