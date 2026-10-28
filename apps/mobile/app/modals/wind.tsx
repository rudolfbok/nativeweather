import { useLocalSearchParams } from 'expo-router';
import { WindModal } from '@nativeweather/ui/components/cards/wind/WindModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function WindModalScreen() {
	const { date } = useLocalSearchParams<{ date?: string }>();
	return (
		<ModalScrollView>
			<WindModal initialDate={date} />
		</ModalScrollView>
	);
}
