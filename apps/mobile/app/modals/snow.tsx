import { useLocalSearchParams } from 'expo-router';
import { SnowModal } from '@nativeweather/ui/components/cards/snow/SnowModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function SnowModalScreen() {
	const { date } = useLocalSearchParams<{ date?: string }>();
	return (
		<ModalScrollView>
			<SnowModal initialDate={date} />
		</ModalScrollView>
	);
}
