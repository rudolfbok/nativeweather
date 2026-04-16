import { AboutBody } from 'app/components/settings/AboutBody';
import { ScrollView } from 'react-native';
import { clsx } from 'clsx';

export default function AboutScreen() {
	return (
		<ScrollView contentContainerClassName={clsx('px-4 pb-4')}>
			<AboutBody />
		</ScrollView>
	);
}
