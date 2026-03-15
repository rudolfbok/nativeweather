import { PressureModal } from 'app/components/cards/modals/PressureModal';
import { ModalScrollView } from 'app/components/common/ui/ModalScrollView';

export default function PressureModalScreen() {
	return (
		<ModalScrollView>
			<PressureModal />
		</ModalScrollView>
	);
}
