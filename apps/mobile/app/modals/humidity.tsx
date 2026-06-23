import { HumidityModal } from 'app/components/cards/humidity/HumidityModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function HumidityModalScreen() {
	return (
		<ModalScrollView>
			<HumidityModal />
		</ModalScrollView>
	);
}
