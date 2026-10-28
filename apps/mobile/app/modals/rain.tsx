import { useLocalSearchParams } from 'expo-router';
import { RainModal } from '@nativeweather/ui/components/cards/rain/RainModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function RainModalScreen() {
	const { date } = useLocalSearchParams<{ date?: string }>();
	return (
		<ModalScrollView>
			<RainModal initialDate={date} />
		</ModalScrollView>
	);
}
