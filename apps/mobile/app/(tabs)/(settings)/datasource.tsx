import { DataSourceInfo } from 'app/components/settings/items/DataSourceInfo';
import { ScrollView } from 'react-native';
import { clsx } from 'clsx';

export default function DataSourceScreen() {
	return (
		<ScrollView contentContainerClassName={clsx('px-4 pb-4')}>
			<DataSourceInfo />
		</ScrollView>
	);
}
