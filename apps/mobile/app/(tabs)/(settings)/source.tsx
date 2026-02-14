import { SourceSelect } from 'app/components/settings/selectors/SourceSelect';
import { ScrollView } from 'react-native';
import { clsx } from 'clsx';

export default function SourceScreen() {
	return (
		<ScrollView contentContainerClassName={clsx('px-4 pb-4')}>
			<SourceSelect />
		</ScrollView>
	);
}
