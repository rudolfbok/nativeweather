import { useLocalSearchParams } from 'expo-router';
import { PressureModal } from '@nativeweather/ui/components/cards/pressure/PressureModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function PressureModalScreen() {
	const { date } = useLocalSearchParams<{ date?: string }>();
	return (
		<ModalScrollView>
			<PressureModal initialDate={date} />
		</ModalScrollView>
	);
}
