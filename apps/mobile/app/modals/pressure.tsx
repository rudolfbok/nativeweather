import { PressureModal } from '@nativeweather/ui/components/cards/pressure/PressureModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function PressureModalScreen() {
	return (
		<ModalScrollView>
			<PressureModal />
		</ModalScrollView>
	);
}
