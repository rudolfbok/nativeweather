import { PressureModal } from 'app/components/cards/pressure/PressureModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function PressureModalScreen() {
	return (
		<ModalScrollView>
			<PressureModal />
		</ModalScrollView>
	);
}
