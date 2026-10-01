import { SunriseModal } from '@nativeweather/ui/components/cards/sunrise/SunriseModal';
import { ModalScrollView } from '@nativeweather/ui/components/common/modal/ModalScrollView';

export default function SunriseModalScreen() {
	return (
		<ModalScrollView>
			<SunriseModal />
		</ModalScrollView>
	);
}
