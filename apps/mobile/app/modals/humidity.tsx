import { useLocalSearchParams } from 'expo-router';
import { HumidityModal } from '@nativeweather/ui/components/cards/humidity/HumidityModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function HumidityModalScreen() {
	const { date } = useLocalSearchParams<{ date?: string }>();
	return (
		<ModalScrollView>
			<HumidityModal initialDate={date} />
		</ModalScrollView>
	);
}
