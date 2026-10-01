import { HumidityModal } from '@nativeweather/ui/components/cards/humidity/HumidityModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function HumidityModalScreen() {
	return (
		<ModalScrollView>
			<HumidityModal />
		</ModalScrollView>
	);
}
